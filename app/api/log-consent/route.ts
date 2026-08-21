import { NextRequest, NextResponse } from 'next/server'

const attempts = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 60_000
const MAX_ATTEMPTS = 10

function clientKey(req: NextRequest) {
  return req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

export async function POST(req: NextRequest) {
  const key = clientKey(req)
  const now = Date.now()
  const current = attempts.get(key)
  if (!current || current.resetAt <= now) attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
  else if (current.count >= MAX_ATTEMPTS) return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429 })
  else current.count += 1

  try {
    const body = await req.json()
    const choice = body?.choice
    if (choice !== 'accept' && choice !== 'reject') return NextResponse.json({ success: false, error: 'Invalid consent choice' }, { status: 400 })
    const userAgent = typeof body?.userAgent === 'string' ? body.userAgent.slice(0, 300) : undefined
    const url = typeof body?.url === 'string' ? body.url.slice(0, 500) : undefined
    const recordedAt = new Date().toISOString()
    console.info('[consent]', { choice, userAgentPresent: Boolean(userAgent), urlPresent: Boolean(url), recordedAt })
    return NextResponse.json({ success: true, recordedAt })
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }
}
