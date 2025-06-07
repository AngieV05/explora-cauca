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

export async function getUserPreferences(userId: string): Promise<UserPreferencesData | null> {
  try {
    await connectDB()

    const preferences = await UserPreferences.findOne({ userId })
    if (!preferences) {
      return null
    }

    return {
      id: preferences._id.toString(),
      userId: preferences.userId.toString(),
      notifications: preferences.notifications,
      privacy: preferences.privacy,
      preferences: preferences.preferences,
      createdAt: preferences.createdAt.toISOString(),
      updatedAt: preferences.updatedAt.toISOString(),
    }
  } catch (error) {
    console.error("Error fetching user preferences:", error)
    return null
  }
}

export async function updateUserPreferences(
  userId: string,
  updates: Partial<{
    notifications: Partial<{ email: boolean; push: boolean; sms: boolean }>
    privacy: Partial<{ profileVisible: boolean; activityVisible: boolean }>
    preferences: Partial<{ language: string; theme: string; region: string }>
  }>,
): Promise<boolean> {
  try {
    await connectDB()

    const updateData: any = {}

    if (updates.notifications) {
      Object.keys(updates.notifications).forEach((key) => {
        updateData[`notifications.${key}`] = updates.notifications![key as keyof typeof updates.notifications]
      })
    }

    if (updates.privacy) {
      Object.keys(updates.privacy).forEach((key) => {
        updateData[`privacy.${key}`] = updates.privacy![key as keyof typeof updates.privacy]
      })
    }

    if (updates.preferences) {
      Object.keys(updates.preferences).forEach((key) => {
        updateData[`preferences.${key}`] = updates.preferences![key as keyof typeof updates.preferences]
      })
    }

    const result = await UserPreferences.findOneAndUpdate({ userId }, { $set: updateData }, { new: true, upsert: true })

    return !!result
  } catch (error) {
    console.error("Error updating user preferences:", error)
    return false
  }
}

export async function createDefaultPreferences(userId: string): Promise<boolean> {
  try {
    await connectDB()

    const preferences = new UserPreferences({
      userId,
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
    return true
  } catch (error) {
    console.error("Error creating default preferences:", error)
    return false
  }
}
