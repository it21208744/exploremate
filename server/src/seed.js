/**
 * Seeds demo accounts and listings so you can try every feature right away.
 *   npm run seed            → adds demo data (skips if it already exists)
 *   npm run seed -- --fresh → wipes the demo accounts' data first
 */
import { connectDB, disconnectDB } from './config/db.js'
import { seedDemo } from './seedData.js'

await connectDB()
await seedDemo({ fresh: process.argv.includes('--fresh') })
await disconnectDB()
