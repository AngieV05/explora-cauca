import bcrypt from "bcryptjs"
import connectDB, { isMongoDBAvailable } from "./mongodb"
import User from "./models/User"
import UserSession from "./models/UserSession"

// Datos mock para cuando no hay base de datos
const mockUsers = [
  {
    id: "1",
    email: "admin@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    name: "Administrador",
    role: "admin" as const,
    phone: "+57 300 123 4567",
    avatar: "/placeholder.svg?height=40&width=40",
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    email: "juan@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    name: "Juan Pérez",
    role: "user" as const,
    phone: "+57 300 987 6543",
    avatar: "/placeholder.svg?height=40&width=40",
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export interface AuthUser {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  phone?: string
  avatar?: string
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createUser(userData: {
  email: string
  password: string
  name: string
  phone?: string
}): Promise<AuthUser> {
  try {
    if (isMongoDBAvailable()) {
      await connectDB()

      const existingUser = await User.findOne({ email: userData.email })
      if (existingUser) {
        throw new Error("El usuario ya existe")
      }

      const hashedPassword = await hashPassword(userData.password)
      const user = new User({
        ...userData,
        password: hashedPassword,
        role: "user",
        emailVerified: false,
      })

      await user.save()
      return {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    } else {
      // Modo mock para Vercel preview
      const existingUser = mockUsers.find((u) => u.email === userData.email)
      if (existingUser) {
        throw new Error("El usuario ya existe")
      }

      const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        password: await hashPassword(userData.password),
        name: userData.name,
        role: "user" as const,
        phone: userData.phone,
        avatar: "/placeholder.svg?height=40&width=40",
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockUsers.push(newUser)
      return newUser
    }
  } catch (error) {
    console.error("Error creando usuario:", error)
    throw error
  }
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  try {
    if (isMongoDBAvailable()) {
      await connectDB()

      const user = await User.findOne({ email })
      if (!user) {
        return null
      }

      const isValidPassword = await comparePassword(password, user.password)
      if (!isValidPassword) {
        return null
      }

      return {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    } else {
      // Modo mock para Vercel preview
      const user = mockUsers.find((u) => u.email === email)
      if (!user) {
        return null
      }

      const isValidPassword = await comparePassword(password, user.password)
      if (!isValidPassword) {
        return null
      }

      return user
    }
  } catch (error) {
    console.error("Error autenticando usuario:", error)
    return null
  }
}

export async function createSession(userId: string): Promise<string> {
  const sessionToken = generateSessionToken()

  try {
    if (isMongoDBAvailable()) {
      await connectDB()

      const session = new UserSession({
        userId,
        sessionToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
      })

      await session.save()
    }
    // En modo mock, solo devolvemos el token sin guardarlo

    return sessionToken
  } catch (error) {
    console.error("Error creando sesión:", error)
    return sessionToken // Devolver token aunque falle la BD
  }
}

export async function validateSession(sessionToken: string): Promise<AuthUser | null> {
  try {
    if (isMongoDBAvailable()) {
      await connectDB()

      const session = await UserSession.findOne({
        sessionToken,
        expiresAt: { $gt: new Date() },
      }).populate("userId")

      if (!session || !session.userId) {
        return null
      }

      const user = session.userId as any
      return {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    } else {
      // En modo mock, validar con el primer usuario admin
      return mockUsers[0]
    }
  } catch (error) {
    console.error("Error validando sesión:", error)
    return null
  }
}

export async function deleteSession(sessionToken: string): Promise<void> {
  try {
    if (isMongoDBAvailable()) {
      await connectDB()
      await UserSession.deleteOne({ sessionToken })
    }
    // En modo mock no hacemos nada
  } catch (error) {
    console.error("Error eliminando sesión:", error)
  }
}

export async function updateUser(userId: string, updates: Partial<AuthUser>): Promise<AuthUser | null> {
  try {
    if (isMongoDBAvailable()) {
      await connectDB()

      const user = await User.findByIdAndUpdate(userId, { ...updates, updatedAt: new Date() }, { new: true })

      if (!user) {
        return null
      }

      return {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    } else {
      // Modo mock
      const userIndex = mockUsers.findIndex((u) => u.id === userId)
      if (userIndex === -1) {
        return null
      }

      mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates, updatedAt: new Date() }
      return mockUsers[userIndex]
    }
  } catch (error) {
    console.error("Error actualizando usuario:", error)
    return null
  }
}

function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}
