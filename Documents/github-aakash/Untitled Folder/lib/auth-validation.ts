import { z } from 'zod'
import { logger } from '@/lib/logger'

export const AuthSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(8).max(128),
  name: z.string().trim().max(100).optional(),
})

export function validateAuthInput(data: any) {
  const result = AuthSchema.safeParse(data)
  if (!result.success) {
    logger.warn({ errors: result.error.format() }, 'Auth validation failed')
    return { error: result.error, data: null }
  }
  return { error: null, data: result.data }
}
