// Brand catalogue + detail content for /brands/[slug] pages.
// Authorisation status drives prominent badging; "Authorised Agent" and
// "Direct Service Partner" are the OEM-granted terms — never invent these.

import type { FaqItem } from '~/lib/seo/schema';

export type BrandAuthorisation = 'AWA-authorised' | 'Direct service partner' | 'Independent';

export type Brand = {
  slug: string;
  name: string;
  authorisation: BrandAuthorisation;
  /** Short tagline used on the /brands hub and authorisations strip. */
  short: string;
  /** Lucide icon name from Icon.astro. */
  icon: 'smartphone' | 'laptop' | 'tablet' | 'gamepad' | 'shield' | 'wrench' | 'shield-check';
  /** Hero lede for the brand detail page. */
  lede: string;
  /** Bulleted repair-type breakdown. */
  whatWeFix: { title: string; description: string }[];
  /** Specific product lines we work on. */
  productLines: string[];
  turnaround: string;
  warranty: string;
  faqs: FaqItem[];
  /** Service slugs from site.ts. */
  relatedServices: string[];
  /** Other brand slugs to feature. */
  relatedBrands: string[];
  /** Optional hero photo path under /public — falls back to placeholder. */
  image?: string;
  imageCaption?: string;
};

export const brands: Brand[] = [
  // ===================================================================
  // AWA-authorised — HP, Acer, Lexmark
  // ===================================================================
  {
    slug: 'hp',
    name: 'HP',
    authorisation: 'AWA-authorised',
    image: '/photography/tim-laptop-bench.jpg',
    imageCaption: 'HP EliteBook service',
    short: 'Authorised Agent for HP — laptops, printers and workstations.',
    icon: 'laptop',
    lede:
      'Authorised Agent for HP laptops, printers and workstations. Warranty repairs are handled locally in Muswellbrook — same coverage as factory service, no parcel shipping out of the Hunter.',
    whatWeFix: [
      { title: 'Screen replacement',     description: 'Cracked panels, dead pixels, backlight faults on every HP series.' },
      { title: 'Keyboard',               description: 'Sticky / broken / failed keyboards on EliteBook, ProBook, Pavilion, Envy and Spectre.' },
      { title: 'Battery',                description: 'Genuine HP battery replacements for machines no longer holding a charge.' },
      { title: 'Hinge repair',           description: 'Common failure on lighter HP laptops — hinges and lid mounts replaced.' },
      { title: 'Thermal service',        description: 'Fan cleaning, paste replacement, fan replacement on machines running hot.' },
      { title: 'Motherboard',            description: 'No-power / no-boot / no-display diagnosis on the board.' },
      { title: 'Printer repair',         description: 'LaserJet and OfficeJet repairs — fusers, paper feed, scanner units, mainboards.' },
      { title: 'Warranty claim handling', description: 'Lodge with HP — your repair is routed to us. Genuine parts, completed locally.' },
    ],
    productLines: [
      'EliteBook', 'ProBook', 'Pavilion', 'Envy', 'Spectre', 'ZBook workstations',
      'LaserJet printers', 'OfficeJet printers', 'HP desktops + all-in-ones',
    ],
    turnaround:
      'Warranty work follows the HP service-level agreement — typically 1–3 business days once parts arrive. Out-of-warranty: written turnaround on drop-off.',
    warranty:
      'Warranty repairs carry the original HP warranty. Out-of-warranty work is covered by a workmanship warranty quoted at drop-off.',
    faqs: [
      {
        question: 'My HP is still under warranty. What do I do?',
        answer:
          'Lodge your warranty claim with HP the way you normally would (HP support page or phone). Because we are the local Authorised Agent for HP in the Upper Hunter, HP routes the job to us — we order genuine parts and complete the repair locally so the machine stays in the Hunter.',
      },
      {
        question: 'Can you repair HP printers as well as laptops?',
        answer:
          'Yes. HP LaserJet and OfficeJet repairs — fuser units, paper feed, scanner assemblies, mainboards. Same warranty pathway as the laptop side.',
      },
      {
        question: 'My HP laptop has a coffee spill. Worth bringing in?',
        answer:
          'Yes — bring it in as soon as you can, powered off. Liquid damage is recoverable in most cases if it is cleaned and assessed quickly. No fix, no fee on diagnosis.',
      },
    ],
    relatedServices: ['laptop-repair', 'onsite-business'],
    relatedBrands: ['acer', 'lexmark', 'epson'],
  },

  {
    slug: 'acer',
    name: 'Acer',
    authorisation: 'AWA-authorised',
    image: '/photography/tim-acer-bench.jpg',
    imageCaption: 'Acer laptop service, Bridge Street workshop',
    short: 'Authorised Agent for Acer — Aspire, Swift, Predator, Nitro.',
    icon: 'laptop',
    lede:
      'Authorised Agent for Acer laptops and all-in-ones. Warranty service runs locally instead of being shipped to a city service centre.',
    whatWeFix: [
      { title: 'Screen replacement',  description: 'Cracked or dead panels on Aspire, Swift, Predator, Nitro and TravelMate.' },
      { title: 'Keyboard',            description: 'Backlit and standard keyboard assemblies replaced.' },
      { title: 'Battery',             description: 'Genuine Acer battery replacements.' },
      { title: 'Hinge repair',        description: 'Acer hinges and lid mounts — common late-life failure.' },
      { title: 'Thermal service',     description: 'Gaming Predator / Nitro thermal repaste — restores fan noise and frame rates.' },
      { title: 'Motherboard',         description: 'No-power and no-boot diagnosis at the board level.' },
      { title: 'Warranty claim handling', description: 'Lodge with Acer — your repair is routed to us. Genuine parts, completed locally.' },
    ],
    productLines: [
      'Aspire', 'Swift', 'Spin', 'Predator', 'Nitro gaming',
      'TravelMate business', 'Chromebook', 'Acer all-in-ones',
    ],
    turnaround:
      'Warranty work to Acer SLA — typically 1–3 business days once parts arrive. Out-of-warranty: written turnaround on drop-off.',
    warranty:
      'Warranty repairs carry the original Acer warranty. Out-of-warranty work is covered by a workmanship warranty quoted at drop-off.',
    faqs: [
      {
        question: 'My Acer Predator is running hot and the fans are loud. Can you fix that?',
        answer:
          'Almost certainly — that combination is usually dust build-up in the heatsink plus dried-out thermal paste. We strip down, clean, repaste, and replace fans if needed. Most return to factory thermal performance.',
      },
      {
        question: 'My Acer is under warranty. What do I do?',
        answer:
          'Lodge your warranty claim with Acer the way you normally would. Because we are the local Authorised Agent for Acer in the Upper Hunter, Acer routes the job to us — genuine parts, repair completed here in Muswellbrook, no shipping interstate.',
      },
    ],
    relatedServices: ['laptop-repair', 'onsite-business'],
    relatedBrands: ['hp', 'dell', 'lenovo'],
  },

  {
    slug: 'lexmark',
    name: 'Lexmark',
    authorisation: 'AWA-authorised',
    short: 'Authorised Agent for Lexmark business printers.',
    icon: 'wrench',
    lede:
      'Authorised Agent for Lexmark business printers. Warranty and out-of-warranty service handled onsite or in-shop across the Hunter.',
    whatWeFix: [
      { title: 'Fuser unit',     description: 'Fuser replacement on Lexmark mono and colour laser printers.' },
      { title: 'Paper feed',     description: 'Roller replacements, jam diagnosis, sensor faults.' },
      { title: 'Scanner / ADF',  description: 'Scanner unit and automatic document feeder repairs on MFPs.' },
      { title: 'Mainboard',      description: 'Board-level diagnosis on no-power / network / display faults.' },
      { title: 'Cartridge / drum', description: 'Genuine Lexmark consumables supply and installation.' },
      { title: 'Onsite service', description: 'Field-service technician for fleet printer customers across the Hunter.' },
    ],
    productLines: [
      'CX / CS colour series', 'MX / MS mono series', 'XM enterprise MFP', 'B / MB series desktop',
    ],
    turnaround:
      'Onsite calls typically same-week. Urgent business calls — ring directly. In-shop repairs 1–3 business days.',
    warranty:
      'Warranty repairs carry the original Lexmark warranty. Out-of-warranty work is invoiced and warranty terms are quoted per scope.',
    faqs: [
      {
        question: 'We run a Lexmark fleet across multiple sites. Can you support all of them?',
        answer:
          'Yes — that is our main business customer profile. Onsite service, consumables supply, and fleet management for Lexmark printers across the Upper Hunter. Call Tim directly to set up a service agreement.',
      },
      {
        question: 'Can you supply Lexmark consumables (toner / drum) as well as service the printers?',
        answer:
          'Yes. Genuine Lexmark consumables — supply only, supply + install, or as part of an ongoing fleet agreement.',
      },
    ],
    relatedServices: ['onsite-business'],
    relatedBrands: ['hp', 'epson'],
  },

  // ===================================================================
  // Direct partner — Epson
  // ===================================================================
  {
    slug: 'epson',
    name: 'Epson',
    authorisation: 'Direct service partner',
    short: 'Direct Epson service partner — printers, scanners, projectors.',
    icon: 'wrench',
    lede:
      'Direct service partner with Epson Australia. Printer, scanner and projector service handled locally — genuine Epson parts, manufacturer warranty cover.',
    whatWeFix: [
      { title: 'Printhead service',   description: 'Cleaning, alignment and replacement on inkjet and EcoTank models.' },
      { title: 'Paper feed',          description: 'Roller / feed assembly replacement, jam diagnosis.' },
      { title: 'Ink system',          description: 'EcoTank ink-system service and refill assistance.' },
      { title: 'Scanner unit',        description: 'CIS scanner repairs on MFPs and dedicated scanners.' },
      { title: 'Projector lamp',      description: 'Lamp replacement and projector cleaning service.' },
      { title: 'Warranty claim handling', description: 'Lodge directly with Epson, order genuine parts.' },
    ],
    productLines: [
      'WorkForce inkjet', 'EcoTank', 'Expression Home / Photo',
      'Stylus inkjet', 'Epson scanners', 'EB / EH projectors',
    ],
    turnaround:
      'Warranty work to Epson SLA. Out-of-warranty: typically 2–5 business days depending on parts availability.',
    warranty:
      'Warranty repairs carry the original Epson warranty. Out-of-warranty repairs covered by a workmanship warranty quoted at drop-off.',
    faqs: [
      {
        question: 'My Epson EcoTank is printing streaks. What is the fix?',
        answer:
          'Usually a printhead clean — sometimes a more thorough head-flush if the standard cleaning cycle does not clear it. Bring it in; we run a full diagnostic and quote before any further work.',
      },
      {
        question: 'Do you service Epson projectors as well as printers?',
        answer:
          'Yes — lamp replacements, optical cleaning and general projector service. Most Epson EB / EH models supported.',
      },
    ],
    relatedServices: ['onsite-business'],
    relatedBrands: ['hp', 'lexmark'],
  },

  // ===================================================================
  // Independent — Apple, Samsung, Dell, Lenovo
  // ===================================================================
  {
    slug: 'apple',
    name: 'Apple',
    authorisation: 'Independent',
    short: 'iPhone, iPad, MacBook and Apple Watch repairs.',
    icon: 'smartphone',
    lede:
      'Independent repairer for Apple devices — iPhone, iPad, MacBook and Apple Watch. Genuine parts where the OEM allows; quality aftermarket otherwise. Always clear on which.',
    whatWeFix: [
      { title: 'iPhone screen',       description: 'Screen replacement on every iPhone generation we can source parts for.' },
      { title: 'iPhone battery',      description: 'Battery service that restores full battery health.' },
      { title: 'iPhone charging port', description: 'Lightning port cleaning and replacement.' },
      { title: 'iPhone back glass',   description: 'Cracked back-glass replacement.' },
      { title: 'iPad screen / battery', description: 'iPad glass, digitiser and battery replacement.' },
      { title: 'MacBook screen / keyboard / battery', description: 'Common MacBook component swaps.' },
      { title: 'Water-damage assessment', description: 'Ultrasonic clean and corrosion assessment. No fix, no fee.' },
      { title: 'Apple Watch screen / battery', description: 'Screen and battery service on supported models.' },
    ],
    productLines: [
      'iPhone (every generation we can source parts for)',
      'iPad / iPad Pro / iPad mini / iPad Air',
      'MacBook / MacBook Pro / MacBook Air',
      'Apple Watch',
    ],
    turnaround:
      'Most iPhone repairs same-day where parts are in stock. iPad and MacBook 1–3 business days. Less common parts ordered overnight.',
    warranty:
      'Repairs covered by a workmanship warranty quoted at drop-off. Parts warranty depends on source (genuine vs aftermarket).',
    faqs: [
      {
        question: 'Are you Apple Authorised?',
        answer:
          'We are not an Apple Authorised Service Provider — Apple\'s AASP network in Australia is small and weighted toward metro areas. We are an experienced independent Apple repairer using genuine parts where the supply allows and quality aftermarket otherwise. We tell you which before any repair.',
      },
      {
        question: 'Will repairing my iPhone with you void my Apple warranty?',
        answer:
          'If the iPhone is still under Apple warranty, the safest path is Apple direct (we can advise where to send it). Out-of-warranty, an independent repair has no effect on a warranty that has already expired.',
      },
      {
        question: 'My MacBook screen has a single crack but the display still works. Fix or replace?',
        answer:
          'Often fixable — we replace the LCD or full lid assembly depending on the model. Cheaper than a new MacBook in almost every case. We quote before doing the work.',
      },
    ],
    relatedServices: ['phone-repair', 'tablet-repair', 'laptop-repair'],
    relatedBrands: ['samsung', 'dell'],
  },

  {
    slug: 'samsung',
    name: 'Samsung',
    authorisation: 'Independent',
    short: 'Galaxy phone, tablet and smartwatch repairs.',
    icon: 'smartphone',
    lede:
      'Independent repairer for Samsung Galaxy phones, tablets, Watch and Buds. Most common screen and battery repairs same-day when parts are in stock.',
    whatWeFix: [
      { title: 'Galaxy screen',       description: 'AMOLED screen replacement across the Galaxy S, Note, A and Z series.' },
      { title: 'Galaxy battery',      description: 'Battery replacement on phones no longer holding a charge.' },
      { title: 'Galaxy charging port', description: 'USB-C port cleaning, repair and replacement.' },
      { title: 'Galaxy back glass',   description: 'Back glass replacement on flagship S and Note models.' },
      { title: 'Galaxy Tab',          description: 'Glass and battery on Tab S, Tab A and Galaxy Tab Active series.' },
      { title: 'Z Fold / Z Flip',     description: 'Hinge and inner-screen service on foldables — parts permitting.' },
    ],
    productLines: [
      'Galaxy S series', 'Galaxy Note', 'Galaxy A budget series',
      'Galaxy Z Fold / Z Flip foldables', 'Galaxy Tab', 'Galaxy Watch',
    ],
    turnaround:
      'Galaxy S / A screens and batteries typically same-day. Foldables and Galaxy Tab depend on part availability.',
    warranty:
      'Workmanship warranty quoted at drop-off. Parts warranty depends on source.',
    faqs: [
      {
        question: 'Can you replace the inner screen on a folded Galaxy Z?',
        answer:
          'Sometimes — depends on the generation and parts availability. Foldable inner-screen repairs are specialist work. We assess in-shop and quote honestly; if the part isn\'t practical to source we\'ll tell you.',
      },
      {
        question: 'My Galaxy S has a green or pink line down the screen. Fix?',
        answer:
          'Yes — that is usually an AMOLED panel fault and is fixed by a full screen replacement. Most flagship models we have parts for in stock.',
      },
    ],
    relatedServices: ['phone-repair', 'tablet-repair'],
    relatedBrands: ['apple'],
  },

  {
    slug: 'dell',
    name: 'Dell',
    authorisation: 'Independent',
    short: 'Latitude, Inspiron, XPS and Precision laptop repairs.',
    icon: 'laptop',
    lede:
      'Independent repairer for Dell laptops and desktops. Latitude business, Inspiron consumer, XPS premium, Precision workstation — all serviced locally.',
    whatWeFix: [
      { title: 'Screen replacement',  description: 'Cracked or dead panels across Latitude, Inspiron, XPS and Precision.' },
      { title: 'Keyboard',            description: 'Keyboard / palm-rest assembly replacement.' },
      { title: 'Battery',             description: 'Battery replacement on machines no longer holding a charge.' },
      { title: 'Hinge repair',        description: 'Common late-life failure on Inspiron — hinges and lid mounts replaced.' },
      { title: 'Thermal service',     description: 'Fan replacement and repaste on machines running hot.' },
      { title: 'Motherboard',         description: 'No-power, no-boot and no-display diagnosis at the board level.' },
      { title: 'OS reinstall / migration', description: 'Windows / Linux reinstalls, data transfer to a new machine.' },
    ],
    productLines: [
      'Latitude business', 'Inspiron consumer', 'XPS premium',
      'Precision workstation', 'Vostro small-business', 'OptiPlex desktops',
    ],
    turnaround:
      'Most Dell repairs 1–3 business days. Less common parts ordered overnight.',
    warranty:
      'Workmanship warranty quoted at drop-off.',
    faqs: [
      {
        question: 'My XPS is older — worth fixing or replacing?',
        answer:
          'Usually worth fixing. Older XPS machines have excellent build quality and parts are widely available. We quote both repair and rough replacement cost so you can choose.',
      },
    ],
    relatedServices: ['laptop-repair', 'onsite-business'],
    relatedBrands: ['lenovo', 'hp', 'acer'],
  },

  {
    slug: 'lenovo',
    name: 'Lenovo',
    authorisation: 'Independent',
    short: 'ThinkPad, IdeaPad, Yoga and Legion repairs.',
    icon: 'laptop',
    lede:
      'Independent repairer for Lenovo laptops — ThinkPad business, IdeaPad consumer, Yoga convertible, Legion gaming. Built-like-tanks ThinkPads are a specialty.',
    whatWeFix: [
      { title: 'Screen replacement',  description: 'Cracked or dead panels across all Lenovo series.' },
      { title: 'Keyboard',            description: 'ThinkPad keyboards (trackpoint included) replaced.' },
      { title: 'Battery',             description: 'Internal and external battery replacement.' },
      { title: 'Hinge repair',        description: 'IdeaPad and Yoga hinge replacements — common after years of use.' },
      { title: 'Thermal service',     description: 'Legion thermal repaste — restores gaming performance.' },
      { title: 'Motherboard',         description: 'Board-level diagnosis for no-power and no-display faults.' },
    ],
    productLines: [
      'ThinkPad (X, T, L, P series)', 'IdeaPad', 'Yoga convertibles',
      'Legion gaming', 'ThinkBook small-business', 'ThinkCentre desktops',
    ],
    turnaround:
      'Most Lenovo repairs 1–3 business days. ThinkPad parts widely available; Legion gaming parts ordered as needed.',
    warranty:
      'Workmanship warranty quoted at drop-off.',
    faqs: [
      {
        question: 'My ThinkPad has the dreaded "fan error" beep code. Fix?',
        answer:
          'Yes — that is a known ThinkPad failure mode where the cooling fan has reached end-of-life or seized. Fan replacement and full thermal service. Most ThinkPads return to factory thermal performance.',
      },
    ],
    relatedServices: ['laptop-repair', 'onsite-business'],
    relatedBrands: ['dell', 'hp', 'acer'],
  },
] as const;

export const brandBySlug = (slug: string) => brands.find((b) => b.slug === slug);

/** Sort order for the /brands hub: AWA-authorised first, then Direct partner, then Independent. */
export const brandsByAuthorisation = () => {
  const order: BrandAuthorisation[] = ['AWA-authorised', 'Direct service partner', 'Independent'];
  return [...brands].sort(
    (a, b) => order.indexOf(a.authorisation) - order.indexOf(b.authorisation),
  );
};
