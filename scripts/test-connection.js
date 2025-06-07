const mongoose = require("mongoose")

async function testConnection() {
  try {
    console.log("🔄 Intentando conectar a MongoDB...")

    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/explora-cauca"
    console.log("📍 URI de conexión:", mongoUri.replace(/\/\/.*@/, "//***:***@"))

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout después de 5s en lugar de 30s
    })

    console.log("✅ ¡Conexión exitosa a MongoDB!")

    // Verificar que podemos crear una colección de prueba
    const testCollection = mongoose.connection.db.collection("test")
    await testCollection.insertOne({ test: "conexión exitosa", timestamp: new Date() })
    await testCollection.deleteOne({ test: "conexión exitosa" })

    console.log("✅ ¡Operaciones de base de datos funcionando correctamente!")

    // Mostrar información de la base de datos
    const admin = mongoose.connection.db.admin()
    const info = await admin.serverStatus()
    console.log("📊 Información del servidor:")
    console.log(`   - Versión: ${info.version}`)
    console.log(`   - Host: ${info.host}`)
    console.log(`   - Uptime: ${Math.floor(info.uptime / 60)} minutos`)
  } catch (error) {
    console.error("❌ Error de conexión:")

    if (error.name === "MongoServerSelectionError") {
      console.error("   - No se puede conectar al servidor MongoDB")
      console.error("   - Verifica que MongoDB esté ejecutándose")
      console.error("   - Verifica la URI de conexión")
    } else if (error.name === "MongoParseError") {
      console.error("   - URI de conexión inválida")
      console.error("   - Verifica el formato de MONGODB_URI")
    } else {
      console.error("   - Error:", error.message)
    }

    console.log("\n🔧 Soluciones posibles:")
    console.log("   1. Verifica que MONGODB_URI esté configurada correctamente")
    console.log("   2. Si usas MongoDB local, asegúrate de que esté ejecutándose")
    console.log("   3. Si usas MongoDB Atlas, verifica las credenciales y whitelist de IP")
  } finally {
    await mongoose.disconnect()
    console.log("🔌 Desconectado de MongoDB")
  }
}

testConnection()
