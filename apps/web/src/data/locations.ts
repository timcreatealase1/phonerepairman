// Location catalogue for /locations/[slug] pages.
// Distances are approximate road distances from the Bridge Street shop.
// Don't invent specifics about local businesses, customers or repair volumes —
// keep claims general and accurate.

import type { FaqItem } from '~/lib/seo/schema';

export type Location = {
  slug: string;
  name: string;
  /** Town vs regional umbrella. */
  kind: 'town' | 'region';
  postcode?: string;
  /** Approximate road distance from Muswellbrook in km. Undefined for the home town. */
  distanceKm?: number;
  /** Approximate drive time. Undefined for the home town. */
  driveTime?: string;
  /** Compass direction from Muswellbrook. */
  direction?: 'home' | 'north' | 'south' | 'east' | 'west' | 'north-west' | 'north-east' | 'south-west' | 'south-east' | 'regional';
  /** One-sentence description used on the /locations hub. */
  short: string;
  /** Full hero lede on the detail page. */
  lede: string;
  /** Local character notes — industries, employers, what brings people in. */
  character: string;
  /** Town-specific FAQs. */
  faqs: FaqItem[];
  /** Other location slugs to feature as nearby. */
  related: string[];
};

export const locations: Location[] = [
  {
    slug: 'muswellbrook',
    name: 'Muswellbrook',
    kind: 'town',
    postcode: '2333',
    direction: 'home',
    short: 'Our home town. 22 Bridge Street, walk-in any time during opening hours.',
    lede:
      'Phone Repairman is based at 22 Bridge Street, Muswellbrook — opposite the post office. Walk in any time during opening hours. Most common phone repairs same-day where parts are in stock.',
    character:
      'Coal-mining and agricultural hub of the Upper Hunter, council seat for Muswellbrook Shire. Population ~12,000. We trade here year-round and have done since 2014.',
    faqs: [
      {
        question: 'Where exactly is the shop?',
        answer:
          '22 Bridge Street, Muswellbrook — opposite the post office. There is street parking along Bridge Street and additional parking around the block.',
      },
      {
        question: 'Do I need to book?',
        answer:
          'Walk-ins are welcome. Calling ahead helps for laptop / gaming-console / warranty work so we know parts are in stock and can book you in for a same-day return.',
      },
    ],
    related: ['aberdeen', 'scone', 'singleton'],
  },

  {
    slug: 'singleton',
    name: 'Singleton',
    kind: 'town',
    postcode: '2330',
    distanceKm: 45,
    driveTime: '35–40 min',
    direction: 'south',
    short: '45 km south on the New England Highway. Drop-off in Muswellbrook or onsite for business customers.',
    lede:
      '45 km south of our Bridge Street workshop on the New England Highway. Drop the device in next time you are in Muswellbrook, or for business customers we run an onsite service across Singleton.',
    character:
      'Major Hunter Valley town — coal mining, Lone Pine Barracks (one of the largest training establishments in the Australian Army), and a strong small-business community. Population ~17,000.',
    faqs: [
      {
        question: 'Is it worth the drive from Singleton?',
        answer:
          'For most repairs, yes — we are the local Authorised Agent for HP, Acer and Lexmark in the area, so warranty work stays local. For high-volume business customers we run onsite calls in Singleton, no drive required.',
      },
      {
        question: 'Do you do onsite work for Singleton businesses?',
        answer:
          'Yes — workstations, printers, network and point-of-sale across the town. Ring Tim directly to set up a partner agreement or one-off call.',
      },
    ],
    related: ['muswellbrook', 'scone', 'hunter-valley'],
  },

  {
    slug: 'scone',
    name: 'Scone',
    kind: 'town',
    postcode: '2337',
    distanceKm: 25,
    driveTime: '20 min',
    direction: 'north',
    short: '25 km north on the New England Highway — the horse capital. Drop-off or onsite.',
    lede:
      '25 km north of Muswellbrook on the New England Highway. Often called the horse capital of Australia — thoroughbred breeding, racing, and the equine industries that go with them. Drop your device in or book us onsite.',
    character:
      'Population ~5,000. Centre of the Australian thoroughbred industry — Scone Cup race week is a major event. Strong agricultural / equine business base needing reliable IT and device repair.',
    faqs: [
      {
        question: 'Do you cover Scone Racing Carnival and the equine industry?',
        answer:
          'Yes — onsite IT and device repair for stables, agistment operations, vets and tourism operators. Ring Tim directly for a partner agreement.',
      },
    ],
    related: ['muswellbrook', 'aberdeen', 'murrurundi'],
  },

  {
    slug: 'aberdeen',
    name: 'Aberdeen',
    kind: 'town',
    postcode: '2336',
    distanceKm: 12,
    driveTime: '10–12 min',
    direction: 'north',
    short: '12 km north — closest neighbour. Quick drop-off in Muswellbrook.',
    lede:
      'Just 12 km north of our workshop on the New England Highway. The closest Hunter Valley neighbour to Muswellbrook — quick drop-off and pickup, or book us onsite.',
    character:
      'Population ~1,800. Small town between Muswellbrook and Scone with a strong community feel — agriculture, small business, and a few mining-adjacent employers.',
    faqs: [
      {
        question: 'I am in Aberdeen — is it worth the trip into Muswellbrook?',
        answer:
          'Almost always — Aberdeen to Bridge Street is a 10–12 minute drive. Most common phone repairs are same-day. For business onsite work, ring directly.',
      },
    ],
    related: ['muswellbrook', 'scone'],
  },

  {
    slug: 'denman',
    name: 'Denman',
    kind: 'town',
    postcode: '2328',
    distanceKm: 25,
    driveTime: '20–25 min',
    direction: 'west',
    short: '25 km west — wine country meets mining. Drop-off or onsite.',
    lede:
      '25 km west of Muswellbrook on the Denman Road. Where the Hunter Valley wine region meets the Upper Hunter coal industry — vineyards on one side, mines on the other.',
    character:
      'Population ~1,500. Hunter Valley wine country plus active coal mining (Mount Arthur, Drayton). Strong base of tourism, hospitality and mining-services businesses.',
    faqs: [
      {
        question: 'Do you service mine-site IT in Denman?',
        answer:
          'Yes — bulk device repair, ruggedised laptops, fleet phones and onsite IT for mining and mining-services customers in the Denman area. Ring Tim directly.',
      },
    ],
    related: ['muswellbrook', 'merriwa', 'hunter-valley'],
  },

  {
    slug: 'merriwa',
    name: 'Merriwa',
    kind: 'town',
    postcode: '2329',
    distanceKm: 70,
    driveTime: '50–55 min',
    direction: 'west',
    short: '70 km west on the Liverpool Plains side. Drop-off or scheduled onsite.',
    lede:
      '70 km west of Muswellbrook on the Golden Highway, on the eastern edge of the Liverpool Plains. Drop your device in next time you are in Muswellbrook, or for business customers we schedule onsite visits across Merriwa.',
    character:
      'Population ~900. Agricultural town — sheep, cattle, cropping. Strong regional pride and a tight small-business community.',
    faqs: [
      {
        question: 'Is Merriwa too far for an onsite visit?',
        answer:
          'No — we run scheduled onsite visits to Merriwa, usually weekly or fortnightly depending on demand. For one-off business calls, ring directly to book.',
      },
    ],
    related: ['muswellbrook', 'denman'],
  },

  {
    slug: 'murrurundi',
    name: 'Murrurundi',
    kind: 'town',
    postcode: '2338',
    distanceKm: 70,
    driveTime: '45–50 min',
    direction: 'north',
    short: '70 km north on the New England Highway — gateway to the Liverpool Plains.',
    lede:
      '70 km north of Muswellbrook on the New England Highway, at the foot of the Liverpool Range. Drop-off in Muswellbrook or scheduled onsite visits for business customers.',
    character:
      'Population ~900. Heritage railway town and farming centre, gateway between the Upper Hunter and the Liverpool Plains agricultural region.',
    faqs: [
      {
        question: 'Do you cover the Liverpool Plains side too?',
        answer:
          'Mostly the Murrurundi side. Beyond Quirindi we usually point customers north to Tamworth. For business customers we are flexible — ring directly.',
      },
    ],
    related: ['muswellbrook', 'scone'],
  },

  {
    slug: 'hunter-valley',
    name: 'Hunter Valley',
    kind: 'region',
    direction: 'regional',
    short: 'Regional umbrella — Muswellbrook, Singleton, Scone, Cessnock and the wine country.',
    lede:
      'The Hunter Valley umbrella. Most of our day-to-day customers come from the Upper Hunter (Muswellbrook, Scone, Aberdeen) and Singleton — but we also handle business onsite work across the wider Hunter Valley region.',
    character:
      'NSW wine region with strong tourism, agriculture, equine, and mining industries. Our base is in the Upper Hunter; our service area covers most of the Hunter Valley for business customers.',
    faqs: [
      {
        question: 'Do you cover the Lower Hunter — Cessnock, Pokolbin, Maitland?',
        answer:
          'For one-off retail repairs, the trip from the Lower Hunter is usually too far. For business / MSP / fleet customers running operations in the Upper Hunter, we are the natural local partner regardless of where the head office is.',
      },
      {
        question: 'Can MSPs based in Newcastle subcontract us for Upper Hunter calls?',
        answer:
          'Yes — that is one of our main B2B lines. White-label or co-branded field-service hands in Muswellbrook, Singleton, Scone, Denman. Ring Tim directly to set up a partner agreement.',
      },
    ],
    related: ['muswellbrook', 'singleton', 'scone', 'denman'],
  },
] as const;

export const locationBySlug = (slug: string) => locations.find((l) => l.slug === slug);

export const locationsByKind = (kind: Location['kind']) => locations.filter((l) => l.kind === kind);
