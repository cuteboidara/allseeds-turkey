import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const PRODUCT_LABELS: Record<string, string> = {
  refined: 'Refined Sunflower Oil (food-grade)',
  crude: 'Crude Sunflower Oil (industrial)',
  both: 'Both (compare refined & crude)',
}

const VOLUME_LABELS: Record<string, string> = {
  '50-100': '50–100 tons',
  '100-500': '100–500 tons',
  '500-1000': '500–1,000 tons',
  '1000+': '1,000+ tons',
}

const TIMELINE_LABELS: Record<string, string> = {
  urgent: 'Urgent (ASAP — within 2 weeks)',
  '1-2months': '1–2 months',
  flexible: 'Flexible',
  exploring: 'Exploring options',
}

function createTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

function userEmailHtml(data: Record<string, string>) {
  const product = PRODUCT_LABELS[data.product] ?? data.product
  const volume = VOLUME_LABELS[data.volume] ?? data.volume
  const timeline = TIMELINE_LABELS[data.timeline] ?? data.timeline

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%">
  <!-- Header -->
  <tr><td style="background:#2c5f2d;padding:32px 40px;text-align:center">
    <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700">Allseeds Turkey</h1>
    <p style="color:#a3d9a5;margin:8px 0 0;font-size:14px">Bulk Sunflower Oil Export</p>
  </td></tr>
  <!-- Body -->
  <tr><td style="padding:36px 40px">
    <h2 style="color:#2c5f2d;margin:0 0 8px;font-size:20px">Quotation Request Received</h2>
    <p style="color:#555;margin:0 0 24px;font-size:15px">Hi ${data.firstName}, thank you for your interest in Allseeds Turkey!</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-radius:8px;padding:20px;margin-bottom:24px">
      <tr><td style="padding:6px 0;color:#333;font-size:14px"><strong>Product:</strong> ${product}</td></tr>
      <tr><td style="padding:6px 0;color:#333;font-size:14px"><strong>Volume:</strong> ${volume}</td></tr>
      <tr><td style="padding:6px 0;color:#333;font-size:14px"><strong>Timeline:</strong> ${timeline}</td></tr>
      ${data.specialRequirements ? `<tr><td style="padding:6px 0;color:#333;font-size:14px"><strong>Special requirements:</strong> ${data.specialRequirements}</td></tr>` : ''}
    </table>

    <h3 style="color:#333;font-size:15px;margin:0 0 12px">What happens next:</h3>
    <p style="color:#555;font-size:14px;margin:0 0 6px">Our sales team will contact you within 24 hours</p>
    <p style="color:#555;font-size:14px;margin:0 0 6px">Expected response: 2–4 hours during business hours (9 AM – 6 PM Istanbul)</p>
    <p style="color:#555;font-size:14px;margin:0 0 24px">We will provide a custom quotation based on your volume and requirements</p>

    <div style="background:#fff8f0;border:1px solid #ffd9b3;border-radius:8px;padding:20px;margin-bottom:24px">
      <p style="color:#c05000;font-size:14px;font-weight:700;margin:0 0 10px">Can't wait? Contact us now:</p>
      <p style="margin:4px 0;font-size:14px;color:#333">WhatsApp: <a href="https://wa.me/905464921032" style="color:#2c5f2d;font-weight:700">+90 546 492 1032</a></p>
      <p style="margin:4px 0;font-size:14px;color:#333">Email: <a href="mailto:turkey@allseeds.com" style="color:#2c5f2d">turkey@allseeds.com</a></p>
    </div>

    <p style="color:#888;font-size:12px;margin:0">
      <strong style="color:#555">About Allseeds Turkey:</strong> 10+ years export experience · ISO 9001, ISO 22000, FSSC 22000 certified · 1,000–5,000 tons annual capacity · Competitive pricing · 15–20 day shipping from Turkey
    </p>
  </td></tr>
  <!-- Footer -->
  <tr><td style="background:#f0f0f0;padding:20px 40px;text-align:center">
    <p style="color:#888;font-size:12px;margin:0">Allseeds Turkey | Istanbul, Turkey</p>
    <p style="color:#888;font-size:12px;margin:4px 0 0">turkey@allseeds.com | +90 546 492 1032 | allseedsturkey.com</p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`
}

function internalEmailHtml(data: Record<string, string>, timestamp: string) {
  const product = PRODUCT_LABELS[data.product] ?? data.product
  const volume = VOLUME_LABELS[data.volume] ?? data.volume
  const timeline = TIMELINE_LABELS[data.timeline] ?? data.timeline

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%">
  <tr><td style="background:#1a1a2e;padding:24px 32px">
    <h1 style="color:#ffffff;margin:0;font-size:18px">NEW LEAD — Action Required</h1>
    <p style="color:#aaa;margin:6px 0 0;font-size:13px">${timestamp}</p>
  </td></tr>
  <tr><td style="padding:28px 32px">
    <h2 style="color:#2c5f2d;margin:0 0 16px;font-size:16px">${data.firstName} ${data.lastName} — ${data.company}</h2>

    <table width="100%" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:14px;margin-bottom:20px">
      <tr style="background:#f8f8f8"><td style="padding:8px 12px;font-weight:700;color:#333;width:40%">Name</td><td style="padding:8px 12px;color:#555">${data.firstName} ${data.lastName}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:700;color:#333">Company</td><td style="padding:8px 12px;color:#555">${data.company}</td></tr>
      <tr style="background:#f8f8f8"><td style="padding:8px 12px;font-weight:700;color:#333">Email</td><td style="padding:8px 12px"><a href="mailto:${data.email}" style="color:#2c5f2d">${data.email}</a></td></tr>
      <tr><td style="padding:8px 12px;font-weight:700;color:#333">Phone</td><td style="padding:8px 12px;color:#555">${data.phone}</td></tr>
      <tr style="background:#f8f8f8"><td style="padding:8px 12px;font-weight:700;color:#333">Product</td><td style="padding:8px 12px;color:#555">${product}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:700;color:#333">Volume</td><td style="padding:8px 12px;color:#555">${volume}</td></tr>
      <tr style="background:#f8f8f8"><td style="padding:8px 12px;font-weight:700;color:#333">Timeline</td><td style="padding:8px 12px;color:#555">${timeline}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:700;color:#333">Contact via</td><td style="padding:8px 12px;color:#555">${data.contactMethod}</td></tr>
      ${data.specialRequirements ? `<tr style="background:#f8f8f8"><td style="padding:8px 12px;font-weight:700;color:#333">Special reqs</td><td style="padding:8px 12px;color:#555">${data.specialRequirements}</td></tr>` : ''}
    </table>

    <div style="background:#fff3cd;border:1px solid #ffc107;border-radius:8px;padding:16px">
      <p style="color:#856404;font-size:14px;font-weight:700;margin:0">Contact within 2 hours for best conversion!</p>
    </div>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  let body: Record<string, string>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const required = ['firstName', 'lastName', 'company', 'email', 'phone', 'product', 'volume', 'timeline', 'contactMethod']
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
    }
  }

  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Europe/Istanbul', dateStyle: 'full', timeStyle: 'short' })

  // Always log lead server-side (visible in Vercel/server logs even without email)
  console.log('[QUOTATION LEAD]', JSON.stringify({ ...body, timestamp }, null, 2))

  const transport = createTransport()
  if (transport) {
    const FROM = process.env.FROM_EMAIL ?? process.env.SMTP_USER ?? 'noreply@allseedsturkey.com'
    const product = PRODUCT_LABELS[body.product] ?? body.product
    const volume = VOLUME_LABELS[body.volume] ?? body.volume

    const [userResult, internalResult] = await Promise.allSettled([
      // Confirmation to user
      transport.sendMail({
        from: `"Allseeds Turkey" <${FROM}>`,
        to: body.email,
        subject: 'Your Sunflower Oil Quotation Request — Allseeds Turkey',
        html: userEmailHtml(body),
      }),
      // Lead notification to team
      transport.sendMail({
        from: `"Allseeds Turkey Lead" <${FROM}>`,
        to: 'turkey@allseeds.com, deniz.arslan@allseeds.com, natalia@allseeds.com',
        subject: `NEW LEAD: ${body.company} — ${volume} ${product}`,
        html: internalEmailHtml(body, timestamp),
      }),
    ])

    if (userResult.status === 'rejected') {
      console.error('[EMAIL] Failed to send user confirmation:', userResult.reason)
    }
    if (internalResult.status === 'rejected') {
      console.error('[EMAIL] Failed to send internal notification:', internalResult.reason)
    }
  } else {
    console.warn('[EMAIL] SMTP not configured — set SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local to enable emails')
  }

  return NextResponse.json({ success: true })
}
