import { z } from 'zod'

export const ApiKeyCreateSchema = z.object({
  name: z.string().trim().min(1).max(64),
})

export function validateApiKeyInput(data: any) {
  return ApiKeyCreateSchema.safeParse(data)
}
