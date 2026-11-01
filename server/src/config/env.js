import 'dotenv/config'

const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUrl: (process.env.MONGODB_URL || '').trim(),
  jwtSecret: process.env.JWT_SECRET || 'dev-only-secret-please-change',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  ai: {
    provider: (process.env.AI_PROVIDER || 'auto').toLowerCase(),
    geminiKey: (process.env.GEMINI_API_KEY || '').trim(),
    geminiModel: process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite',
    openaiKey: (process.env.OPENAI_API_KEY || '').trim(),
    openaiModel: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
  },
}

if (env.nodeEnv === 'production' && env.jwtSecret.startsWith('dev-only')) {
  console.warn('⚠️  JWT_SECRET is not set — set a strong secret before deploying.')
}

export default env
