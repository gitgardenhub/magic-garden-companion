
import { useState } from 'react'

const petGroups = {
  'Common Egg': [
    {
      name: 'Worm',
      foods: ['Carrot', 'Strawberry', 'Tomato', 'Apple', 'Aloe']
    },
    {
      name: 'Snail',
      foods: ['Tomato', 'Chrysanthemum', 'Daffodil', 'Corn', 'Blueberry']
    },
    {
      name: 'Bee',
      foods: ['Strawberry', 'Lily', 'Chrysanthemum', 'Daffodil', 'Blueberry']
    }
  ],

  'Uncommon Egg': [
    {
      name: 'Chicken',
      foods: ['Aloe', 'Watermelon', 'Pumpkin', 'Corn']
    },
    {
      name: 'Bunny',
      foods: ['Carrot', 'Strawberry', 'Apple', 'Tulip', 'Blueberry']
    },
    {
      name: 'Dragonfly',
      foods: ['Apple', 'Tulip', 'Echeveria']
    }
  ],

  'Rare Egg': [
    {
      name: 'Pig',
      foods: ['Watermelon', 'Mushroom', 'Pumpkin', 'Bamboo', 'Eggplant']
    },
    {
      name: 'Cow',
      foods: ['Coconut', 'Banana', 'Mushroom', "Burro's Tail"]
    },
    {
      name: 'Turkey',
      foods: ['Fava Bean', 'Corn', 'Squash']
    }
  ],

  'Snow / Winter Egg': [
    {
      name: 'Snow Fox',
      foods: ['Echeveria', 'Grape', 'Squash']
    },
    {
      name: 'Stoat',
      foods: ['Cactus', 'Banana', 'Pepper']
    },
    {
      name: 'Caribou',
      foods: ['Camellia', 'Mushroom', "Burro's Tail"]
    }
  ],

  'Legendary Egg': [
    {
      name: 'Squirrel',
      foods: ['Banana', 'Pumpkin', 'Grape']
    },
    {
      name: 'Turtle',
      foods: ['Watermelon', 'Bamboo', "Burro's Tail", 'Pepper']
    },
    {
      name: 'Goat',
      foods: ['Coconut', 'Camellia', 'Pumpkin', 'Pepper', 'Passion Fruit']
    }
  ],

  'Dawn Egg': [
    {
      name: 'Sheep',
      foods: ['Fava Bean', 'Cabbage', 'Clover', 'Four-Leaf Clover']
    },
    {
      name: 'Horse',
      foods: ['Gentian', 'Echeveria', 'Squash']
    },
    {
      name: 'Ostrich',
      foods: ['Peach', 'Violet Cort', 'Date', 'Eggplant']
    }
  ],

  'Horse Egg': [
    {
      name: 'Pony',
      foods: ['Pear', 'Coconut', 'Beet']
    },
    {
      name: 'Horse',
      foods: ['Gentian', 'Echeveria', 'Squash']
    },
    {
      name: 'Fire Horse',
      foods: ['Cacao', 'Poinsettia', 'Dragon Fruit']
    }
  ],

  'Thunder Egg': [
    {
      name: 'Bat',
      foods: ['Delphinium', 'Cabbage', 'Clover']
    },
    {
      name: 'Platypus',
      foods: ['Pear', 'Leek', 'Cattail']
    },
    {
      name: 'Thunder Wolf',
      foods: ['Dragon Fruit', 'Date', 'Prickly Pear']
    }
  ],

  'Spooky Egg': [
    {
      name: 'Snake',
      foods: ['Cactus', 'Prickly Pear', 'Cardoon', 'Foxfire']
    },
    {
      name: 'Moth',
      foods: ['Lily', 'Saffron', 'Lavender', 'Ghost Plant']
    },
    {
      name: 'Toad',
      foods: ['Leek', 'Habanero', 'Persimmon', 'Deadly Nightshade']
    }
  ],

  'Mythical Egg': [
    {
      name: 'Butterfly',
      foods: ['Lily', 'Grape', 'Daffodil', 'Lemon', 'Sunflower']
    },
    {
      name: 'Peacock',
      foods: ['Cactus', 'Sunflower', 'Lychee']
    },
    {
      name: 'Capybara',
      foods: ['Passion Fruit', 'Dragon Fruit', 'Lemon', 'Lychee']
    }
  ],

  'Amber Egg': [
    {
      name: 'Rooster',
      foods: ['Corn', 'Daisy', 'Cardoon', 'Habanero']
    },
    {
      name: 'Red Fox',
      foods: ['Peach', 'Violet Cort', 'Prickly Pear', 'Persimmon']
    },
    {
      name: 'Fire Horse',
      foods: ['Cacao', 'Poinsettia', 'Dragon Fruit']
    },
    {
      name: 'Phoenix',
      foods: ['Cacao', 'Dragon Fruit', 'Saffron', 'Milkcap', 'Marigold']
    }
  ]
}

// Combine pets that can hatch from multiple eggs.
// Each pet appears only once in the dropdown.

const petMap = new Map()

Object.entries(petGroups).forEach(([egg, pets]) => {
  pets.forEach(pet => {
    if (!petMap.has(pet.name)) {
      petMap.set(pet.name, {
        ...pet,
        eggs: [egg]
      })
    } else {
      petMap.get(pet.name).eggs.push(egg)
    }
  })
})

