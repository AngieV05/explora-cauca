import connectDB from "./mongodb"
import UserPreferences from "./models/UserPreferences"

export interface UserPreferencesData {
  id: string
  userId: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    profileVisible: boolean
    activityVisible: boolean
  }
  preferences: {
    language: string
    theme: string
    region: string
  }
  createdAt: string
  updatedAt: string
}

export async function getUserPreferences(userId: string) {
  try {
    await connectDB()
    const userPreferences = await UserPreferences.findOne({ userId })
    return userPreferences || { userId, theme: "light", notificationsEnabled: true } // Default preferences
  } catch (error) {
    console.error("Error fetching user preferences:", error)
    return { userId, theme: "light", notificationsEnabled: true } // Return default preferences on error
  }
}

export async function updateUserPreferences(
  userId: string,
  preferences: { theme?: string; notificationsEnabled?: boolean },
) {
  try {
    await connectDB()
    await UserPreferences.findOneAndUpdate({ userId }, preferences, { upsert: true, new: true })
    return { success: true }
  } catch (error) {
    console.error("Error updating user preferences:", error)
    return { success: false, error: "Failed to update preferences" }
  }
}
