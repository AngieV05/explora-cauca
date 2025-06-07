import bcrypt from "bcryptjs"
import { supabase } from "./supabase"
import type { User } from "./supabase"

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

export async function createUser(email: string, password: string, name: string, phone?: string): Promise<User | null> {
  try {
    const passwordHash = await hashPassword(password)

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          email,
          password_hash: passwordHash,
          name,
          phone,
          role: "user",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating user:", error)
      return null
    }

    // Crear preferencias por defecto
    await supabase.from("user_preferences").insert([
      {
        user_id: data.id,
        notifications_email: true,
        privacy_profile_visible: true,
      },
    ])

    return data
  } catch (error) {
    console.error("Error in createUser:", error)
    return null
  }
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    const { data, error } = await supabase.from("users").select("*").eq("email", email).single()

    if (error || !data) {
      return null
    }

    const isValidPassword = await verifyPassword(password, data.password_hash)
    if (!isValidPassword) {
      return null
    }

    // Remover password_hash del objeto retornado
    const { password_hash, ...userWithoutPassword } = data
    return userWithoutPassword as User
  } catch (error) {
    console.error("Error in authenticateUser:", error)
    return null
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, email, name, phone, role, avatar_url, email_verified, created_at, updated_at")
      .eq("id", id)
      .single()

    if (error) {
      return null
    }

    return data
  } catch (error) {
    console.error("Error in getUserById:", error)
    return null
  }
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<Pick<User, "name" | "phone" | "avatar_url">>,
): Promise<boolean> {
  try {
    const { error } = await supabase.from("users").update(updates).eq("id", userId)

    return !error
  } catch (error) {
    console.error("Error in updateUserProfile:", error)
    return false
  }
}

export async function createUserSession(userId: string): Promise<string | null> {
  try {
    const sessionToken = crypto.randomUUID()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 días

    const { error } = await supabase.from("user_sessions").insert([
      {
        user_id: userId,
        session_token: sessionToken,
        expires_at: expiresAt.toISOString(),
      },
    ])

    if (error) {
      return null
    }

    return sessionToken
  } catch (error) {
    console.error("Error in createUserSession:", error)
    return null
  }
}

export async function validateSession(sessionToken: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from("user_sessions")
      .select(`
        user_id,
        expires_at,
        users (
          id, email, name, phone, role, avatar_url, email_verified, created_at, updated_at
        )
      `)
      .eq("session_token", sessionToken)
      .single()

    if (error || !data) {
      return null
    }

    // Verificar si la sesión ha expirado
    if (new Date(data.expires_at) < new Date()) {
      // Eliminar sesión expirada
      await supabase.from("user_sessions").delete().eq("session_token", sessionToken)
      return null
    }

    return data.users as User
  } catch (error) {
    console.error("Error in validateSession:", error)
    return null
  }
}

export async function deleteSession(sessionToken: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("user_sessions").delete().eq("session_token", sessionToken)

    return !error
  } catch (error) {
    console.error("Error in deleteSession:", error)
    return false
  }
}
