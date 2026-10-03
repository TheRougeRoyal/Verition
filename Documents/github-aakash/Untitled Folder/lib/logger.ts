import pino from 'pino'

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development' ? {
    target: 'pino-pretty',
    options: { colorize: true }
  } : undefined
})

export function logError(route: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error)
  logger.error({ route }, message)
}
