import { useState } from 'react'
import './PetAbilities.css'

const abilityData = [
  {
    name: 'Amber Capture',
    description: 'Removes Amber mutations from nearby crops and converts them into Amber Capsules.',
    pets: [
      { name: 'Phoenix', details: 'Charge time: 300 seconds ÷ STR. Amberlit = 1 capsule; Amberbound = 2.' }
    ]
  },
  {
    name: 'Coin Finder',
    description: 'Finds coins in your garden. Some pets can only find coins during certain weather or events.',
    pets: [
      { name: 'Snail', details: '35% × STR chance per minute. Finds 1–120,000 × STR coins.' },
      { name: 'Bunny', details: '13% × STR chance per minute. Finds 1–1,200,000 × STR coins.' },
      { name: 'Pony', details: '13% × STR chance per minute. Finds 1–1,200,000 × STR coins.' },
      { name: 'Squirrel', details: '6% × STR chance per minute. Finds 1–10,000,000 × STR coins.' },
      { name: 'Red Fox', details: '3% × STR chance per minute. Finds 1–40,000,000 × STR coins.' },
      { name: 'Sheep', details: 'During Dawn: 45% × STR chance per minute. Finds 1–6,000,000 × STR coins.' },
      { name: 'Snow Fox', details: 'During Snow: 15% × STR chance per minute. Finds 1–5,000,000 × STR coins.' },
      { name: 'Bat', details: 'During Thunderstorms: 35% × STR chance per minute. Finds 1–5,500,000 × STR coins.' }
    ]
  },
  {
    name: 'Crop Eater',
    description: 'Automatically harvests and sells non-mutated crops.',
    pets: [
      { name: 'Worm', details: '60% × STR chance per minute. Sell price bonus: 150% × STR.' }
    ]
  },
  {
    name: 'Crop Refund',
    description: 'Gives you a chance to get crops back when selling them.',
    pets: [
      { name: 'Capybara', details: '20% × STR probability.' }
    ]
  },
  {
    name: 'Crop Size Boost',
    description: 'Can increase the size of crops growing in your garden.',
    pets: [
      { name: 'Bee', details: '+4 crop size. 0.3% × STR chance per minute.' },
      { name: 'Butterfly', details: '+7 crop size. 0.4% × STR chance per minute.' },
      { name: 'Ostrich', details: '+7 crop size. 0.4% × STR chance per minute.' },
      { name: 'Caribou', details: 'During Snow: +8 crop size. 0.8% × STR chance per minute.' }
    ]
  },
  {
    name: 'Dawn Capture',
    description: 'Removes Dawn mutations from nearby crops and converts them into Dawn Capsules.',
    pets: [
      { name: 'Ostrich', details: 'Charge time: 300 seconds ÷ STR. Dawnlit = 1 capsule; Dawnbound = 2.' }
    ]
  },
  {
    name: 'Double Harvest',
    description: 'Gives you a chance to harvest an additional crop.',
    pets: [
      { name: 'Capybara', details: '5% × STR probability.' }
    ]
  },
  {
    name: 'Double Hatch',
    description: 'Gives you a chance to hatch an extra pet as a fraternal sibling.',
    pets: [
      { name: 'Turkey', details: '3% × STR probability.' },
      { name: 'Rooster', details: '5% × STR probability.' }
    ]
  },
  {
    name: 'Dust Boost',
    description: 'Gives bonus Magic Dust when selling a pet.',
    pets: [
      { name: 'Phoenix', details: '10% × STR probability. Magic Dust bonus: 20% × STR.' }
    ]
  },
  {
    name: 'Egg Growth Boost',
    description: 'Reduces the remaining hatch time of eggs in your garden.',
    pets: [
      { name: 'Rooster', details: 'During Amber Moon: 90% × STR chance per minute. Reduces hatch time by 16 minutes × STR.' },
      { name: 'Chicken', details: '21% × STR chance per minute. Reduces hatch time by 7 minutes × STR.' },
      { name: 'Turkey', details: '24% × STR chance per minute. Reduces hatch time by 9 minutes × STR.' },
      { name: 'Toad', details: '27% × STR chance per minute. Reduces hatch time by 11 minutes × STR.' },
      { name: 'Turtle', details: '27% × STR chance per minute. Reduces hatch time by 11 minutes × STR.' },
      { name: 'Platypus', details: 'During Thunderstorms: 50% × STR chance per minute. Reduces hatch time by 10 minutes × STR.' }
    ]
  },

  // GRANter abilities are separated by mutation type.

  {
    name: 'Amber Granter',
    description: 'Gives nearby crops a chance to receive the Amberlit mutation.',
    pets: [
      { name: 'Fire Horse', details: '2% × STR chance per minute.' },
      { name: 'Phoenix', details: '2% × STR chance per minute.' },
      { name: 'Toad', details: '2% × STR chance per minute.' }
    ]
  },
  {
    name: 'Dawn Granter',
    description: 'Gives nearby crops a chance to receive the Dawnlit mutation.',
    pets: [
      { name: 'Horse', details: '4% × STR chance per minute.' },
      { name: 'Sheep', details: '4% × STR chance per minute.' },
      { name: 'Toad', details: '4% × STR chance per minute.' }
    ]
  },
  {
    name: 'Frozen Granter',
    description: 'Gives nearby crops a chance to receive the Frozen mutation.',
    pets: [
      { name: 'Caribou', details: '6% × STR chance per minute.' },
      { name: 'Moth', details: '6% × STR chance per minute.' }
    ]
  },
  {
    name: 'Gold Granter',
    description: 'Gives nearby crops a chance to receive the Gold mutation. This ability can belong to any Gold-mutated pet.',
    pets: [
      { name: 'Gold-mutated pet', details: '0.72% × STR chance per minute.' }
    ]
  },
  {
    name: 'Wet Granter',
    description: 'Gives nearby crops a chance to receive the Wet mutation.',
    pets: [
      { name: 'Turkey', details: '10% × STR chance per minute.' }
    ]
  },
  {
    name: 'Rainbow Granter',
    description: 'Gives nearby crops a chance to receive the Rainbow mutation. This ability can belong to any Rainbow-mutated pet.',
    pets: [
      { name: 'Rainbow-mutated pet', details: '0.72% × STR chance per minute.' }
    ]
  },
  {
    name: 'Chilled Granter',
    description: 'Gives nearby crops a chance to receive the Chilled mutation.',
    pets: [
      { name: 'Snow Fox', details: '8% × STR chance per minute.' },
      { name: 'Stoat', details: '8% × STR chance per minute.' }
    ]
  },
  {
    name: 'Thunderstruck Granter',
    description: 'Gives nearby crops a chance to receive the Thunderstruck mutation.',
    pets: [
      { name: 'Bat', details: '5% × STR chance per minute.' },
      { name: 'Platypus', details: '5% × STR chance per minute.' },
      { name: 'Snake', details: '5% × STR chance per minute.' },
      { name: 'Thunder Wolf', details: '5% × STR chance per minute.' }
    ]
  },
  {
    name: 'Hatch XP Boost',
    description: 'Gives newly hatched pets bonus experience points (XP).',
    pets: [
      { name: 'Pig', details: '50% × STR probability. Bonus: 8,000 × STR XP.' },
      { name: 'Goat', details: '60% × STR probability. Bonus: 12,000 × STR XP.' },
      { name: 'Horse', details: '60% × STR probability. Bonus: 12,000 × STR XP.' },
      { name: 'Rooster', details: '70% × STR probability. Bonus: 16,000 × STR XP.' }
    ]
  },
  {
    name: 'Hunger Boost',
    description: 'Slows how quickly active pets use their hunger, meaning they need feeding less often.',
    pets: [
      { name: 'Cow', details: 'Reduces hunger depletion by 12% × STR.' },
      { name: 'Turtle', details: 'Reduces hunger depletion by 16% × STR.' },
      { name: 'Toad', details: 'Reduces hunger depletion by 20% × STR.' },
      { name: 'Stoat', details: 'During Snow: reduces hunger depletion by 30% × STR.' }
    ]
  },
  {
    name: 'Hunger Restore',
    description: 'Has a chance to restore hunger to an active pet.',
    pets: [
      { name: 'Dragonfly', details: '12% × STR chance per minute. Restores 30% × STR hunger.' },
      { name: 'Pony', details: '14% × STR chance per minute. Restores 35% × STR hunger.' },
      { name: 'Turtle', details: '14% × STR chance per minute. Restores 35% × STR hunger.' },
      { name: 'Red Fox', details: '16% × STR chance per minute. Restores 40% × STR hunger.' },
      { name: 'Snake', details: '16% × STR chance per minute. Restores 40% × STR hunger.' }
    ]
  },
  {
    name: 'Max Strength Boost',
    description: 'Can increase the maximum strength a newly hatched pet can reach.',
    pets: [
      { name: 'Pig', details: '12% × STR probability. Maximum strength increase: 2.4% × STR.' },
      { name: 'Fire Horse', details: '14% × STR probability. Maximum strength increase: 3.5% × STR.' },
      { name: 'Goat', details: '14% × STR probability. Maximum strength increase: 3.5% × STR.' },
      { name: 'Thunder Wolf', details: '14% × STR probability. Maximum strength increase: 3.5% × STR.' }
    ]
  },
  {
    name: 'Pet Mutation Boost',
    description: 'Increases the chance that newly hatched pets will have mutations.',
    pets: [
      { name: 'Dragonfly', details: 'Increases mutation chance by 7% × STR.' },
      { name: 'Platypus', details: 'Increases mutation chance by 10% × STR.' },
      { name: 'Squirrel', details: 'Increases mutation chance by 10% × STR.' },
      { name: 'Rooster', details: 'Increases mutation chance by 13% × STR.' }
    ]
  },
  {
    name: 'Pet Refund',
    description: 'Gives you a chance to receive a pet back as an egg when selling it.',
    pets: [
      { name: 'Chicken', details: '5% × STR probability.' },
      { name: 'Peacock', details: '7% × STR probability.' }
    ]
  },
  {
    name: 'Plant Growth Boost',
    description: 'Reduces the remaining growth time of plants in your garden.',
    pets: [
      { name: 'Fire Horse', details: 'During Amber Moon: 80% × STR chance per minute. Reduces growth time by 6 minutes × STR.' },
      { name: 'Horse', details: 'During Dawn: 60% × STR chance per minute. Reduces growth time by 6 minutes × STR.' },
      { name: 'Cow', details: '24% × STR chance per minute. Reduces growth time by 3 minutes × STR.' },
      { name: 'Turtle', details: '27% × STR chance per minute. Reduces growth time by 5 minutes × STR.' },
      { name: 'Moth', details: '30% × STR chance per minute. Reduces growth time by 7 minutes × STR.' },
      { name: 'Caribou', details: 'During Snow: 40% × STR chance per minute. Reduces growth time by 6 minutes × STR.' },
      { name: 'Thunder Wolf', details: 'During Thunderstorms: 50% × STR chance per minute. Reduces growth time by 6 minutes × STR.' }
    ]
  },
  {
    name: 'Rebirth',
    description: 'Can completely refill the hunger of a starving pet.',
    pets: [
      { name: 'Phoenix', details: '20% × STR chance per minute.' }
    ]
  },
  {
    name: 'Seed Finder',
    description: 'Finds seeds for your garden. Different pets can find different seed rarities.',
    pets: [
      { name: 'Worm', details: '40% × STR chance per minute. Finds Common and Uncommon seeds.' },
      { name: 'Bat', details: '20% × STR chance per minute. Finds Rare and Legendary seeds.' },
      { name: 'Cow', details: '20% × STR chance per minute. Finds Rare and Legendary seeds.' },
      { name: 'Pony', details: '20% × STR chance per minute. Finds Rare and Legendary seeds.' },
      { name: 'Butterfly', details: '10% × STR chance per minute. Finds Mythical seeds.' },
      { name: 'Red Fox', details: '10% × STR chance per minute. Finds Mythical seeds.' },
      { name: 'Phoenix', details: '0.72% × STR chance per minute. Finds one Divine seed.' }
    ]
  },
  {
    name: 'Sell Boost',
    description: 'Gives you a chance to receive extra coins when selling crops.',
    pets: [
      { name: 'Bunny', details: '10% × STR probability. Sell price bonus: 20% × STR.' },
      { name: 'Pig', details: '12% × STR probability. Sell price bonus: 30% × STR.' },
      { name: 'Pony', details: '14% × STR probability. Sell price bonus: 40% × STR.' },
      { name: 'Squirrel', details: '14% × STR probability. Sell price bonus: 40% × STR.' },
      { name: 'Peacock', details: '16% × STR probability. Sell price bonus: 50% × STR.' }
    ]
  },
  {
    name: 'Thundercharger',
    description: 'Changes the Thunderstruck mutation on nearby crops into the Thundercharged mutation.',
    pets: [
      { name: 'Thunder Wolf', details: 'Charge time: 300 seconds ÷ STR.' }
    ]
  },
  {
    name: 'Weather Mutation Boost',
    description: 'Increases the chance of nearby crops receiving weather-related mutations.',
    pets: [
      { name: 'Fire Horse', details: 'During Amber Moon: increases Amberlit mutation chance by 40% × STR.' },
      { name: 'Horse', details: 'During Dawn: increases Dawnlit mutation chance by 36% × STR.' },
      { name: 'Sheep', details: 'Increases the chance of Dawnbinder activating by 40% × STR.' },
      { name: 'Stoat', details: 'During Snow: increases Chilled mutation chance by 32% × STR.' },
      { name: 'Bat', details: 'During Thunderstorms: increases Thunderstruck mutation chance by 34% × STR.' },
      { name: 'Bee', details: 'Increases weather mutation chance by 15% × STR.' },
      { name: 'Butterfly', details: 'Increases weather mutation chance by 20% × STR.' },
      { name: 'Snake', details: 'Increases weather mutation chance by 20% × STR.' }
    ]
  },
  {
    name: 'XP Boost',
    description: 'Gives experience points (XP) to your active pets.',
    pets: [
      { name: 'Red Fox', details: 'During Amber Moon: 90% × STR chance per minute. Gives 1,400 × STR XP.' },
      { name: 'Ostrich', details: 'During Dawn: 75% × STR chance per minute. Gives 850 × STR XP.' },
      { name: 'Snow Fox', details: 'During Snow: 50% × STR chance per minute. Gives 450 × STR XP.' },
      { name: 'Platypus', details: 'During Thunderstorms: 65% × STR chance per minute. Gives 650 × STR XP.' },
      { name: 'Goat', details: '30% × STR chance per minute. Gives 300 × STR XP.' },
      { name: 'Moth', details: '35% × STR chance per minute. Gives 400 × STR XP.' },
      { name: 'Peacock', details: '35% × STR chance per minute. Gives 400 × STR XP.' }
    ]
  }
]

