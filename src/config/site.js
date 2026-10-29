// One place for brand details. Change the name here and it updates everywhere.
export const SITE = {
  name: 'SARDIYAN',
  tagline: 'Winter, wrapped in gold.',
  // REPLACE with the real WhatsApp number: country code + number, digits only (e.g. 923001234567)
  whatsapp: '920000000000',
  email: 'hello@example.com',
  hours: 'Mon to Sat, 10am to 8pm',
}

export const NAV = [
  { label: 'Shawls', to: '/shawls' },
  { label: 'Men', to: '/men' },
  { label: 'Women', to: '/women' },
  { label: 'Winter Gear', to: '/gear' },
  { label: 'Contact', to: '/contact' },
]

export const waLink = (message) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`