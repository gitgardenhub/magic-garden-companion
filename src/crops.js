// Magic Garden crop database
// Wiki research checked 2026-11-11.
// Times are seconds. Unknown/unlisted values remain null.

const source = "Magic Garden Wiki — Crops, Seed Shop, Multipliers (accessed 2026-11-11)";

const rawCrops = [
  ["carrot", "Carrot", 10, 20, 3, "Single", "Seed Shop"],
  ["cabbage", "Cabbage", 30, 42, 3, "Multiple", "Seed Shop"],
  ["strawberry", "Strawberry", 50, 14, 2, "Multiple", "Seed Shop"],
  ["aloe", "Aloe", 135, 310, 2.5, "Single", "Seed Shop"],
  ["beet", "Beet", 210, 350, 3, "Single", "Seed Shop"],
  ["clover", "Clover", 170, 30, 3, "Patch", "Rain Shop / historic"],
  ["four-leaf-clover", "Four-Leaf Clover", 170, 7777, 3, "Patch", "Rare crop from Clover seed", "Variant; shared seed cost"],
  ["rose", "Rose", 229, 300, 4, "Single", "Historic / pet seed finder"],
  ["delphinium", "Delphinium", 300, 530, 3, "Single", "Rain Shop"],
  ["snowdrop", "Snowdrop", 300, 250, 1.85, "Patch", "Snow Shop"],
  ["double-snowdrop", "Double Snowdrop", 300, 8888, 1.85, "Patch", "Rare crop from Snowdrop seed", "Variant; shared seed cost"],
  ["fava-bean", "Fava Bean", 250, 30, 3, "Multiple", "Seed Shop"],
  ["blueberry", "Blueberry", 400, 23, 2, "Multiple", "Seed Shop"],
  ["apple", "Apple", 500, 800, 2, "Multiple", "Seed Shop"],
  ["tulip", "Tulip", 600, 767, 3, "Single", "Seed Shop"],
  ["tomato", "Tomato", 800, 27, 2, "Multiple", "Seed Shop"],
  ["daisy", "Daisy", 100, 130, 2.5, "Patch", "Dawn Shop"],
  ["purple-daisy", "Purple Daisy", 100, 9999, 2.5, "Patch", "Rare crop from Daisy seed", "Variant; shared seed cost"],
  ["daffodil", "Daffodil", 1000, 1090, 3, "Single", "Seed Shop"],
  ["corn", "Corn", 1300, 36, 2, "Multiple", "Seed Shop"],
  ["watermelon", "Watermelon", 2500, 2708, 3, "Single", "Seed Shop"],
  ["pumpkin", "Pumpkin", 3000, 3700, 3, "Single", "Seed Shop"],
  ["echeveria", "Echeveria", 2500, 3200, 2.75, "Single", "Seed Shop"],
  ["cattail", "Cattail", 4000, 1800, 2.5, "Patch", "Thunder Shop"],
  ["variegated-cattail", "Variegated Cattail", 4000, 11111, 2.5, "Patch", "Rare crop from Cattail seed", "Variant; shared seed cost"],
  ["pear", "Pear", 6000, 3000, 2, "Multiple", "Seed Shop"],
  ["gentian", "Gentian", 9000, 10000, 3, "Single", "Seed Shop"],
  ["lavender", "Lavender", 10000, 20000, 3, "Single", "Dawn Shop"],
  ["coconut", "Coconut", 10000, 12000, 3, "Multiple", "Seed Shop"],
  ["pine-tree", "Pine Tree", 12000, 75000, 3.5, "Single", "Snow Shop"],
  ["banana", "Banana", 15000, 1750, 1.7, "Multiple", "Seed Shop (server ID restriction)"],
  ["leek", "Leek", 15000, 35000, 3, "Single", "Snow Shop"],
  ["lily", "Lily", 20000, 20123, 2.75, "Single", "Seed Shop"],
  ["ghost-plant", "Ghost Plant", 25000, 100000, 2.75, "Single", "Seed Shop"],
  ["camellia", "Camellia", 55000, 4875, 2.5, "Multiple", "Seed Shop"],
  ["squash", "Squash", 55000, 7000, 2.5, "Multiple", "Snow Shop"],
  ["peach", "Peach", 85000, 9000, 3, "Multiple", "Seed Shop"],
  ["burros-tail", "Burro's Tail", 93000, 6000, 2.5, "Multiple", "Seed Shop"],
  ["cardoon", "Cardoon", 30000, 50000, 3, "Single", "Thunder Shop"],
  ["saffron", "Saffron", 30000, 50000, 3, "Single", "Dawn Shop"],
  ["mushroom", "Mushroom", 150000, 160000, 3.5, "Single", "Rain Shop"],
  ["persimmon", "Persimmon", 120000, 25000, 2.5, "Multiple", "Amber Shop"],
  ["cactus", "Cactus", 200000, 220000, 1.8, "Single", "Seed Shop"],
  ["bamboo", "Bamboo", 400000, 500000, 2, "Single", "Seed Shop"],
  ["violet-cort", "Violet Cort", 520000, 600000, 3.5, "Single", "Rain Shop"],
  ["chrysanthemum", "Chrysanthemum", 670000, 18000, 2.75, "Multiple", "Seed Shop"],
  ["date", "Date", 750000, 15000, 2, "Multiple", "Historic / pet seed finder"],
  ["habanero", "Habanero", 750000, 15000, 2.5, "Multiple", "Amber Shop"],
  ["grape", "Grape", 850000, 50000, 2, "Multiple", "Seed Shop (server ID restriction)"],
  ["poinsettia", "Poinsettia", 900000, 20000, 2, "Multiple", "Snow Shop"],
  ["eggplant", "Eggplant", 500000, 100000, 2.5, "Multiple", "Dawn Shop"],
  ["prickly-pear", "Prickly Pear", 700000, 75000, 2.5, "Multiple", "Thunder Shop"],
  ["foxfire", "Foxfire", 400000, 100000, 2.5, "Patch", "Seed Shop / special stock"],
  ["witchfire", "Witchfire", 400000, 2500000, 2.5, "Patch", "Rare crop from Foxfire seed", "Variant; shared seed cost"],
  ["passion-fruit", "Passion Fruit", 2750000, 200000, 2, "Multiple", "Seed Shop"],
  ["pepper", "Pepper", 1000000, 7000, 2, "Multiple", "Seed Shop"],
  ["dragon-fruit", "Dragon Fruit", 5000000, 30000, 2, "Multiple", "Seed Shop"],
  ["cacao", "Cacao", 10000000, 150000, 2.5, "Multiple", "Seed Shop"],
  ["lemon", "Lemon", 2000000, 50000, 3, "Multiple", "Seed Shop (server ID restriction)"],
  ["milkcap", "Milkcap", 1000000, 3000000, 3, "Single", "Thunder Shop"],
  ["ube", "Ube", 1000000, 2000000, 3, "Single", "Dawn Shop"],
  ["deadly-nightshade", "Deadly Nightshade", 5000000, 250000, 2.5, "Multiple", "Seed Shop / pet seed finder"],
  ["sunflower", "Sunflower", 100000000, 750000, 2.5, "Multiple", "Seed Shop"],
  ["marigold", "Marigold", 250000000, 1000000, 2.5, "Multiple", "Amber Shop"],
  ["lychee", "Lychee", 25000000, 50000, 2, "Multiple", "Seed Shop (server ID restriction)"],
  ["thunderpeel", "Thunderpeel", 3000000000, 100000, 2, "Multiple", "Thunder Shop"],
  ["stormcap", "Stormcap", null, 1000000, 2, "Multiple", "Weather / special crop", "Seed price not listed"],
  ["dawnbreaker", "Dawnbreaker", 10000000, 12000000, 3, "Single", "Dawn Shop"],
  ["emberbloom", "Emberbloom", 25000000, 5000000, 2.5, "Patch", "Amber Shop"],
  ["embercrown", "Embercrown", 25000000, 15000000, 2.5, "Patch", "Rare crop from Emberbloom seed", "Variant; shared seed cost"],
  ["starweaver", "Starweaver", 1000000000, 10000000, 2, "Multiple", "Seed Shop"],
  ["dawnbinder", "Dawnbinder", 10000000000, 11000000, 2.5, "Multiple", "Dawn Shop"],
  ["moonbinder", "Moonbinder", 50000000000, 11000000, 2, "Multiple", "Amber Shop"],
];

