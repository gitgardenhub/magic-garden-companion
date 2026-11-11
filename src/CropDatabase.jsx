import { useState } from 'react'
import { crops } from './crops'
function formatPrice(value) {
  if (value == null) return 'Unknown'
  return value.toLocaleString('en-US')
}
function CropDatabase() {
  const [search, setSearch] = useState('')
const [harvestFilter, setHarvestFilter] = useState('all')
const [sortBy, setSortBy] = useState('name')

const filteredCrops = crops
  .filter((crop) =>
    crop.name.toLowerCase().includes(search.toLowerCase())
  )
  .filter((crop) =>
    harvestFilter === 'all' || crop.harvestType === harvestFilter
  )
  .sort((a, b) => {
    if (sortBy === 'seedLow') {
      return (a.seedPrice ?? Infinity) - (b.seedPrice ?? Infinity)
    }

    if (sortBy === 'sellHigh') {
      return (b.baseSellPrice ?? -Infinity) - (a.baseSellPrice ?? -Infinity)
    }

    return a.name.localeCompare(b.name)
  })

  return (
    <div className="database-page">

      <div className="database-heading">
        <p className="eyebrow">EXPLORE YOUR GARDEN</p>
        <h1>🌱 Crop Database</h1>
        <p>
          Everything you need to know about the plants
          growing in Magic Garden.
        </p>
      </div>

      <div className="database-controls">
  <div className="database-search">
    <input
      type="text"
      placeholder="🔍 Search for a crop..."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  </div>

  <select
    value={harvestFilter}
    onChange={(event) => setHarvestFilter(event.target.value)}
  >
    <option value="all">All Harvest Types</option>
    <option value="Single">Single Harvest</option>
    <option value="Multiple">Multiple Harvest</option>
  </select>

  <select
    value={sortBy}
    onChange={(event) => setSortBy(event.target.value)}
  >
    <option value="name">Sort: A–Z</option>
    <option value="seedLow">Seed Price: Low to High</option>
    <option value="sellHigh">Sell Price: High to Low</option>
  </select>
</div>

      <div className="database-count">
        {filteredCrops.length} crops found
      </div>

      <div className="crop-grid">
        {filteredCrops.length > 0 ? (
          filteredCrops.map((crop) => (
            <div className="crop-card" key={crop.id}>
              <div className="crop-card-top">
                <h3>{crop.name}</h3>
                <span className={`status ${crop.verification.status}`}>
                  {crop.verification.status}
                </span>
              </div>

              <div className="crop-details">
                <p>
                  <span>Seed Price</span>
                  <strong>{formatPrice(crop.seedPrice)}</strong>
                </p>

                <p>
                  <span>Base Sell Price</span>
                  <strong>{formatPrice(crop.baseSellPrice)}</strong>
                </p>

                <p>
                  <span>Crops Per Harvest</span>
                  <strong>
                    {crop.cropsPerHarvest.min ?? 'Unknown'}
                  </strong>
                </p>

                <p>
                  <span>Harvest Interval</span>
                  <strong>
                    {crop.harvestInterval ?? 'Unknown'}
                  </strong>
                </p><p>
  <span>Harvest Type</span>
  <strong>{crop.harvestType ?? 'Unknown'}</strong>
</p>
<p>
  <span>Max Size Multiplier</span>
  <strong>
    {crop.maxSizeMultiplier ? `${crop.maxSizeMultiplier}x` : 'Unknown'}
  </strong>
</p>
<p>
  <span>Seed Source</span>
  <strong>{crop.seedSource ?? 'Unknown'}</strong>
</p>
{crop.notes && (
  <p>
    <span>Notes</span>
    <strong>{crop.notes}</strong>
  </p>
)}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <span>🌷</span>
            <h3>No crops found</h3>
            <p>Try another search, or check back as our garden grows!</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default CropDatabase