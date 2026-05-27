// Single source of truth for site-wide identity, NAP, and operating info.
// Keep this minimal and authoritative. Anything that appears in more than one
// place on the site lives here.

export const site = {
  name: 'Phone Repairman',
  legalName: 'Phone Repairman',
  tagline: 'Device repairs, sales, and onsite IT for the Upper Hunter.',
  url: 'https://phonerepairman.com.au',
  yearFounded: 2014,

  // NAP
  phone: {
    display: '02 6543 1289',
    tel: '+61265431289',
    href: 'tel:+61265431289',
  },
  sms: {
    display: '0483 927 499',
    tel: '+61483927499',
    // sms: URI works on iOS + most Android browsers
    href: "sms:+61483927499?&body=Hi, I'd like a quote on...",
  },
  email: {
    display: 'info@phonerepairman.com.au',
    href: 'mailto:info@phonerepairman.com.au',
  },
  messenger: {
    handle: 'phonescreenrepairman',
    href: 'https://m.me/phonescreenrepairman',
  },

  address: {
    street: '22 Bridge St',
    suburb: 'Muswellbrook',
    state: 'NSW',
    postcode: '2333',
    country: 'AU',
    // From the Google Maps place listing for Phone Repairman Muswellbrook.
    lat: -32.2649045,
    lng: 150.8882651,
    directions: 'https://www.google.com/maps/dir/?api=1&destination=Phone+Repairman+22+Bridge+St+Muswellbrook',
    note: 'Opposite the post office',
  },

  // ISO 8601 weekdays + 24h times for openingHoursSpecification.
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:30', closes: '17:00' },
  ] as const,

  // Display strings for the footer / contact page (humans).
  hoursDisplay: [
    { label: 'Mon – Fri', value: '9:30am – 5:00pm' },
    { label: 'Sat – Sun', value: 'Closed' },
    { label: 'Public Holidays', value: 'Closed' },
  ],

  // Areas we serve (used for areaServed schema + locations pages in Phase 2).
  areaServed: [
    'Muswellbrook',
    'Singleton',
    'Scone',
    'Aberdeen',
    'Denman',
    'Merriwa',
    'Murrurundi',
    'Hunter Valley',
    'Upper Hunter',
  ],

  // Brand authorisations — used on /about, brand pages (Phase 2), and JSON-LD.
  // Keep this plain. The AWA / ARA mechanism is explained only in the FAQ.
  authorizations: [
    { brand: 'HP', kind: 'Authorised Agent' },
    { brand: 'Acer', kind: 'Authorised Agent' },
    { brand: 'Lexmark', kind: 'Authorised Agent' },
    { brand: 'Epson', kind: 'Direct Service Partner' },
  ],

  // Payment methods accepted.
  paymentAccepted: ['Cash', 'EFTPOS', 'Credit Card', 'Afterpay', 'Zip Pay', 'Wizpay', 'Latitude', 'PayPal'],
  priceRange: '$$',

  // Social.
  social: {
    facebook: 'https://www.facebook.com/phonescreenrepairman',
    messenger: 'https://m.me/phonescreenrepairman',
  },
} as const;

// Service catalogue — kept here so the homepage grid, /services hub, and
// schema all stay in sync. Update once; everywhere reflects it.
export const services = [
  {
    slug: 'phone-repair',
    name: 'Phone Repair',
    short: 'Screens, batteries, charging ports, water damage — same day where parts are in stock.',
    icon: 'smartphone',
    devices: ['Apple iPhone', 'Samsung Galaxy', 'Google Pixel', 'OPPO', 'Huawei', 'Xiaomi'],
  },
  {
    slug: 'laptop-repair',
    name: 'Laptop Repair',
    short: 'Screens, keyboards, batteries, hinges, and motherboards. Authorised Agents for HP and Acer.',
    icon: 'laptop',
    devices: ['HP', 'Acer', 'Dell', 'Lenovo', 'Apple MacBook', 'Asus'],
  },
  {
    slug: 'tablet-repair',
    name: 'Tablet & iPad Repair',
    short: 'Cracked glass, dead batteries, charging issues. Genuine parts where available.',
    icon: 'tablet',
    devices: ['Apple iPad', 'Samsung Galaxy Tab', 'Microsoft Surface', 'Lenovo Tab'],
  },
  {
    slug: 'onsite-business',
    name: 'Onsite Business IT',
    short: 'Field-service technician for MSPs, mining IT, and small business — across the Upper Hunter.',
    icon: 'wrench',
    devices: ['Workstations', 'Printers', 'Network gear', 'Point of sale'],
  },
] as const;

export type Service = (typeof services)[number];
export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
