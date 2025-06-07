import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: "user" | "admin"
  avatar_url?: string
  email_verified: boolean
  created_at: string
  updated_at: string
}

export interface UserPreferences {
  id: string
  user_id: string
  notifications_email: boolean
  notifications_push: boolean
  notifications_sms: boolean
  privacy_profile_visible: boolean
  privacy_activity_visible: boolean
  language: string
  theme: string
  region: string
  created_at: string
  updated_at: string
}

export interface UserSession {
  id: string
  user_id: string
  session_token: string
  expires_at: string
  created_at: string
}
