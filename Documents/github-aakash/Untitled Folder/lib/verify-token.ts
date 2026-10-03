import { SignJWT, jwtVerify, JWTPayload } from 'jose'

export interface SessionPayload extends JWTPayload {
  userId: string
  email: string
}

let cachedSecret: Uint8Array | null = null

function getJwtSecret(): Uint8Array {
  if (cachedSecret) return cachedSecret

  const secret = process.env.JWT_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must be defined and at least 32 characters long')
  }

  cachedSecret = new TextEncoder().encode(secret)
  return cachedSecret
}

export async function createSessionToken(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getJwtSecret())
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret(), {
      algorithms: ['HS256']
    })
    return payload as unknown as SessionPayload
  } catch (e) {
    return null
  }
}
