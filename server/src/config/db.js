import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import mongoose from 'mongoose'
import env from './env.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
let memoryServer = null

/**
 * Connects to MongoDB. When MONGODB_URL is empty, starts a local MongoDB
 * (via mongodb-memory-server) whose data is persisted in server/.data/db,
 * so the app runs with zero configuration.
 */
export async function connectDB() {
  let uri = env.mongoUrl
  if (!uri) {
    const { MongoMemoryServer } = await import('mongodb-memory-server')
    const dbPath = path.resolve(__dirname, '../../.data/db')
    fs.mkdirSync(dbPath, { recursive: true })
    console.log('ℹ️  MONGODB_URL not set — starting the built-in local database…')
    console.log('   (first run downloads MongoDB once, ~100 MB)')
    memoryServer = await MongoMemoryServer.create({
      instance: { dbPath, storageEngine: 'wiredTiger', dbName: 'exploremate', args: ['--wiredTigerCacheSizeGB', '0.25'] },
    })
    uri = memoryServer.getUri('exploremate')
  }
  mongoose.set('strictQuery', true)
  await mongoose.connect(uri)
  console.log(`✅ MongoDB connected${memoryServer ? ' (built-in local database)' : ''}`)
  return mongoose.connection
}

export async function disconnectDB() {
  await mongoose.disconnect()
  if (memoryServer) await memoryServer.stop({ doCleanup: false })
}
