// Per-service rich content for /services/[slug] detail pages.
// Lightweight catalogue lives in site.ts; the in-depth copy lives here so
// service pages can be edited without touching the homepage / hub config.

import type { FaqItem } from '~/lib/seo/schema';

export type ServiceDetail = {
  slug: string;
  lede: string;
  whatWeFix: { title: string; description: string }[];
  devices: string[];
  turnaround: string;
  warranty: string;
  faqs: FaqItem[];
  related: string[];
  /** Optional hero photo path under /public — falls back to placeholder. */
  image?: string;
  imageCaption?: string;
};

export const serviceDetails: Record<string, ServiceDetail> = {
  'phone-repair': {
    slug: 'phone-repair',
    image: '/photography/tim-phone-bench.jpg',
    imageCaption: 'Tim at the phone-repair bench',
    lede:
      'Cracked screen, dead battery, water damage, charging issues — phone repairs for every major brand, mostly same day if the part is in stock.',
    whatWeFix: [
      { title: 'Screen replacement',  description: 'Cracked or unresponsive glass and LCD/OLED — genuine where available, quality aftermarket otherwise.' },
      { title: 'Battery replacement', description: 'Restore a full day of battery life. Most modern phones in 30–60 minutes.' },
      { title: 'Charging port',       description: 'Lightning, USB-C and micro-USB ports cleaned, repaired or replaced.' },
      { title: 'Water damage',        description: 'Ultrasonic clean, drying and corrosion assessment. No fix, no fee.' },
      { title: 'Back glass',          description: 'Cracked back glass replacement on iPhones and Galaxy models.' },
      { title: 'Speakers & mic',      description: 'Earpiece, loudspeaker and microphone faults diagnosed and replaced.' },
      { title: 'Cameras',             description: 'Front and rear camera modules — including bent/cracked lenses.' },
      { title: 'Motherboard work',    description: 'Component-level diagnosis for power, charging and no-display faults.' },
    ],
    devices: ['Apple iPhone', 'Samsung Galaxy', 'Google Pixel', 'OPPO', 'Huawei', 'Xiaomi', 'Nokia', 'Sony', 'Motorola'],
    turnaround:
      'Most in-stock screen and battery repairs are completed same day. Less common parts are ordered overnight — typical turnaround 1–2 business days.',
    warranty:
      'Repairs are covered by a workmanship warranty quoted in writing at drop-off. Parts warranty depends on the source (genuine vs aftermarket).',
    faqs: [
      {
        question: 'My screen still lights up but the touch is dead — can you fix that?',
        answer:
          'Usually yes — touch failure without visible damage almost always means the digitiser. We replace the screen assembly and your phone is back the same day on most models.',
      },
      {
        question: 'Will replacing my screen wipe my photos and contacts?',
        answer:
          "No — a screen replacement doesn't touch your storage. We do recommend a recent iCloud or Google backup before any repair, just in case the device needs further work.",
      },
      {
        question: 'My iPhone got wet. What do I do right now?',
        answer:
          "Power it off, do not plug it in to charge, and bring it in as soon as you can. Sooner = better chance of full recovery. Rice doesn't work — corrosion happens at the contact level, not the moisture level.",
      },
    ],
    related: ['tablet-repair', 'laptop-repair', 'onsite-business'],
  },

  'laptop-repair': {
    slug: 'laptop-repair',
    image: '/photography/tim-laptop-bench.jpg',
    imageCaption: 'HP laptop service, Bridge Street workshop',
    lede:
      'Authorised Agent for HP and Acer, plus independent repair for every other major brand. Screens, keyboards, batteries, hinges, motherboards — handled in Muswellbrook.',
    whatWeFix: [
      { title: 'Screen replacement',     description: 'Cracked panels, dead pixels, backlight failure — LCD and OLED.' },
      { title: 'Keyboard replacement',   description: 'Sticky, broken or missing keys, or full keyboard assemblies.' },
      { title: 'Battery replacement',    description: 'Restore battery life on machines that no longer hold a charge.' },
      { title: 'Hinge repair',           description: 'Cracked hinges and broken lid mounts — a common failure on lighter laptops.' },
      { title: 'Charging port',          description: 'Loose or damaged DC jacks and USB-C charging ports replaced.' },
      { title: 'Thermal service',        description: 'Fan cleaning, thermal paste replacement for laptops running hot.' },
      { title: 'Motherboard work',       description: 'Component-level diagnosis for no-power, no-boot and no-display faults.' },
      { title: 'OS and data',            description: 'Windows / macOS reinstalls, virus removal, and data transfer to a new machine.' },
    ],
    devices: ['HP', 'Acer', 'Dell', 'Lenovo', 'Asus', 'MSI', 'Apple MacBook', 'Microsoft Surface'],
    turnaround:
      'Most laptop repairs are 1–3 business days. Warranty work for HP and Acer follows the OEM SLA — we quote that on drop-off.',
    warranty:
      'Authorised warranty repairs carry the original manufacturer warranty. Out-of-warranty work is covered by a workmanship warranty quoted at drop-off.',
    faqs: [
      {
        question: 'My HP or Acer laptop is still under warranty. What do I do?',
        answer:
          "Lodge your warranty claim with HP or Acer the way you normally would. Because we are the local Authorised Agent for those brands in the Upper Hunter, the job routes to us — genuine parts, repair completed here in Muswellbrook, no shipping the machine interstate.",
      },
      {
        question: 'My laptop won\'t turn on at all. Worth bringing in?',
        answer:
          'Yes. No-power faults are often the DC jack, a failed charger, or a board-level fault we can usually identify in 24 hours. No fix, no fee on diagnosis.',
      },
      {
        question: 'Can you upgrade my old laptop instead of replacing it?',
        answer:
          'Often yes — adding an SSD and more RAM to a machine that\'s on a spinning HDD is the single biggest speed upgrade you can make. We\'ll quote before doing the work.',
      },
    ],
    related: ['phone-repair', 'onsite-business', 'tablet-repair'],
  },

  'tablet-repair': {
    slug: 'tablet-repair',
    image: '/photography/tim-ipad-bench.jpg',
    imageCaption: 'iPad screen replacement, Bridge Street workshop',
    lede:
      'iPad, Galaxy Tab, Surface and more — cracked glass, dead batteries and charging faults handled locally. Genuine parts where the OEM allows.',
    whatWeFix: [
      { title: 'Screen replacement',  description: 'Cracked glass and dead LCDs — including iPads and Galaxy Tabs.' },
      { title: 'Battery replacement', description: 'Restore battery life on tablets that no longer hold a charge.' },
      { title: 'Charging port',       description: 'Lightning, USB-C and micro-USB port repairs.' },
      { title: 'Home button',         description: 'Home button and Touch ID assembly repairs on older iPads.' },
      { title: 'Camera',              description: 'Front and rear camera module replacements.' },
      { title: 'Speaker / mic',       description: 'Audio and microphone faults diagnosed and replaced.' },
    ],
    devices: ['Apple iPad', 'Samsung Galaxy Tab', 'Microsoft Surface', 'Lenovo Tab', 'Amazon Fire'],
    turnaround:
      'Common iPad screens and batteries are typically 1–2 business days. Surface devices and Galaxy Tabs depend on part availability.',
    warranty:
      'Repairs are covered by a workmanship warranty quoted at drop-off. Parts warranty depends on the source.',
    faqs: [
      {
        question: 'Are iPad screens repairable, or do I have to buy a new one?',
        answer:
          "Almost always repairable. Even older iPads have parts available. The decision is usually price vs replacement value, and we'll quote both honestly so you can choose.",
      },
      {
        question: 'My iPad won\'t charge. Cable issue or tablet issue?',
        answer:
          "We test both. Bring the cable and charger if you can — saves us guessing and saves you money if the answer is just a $20 cable.",
      },
    ],
    related: ['phone-repair', 'laptop-repair', 'onsite-business'],
  },

  'onsite-business': {
    slug: 'onsite-business',
    // PLACEHOLDER REUSE — laptop-bench (HP EliteBook is a business machine) used
    // as a stand-in. Want: a real "Tim onsite at a customer business" shot
    // (kit bag, lanyard, customer's reception in background). Priority A.
    image: '/photography/tim-laptop-bench.jpg',
    imageCaption: 'Business laptop service · onsite photo coming',
    lede:
      'Field-service technician for MSPs, mining IT and small business — across the Upper Hunter. One number for the whole stack.',
    whatWeFix: [
      { title: 'Workstations',       description: 'Repairs and upgrades for fleet desktops and laptops, in your office.' },
      { title: 'Printers',           description: 'HP and Lexmark warranty repairs (authorised agent) plus general printer servicing.' },
      { title: 'Network gear',       description: 'Switch, router and access point installs, replacements and diagnostics.' },
      { title: 'Point of sale',      description: 'POS terminal repairs, receipt printer servicing, peripherals.' },
      { title: 'MSP subcontract',    description: 'Field-service hands for MSPs running customers in the Hunter. White-label or co-branded.' },
      { title: 'OEM warranty work',  description: 'HP and Acer field-service warranty calls handled as the local Authorised Agent.' },
    ],
    devices: ['HP workstations', 'Acer laptops', 'Lexmark printers', 'POS terminals', 'Network switches'],
    turnaround:
      'Onsite visits typically same-week. Urgent business calls — call directly and we\'ll work out a same-day slot where possible.',
    warranty:
      'Business work is invoiced and warranty terms are quoted per scope of work.',
    faqs: [
      {
        question: 'We\'re an MSP in Newcastle. Can you handle our Hunter customers?',
        answer:
          'Yes — that\'s exactly what we do. We act as your field-service arm in the Upper Hunter, white-labelled or co-branded. Ring Tim directly to set up a partner agreement.',
      },
      {
        question: 'We run a mine site. Can you do bulk device repairs and onsite work?',
        answer:
          'Yes. We supply, repair and onsite-service fleet devices for mining IT — phones, ruggedised laptops and printers. Quoted per scope.',
      },
    ],
    related: ['laptop-repair', 'phone-repair', 'tablet-repair'],
  },
};
