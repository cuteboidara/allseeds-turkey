/**
 * Hero image fallbacks for when no Sanity heroImage is configured.
 *
 * Uses Lorem Picsum (picsum.photos) — seed-based, always the same image
 * for the same seed, no API key required.
 *
 * To swap images: change the SEED constant or pick from ALTERNATE_SEEDS.
 * Browse seeds at: https://picsum.photos/seed/{seed}/1920/1080
 *
 * For production-quality themed images, run:
 *   node scripts/fetch-hero-image.mjs
 * (requires UNSPLASH_ACCESS_KEY in .env.local)
 */

const W = 1920
const H = 1080

function picsum(seed: string) {
  return `https://picsum.photos/seed/${seed}/${W}/${H}`
}

export const HERO_IMAGES = {
  /** Main homepage hero */
  home: picsum('allseeds-port-1'),

  /** Activities page */
  activities: picsum('allseeds-harvest-2'),

  /** Sustainability page */
  sustainability: picsum('allseeds-nature-3'),

  /** People page */
  people: picsum('allseeds-team-4'),

  /** Company page */
  company: picsum('allseeds-facility-5'),

  /** Contact page */
  contact: picsum('allseeds-global-6'),
} as const

// Alternative seeds to try (replace values above to change images):
// picsum('grain')       picsum('sunflower')   picsum('harvest')
// picsum('industry')    picsum('port')        picsum('ukraine')
// picsum('logistics')   picsum('factory')     picsum('cargo')
