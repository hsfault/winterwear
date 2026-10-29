const IMG_EXT = 'webp' // change to 'png' or 'jpg' if your files are not webp

const pad = (n) => String(n).padStart(2, '0')
const rs = (n) => `Rs ${n.toLocaleString('en-US')}`

// The number of items = the number of names. Remove names if you have fewer images.
const make = ({ folder, prefix, names, gender, category, base, step }) =>
  names.map((name, i) => ({
    id: `${prefix}-${pad(i + 1)}`,
    name,
    gender,
    category,
    image: `/images/${folder}/${prefix}-${pad(i + 1)}.${IMG_EXT}`,
    price: rs(base + (i % 5) * step), // placeholder prices, edit freely
  }))

/* ---------- Banners (wide) ---------- */
export const banners = [
  { label: 'Ivory pashmina, gold border', position: '70% center' },
  { label: 'Charcoal check shawl', position: '30% center' },
  { label: 'Maroon Kashmiri shawl', position: '60% center' },
  { label: 'Matching premium shawls', position: '70% center' },
  { label: 'Luxury shawl collection', position: 'center' },
  { label: 'Women winter wear', position: '65% center' },
  { label: 'Men winter wear', position: '35% center' },
  { label: 'Winter accessories', position: 'center' },
  { label: 'Winter jackets', position: 'center' },
  { label: 'Festive winter', position: '65% center' },
].map((b, i) => ({
  id: `banner-${pad(i + 1)}`,
  image: `/images/banners/banner-${pad(i + 1)}.${IMG_EXT}`,
  ...b,
}))

export const heroBanners = banners.slice(0, 5)
export const categoryBanners = {
  women: banners[5],
  men: banners[6],
  gear: banners[7],
  jackets: banners[8],
  festive: banners[9],
}

/* ---------- Shawls ---------- */
export const shawlsWomen = make({
  folder: 'shawls-women',
  prefix: 'shawl-women',
  gender: 'women',
  category: 'shawls',
  base: 5500,
  step: 1800,
  names: [
    'Ivory Pashmina, Gold Border',
    'Maroon Sozni Kashmiri',
    'Emerald Jamawar Paisley',
    'Black Gold and Silver Border',
    'Dusty Rose Pashmina',
    'Navy Geometric Wool',
    'Mustard Floral Embroidered',
    'Camel Pure Wool',
    'Ivory and Gold Festive',
    'Lilac Tonal Pashmina',
  ],
})

export const shawlsMen = make({
  folder: 'shawls-men',
  prefix: 'shawl-men',
  gender: 'men',
  category: 'shawls',
  base: 4800,
  step: 1500,
  names: [
    'Charcoal Classic Check',
    'Brown Pure Wool',
    'Navy Herringbone Tweed',
    'Camel Pashmina',
    'Olive Border Wool',
    'Maroon Gold-Edge',
    'Charcoal Muffler Check',
    'Grey Kashmiri-Style',
    'Cream and Brown Peshawari',
    'Navy Striped Border',
  ],
})

export const shawls = [...shawlsWomen, ...shawlsMen]

/* ---------- Full outfits ---------- */
export const outfitsWomen = make({
  folder: 'women-outfits',
  prefix: 'women-outfit',
  gender: 'women',
  category: 'outfits',
  base: 9500,
  step: 2200,
  names: [
    'Camel Coat Classic',
    'Burgundy Velvet Suit',
    'Black Puffer Casual',
    'Cream Teddy Coat Look',
    'Olive Khaddar and Shawl',
    'Navy Trench Coat Look',
    'Maroon Karandi Suit',
    'Grey Cardigan Layers',
    'Forest Green Puffer',
    'Ivory Wool Suit',
    'Faux-Fur Collar Black',
    'Mustard Knit Look',
    'Charcoal Blazer Coat',
    'Rust Cape Poncho',
    'Dusty Pink Coat Look',
    'Teal Velvet Suit',
    'Shearling Leather Look',
    'White Fluffy Coat',
    'Black Kurti and Pashmina',
    'Layered Scarf-Shawl Look',
  ],
})

export const outfitsMen = make({
  folder: 'men-outfits',
  prefix: 'men-outfit',
  gender: 'men',
  category: 'outfits',
  base: 9000,
  step: 2000,
  names: [
    'Charcoal Overcoat Look',
    'Black Kameez and Grey Shawl',
    'Navy Puffer Casual',
    'Camel Coat Look',
    'Cream Kameez and Waistcoat',
    'Olive Parka Look',
    'Shearling Leather Look',
    'Maroon Sweater and Coat',
    'Grey Karandi Waistcoat',
    'Black Bomber Urban',
    'Navy Blazer and Turtleneck',
    'Beige Trench Look',
    'Forest Quilted Look',
    'Brown Embroidered Suit',
    'Black Down Parka',
    'Grey Tweed Overcoat',
    'Mustard Cardigan Look',
    'All-Black Winter',
    'Camel Kameez and Peshawari Cap',
    'Sherpa Denim Layers',
  ],
})

