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

// Preferencias de usuario mock
export interface UserPreferences {
  userId: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    profileVisible: boolean
    showActivity: boolean
  }
  preferences: {
    language: string
    theme: string
    region: string
  }
}

export const mockUserPreferences: UserPreferences[] = [
  {
    userId: "1",
    notifications: {
      email: true,
      push: false,
      sms: true,
    },
    privacy: {
      profileVisible: true,
      showActivity: true,
    },
    preferences: {
      language: "es",
      theme: "light",
      region: "Cauca",
    },
  },
  {
    userId: "2",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      profileVisible: true,
      showActivity: false,
    },
    preferences: {
      language: "es",
      theme: "dark",
      region: "Cauca",
    },
  },
]

// Reservas mock
export interface Reservation {
  id: string
  userId: string
  packageId: string
  packageName: string
  location: string
  startDate: string
  endDate: string
  guests: number
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
}

export const mockReservations: Reservation[] = [
  {
    id: "res1",
    userId: "1",
    packageId: "pkg1",
    packageName: "Tour Popayán Histórico",
    location: "Popayán",
    startDate: "2023-12-15T00:00:00Z",
    endDate: "2023-12-17T00:00:00Z",
    guests: 2,
    totalPrice: 250000,
    status: "confirmed",
    createdAt: "2023-11-01T14:30:00Z",
  },
  {
    id: "res2",
    userId: "1",
    packageId: "pkg2",
    packageName: "Aventura en Puracé",
    location: "Puracé",
    startDate: "2024-01-20T00:00:00Z",
    endDate: "2024-01-22T00:00:00Z",
    guests: 3,
    totalPrice: 450000,
    status: "pending",
    createdAt: "2023-11-15T09:45:00Z",
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

// Función para obtener preferencias de usuario
export function getUserPreferences(userId: string): UserPreferences | null {
  return mockUserPreferences.find((p) => p.userId === userId) || null
}

// Función para actualizar preferencias de usuario
export function updateUserPreferences(userId: string, newPreferences: Partial<UserPreferences>): UserPreferences {
  const index = mockUserPreferences.findIndex((p) => p.userId === userId)

  if (index === -1) {
    // Si no existe, crear nuevas preferencias
    const defaultPrefs: UserPreferences = {
      userId,
      notifications: {
        email: true,
        push: false,
        sms: false,
      },
      privacy: {
        profileVisible: true,
        showActivity: true,
      },
      preferences: {
        language: "es",
        theme: "light",
        region: "Cauca",
      },
    }

    const updatedPrefs = {
      ...defaultPrefs,
      ...newPreferences,
      notifications: {
        ...defaultPrefs.notifications,
        ...(newPreferences.notifications || {}),
      },
      privacy: {
        ...defaultPrefs.privacy,
        ...(newPreferences.privacy || {}),
      },
      preferences: {
        ...defaultPrefs.preferences,
        ...(newPreferences.preferences || {}),
      },
    }

    mockUserPreferences.push(updatedPrefs)
    return updatedPrefs
  } else {
    // Si existe, actualizar
    const currentPrefs = mockUserPreferences[index]
    const updatedPrefs = {
      ...currentPrefs,
      ...newPreferences,
      notifications: {
        ...currentPrefs.notifications,
        ...(newPreferences.notifications || {}),
      },
      privacy: {
        ...currentPrefs.privacy,
        ...(newPreferences.privacy || {}),
      },
      preferences: {
        ...currentPrefs.preferences,
        ...(newPreferences.preferences || {}),
      },
    }

    mockUserPreferences[index] = updatedPrefs
    return updatedPrefs
  }
}

// Función para obtener reservas de usuario
export function getUserReservations(userId: string): Reservation[] {
  return mockReservations.filter((r) => r.userId === userId)
}
