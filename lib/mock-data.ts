// Datos de usuarios para autenticación local
export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  avatar?: string
  createdAt: string
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@example.com",
    role: "user",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2023-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "María González",
    email: "admin@example.com",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2022-11-20T08:30:00Z",
  },
]

// Función para autenticar usuario
export function authenticateUser(email: string, password: string): User | null {
  const user = mockUsers.find((u) => u.email === email)
  if (user && password === "123456") {
    return user
  }
  return null
}

// Función para obtener usuario por ID
export function getUserById(id: string): User | null {
  return mockUsers.find((u) => u.id === id) || null
}
