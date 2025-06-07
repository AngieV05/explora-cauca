import { supabase } from "./supabase"
import type { UserPreferences } from "./supabase"

export async function getUserPreferences(userId: string): Promise<UserPreferences | null> {
  try {
    const { data, error } = await supabase.from("user_preferences").select("*").eq("user_id", userId).single()

    if (error) {
      console.error("Error fetching user preferences:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in getUserPreferences:", error)
    return null
  }
}

export async function updateUserPreferences(
  userId: string,
  preferences: Partial<Omit<UserPreferences, "id" | "user_id" | "created_at" | "updated_at">>,
): Promise<boolean> {
  try {
    const { error } = await supabase.from("user_preferences").update(preferences).eq("user_id", userId)

    if (error) {
      console.error("Error updating user preferences:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in updateUserPreferences:", error)
    return false
  }
}

export async function createDefaultPreferences(userId: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("user_preferences").insert([
      {
        user_id: userId,
        notifications_email: true,
        notifications_push: false,
        notifications_sms: false,
        privacy_profile_visible: true,
        privacy_activity_visible: false,
        language: "es",
        theme: "system",
        region: "cauca",
      },
    ])

    if (error) {
      console.error("Error creating default preferences:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in createDefaultPreferences:", error)
    return false
  }
}
