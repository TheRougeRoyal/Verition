// ponytail: simple in-memory fixed-window limiter to avoid adding deps.
// in-memory limiting doesn't work across serverless instances; replace with Redis/Upstash in production.

type LimitConfig = {
  windowMs: number
  max: number
}

const LIMITS: Record<string, LimitConfig> = {
  login: { windowMs: 15 * 60 * 1000, max: 5 },
  signup: { windowMs: 60 * 60 * 1000, max: 10 },
}

const stores = new Map<string, { count: number; reset: number }>()

export function rateLimit(key: string, route: 'login' | 'signup') {
  const config = LIMITS[route]
  const storeKey = `${route}:${key}`
  const now = Date.now()

  const record = stores.get(storeKey)

  if (!record || now > record.reset) {
    stores.set(storeKey, { count: 1, reset: now + config.windowMs })
    return { allowed: true, remaining: config.max - 1, reset: config.windowMs / 1000 }
  }

  if (record.count >= config.max) {
    return { allowed: false, remaining: 0, reset: Math.ceil((record.reset - now) / 1000) }
  }

  record.count++
  return { allowed: true, remaining: config.max - record.count, reset: Math.ceil((record.reset - now) / 1000) }
}
