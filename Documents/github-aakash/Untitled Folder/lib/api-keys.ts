import crypto from 'crypto'

let cachedHashSecret: string | null = null

function getApiKeyHashSecret(): string {
  if (cachedHashSecret) return cachedHashSecret

  const secret = process.env.API_KEY_HASH_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('API_KEY_HASH_SECRET must be defined and at least 32 characters long')
  }

  cachedHashSecret = secret
  return cachedHashSecret
}

const API_KEY_PREFIX = process.env.API_KEY_PREFIX || 'sk_'

export function generateApiKey() {
  const randomBytes = crypto.randomBytes(32).toString('hex')
  const key = `${API_KEY_PREFIX}${randomBytes}`

  const hash = crypto
    .createHmac('sha256', getApiKeyHashSecret())
    .update(key)
    .digest('hex')

  const masked = `${key.slice(0, 8)}••••${key.slice(-4)}`

  return { key, hash, masked }
}

export function verifyApiKey(providedKey: string, storedHash: string) {
  const providedHash = crypto
    .createHmac('sha256', getApiKeyHashSecret())
    .update(providedKey)
    .digest('hex')

  const providedHashBuffer = Buffer.from(providedHash, 'hex')
  const storedHashBuffer = Buffer.from(storedHash, 'hex')

  if (providedHashBuffer.length !== storedHashBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(providedHashBuffer, storedHashBuffer)
}
