/**
 * Placeholder image URLs using Lorem Picsum (picsum.photos).
 * Seed-based = always the same image for the same seed, no API key required.
 * Every slot has its own seed so each gets a distinct stock photo.
 *
 * To swap any image, change its seed string and verify at:
 *   https://picsum.photos/seed/{seed}/800/600
 *
 * For production-quality themed images run:
 *   node scripts/fetch-hero-image.mjs   (requires UNSPLASH_ACCESS_KEY)
 */

function picsum(seed: string, w = 1920, h = 1080) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`
}

// ── Hero images (full-bleed, 1920×1080) ─────────────────────────────────────
export const HERO_IMAGES = {
  home:           picsum('as-hero-home'),
  activities:     picsum('as-hero-activities'),
  sustainability: picsum('as-hero-sustain'),
  people:         picsum('as-hero-people'),
  company:        picsum('as-hero-company'),
  contact:        picsum('as-hero-contact'),
} as const

// ── Home — About 2×2 grid (400×300) ─────────────────────────────────────────
// One image per cell: Procurement / Processing / Storage / Shipping
export const ABOUT_GRID_IMAGES = [
  picsum('as-about-1', 400, 300),
  picsum('as-about-2', 400, 300),
  picsum('as-about-3', 400, 300),
  picsum('as-about-4', 400, 300),
] as const

// ── Home — People 3×2 portrait grid (300×300) ───────────────────────────────
export const HOME_TEAM_IMAGES = [
  picsum('as-team-a', 300, 300),
  picsum('as-team-b', 300, 300),
  picsum('as-team-c', 300, 300),
  picsum('as-team-d', 300, 300),
  picsum('as-team-e', 300, 300),
  picsum('as-team-f', 300, 300),
] as const

// ── Activities — per-section images (800×600) ────────────────────────────────
export const ACTIVITY_IMAGES = {
  procurement: picsum('as-act-procure', 800, 600),
  processing:  picsum('as-act-process', 800, 600),
  storage:     picsum('as-act-storage', 800, 600),
  trading:     picsum('as-act-trading', 800, 600),
  inland:      picsum('as-act-inland',  800, 600),
} as const

// Ordered array matches the fallback items array (index 0-4)
export const ACTIVITY_IMAGES_LIST = [
  ACTIVITY_IMAGES.procurement,
  ACTIVITY_IMAGES.processing,
  ACTIVITY_IMAGES.storage,
  ACTIVITY_IMAGES.trading,
  ACTIVITY_IMAGES.inland,
] as const

// ── Sustainability — per-pillar images (800×600) ─────────────────────────────
export const SUSTAINABILITY_IMAGES = {
  environmental: picsum('as-sus-env',     800, 600),
  quality:       picsum('as-sus-quality', 800, 600),
  social:        picsum('as-sus-social',  800, 600),
} as const

export const SUSTAINABILITY_IMAGES_LIST = [
  SUSTAINABILITY_IMAGES.environmental,
  SUSTAINABILITY_IMAGES.quality,
  SUSTAINABILITY_IMAGES.social,
] as const

// ── People — team portrait grid (300×400) ───────────────────────────────────
export const PORTRAIT_IMAGES = [
  picsum('as-portrait-1', 300, 400),
  picsum('as-portrait-2', 300, 400),
  picsum('as-portrait-3', 300, 400),
  picsum('as-portrait-4', 300, 400),
  picsum('as-portrait-5', 300, 400),
  picsum('as-portrait-6', 300, 400),
  picsum('as-portrait-7', 300, 400),
  picsum('as-portrait-8', 300, 400),
] as const

// ── Company — Our Story section image (800×600) ──────────────────────────────
export const COMPANY_STORY_IMAGE = picsum('as-company-hq', 800, 600)
