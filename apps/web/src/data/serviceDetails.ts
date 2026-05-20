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
};

export const serviceDetails: Record<string, ServiceDetail> = {
  'phone-repair': {
    slug: 'phone-repair',
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
    related: ['tablet-repair', 'laptop-repair', 'console-repair'],
  },

  'laptop-repair': {
    slug: 'laptop-repair',
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
      'AWA warranty repairs carry the manufacturer warranty. Out-of-warranty work is covered by a workmanship warranty quoted at drop-off.',
    faqs: [
      {
        question: 'My HP / Acer laptop is still under warranty. Do I deal with you or the manufacturer?',
        answer:
          "Deal with us. Phone Repairman is the AWA-authorised service agent for HP and Acer in the Upper Hunter — we lodge the warranty claim, order genuine parts, and complete the repair locally so you don't ship the machine interstate.",
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
    related: ['phone-repair', 'laptop-repair', 'console-repair'],
  },

  'console-repair': {
    slug: 'console-repair',
    lede:
      'PlayStation, Xbox, Nintendo Switch — HDMI ports, controllers, disc drives, thermal service. Full strip-downs welcome.',
    whatWeFix: [
      { title: 'HDMI port',         description: 'Bent or non-functional HDMI ports on PS4, PS5, Xbox and Switch — a common failure.' },
      { title: 'Controllers',       description: 'Joystick drift, sticky buttons, broken triggers and battery faults.' },
      { title: 'Disc drive',        description: 'Drive failures and laser replacements on disc-based consoles.' },
      { title: 'Thermal service',   description: 'Strip down, clean, repaste — fixes loud fans and overheating shutdowns.' },
      { title: 'Charging port',     description: 'USB-C charging port repairs on Switch and Switch Lite.' },
      { title: 'Motherboard work',  description: 'No-power and no-video faults diagnosed at the board level.' },
    ],
    devices: ['PlayStation 5', 'PlayStation 4', 'Xbox Series X/S', 'Xbox One', 'Nintendo Switch', 'Nintendo Switch Lite'],
    turnaround:
      'Most console repairs are 2–5 business days. Joycon drift is usually same-day-next-day.',
    warranty:
      'Repairs are covered by a workmanship warranty quoted at drop-off.',
    faqs: [
      {
        question: 'My Switch has joycon drift. Fixable?',
        answer:
          "Yes — joycon drift is one of the most common repairs we do. We replace the analog modules and the controller is back to factory feel. Usually next-day.",
      },
      {
        question: 'My PS5 won\'t output video. Is it the HDMI port?',
        answer:
          "Most likely. HDMI port damage on the PS5 is one of the most common console faults we see — usually from a knocked cable. We can usually diagnose and quote within 24 hours.",
      },
    ],
    related: ['phone-repair', 'laptop-repair', 'tablet-repair'],
  },

  'onsite-business': {
    slug: 'onsite-business',
    lede:
      'Field-service technician for MSPs, mining IT and small business — across the Upper Hunter. One number for the whole stack.',
    whatWeFix: [
      { title: 'Workstations',       description: 'Repairs and upgrades for fleet desktops and laptops, in your office.' },
      { title: 'Printers',           description: 'HP and Lexmark warranty repairs (authorised agent) plus general printer servicing.' },
      { title: 'Network gear',       description: 'Switch, router and access point installs, replacements and diagnostics.' },
      { title: 'Point of sale',      description: 'POS terminal repairs, receipt printer servicing, peripherals.' },
      { title: 'MSP subcontract',    description: 'Field-service hands for MSPs running customers in the Hunter. White-label or co-branded.' },
      { title: 'OEM warranty work',  description: 'HP and Acer field-service warranty calls via the AWA partner network.' },
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
