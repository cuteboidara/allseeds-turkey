/**
 * fetch-hero-image.mjs
 *
 * Fetches a high-quality hero image from Unsplash, uploads it to Sanity,
 * and patches the home documents (EN + TR) with the new heroImage.
 *
 * Prerequisites:
 *   1. Get a free Unsplash API key at https://unsplash.com/developers
 *   2. Add to .env.local:  UNSPLASH_ACCESS_KEY=your_key_here
 *   3. SANITY_API_TOKEN must also be set in .env.local
 *
 * Usage:
 *   node scripts/fetch-hero-image.mjs
 *
 * Optional — target a specific page document:
 *   node scripts/fetch-hero-image.mjs --doc home-en --query "sunflower field golden hour"
 *   node scripts/fetch-hero-image.mjs --doc activities-en --query "oilseed processing plant"
 */

import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import { writeFile, unlink } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'
import { readFileSync } from 'fs'

// ── Load .env.local manually (no dotenv dependency) ──────────────────────────
function loadEnv() {
  try {
    const raw = readFileSync(new URL('../.env.local', import.meta.url), 'utf-8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
      if (!process.env[key]) process.env[key] = val
    }
  } catch {
    // .env.local not found — rely on existing env vars
  }
}
loadEnv()

// ── Config ────────────────────────────────────────────────────────────────────
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN

// Parse CLI args
const args = process.argv.slice(2)
const docArg = args[args.indexOf('--doc') + 1] ?? null
const queryArg = args[args.indexOf('--query') + 1] ?? null

// Default search queries per document type
const DEFAULT_QUERIES = {
  'home-en':           'industrial oilseed processing facility port night',
  'home-tr':           'industrial oilseed processing facility port night',
  'activities-en':     'sunflower harvest agricultural field Ukraine',
  'activities-tr':     'sunflower harvest agricultural field Ukraine',
  'sustainability-en': 'green sustainable agriculture environment',
  'sustainability-tr': 'green sustainable agriculture environment',
  'people-en':         'professional team agricultural industry',
  'people-tr':         'professional team agricultural industry',
  'company-en':        'modern industrial facility corporate headquarters',
  'company-tr':        'modern industrial facility corporate headquarters',
  'contact-en':        'global business international trade port',
  'contact-tr':        'global business international trade port',
}

// Which documents to update (default: both home docs)
const TARGET_DOCS = docArg
  ? [docArg]
  : ['home-en', 'home-tr']

// ── Validation ────────────────────────────────────────────────────────────────
if (!UNSPLASH_ACCESS_KEY) {
  console.error('\nError: UNSPLASH_ACCESS_KEY not set.\n')
  console.error('  1. Register free at https://unsplash.com/developers')
  console.error('  2. Create an application to get an Access Key')
  console.error('  3. Add to .env.local:  UNSPLASH_ACCESS_KEY=your_key_here\n')
  process.exit(1)
}

if (!SANITY_API_TOKEN) {
  console.error('\nError: SANITY_API_TOKEN not set in .env.local\n')
  process.exit(1)
}

// ── Sanity client ─────────────────────────────────────────────────────────────
const sanity = createClient({
  projectId: '87ez7ybh',
  dataset: 'production',
  apiVersion: '2026-04-28',
  token: SANITY_API_TOKEN,
  useCdn: false,
})

// ── Unsplash search ───────────────────────────────────────────────────────────
async function searchUnsplash(query) {
  const url = new URL('https://api.unsplash.com/search/photos')
  url.searchParams.set('query', query)
  url.searchParams.set('orientation', 'landscape')
  url.searchParams.set('per_page', '5')
  url.searchParams.set('order_by', 'relevant')

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Unsplash API error ${res.status}: ${body}`)
  }

  const data = await res.json()
  if (!data.results?.length) throw new Error(`No results for query: "${query}"`)

  // Pick the result with highest resolution
  const photo = data.results.reduce((best, p) =>
    (p.width * p.height) > (best.width * best.height) ? p : best
  )

  return {
    downloadUrl: photo.urls.raw + '&w=1920&h=1080&fit=crop&auto=format&q=85',
    thumbUrl: photo.urls.small,
    photographer: photo.user.name,
    photographerUrl: photo.user.links.html,
    altText: photo.alt_description ?? query,
    photoId: photo.id,
    photoUrl: photo.links.html,
  }
}

// ── Download image to temp file ───────────────────────────────────────────────
async function downloadImage(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to download image: ${res.status}`)

  const buffer = Buffer.from(await res.arrayBuffer())
  const tmpPath = join(tmpdir(), `allseeds-hero-${Date.now()}.jpg`)
  await writeFile(tmpPath, buffer)
  return tmpPath
}

// ── Upload to Sanity assets ───────────────────────────────────────────────────
async function uploadToSanity(filePath, filename) {
  const asset = await sanity.assets.upload('image', createReadStream(filePath), {
    filename,
    contentType: 'image/jpeg',
  })
  return asset
}

// ── Patch document heroImage ──────────────────────────────────────────────────
async function patchDocument(docId, assetId) {
  await sanity
    .patch(docId)
    .set({
      heroImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
      },
    })
    .commit()
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\nFetching hero image(s) for: ${TARGET_DOCS.join(', ')}\n`)

  // We only need to fetch/upload one image per unique query
  const processed = new Map() // query → assetId

  for (const docId of TARGET_DOCS) {
    const query = queryArg ?? DEFAULT_QUERIES[docId] ?? 'industrial port oilseed processing'

    let assetId = processed.get(query)

    if (!assetId) {
      console.log(`Searching Unsplash: "${query}"`)
      const photo = await searchUnsplash(query)
      console.log(`  Found: ${photo.altText}`)
      console.log(`  Photographer: ${photo.photographer} (${photo.photoUrl})`)
      console.log(`  Downloading...`)

      const tmpPath = await downloadImage(photo.downloadUrl)
      console.log(`  Uploading to Sanity...`)
      const asset = await uploadToSanity(tmpPath, `hero-${docId}-${photo.photoId}.jpg`)
      assetId = asset._id
      processed.set(query, assetId)

      await unlink(tmpPath).catch(() => {})
      console.log(`  Uploaded: ${assetId}`)
      console.log(`\n  Attribution (required by Unsplash guidelines):`)
      console.log(`  Photo by ${photo.photographer} on Unsplash`)
      console.log(`  ${photo.photoUrl}\n`)
    }

    console.log(`Patching "${docId}" with heroImage...`)
    await patchDocument(docId, assetId)
    console.log(`  Done.`)
  }

  console.log('\nAll done! Refresh your site to see the new hero image(s).\n')
}

main().catch((err) => {
  console.error('\nFailed:', err.message)
  process.exit(1)
})
