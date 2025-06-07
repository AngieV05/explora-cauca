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

    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Actualizar preferencias
    updateUserPreferences(user.id, preferences)

    setIsSaving(false)

    toast({
      title: "Preferencias actualizadas",
      description: "Tus preferencias han sido guardadas correctamente.",
    })
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
          <p className="text-muted-foreground">Cargando preferencias...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">Administra tus preferencias y configuración de cuenta.</p>
      </div>

      <Tabs defaultValue="cuenta">
        <TabsList className="mb-8">
          <TabsTrigger value="cuenta">Cuenta</TabsTrigger>
          <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          <TabsTrigger value="privacidad">Privacidad</TabsTrigger>
          <TabsTrigger value="preferencias">Preferencias</TabsTrigger>
        </TabsList>

        <TabsContent value="cuenta">
          <Card>
            <CardHeader>
              <CardTitle>Información de Cuenta</CardTitle>
              <CardDescription>Actualiza la información de tu cuenta.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" defaultValue={user.name} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" defaultValue={user.email} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <Input id="role" defaultValue={user.role === "admin" ? "Administrador" : "Usuario"} disabled />
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Para cambiar tu información de cuenta, contacta al administrador.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notificaciones">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>Configura cómo quieres recibir notificaciones.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notificaciones por correo</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibe actualizaciones y ofertas por correo electrónico.
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
                  <p className="text-sm text-muted-foreground">
                    Recibe notificaciones en tiempo real en tu dispositivo.
                  </p>
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
                  <p className="text-sm text-muted-foreground">Recibe alertas importantes por mensaje de texto.</p>
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
                {isSaving ? "Guardando..." : "Guardar cambios"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacidad">
          <Card>
            <CardHeader>
              <CardTitle>Privacidad</CardTitle>
              <CardDescription>Controla quién puede ver tu información.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="profile-visible">Perfil visible</Label>
                  <p className="text-sm text-muted-foreground">Permite que otros usuarios vean tu perfil.</p>
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
                  <p className="text-sm text-muted-foreground">Permite que otros vean tu actividad reciente.</p>
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
                {isSaving ? "Guardando..." : "Guardar cambios"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferencias">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias</CardTitle>
              <CardDescription>Personaliza tu experiencia en la plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                    <SelectItem value="en">Inglés</SelectItem>
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
              <div className="space-y-2">
                <Label htmlFor="region">Región</Label>
                <Select
                  value={preferences.preferences.region}
                  onValueChange={(value) => updatePreference("region", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una región" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cauca">Cauca</SelectItem>
                    <SelectItem value="Valle">Valle del Cauca</SelectItem>
                    <SelectItem value="Nariño">Nariño</SelectItem>
                    <SelectItem value="Huila">Huila</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePreferences} disabled={isSaving}>
                {isSaving ? "Guardando..." : "Guardar cambios"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
