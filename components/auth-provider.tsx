"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  authenticateUser,
  createUser,
  validateSession,
  createUserSession,
  deleteSession,
  getUserById,
  type UserData,
} from "@/lib/auth-utils"

interface AuthContextType {
  user: UserData | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (
    email: string,
    password: string,
    name: string,
    phone?: string,
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  isLoading: boolean
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkExistingSession()
  }, [])

  const checkExistingSession = async () => {
    try {
      const sessionToken = localStorage.getItem("session_token")
      if (sessionToken) {
        const user = await validateSession(sessionToken)
        if (user) {
          setUser(user)
        } else {
          localStorage.removeItem("session_token")
        }
      }
    } catch (error) {
      console.error("Error checking session:", error)
      localStorage.removeItem("session_token")
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    try {
      const user = await authenticateUser(email, password)
      if (user) {
        const sessionToken = await createUserSession(user.id)
        if (sessionToken) {
          localStorage.setItem("session_token", sessionToken)
          setUser(user)
          setIsLoading(false)
          return { success: true }
        } else {
          setIsLoading(false)
          return { success: false, error: "Error al crear la sesión" }
        }
      } else {
        setIsLoading(false)
        return { success: false, error: "Credenciales incorrectas" }
      }
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
      return { success: false, error: "Error interno del servidor" }
    }
  }

  const register = async (
    email: string,
    password: string,
    name: string,
    phone?: string,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    try {
      const newUser = await createUser(email, password, name, phone)
      if (newUser) {
        const sessionToken = await createUserSession(newUser.id)
        if (sessionToken) {
          localStorage.setItem("session_token", sessionToken)
          setUser(newUser)
          setIsLoading(false)
          return { success: true }
        } else {
          setIsLoading(false)
          return { success: false, error: "Usuario creado pero error al iniciar sesión" }
        }
      } else {
        setIsLoading(false)
        return { success: false, error: "Error al crear el usuario. El email podría estar en uso." }
      }
    } catch (error) {
      console.error("Register error:", error)
      setIsLoading(false)
      return { success: false, error: "Error interno del servidor" }
    }
  }

  const logout = async () => {
    const sessionToken = localStorage.getItem("session_token")
    if (sessionToken) {
      await deleteSession(sessionToken)
      localStorage.removeItem("session_token")
    }
    setUser(null)
  }

  const refreshUser = async () => {
    if (user) {
      const updatedUser = await getUserById(user.id)
      if (updatedUser) {
        setUser(updatedUser)
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
