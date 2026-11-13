import { useState } from 'react'
import { crops } from './crops'

import {
  calculateMutationMultiplier,
  calculateSizeMultiplier,
  calculateCropPrice,
} from './cropCalculations'


// AVAILABLE MUTATIONS

const mutationOptions = [
  'Wet',
  'Chilled',
  'Frozen',
  'Thunderstruck',
  'Thundercharged',
  'Dawnlit',
  'Dawnbound',
  'Amberlit',
  'Amberbound',
  'Gold',
  'Rainbow',
]


// MUTATION REFERENCE VALUES

const mutationMultipliers = {
  Wet: 2,
  Chilled: 2,
  Frozen: 6,
  Thunderstruck: 5,
  Thundercharged: 7,
  Dawnlit: 4,
  Dawnbound: 7,
  Amberlit: 6,
  Amberbound: 10,
  Gold: 25,
  Rainbow: 50,
}


function CropCalculator() {

  const [selectedCrop, setSelectedCrop] = useState('')
  const [size, setSize] = useState(50)
  const [selectedMutations, setSelectedMutations] = useState([])


  const crop = crops.find(
    (item) => item.id === selectedCrop
  )


  // CALCULATIONS

  const mutationResult =
    calculateMutationMultiplier(selectedMutations)

  const sizeResult = crop
    ? calculateSizeMultiplier(crop, size)
    : null

  const priceResult = crop
    ? calculateCropPrice(crop, size, selectedMutations)
    : null
const harvestQuantity = crop?.cropsPerHarvest

const totalHarvestValue =
  priceResult?.valid &&
  harvestQuantity?.min != null &&
  harvestQuantity?.max != null
    ? {
        min: priceResult.price * harvestQuantity.min,
        max: priceResult.price * harvestQuantity.max,
      }
    : null

  // TOGGLE MUTATIONS

  function toggleMutation(mutation) {

    setSelectedMutations((current) =>
      current.includes(mutation)
        ? current.filter((item) => item !== mutation)
        : [...current, mutation]
    )

  }


  // FORMAT PRICES

  function formatPrice(value) {

    if (value == null || !Number.isFinite(Number(value))) {
      return 'Unknown'
    }

    return Number(value).toLocaleString('en-US', {
      maximumFractionDigits: 2,
    })

  }


  // FORMAT TIME

  function formatTime(seconds) {

    if (seconds == null || !Number.isFinite(Number(seconds))) {
      return 'Unknown'
    }

    const totalSeconds = Number(seconds)

    if (totalSeconds < 60) {
      return String(totalSeconds) + ' seconds'
    }

    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)

    const parts = []

    if (days > 0) parts.push(String(days) + 'd')
    if (hours > 0) parts.push(String(hours) + 'h')
    if (minutes > 0) parts.push(String(minutes) + 'm')

    return parts.join(' ')

  }


  // FORMAT HARVEST QUANTITY

  function formatHarvestQuantity(value) {

    if (value?.min == null) {
      return 'Unknown'
    }

    if (value.max != null && value.max !== value.min) {
      return String(value.min) + '–' + String(value.max)
    }

    return value.min

  }


  // FORMAT VERIFICATION STATUS

  function formatVerification(status) {

    if (status === 'verified') {
      return '✓ Verified'
    }

    if (
      status === 'wiki-enriched; gameplay values still unverified'
    ) {
      return '⚠ Wiki Data — Gameplay Unverified'
    }

    return '⚠ Needs Verification'

  }


  // SORT CROPS ALPHABETICALLY

  const sortedCrops = [...crops].sort((a, b) =>
    a.name.localeCompare(b.name)
  )


  return (

    <div className="calculator-page">

      {/* PAGE HEADING */}

      <div className="database-heading">

        <p className="eyebrow">
          MAKE EVERY HARVEST COUNT
        </p>

        <h1>💰 Crop Value Calculator</h1>

        <p>
          Discover what your crops are worth with different
          sizes and mutations.
        </p>

      </div>


      {/* CALCULATOR CARD */}

      <div className="calculator-card">

        <h2>🌱 Choose Your Crop</h2>


        {/* CROP SELECTION */}

        <label htmlFor="crop-select">
          Crop
        </label>

        <select
          id="crop-select"
          value={selectedCrop}
          onChange={(event) => setSelectedCrop(event.target.value)}
        >

          <option value="">
            Select a crop...
          </option>

          {sortedCrops.map((item) => (

            <option key={item.id} value={item.id}>
              {item.name}
            </option>

          ))}

        </select>


        {/* CROP SIZE */}

        <label htmlFor="crop-size">
          Crop Size (50–100)
        </label>

        <input
  id="crop-size"
  type="number"
  min="50"
  max="100"
  value={size}
  onChange={(event) => {
    setSize(event.target.value)
  }}
  onBlur={() => {
    const numericSize = Number(size)

    if (size === '' || !Number.isFinite(numericSize)) {
      setSize(50)
    } else {
      setSize(Math.min(100, Math.max(50, numericSize)))
    }
  }}
/>


        {/* MUTATION SELECTION */}

        <h2>✨ Crop Mutations</h2>

        <div className="mutation-grid">

          {mutationOptions.map((mutation) => (

            <label
              key={mutation}
              className="mutation-option"
            >

              <input
                type="checkbox"
                checked={selectedMutations.includes(mutation)}
                onChange={() => toggleMutation(mutation)}
              />

              {mutation}

            </label>

          ))}

        </div>


        {/* SELECTED MUTATIONS */}

        <div className="selected-mutations">

          <strong>Selected Mutations:</strong>

          <p>
            {selectedMutations.length > 0
              ? selectedMutations.join(' + ')
              : 'No mutations selected'}
          </p>

        </div>


        {/* SELECTED CROP DETAILS */}

        <h2>🌷 Selected Crop</h2>

        {crop ? (

          <div className="selected-crop">

            <h3>{crop.name}</h3>

            <p>
              <strong>Base Sell Price:</strong>{' '}
              {formatPrice(crop.baseSellPrice)}
            </p>

            <p>
              <strong>Seed Price:</strong>{' '}
              {formatPrice(crop.seedPrice)}
            </p>

            <p>
              <strong>Seed Source:</strong>{' '}
              {crop.seedSource || 'Unknown'}
            </p>

          </div>

        ) : (

          <p className="calculator-placeholder">
            Choose a crop to see its details!
          </p>

        )}


        {/* RESULTS PANEL */}

        {crop && (

          <div className="calculator-results">

            <h2>💰 Your Harvest Details</h2>


            {/* FINAL SELLING PRICE */}

            <h3>✨ Final Selling Price</h3>

            {priceResult?.valid ? (

              <>

                <p className="result-value">
                  {formatPrice(priceResult.price)} Coins
                </p>

                <small>
                  Base price × size multiplier × mutation multiplier.
                </small>

              </>

            ) : (

              <p className="result-value">
                Unable to calculate
              </p>

            )}


            <hr />


            <p>
              <strong>Selected Crop:</strong>{' '}
              {crop.name}
            </p>

            <p>
              <strong>Crop Size:</strong>{' '}
              {size || 'Not entered'}
            </p>

            <p>
              <strong>Mutations:</strong>{' '}
              {selectedMutations.length > 0
                ? selectedMutations.join(' + ')
                : 'None'}
            </p>


            <hr />


            {/* SIZE CALCULATION */}

            <h3>📏 Crop Size Calculation</h3>

            {sizeResult?.valid ? (

              <>

                <p>
                  <strong>Size Multiplier:</strong>{' '}
                  {sizeResult.multiplier.toFixed(3)}×
                </p>

                {sizeResult.weightKg != null && (

                  <p>
                    <strong>Estimated Crop Weight:</strong>{' '}
                    {sizeResult.weightKg.toFixed(4)} kg
                  </p>

                )}

                <small>
                  Size scaling is calculated from the crop's
                  base and maximum weight.
                </small>

              </>

            ) : (

              <p>
                Crop size information unavailable.
              </p>

            )}


            <hr />


            {/* HARVEST INFORMATION */}

            <h3>🌾 Harvest Information</h3>

            <p>
              <strong>Crops Per Harvest:</strong>{' '}
              {formatHarvestQuantity(crop.cropsPerHarvest)}
            </p>

            <p>
              <strong>Harvest Type:</strong>{' '}
              {crop.harvestType || 'Unknown'}
            </p>

            <p>
              <strong>Harvest Interval:</strong>{' '}
              {crop.harvestInterval != null
                ? typeof crop.harvestInterval === 'number'
                  ? formatTime(crop.harvestInterval)
                  : crop.harvestInterval
                : 'Unknown'}
            </p>

            <p>
              <strong>Growth Time:</strong>{' '}
              {crop.growthTime != null
                ? formatTime(crop.growthTime)
                : 'Unknown'}
            </p>

            <p>
              <strong>Maximum Size Multiplier:</strong>{' '}
              {crop.maxSizeMultiplier != null
                ? String(crop.maxSizeMultiplier) + '×'
                : 'Unknown'}
            </p>


            <hr />


            {/* DATA VERIFICATION */}

            <h3>📋 Data Verification</h3>

            <p>
              <strong>Data Status:</strong>{' '}
              <span className="verification-badge">
                {formatVerification(crop.verification?.status)}
              </span>
            </p>

            <p>
              <strong>Source:</strong>{' '}
              {crop.verification?.source || 'Not recorded'}
            </p>

            <p>
              <strong>Last Verified:</strong>{' '}
              {crop.verification?.lastVerified || 'Unknown'}
            </p>


            {/* DATA ISSUES */}

            {crop.dataIssues?.length > 0 && (

              <>

                <hr />

                <h3>⚠️ Data Notes</h3>

                {crop.dataIssues.map((issue, index) => (

                  <p key={index}>
                    {issue}
                  </p>

                ))}

              </>

            )}


            <hr />


            {/* MUTATION CALCULATION */}

            <h3>✨ Mutation Calculation</h3>

            {mutationResult.valid ? (

              <p>
                <strong>Mutation Multiplier:</strong>{' '}
                {mutationResult.multiplier}×
              </p>

            ) : (

              <>

                <p>⚠️ Invalid mutation combination:</p>

                {mutationResult.errors.map((error, index) => (

                  <p key={index}>
                    {error}
                  </p>

                ))}

              </>

            )}


            {/* INDIVIDUAL MUTATION REFERENCES */}

            {selectedMutations.length > 0 && (

              <>

                <hr />

                <h3>Mutation Reference Values</h3>

                {selectedMutations.map((mutation) => (

                  <p key={mutation}>
                    {mutation}:{' '}
                    {mutationMultipliers[mutation]}×
                  </p>

                ))}

              </>

            )}


            <hr />


            {/* TOTAL HARVEST VALUE */}

<h3>🌸 Total Harvest Value</h3>

{totalHarvestValue ? (

  <>

    <p className="result-value">
      {formatPrice(totalHarvestValue.min)}

      {totalHarvestValue.max !== totalHarvestValue.min
        ? ' – ' + formatPrice(totalHarvestValue.max)
        : ''}

      {' '}Coins
    </p>

    <small>
      Based on {formatHarvestQuantity(harvestQuantity)}
      {' '}crops per harvest.
    </small>

  </>

) : (

  <p className="result-value">
    Awaiting verified harvest quantities
  </p>

)}
          </div>

        )}

      </div>

    </div>

  )

}

export default CropCalculator