// Each tuple:
// [baseWeightKg, maxWeightKg, cropGrowTimeSec, plantMatureTimeSec,
//  slots, creditPrice, stockChancePercent, stockSizeRange].
//
// For slots, an array means [minimum, normal maximum, maximum with boost].

const details = {
  carrot: [0.1,0.3,4,null,1,7,100,[6,25]],
  cabbage: [1,3,52.5,45,1,12,100,[2,3]],
  strawberry: [0.05,0.1,15,70,5,16,100,[1,6]],
  aloe: [1.5,3.75,45,null,1,18,100,[3,10]],
  beet: [0.3,0.9,60,null,1,25,100,[3,10]],
  clover: [0.01,0.03,360,null,[7,11,15],26,null,null],
  "four-leaf-clover": [0.01,0.03,360,null,[7,11,15],26,null,null],
  rose: [0.01,0.04,300,null,1,27,null,null],
  delphinium: [0.02,0.06,25,null,1,30,null,null],
  snowdrop: [0.01,0.0185,150,null,[4,6,12],40,null,null],
  "double-snowdrop": [0.01,0.0185,150,null,[4,6,12],40,null,null],
  "fava-bean": [0.03,0.09,360,900,8,30,75,[2,5]],
  blueberry: [0.01,0.02,33,105,5,49,75,[1,5]],
  apple: [0.18,0.36,1800,79200,7,67,50,[1,2]],
  tulip: [0.01,0.03,8,null,1,40,34,[6,25]],
  tomato: [0.3,0.6,60,1100,2,79,75,[1,3]],
  daisy: [0.01,0.025,90,null,[2,3,9],17,null,null],
  "purple-daisy": [0.01,0.025,90,null,[2,3,9],17,null,null],
  daffodil: [0.01,0.03,50,null,1,50,14,[1,4]],
  corn: [1.2,2.4,45,130,1,135,17.5,[1,6]],
  watermelon: [4.5,13.5,720,null,1,60,14,[1,6]],
  pumpkin: [6,18,2100,null,1,65,10,[1,4]],
  echeveria: [0.8,2.2,1200,null,1,75,40,[1,2]],
  cattail: [0.03,0.075,180,null,[6,10,14],29,null,null],
  "variegated-cattail": [0.03,0.075,180,null,[6,10,14],29,null,null],
  pear: [0.17,0.34,8100,79200,7,150,20,[1,2]],
  gentian: [0.02,0.06,90,null,1,85,10,[1,3]],
  lavender: [0.02,0.06,100,null,1,29,null,null],
  coconut: [5,15,5400,79200,7,235,10,[1,2]],
  "pine-tree": [1000,3500,79200,null,1,90,null,null],
  banana: [0.12,0.204,6750,79200,5,250,25,[1,3]],
  leek: [0.4,1.2,90,null,1,99,null,null],
  lily: [0.02,0.055,240,null,1,99,20,[1,3]],
  "ghost-plant": [null,null,600,null,1,null,null,null],
  camellia: [0.3,0.75,8100,79200,8,289,50,[1,1]],
  squash: [0.3,0.75,900,2700,3,290,null,null],
  peach: [0.18,0.54,8100,79200,7,299,30,[1,1]],
  "burros-tail": [0.4,1,270,1800,2,338,40,[2,3]],
  cardoon: [0.6,1.8,120,null,1,49,null,null],
  saffron: [0.03,0.09,120,null,1,49,null,null],
  mushroom: [2.5,8.75,79200,null,1,249,null,null],
  persimmon: [null,null,5400,79200,6,329,null,null],
  cactus: [1500,2700,10800,null,1,250,10,[5,15]],
  bamboo: [1,2,79200,null,1,300,5,[5,10]],
  "violet-cort": [2,7,79200,null,1,530,null,null],
  chrysanthemum: [0.01,0.0275,16200,79200,7,567,5,[1,1]],
  date: [0.02,0.04,10800,79200,11,580,null,null],
  habanero: [null,null,900,79200,8,599,null,null],
  grape: [3,6,2070,79200,1,549,10,[1,1]],
  poinsettia: [0.02,0.04,540,79200,4,599,null,null],
  eggplant: [0.5,1.25,10800,79200,3,299,null,null],
  "prickly-pear": [0.15,0.375,5400,79200,5,299,null,null],
  foxfire: [null,null,900,null,[5,7,12],null,null,null],
  witchfire: [null,null,2100,null,[5,7,12],null,null,null],
  "passion-fruit": [9.5,19,5400,79200,2,679,1,[1,2]],
  pepper: [0.5,1,270,79200,9,629,1,[1,1]],
  "dragon-fruit": [8.4,16.8,450,79200,7,715,1,[1,2]],
  cacao: [0.5,1.25,5400,79200,6,750,1,[1,2]],
  lemon: [0.5,1.5,5400,79200,6,650,1,[1,2]],
  milkcap: [2,6,79200,null,1,329,null,null],
  ube: [3.5,10.5,3600,null,1,329,null,null],
  "deadly-nightshade": [null,null,2700,79200,3,null,null,null],
  sunflower: [10,25,79200,10800,1,900,1,[1,2]],
  marigold: [null,null,79200,14400,1,929,null,null],
  lychee: [9,18,900,79200,6,819,1,[1,2]],
  thunderpeel: [1,2,450,86400,12,1080,null,null],
  stormcap: [1,2,450,86400,4,null,null,null],
  dawnbreaker: [100,300,244800,null,1,429,null,null],
  emberbloom: [null,null,450,null,[5,7,15],499,null,null],
  embercrown: [null,null,79350,null,[5,7,15],499,null,null],
  starweaver: [10,20,165600,86400,1,1000,0.035,[1,1]],
  dawnbinder: [6,15,165600,86400,1,1129,null,null],
  moonbinder: [2,4,165600,86400,3,1249,null,null],
};