// Create a unique list of pets for the pet dropdown.
// Gold and Rainbow are mutation-based abilities, not individual species.
const allPets = [
  ...new Set(
    abilityData.flatMap(ability =>
      ability.pets
        .filter(pet =>
          pet.name !== 'Gold-mutated pet' &&
          pet.name !== 'Rainbow-mutated pet'
        )
        .map(pet => pet.name)
    )
  )
].sort()

function PetAbilities() {
  const [selectedPet, setSelectedPet] = useState('')
  const [selectedAbility, setSelectedAbility] = useState('')

  const petAbilities = abilityData.filter(ability =>
    ability.pets.some(pet => pet.name === selectedPet)
  )

  const selectedAbilityData = abilityData.find(
    ability => ability.name === selectedAbility
  )

  return (
    <main className="pet-abilities-page">
      <h1>✨ Pet Abilities</h1>
      <p>Discover the possible abilities your garden companions can have!</p>

      <section>
        <h2>🐾 Browse by Pet</h2>

        <select
          value={selectedPet}
          onChange={event => setSelectedPet(event.target.value)}
        >
          <option value="">Choose a pet...</option>
          {allPets.map(pet => (
            <option key={pet} value={pet}>{pet}</option>
          ))}
        </select>

        {selectedPet && (
          <div>
            <h3>✨ {selectedPet}'s Possible Abilities</h3>

            {petAbilities.length > 0 ? (
              petAbilities.map(ability => {
                const petInfo = ability.pets.find(
                  pet => pet.name === selectedPet
                )

                return (
                  <article key={ability.name}>
                    <h4>{ability.name}</h4>
                    <p>{ability.description}</p>
                    <p>{petInfo.details}</p>
                  </article>
                )
              })
            ) : (
              <p>No abilities are listed for this pet.</p>
            )}
          </div>
        )}
      </section>

      <hr />

      <section>
        <h2>🌟 Browse by Ability</h2>

        <select
          value={selectedAbility}
          onChange={event => setSelectedAbility(event.target.value)}
        >
          <option value="">Choose an ability...</option>

          {abilityData.map(ability => (
            <option key={ability.name} value={ability.name}>
              {ability.name}
            </option>
          ))}
        </select>

        {selectedAbilityData && (
          <div>
            <h3>{selectedAbilityData.name}</h3>
            <p>{selectedAbilityData.description}</p>

            {selectedAbilityData.pets.map((pet, index) => (
              <article key={`${pet.name}-${index}`}>
                <h4>🐾 {pet.name}</h4>
                <p>{pet.details}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default PetAbilities