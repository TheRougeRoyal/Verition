import crypto from 'crypto'

const API_KEY_HASH_SECRET = process.env.API_KEY_HASH_SECRET || 'default-hash-secret'
const API_KEY_PREFIX = process.env.API_KEY_PREFIX || 'sk_'

export function generateApiKey() {
  const randomBytes = crypto.randomBytes(32).toString('hex')
  const key = `${API_KEY_PREFIX}${randomBytes}`

  const hash = crypto
    .createHmac('sha256', API_KEY_HASH_SECRET)
    .update(key)
    .digest('hex')

  const masked = `${key.slice(0, 8)}••••${key.slice(-4)}`

  return { key, hash, masked }
}

export function verifyApiKey(providedKey: string, storedHash: string) {
  const hash = crypto
    .createHmac('sha256', API_KEY_HASH_SECRET)
    .update(providedKey)
    .digest('hex')

  return hash === storedHash
}
