const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

// Conectar a MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/explora-cauca")
    console.log("✅ Conectado a MongoDB")
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error)
    process.exit(1)
  }
}

// Esquemas
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatar: String,
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const UserPreferencesSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: false },
      sms: { type: Boolean, default: false },
    },
    privacy: {
      profileVisible: { type: Boolean, default: true },
      showActivity: { type: Boolean, default: false },
    },
    preferences: {
      language: { type: String, default: "es" },
      theme: { type: String, default: "system" },
      region: { type: String, default: "Cauca" },
    },
  },
  { timestamps: true },
)

const User = mongoose.model("User", UserSchema)
const UserPreferences = mongoose.model("UserPreferences", UserPreferencesSchema)

async function seedDatabase() {
  try {
    await connectDB()

    // Limpiar datos existentes
    await User.deleteMany({})
    await UserPreferences.deleteMany({})
    console.log("🧹 Datos existentes eliminados")

    // Hash de contraseña para "123456"
    const hashedPassword = await bcrypt.hash("123456", 10)

    // Crear usuarios de ejemplo
    const users = await User.create([
      {
        email: "juan@example.com",
        password: hashedPassword,
        name: "Juan Pérez",
        phone: "+57 300 123 4567",
        role: "user",
        emailVerified: true,
      },
      {
        email: "admin@example.com",
        password: hashedPassword,
        name: "María González",
        phone: "+57 301 987 6543",
        role: "admin",
        emailVerified: true,
      },
      {
        email: "ana@example.com",
        password: hashedPassword,
        name: "Ana Rodríguez",
        phone: "+57 302 456 7890",
        role: "user",
        emailVerified: true,
      },
    ])

    console.log("👥 Usuarios creados:", users.length)

    // Crear preferencias por defecto para cada usuario
    for (const user of users) {
      await UserPreferences.create({
        userId: user._id,
        notifications: {
          email: true,
          push: false,
          sms: false,
        },
        privacy: {
          profileVisible: true,
          showActivity: false,
        },
        preferences: {
          language: "es",
          theme: "system",
          region: "Cauca",
        },
      })
    }

    console.log("⚙️ Preferencias de usuario creadas")
    console.log("✅ Base de datos inicializada correctamente")

    console.log("\n📋 Usuarios de prueba:")
    console.log("👤 Usuario: juan@example.com | Contraseña: 123456 | Rol: user")
    console.log("👨‍💼 Admin: admin@example.com | Contraseña: 123456 | Rol: admin")
    console.log("👩 Usuario: ana@example.com | Contraseña: 123456 | Rol: user")
  } catch (error) {
    console.error("❌ Error inicializando la base de datos:", error)
  } finally {
    await mongoose.disconnect()
    console.log("🔌 Desconectado de MongoDB")
  }
}

seedDatabase()
