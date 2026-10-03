import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

let cached = (global as any).mongoose || { conn: null, promise: null }

async function dbConnect() {
  if (cached.conn) return cached.conn

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable')
  }

  // ponytail: prevent NoSQL injection by neutralizing operator objects in filters
  mongoose.set('sanitizeFilter', true)

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose.connection
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
