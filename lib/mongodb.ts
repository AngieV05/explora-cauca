import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.warn("MONGODB_URI no está definida. Usando modo sin base de datos.")
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var _mongoose: MongooseCache | undefined
}

let cached = global._mongoose

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (!MONGODB_URI) {
    console.warn("No hay conexión a MongoDB disponible")
    return null
  }

  if (cached!.conn) {
    return cached!.conn
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    cached!.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("✅ MongoDB conectado exitosamente")
        return mongoose
      })
      .catch((error) => {
        console.error("❌ Error conectando a MongoDB:", error)
        cached!.promise = null
        throw error
      })
  }

  try {
    cached!.conn = await cached!.promise
  } catch (e) {
    cached!.promise = null
    console.error("Error en conexión MongoDB:", e)
    throw e
  }

  return cached!.conn
}

export default connectDB

// Función para verificar si MongoDB está disponible
export const isMongoDBAvailable = () => {
  return !!MONGODB_URI && !!cached?.conn
}