/* ---------- Jackets ---------- */
export const jacketsWomen = make({
  folder: 'jackets-women',
  prefix: 'jacket-women',
  gender: 'women',
  category: 'jackets',
  base: 8500,
  step: 2400,
  names: [
    'Black Belted Puffer',
    'Camel Double-Breasted Coat',
    'Cream Teddy Coat',
    'Black Shearling Biker',
    'Forest Quilted Long Coat',
    'Burgundy Wrap Coat',
    'Dusty Pink Cropped Puffer',
    'Grey Belted Trench',
    'Navy Fur-Hood Parka',
    'White Faux-Fur Coat',
  ],
})

export const jacketsMen = make({
  folder: 'jackets-men',
  prefix: 'jacket-men',
  gender: 'men',
  category: 'jackets',
  base: 8500,
  step: 2400,
  names: [
    'Black Matte Puffer',
    'Charcoal Wool Overcoat',
    'Shearling Leather Jacket',
    'Olive Fur-Hood Parka',
    'Navy Quilted Jacket',
    'Black Bomber',
    'Beige Winter Trench',
    'Sherpa Denim Jacket',
    'Grey Tweed Overcoat',
    'Black Long Down Coat',
  ],
})

export const jackets = [...jacketsWomen, ...jacketsMen]

/* ---------- Winter gear ---------- */
const gear = (folder, prefix, category, names, base, step) =>
  make({ folder, prefix, gender: 'unisex', category, names, base, step })

export const gloves = gear('gloves', 'gloves', 'gloves', [
  'Black Leather Gloves',
  'Brown Cashmere-Lined Leather',
  'Cream Chunky Wool Knit',
  'Burgundy Suede Button Gloves',
  'Grey Touchscreen Fleece',
  'Cream and Grey Mittens',
  'Navy Thermal Ski Gloves',
  'Black Fingerless Wool',
  'Camel Fur-Cuff Leather',
  'Forest Cable-Knit Gloves',
], 1800, 600)

export const socks = gear('socks', 'socks', 'socks', [
  'Charcoal Wool Trio',
  'Cream Cable-Knit',
  'Navy Thermal Ribbed',
  'Burgundy Knee-High Wool',
  'Beige Fleece Cosy',
  'Nordic Snowflake',
  'Black Ribbed Hiking',
  'Five-Pair Winter Set',
  'Mustard Cable-Knit',
  'Black and Grey Thermal Ankle',
], 900, 350)

export const caps = gear('caps', 'cap', 'caps', [
  'Charcoal Ribbed Beanie',
  'Cream Pom-Pom Beanie',
  'Camel Wool Flat Cap',
  'Brown Peshawari Cap',
  'Burgundy Ear-Warmer Headband',
  'Fur-Lined Trapper Hat',
  'Navy Knit Balaclava',
  'Grey Wool Beret',
  'Beanie Trio Set',
  'White Faux-Fur Hat',
], 1200, 450)

export const scarves = gear('scarves', 'scarf', 'scarves', [
  'Cream Chunky Knit',
  'Charcoal Check Muffler',
  'Burgundy Cashmere-Feel',
  'Olive Infinity Scarf',
  'Navy Striped Scarf',
  'Camel Fringed Scarf',
  'Black and Cream Check',
  'Rolled Scarf Trio',
  'Brown Wool Scarf',
  'Lilac Soft Knit',
], 1600, 500)

export const boots = gear('boots', 'boots', 'boots', [
  'Black Leather Chelsea',
  'Brown Lace-Up Leather',
  'Tan Suede Ankle',
  'Black Knee-High Leather',
  'Fur-Lined Snow Boots',
  'Dark Brown Hiking',
  'Cream Sheepskin Slippers',
  'Burgundy Leather Ankle',
  'Fur-Lined Black Loafers',
  'Olive Waterproof Winter',
], 5500, 1600)

export const knitwear = gear('knitwear', 'knitwear', 'knitwear', [
  'Cream Cable-Knit Sweater',
  'Camel Turtleneck',
  'Charcoal Zip Fleece Hoodie',
  'Grey Fleece Hoodie',
  'Burgundy Long Cardigan',
  'Navy Thermal Inner',
  'Cream Ribbed Thermal',
  'Forest Zip-Collar Sweater',
  'Mustard Chunky Knit',
  'Black Merino Turtleneck',
], 3200, 900)

// Used by the Winter Gear index and the Gear page
export const gearCategories = [
  { key: 'jackets', label: 'Jackets', blurb: 'Puffers, parkas and wool coats.', items: jackets },
  { key: 'knitwear', label: 'Knitwear', blurb: 'Sweaters, hoodies and thermals.', items: knitwear },
  { key: 'scarves', label: 'Scarves', blurb: 'Mufflers and soft wraps.', items: scarves },
  { key: 'caps', label: 'Caps', blurb: 'Beanies, berets and trapper hats.', items: caps },
  { key: 'gloves', label: 'Gloves', blurb: 'Leather, wool and thermal.', items: gloves },
  { key: 'boots', label: 'Boots', blurb: 'Snow, leather and cosy indoor.', items: boots },
  { key: 'socks', label: 'Socks', blurb: 'Thick wool and thermal pairs.', items: socks },
]

export const allProducts = [
  ...shawls,
  ...outfitsWomen,
  ...outfitsMen,
  ...jackets,
  ...gloves,
  ...socks,
  ...caps,
  ...scarves,
  ...boots,
  ...knitwear,
]