import connectDB from "./mongodb"
import User, { type IUser } from "./models/User"
import UserSession from "./models/UserSession"
import UserPreferences from "./models/UserPreferences"

export interface UserData {
  id: string
  email: string
  name: string
  phone?: string
  role: "user" | "admin"
  avatar?: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  phone?: string,
): Promise<UserData | null> {
  try {
    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return null
    }

    // Create new user
    const user = new User({
      email,
      password,
      name,
      phone,
      role: "user",
    })

    await user.save()

    // Create default preferences
    const preferences = new UserPreferences({
      userId: user._id,
      notifications: {
        email: true,
        push: false,
        sms: false,
      },
      privacy: {
        profileVisible: true,
        activityVisible: false,
      },
      preferences: {
        language: "es",
        theme: "system",
        region: "cauca",
      },
    })

    await preferences.save()

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }
  } catch (error) {
    console.error("Error creating user:", error)
    return null
  }
}

export async function authenticateUser(email: string, password: string): Promise<UserData | null> {
  try {
    await connectDB()

    const user = await User.findOne({ email })
    if (!user) {
      return null
    }

    const isValidPassword = await user.comparePassword(password)
    if (!isValidPassword) {
      return null
    }

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }
  } catch (error) {
    console.error("Error authenticating user:", error)
    return null
  }
}

export async function getUserById(id: string): Promise<UserData | null> {
  try {
    await connectDB()

    const user = await User.findById(id)
    if (!user) {
      return null
    }

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }
  } catch (error) {
    console.error("Error getting user by ID:", error)
    return null
  }
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<Pick<UserData, "name" | "phone" | "avatar">>,
): Promise<boolean> {
  try {
    await connectDB()

    const user = await User.findByIdAndUpdate(userId, updates, { new: true })
    return !!user
  } catch (error) {
    console.error("Error updating user profile:", error)
    return false
  }
}

export async function createUserSession(userId: string): Promise<string | null> {
  try {
    await connectDB()

    const sessionToken = crypto.randomUUID()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days

    const session = new UserSession({
      userId,
      sessionToken,
      expiresAt,
    })

    await session.save()
    return sessionToken
  } catch (error) {
    console.error("Error creating user session:", error)
    return null
  }
}

export async function validateSession(sessionToken: string): Promise<UserData | null> {
  try {
    await connectDB()

    const session = await UserSession.findOne({
      sessionToken,
      expiresAt: { $gt: new Date() },
    }).populate("userId")

    if (!session || !session.userId) {
      return null
    }

    const user = session.userId as IUser

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }
  } catch (error) {
    console.error("Error validating session:", error)
    return null
  }
}

export async function deleteSession(sessionToken: string): Promise<boolean> {
  try {
    await connectDB()

    await UserSession.deleteOne({ sessionToken })
    return true
  } catch (error) {
    console.error("Error deleting session:", error)
    return false
  }
}

export async function cleanupExpiredSessions(): Promise<void> {
  try {
    await connectDB()
    await UserSession.deleteMany({ expiresAt: { $lt: new Date() } })
  } catch (error) {
    console.error("Error cleaning up expired sessions:", error)
  }
}
