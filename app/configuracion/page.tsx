"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { getUserPreferences, updateUserPreferences, type UserPreferences } from "@/lib/mock-data"
import { Settings, User, Bell, Shield, Palette, Save } from "lucide-react"

export default function ConfiguracionPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    } else if (user) {
      // Cargar preferencias del usuario
      const userPrefs = getUserPreferences(user.id)
      setPreferences(userPrefs)
    }
  }, [user, isLoading, router])

  const handleSavePreferences = async () => {
    if (!user || !preferences) return

    setIsSaving(true)

    try {
      // Simular guardado en base de datos
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Actualizar preferencias
      updateUserPreferences(user.id, preferences)

      toast({
        title: "Preferencias actualizadas",
        description: "Tus preferencias han sido guardadas correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron guardar las preferencias. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const updateNotificationSetting = (key: keyof UserPreferences["notifications"], value: boolean) => {
    if (!preferences) return

    setPreferences({
      ...preferences,
      notifications: {
        ...preferences.notifications,
        [key]: value,
      },
    })
  }

  const updatePrivacySetting = (key: keyof UserPreferences["privacy"], value: boolean) => {
    if (!preferences) return

    setPreferences({
      ...preferences,
      privacy: {
        ...preferences.privacy,
        [key]: value,
      },
    })
  }

  const updatePreference = (key: keyof UserPreferences["preferences"], value: string) => {
    if (!preferences) return

    setPreferences({
      ...preferences,
      preferences: {
        ...preferences.preferences,
        [key]: value,
      },
    })
  }

  if (isLoading || !preferences) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando preferencias...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto py-10">
        <div className="flex items-center gap-2 mb-8">
          <Settings className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
            <p className="text-muted-foreground">Administra tus preferencias y configuración de cuenta</p>
          </div>
        </div>

        <Tabs defaultValue="cuenta" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cuenta" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Cuenta
            </TabsTrigger>
            <TabsTrigger value="notificaciones" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notificaciones
            </TabsTrigger>
            <TabsTrigger value="privacidad" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Privacidad
            </TabsTrigger>
            <TabsTrigger value="preferencias" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Preferencias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cuenta">
            <Card>
              <CardHeader>
                <CardTitle>Información de Cuenta</CardTitle>
                <CardDescription>Información básica de tu cuenta en Explora Cauca</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" defaultValue={user.name} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input id="email" defaultValue={user.email} disabled />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="role">Rol</Label>
                    <Input id="role" defaultValue={user.role === "admin" ? "Administrador" : "Usuario"} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="member-since">Miembro desde</Label>
                    <Input id="member-since" defaultValue="Enero 2024" disabled />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Para cambiar tu información de cuenta, contacta al administrador del sistema.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notificaciones">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Notificaciones</CardTitle>
                <CardDescription>Controla cómo y cuándo quieres recibir notificaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Notificaciones por correo</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe actualizaciones sobre nuevos destinos y ofertas especiales
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={preferences.notifications.email}
                    onCheckedChange={(checked) => updateNotificationSetting("email", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Notificaciones push</Label>
                    <p className="text-sm text-muted-foreground">Recibe alertas en tiempo real en tu navegador</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={preferences.notifications.push}
                    onCheckedChange={(checked) => updateNotificationSetting("push", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">Notificaciones SMS</Label>
                    <p className="text-sm text-muted-foreground">Recibe mensajes de texto para eventos importantes</p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={preferences.notifications.sms}
                    onCheckedChange={(checked) => updateNotificationSetting("sms", checked)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSavePreferences} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar cambios
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="privacidad">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Privacidad</CardTitle>
                <CardDescription>Controla la visibilidad de tu información personal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="profile-visible">Perfil público</Label>
                    <p className="text-sm text-muted-foreground">
                      Permite que otros usuarios vean tu perfil y actividad
                    </p>
                  </div>
                  <Switch
                    id="profile-visible"
                    checked={preferences.privacy.profileVisible}
                    onCheckedChange={(checked) => updatePrivacySetting("profileVisible", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-activity">Mostrar actividad</Label>
                    <p className="text-sm text-muted-foreground">
                      Permite que otros usuarios vean tu actividad reciente en el portal
                    </p>
                  </div>
                  <Switch
                    id="show-activity"
                    checked={preferences.privacy.showActivity}
                    onCheckedChange={(checked) => updatePrivacySetting("showActivity", checked)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSavePreferences} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar cambios
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="preferencias">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de la Aplicación</CardTitle>
                <CardDescription>Personaliza tu experiencia en el portal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Select
                      value={preferences.preferences.language}
                      onValueChange={(value) => updatePreference("language", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="theme">Tema</Label>
                    <Select
                      value={preferences.preferences.theme}
                      onValueChange={(value) => updatePreference("theme", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Oscuro</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region">Región de interés</Label>
                  <Select
                    value={preferences.preferences.region}
                    onValueChange={(value) => updatePreference("region", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una región" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cauca">Todo el Cauca</SelectItem>
                      <SelectItem value="Norte">Norte del Cauca</SelectItem>
                      <SelectItem value="Centro">Centro del Cauca</SelectItem>
                      <SelectItem value="Sur">Sur del Cauca</SelectItem>
                      <SelectItem value="Costa">Costa Pacífica</SelectItem>
                      <SelectItem value="Macizo">Macizo Colombiano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSavePreferences} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar cambios
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
