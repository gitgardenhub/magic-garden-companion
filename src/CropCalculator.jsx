import { useState } from 'react'
import { crops } from './crops'

// Available mutations
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

// Individual mutation reference multipliers
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

  const crop = crops.find((item) => item.id === selectedCrop)

  // Toggle mutations
  function toggleMutation(mutation) {
    setSelectedMutations((current) =>
      current.includes(mutation)
        ? current.filter((item) => item !== mutation)
        : [...current, mutation]
    )
  }

  // Format prices
  function formatPrice(value) {
    if (value == null || !Number.isFinite(Number(value))) {
      return 'Unknown'
    }

    return Number(value).toLocaleString('en-US')
  }

  // Format growth time stored in seconds
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

  // Format crops produced per harvest
  function formatHarvestQuantity(value) {
    if (value?.min == null) {
      return 'Unknown'
    }

    if (value.max != null && value.max !== value.min) {
      return String(value.min) + '–' + String(value.max)
    }

    return value.min
  }

  // Format verification status
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

  // Sort crops alphabetically
  const sortedCrops = [...crops].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  return (
    <div className="calculator-page">

      {/* PAGE HEADING */}

      <div className="database-heading">
        <p className="eyebrow">MAKE EVERY HARVEST COUNT</p>

        <h1>💰 Crop Value Calculator</h1>

        <p>
          Discover what your crops are worth with different
          sizes and mutations.
        </p>
      </div>

      {/* CALCULATOR CARD */}

      <div className="calculator-card">

        <h2>🌱 Choose Your Crop</h2>

        <label htmlFor="crop-select">Crop</label>

        <select
          id="crop-select"
          value={selectedCrop}
          onChange={(event) => setSelectedCrop(event.target.value)}
        >
          <option value="">Select a crop...</option>

          {sortedCrops.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* CROP SIZE */}

        <label htmlFor="crop-size">Crop Size</label>

        <input
          id="crop-size"
          type="number"
          min="1"
          max="100"
          value={size}
          onChange={(event) => {
            const value = event.target.value

            if (value === '') {
              setSize('')
              return
            }

            setSize(Math.min(100, Math.max(1, Number(value))))
          }}
          onBlur={() => {
            if (size === '' || !Number.isFinite(Number(size))) {
              setSize(50)
            }
          }}
        />

        {/* MUTATION SELECTION */}

        <h2>✨ Crop Mutations</h2>

        <div className="mutation-grid">
          {mutationOptions.map((mutation) => (
            <label key={mutation} className="mutation-option">
              <input
                type="checkbox"
                checked={selectedMutations.includes(mutation)}
                onChange={() => toggleMutation(mutation)}
              />

              {mutation}
            </label>
          ))}
        </div>

        {/* SELECTED MUTATIONS SUMMARY */}

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

            <p>
              <strong>Base Selling Price (Size 50):</strong>{' '}
              {formatPrice(crop.baseSellPrice)}
            </p>

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

            {/* INDIVIDUAL MUTATION REFERENCES */}

            {selectedMutations.length > 0 && (
              <>
                <hr />

                <h3>✨ Mutation Reference Values</h3>

                {selectedMutations.map((mutation) => (
                  <p key={mutation}>
                    {mutation}:{' '}
                    {mutationMultipliers[mutation]}×
                  </p>
                ))}

                <small>
                  These are individual reference multipliers.
                  Combined mutation stacking has not yet been
                  calculated or verified.
                </small>
              </>
            )}

            <hr />

            {/* SELLING PRICE */}

            <h3>✨ Final Selling Price</h3>

            <p className="result-value">
              Awaiting verified mutation calculations
            </p>

            <small>
              Final selling price will be calculated once
              mutation stacking rules and size scaling
              have been verified.
            </small>

            <hr />

            {/* TOTAL HARVEST VALUE */}

            <h3>🌸 Total Harvest Value</h3>

            <p className="result-value">
              Awaiting verified crop data
            </p>

            <small>
              This will calculate the combined value of all
              crops produced in one harvest, including size
              and mutations.
            </small>

          </div>
        )}

      </div>
    </div>
  )
}

export default CropCalculator