const issuesById = {
  clover: ["Current Crops page lists credit price 26; older/historic listing differs."],
  "four-leaf-clover": ["Variant shares Clover seed cost. Availability fields are inherited from Clover and should be gameplay-checked."],
  "double-snowdrop": ["Variant shares Snowdrop seed cost. Availability fields are inherited from Snowdrop and should be gameplay-checked."],
  "purple-daisy": ["Variant shares Daisy seed cost. Availability fields are inherited from Daisy and should be gameplay-checked."],
  "variegated-cattail": ["Variant shares Cattail seed cost. Availability fields are inherited from Cattail and should be gameplay-checked."],
  camellia: ["Crops page lists max scale 2.5; Multipliers page's multiplier table says 3, but its weight ratio is 2.5. Existing value 2.5 retained."],
  squash: ["Crops page lists max scale 2.5; Multipliers page's multiplier table says 3, but its weight ratio is 2.5. Existing value 2.5 retained."],
  habanero: ["Seed price differs between Crops and Seed Shop pages; existing rawCrops value retained."],
  poinsettia: ["Multipliers page lists conflicting seed/base-sell figures; existing rawCrops values retained."],
  "deadly-nightshade": ["Credit price and stock details were not confirmed in the retrieved current shop tables."],
  carrot: ["Plant mature time is not applicable for this single-harvest crop."],
};

