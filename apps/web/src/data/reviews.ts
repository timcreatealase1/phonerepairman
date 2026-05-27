// Curated 5-star reviews pulled from the Google Business listing.
// Phase 4 (review automation) will replace this hand-curated set with a
// nightly D1 pull from the GBP API. For now, edit by hand when fresh
// reviews come in.
//
// Only include reviews that are: 5-star, contain a usable quote, and the
// author has a real name (not anonymous). Skip 1–4 star reviews — those
// go elsewhere (negative-response flow, not the marketing surface).

export type Review = {
  author: string;
  /** ISO date — when the review was posted */
  date: string;
  /** Human-friendly age ("18 weeks ago", "Apr 2024") — falls back to date if missing */
  whenLabel?: string;
  rating: 5;
  source: 'Google' | 'Facebook';
  /** The review text. Quote substantive parts; keep punctuation light-edit only. */
  body: string;
};

export const reviews: Review[] = [
  {
    author: 'Matthew Prendergast',
    date: '2026-01-20',
    whenLabel: '18 weeks ago',
    rating: 5,
    source: 'Google',
    body: 'I appreciate the good service and being upfront with costs and risks of the particular repair — without feeling rushed to make a decision.',
  },
  {
    author: 'Hayden Franklin',
    date: '2023-10-04',
    whenLabel: 'Oct 2023',
    rating: 5,
    source: 'Google',
    body: 'These guys are the real deal! Not only super polite but they\'re so fast and nothing was an issue. 10/10 I would highly recommend using their services.',
  },
  {
    author: 'Jen Ditchfield',
    date: '2024-07-03',
    whenLabel: 'Jul 2024',
    rating: 5,
    source: 'Google',
    body: 'Fantastic service. Talked about options for repair of screen so that I did not pay too much.',
  },
  {
    author: 'Dan Gale',
    date: '2024-04-05',
    whenLabel: 'Apr 2024',
    rating: 5,
    source: 'Google',
    body: "I'd give these guys an even higher rating if I could! Their service is incredibly quick and professional.",
  },
  {
    author: 'Dale Ridley',
    date: '2025-12-01',
    whenLabel: '24 weeks ago',
    rating: 5,
    source: 'Google',
    body: 'Very helpful, nice attitude, reliable, straight to problem.',
  },
  {
    author: 'Anton B Cunningham',
    date: '2026-01-13',
    whenLabel: '19 weeks ago',
    rating: 5,
    source: 'Google',
    body: 'Quick service.',
  },
  {
    author: 'Jaimmy L',
    date: '2023-08-26',
    whenLabel: 'Aug 2023',
    rating: 5,
    source: 'Google',
    body: "Highly recommended. I've used their services multiple times for devices — always 1,000,000% customer service.",
  },
] as const;

/** Featured set used on the homepage. */
export const featuredReviews = reviews.slice(0, 3);
