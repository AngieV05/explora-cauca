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