function normalizeSlots(value) {
  if (value == null) return null;

  if (Array.isArray(value)) {
    return {
      min: value[0],
      max: value[1],
      maxWithBoost: value[2] ?? value[1],
    };
  }

  return {
    min: value,
    max: value,
    maxWithBoost: value,
  };
}function normalizeCropsPerHarvest(harvestType, slotValues) {

  // Single-harvest plants produce one crop.
  if (harvestType === "Single") {
    return { min: 1, max: 1 };
  }

  // Unknown quantities stay unknown.
  if (slotValues == null) {
    return { min: null, max: null };
  }

  // Variable quantities use the normal minimum and maximum.
  if (Array.isArray(slotValues)) {
    return {
      min: slotValues[0],
      max: slotValues[1],
    };
  }

  // Fixed quantities use the same minimum and maximum.
  return {
    min: slotValues,
    max: slotValues,
  };
}

export const crops = rawCrops.map(
  ([id, name, seedPrice, baseSellPrice, maxSizeMultiplier, harvestType, seedSource, notes = ""]) => {
    const [
      baseWeightKg,
      maxWeightKg,
      cropGrowTime,
      plantMatureTime,
      slotValues,
      creditPrice,
      stockChance,
      stockSizeValues,
    ] = details[id] ?? [null, null, null, null, null, null, null, null];

    return {
      id,
      name,
      seedPrice,
      baseSellPrice,
      maxSizeMultiplier,
      harvestType,
      seedSource,
      notes,

      baseWeightKg,
      maxWeightKg,
      cropGrowTime,
      plantMatureTime,
      slots: normalizeSlots(slotValues),
      regrows: harvestType === "Multiple",

      creditPrice,
      stockChance,
      stockSize: stockSizeValues
        ? { min: stockSizeValues[0], max: stockSizeValues[1] }
        : null,

      // Slots and cropsPerHarvest are different concepts.
      // Do not infer one from the other.
      cropsPerHarvest: normalizeCropsPerHarvest(harvestType, slotValues),

      harvestInterval: null,

      // Kept as a compatibility alias in case the current UI uses growthTime.
      growthTime: cropGrowTime,

      mutations: [],
      dataIssues: issuesById[id] ?? [],

      verification: {
        status: "wiki-enriched; gameplay values still unverified",
        source,
        lastVerified: "2026-11-11",
      },
    };
  }
);

export { rawCrops };