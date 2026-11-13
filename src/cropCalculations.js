// ==========================================
// MAGIC GARDEN - CROP CALCULATION ENGINE
// ==========================================


// MUTATION MULTIPLIERS

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


// MUTATION CATEGORIES

const weatherMutations = [
  'Wet',
  'Chilled',
  'Frozen',
  'Thunderstruck',
  'Thundercharged',
]

const lunarMutations = [
  'Dawnlit',
  'Dawnbound',
  'Amberlit',
  'Amberbound',
]

const colorMutations = [
  'Gold',
  'Rainbow',
]


// ==========================================
// CALCULATE MUTATION MULTIPLIER
// ==========================================

export function calculateMutationMultiplier(selectedMutations = []) {

  const selected = Array.from(new Set(selectedMutations))

  const errors = []

  const unknownMutations = selected.filter(
    mutation => mutationMultipliers[mutation] == null
  )

  if (unknownMutations.length > 0) {
    errors.push(
      'Unknown mutation: ' + unknownMutations.join(', ')
    )
  }

  const weather = selected.filter(
    mutation => weatherMutations.includes(mutation)
  )

  const lunar = selected.filter(
    mutation => lunarMutations.includes(mutation)
  )

  const color = selected.filter(
    mutation => colorMutations.includes(mutation)
  )


  // VALIDATE COMBINATIONS

  if (weather.length > 1) {
    errors.push('Only one weather condition is allowed.')
  }

  if (lunar.length > 1) {
    errors.push('Only one Dawn or Amber condition is allowed.')
  }

  if (color.length > 1) {
    errors.push('Gold and Rainbow cannot be combined.')
  }


  if (errors.length > 0) {
    return {
      valid: false,
      multiplier: null,
      errors: errors,
    }
  }


  // WEATHER MULTIPLIER

  const weatherMultiplier = weather.length > 0
    ? mutationMultipliers[weather[0]]
    : 1


  // LUNAR MULTIPLIER

  const lunarMultiplier = lunar.length > 0
    ? mutationMultipliers[lunar[0]]
    : 1


  // COLOR MULTIPLIER

  const colorMultiplier = color.length > 0
    ? mutationMultipliers[color[0]]
    : 1


  // COMBINE MULTIPLIERS

  const conditionMultiplier =
    weatherMultiplier + lunarMultiplier - 1

  const finalMultiplier =
    conditionMultiplier * colorMultiplier


  return {
    valid: true,
    multiplier: finalMultiplier,
    weatherMultiplier: weatherMultiplier,
    lunarMultiplier: lunarMultiplier,
    colorMultiplier: colorMultiplier,
    errors: [],
  }
}


// ==========================================
// CALCULATE CROP SIZE MULTIPLIER
// ==========================================

export function calculateSizeMultiplier(crop, size) {

  const cropSize = Number(size)

  if (
    !crop ||
    !Number.isFinite(cropSize) ||
    cropSize < 50 ||
    cropSize > 100
  ) {
    return {
      valid: false,
      multiplier: null,
      errors: ['Crop size must be between 50 and 100.'],
    }
  }


  const baseWeight = Number(crop.baseWeightKg)
  const maxWeight = Number(crop.maxWeightKg)


  // USE VERIFIED WEIGHT DATA WHEN AVAILABLE

  if (
    Number.isFinite(baseWeight) &&
    Number.isFinite(maxWeight) &&
    baseWeight > 0 &&
    maxWeight >= baseWeight
  ) {

    const sizeProgress = (cropSize - 50) / 50

    const currentWeight =
      baseWeight +
      ((maxWeight - baseWeight) * sizeProgress)

    const multiplier = currentWeight / baseWeight

    return {
      valid: true,
      multiplier: multiplier,
      weightKg: currentWeight,
      baseWeightKg: baseWeight,
      maxWeightKg: maxWeight,
      method: 'weight data',
      errors: [],
    }
  }


  // FALLBACK TO MAXIMUM SIZE MULTIPLIER

  const maxMultiplier = Number(crop.maxSizeMultiplier)

  if (
    Number.isFinite(maxMultiplier) &&
    maxMultiplier >= 1
  ) {

    const sizeProgress = (cropSize - 50) / 50

    const multiplier =
      1 + ((maxMultiplier - 1) * sizeProgress)

    return {
      valid: true,
      multiplier: multiplier,
      method: 'maximum size multiplier',
      errors: [],
    }
  }


  return {
    valid: false,
    multiplier: null,
    errors: ['Crop size data is unavailable.'],
  }
}


// ==========================================
// CALCULATE FINAL CROP SELLING PRICE
// ==========================================

export function calculateCropPrice(
  crop,
  size,
  selectedMutations = []
) {

  if (!crop || crop.baseSellPrice == null) {
    return {
      valid: false,
      price: null,
      errors: ['Crop selling price is unavailable.'],
    }
  }


  const sizeResult = calculateSizeMultiplier(crop, size)

  const mutationResult =
    calculateMutationMultiplier(selectedMutations)


  if (!sizeResult.valid || !mutationResult.valid) {
    return {
      valid: false,
      price: null,
      sizeResult: sizeResult,
      mutationResult: mutationResult,
      errors: [
        ...sizeResult.errors,
        ...mutationResult.errors,
      ],
    }
  }


  const basePrice = Number(crop.baseSellPrice)

  const finalPrice =
    basePrice *
    sizeResult.multiplier *
    mutationResult.multiplier


  return {
    valid: true,

    basePrice: basePrice,

    sizeMultiplier: sizeResult.multiplier,

    mutationMultiplier: mutationResult.multiplier,

    price: finalPrice,

    sizeResult: sizeResult,

    mutationResult: mutationResult,

    errors: [],
  }
}