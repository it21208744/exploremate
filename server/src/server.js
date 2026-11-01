import env from './config/env.js'
import { connectDB, disconnectDB } from './config/db.js'
import { createApp } from './app.js'
import { activeProvider } from './services/ai.js'
import { seedDemo } from './seedData.js'

try {
  await connectDB()
} catch (err) {
  console.error('❌ Could not connect to MongoDB:', err.message)
  console.error('   Check MONGODB_URL in server/.env (or leave it empty to use the built-in database).')
  process.exit(1)
}

// AUTO_SEED=true tops up the sample data on every start (only adds what is missing)
if (process.env.AUTO_SEED === 'true') {
  await seedDemo({ log: true }).catch((e) => console.warn('Auto-seed failed:', e.message))
}

const server = createApp().listen(env.port, () => {
  const ai = activeProvider()
  console.log(`🚀 ExploreMate API running on http://localhost:${env.port}`)
  console.log(
    ai === 'local'
      ? '🤖 AI: built-in planner (add GEMINI_API_KEY or OPENAI_API_KEY in server/.env for AI-written plans)'
      : `🤖 AI: ${ai}`
  )
})

const shutdown = async () => {
  server.close()
  await disconnectDB().catch(() => {})
  process.exit(0)
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