const allPets = Array.from(petMap.values()).sort(
  (a, b) => a.name.localeCompare(b.name)
)

function PetFeedingPlanner() {
  const [petSlots, setPetSlots] = useState([
    { id: 1, pet: '' }
  ])

  const [nextId, setNextId] = useState(2)
  const [availableFoods, setAvailableFoods] = useState([])

  const selectedPets = petSlots
    .filter(slot => slot.pet)
    .map(slot => ({
      ...allPets.find(pet => pet.name === slot.pet),
      id: slot.id
    }))

  // Combine all selected pet diets without duplicate plants.

  const foodMap = {}

  selectedPets.forEach(pet => {
    pet.foods.forEach(food => {
      if (!foodMap[food]) {
        foodMap[food] = []
      }

      foodMap[food].push(pet.name)
    })
  })

  const foodList = Object.keys(foodMap).sort()

  const coveredCount = foodList.filter(
    food => availableFoods.includes(food)
  ).length

  const remainingCount = foodList.length - coveredCount

  function addPet() {
    setPetSlots(previous => [
      ...previous,
      { id: nextId, pet: '' }
    ])

    setNextId(previous => previous + 1)
  }

  function updatePet(id, petName) {
    setPetSlots(previous =>
      previous.map(slot =>
        slot.id === id
          ? { ...slot, pet: petName }
          : slot
      )
    )
  }

  function removePet(id) {
    setPetSlots(previous =>
      previous.filter(slot => slot.id !== id)
    )
  }

  function toggleFood(food) {
    setAvailableFoods(previous =>
      previous.includes(food)
        ? previous.filter(item => item !== food)
        : [...previous, food]
    )
  }

  return (
    <main className="pet-planner-page">

      <section className="pet-planner-heading">
        <p className="eyebrow">A LITTLE HELP FOR YOUR PETS</p>

        <h1>🐾 What Pet Food Do I Need?</h1>

        <p>
          Select all the pets you own and we'll put together
          a combined list of the plants you need to keep growing.
        </p>
      </section>

      <section className="pet-selection-card">

        <h2>🐰 Your Pet Collection</h2>

        <p>
          Add as many pets as you need! You can include
          your entire collection, even pets you rotate
          between different teams.
        </p>

        <div className="pet-slots">

          {petSlots.map((slot, index) => (
            <div className="pet-slot" key={slot.id}>

              <label>
                Pet {index + 1}
              </label>

              <select
                value={slot.pet}
                onChange={e =>
                  updatePet(slot.id, e.target.value)
                }
              >
                <option value="">Choose a pet...</option>

                {allPets.map(pet => (
                  <option
                    value={pet.name}
                    key={pet.name}
                  >
                    {pet.name} — {pet.eggs.join(' / ')}
                  </option>
                ))}

              </select>

              <button
                className="remove-pet-button"
                onClick={() => removePet(slot.id)}
                aria-label={`Remove pet ${index + 1}`}
              >
                ✕
              </button>

            </div>
          ))}

        </div>

        <button
          className="add-pet-button"
          onClick={addPet}
        >
          + Add Another Pet
        </button>

      </section>

      {selectedPets.length > 0 && (

        <>

          <section className="pet-summary">

            <div className="summary-box">
              <span>🐾</span>
              <strong>{selectedPets.length}</strong>
              <p>Pets Selected</p>
            </div>

            <div className="summary-box">
              <span>🌱</span>
              <strong>{foodList.length}</strong>
              <p>Unique Plants Needed</p>
            </div>

            <div className="summary-box">
              <span>✅</span>
              <strong>{coveredCount}</strong>
              <p>Already Growing</p>
            </div>

            <div className="summary-box">
              <span>🌸</span>
              <strong>{remainingCount}</strong>
              <p>Still Needed</p>
            </div>

          </section>

          <section className="pet-food-card">

            <div className="pet-food-heading">
              <h2>🌱 Your Garden Food List</h2>

              <p>
                Check off the plants you already have
                growing or available in your garden.
              </p>
            </div>

            <div className="food-list">

              {foodList.map(food => (
                <label
                  className={`food-item ${
                    availableFoods.includes(food)
                      ? 'food-available'
                      : ''
                  }`}
                  key={food}
                >

                  <input
                    type="checkbox"
                    checked={availableFoods.includes(food)}
                    onChange={() => toggleFood(food)}
                  />

                  <div className="food-info">
                    <strong>{food}</strong>

                    <small>
                      Needed by: {foodMap[food].join(', ')}
                    </small>
                  </div>

                  <span className="food-status">
                    {availableFoods.includes(food)
                      ? 'Growing ✓'
                      : 'Need to grow'}
                  </span>

                </label>
              ))}

            </div>

          </section>

        </>

      )}

      {selectedPets.length === 0 && (
        <div className="pet-empty-state">
          <span>🌷</span>
          <h2>Your garden is waiting!</h2>
          <p>
            Choose your pets above to see which plants
            you'll need to keep them fed.
          </p>
        </div>
      )}

    </main>
  )
}

export default PetFeedingPlanner

