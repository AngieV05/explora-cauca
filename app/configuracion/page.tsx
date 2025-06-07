"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Settings, Bell, Globe, Shield, Palette, Save, Loader2 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { redirect } from "next/navigation"
import { getUserPreferences, updateUserPreferences } from "@/lib/user-preferences"

export default function ConfiguracionPage() {
  const { user } = useAuth()
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      loadUserPreferences()
    }
  }, [user])

  const loadUserPreferences = async () => {
    if (!user) return

    setLoading(true)
    const preferences = await getUserPreferences(user.id)

    if (preferences) {
      setSettings({
        notifications: preferences.notifications,
        privacy: preferences.privacy,
        preferences: preferences.preferences,
      })
    } else {
      // Set default preferences if none exist
      setSettings({
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
    }
    setLoading(false)
  }

  if (!user) {
    redirect("/")
  }

  const handleSave = async () => {
    if (!user || !settings) return

    const success = await updateUserPreferences(user.id, {
      notifications: settings.notifications,
      privacy: settings.privacy,
      preferences: settings.preferences,
    })

    if (success) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } else {
      setError("Error al guardar la configuración")
    }
  }

  const updateNotification = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }))
  }

  const updatePrivacy = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: value },
    }))
  }

  const updatePreference = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value },
    }))
  }

  if (loading || !settings) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="container py-12">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container py-12">
        <div className="flex items-center gap-2 mb-8">
          <Settings className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Configuración</h1>
        </div>

        {saved && (
          <Alert className="mb-6">
            <Save className="h-4 w-4" />
            <AlertDescription className="text-green-600">Configuración guardada exitosamente.</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-6">
            <Save className="h-4 w-4" />
            <AlertDescription className="text-red-600">{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Notificaciones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificaciones
                </CardTitle>
                <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificaciones por email</Label>
                    <p className="text-sm text-muted-foreground">Recibe actualizaciones sobre nuevos destinos</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => updateNotification("email", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificaciones push</Label>
                    <p className="text-sm text-muted-foreground">Alertas en tiempo real en tu navegador</p>
                  </div>
                  <Switch
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => updateNotification("push", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificaciones SMS</Label>
                    <p className="text-sm text-muted-foreground">Mensajes de texto para eventos importantes</p>
                  </div>
                  <Switch
                    checked={settings.notifications.sms}
                    onCheckedChange={(checked) => updateNotification("sms", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacidad */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacidad
                </CardTitle>
                <CardDescription>Controla la visibilidad de tu información</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Perfil público</Label>
                    <p className="text-sm text-muted-foreground">Permite que otros usuarios vean tu perfil</p>
                  </div>
                  <Switch
                    checked={settings.privacy.profileVisible}
                    onCheckedChange={(checked) => updatePrivacy("profileVisible", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Actividad visible</Label>
                    <p className="text-sm text-muted-foreground">Muestra tu actividad reciente a otros usuarios</p>
                  </div>
                  <Switch
                    checked={settings.privacy.activityVisible}
                    onCheckedChange={(checked) => updatePrivacy("activityVisible", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preferencias */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Preferencias
                </CardTitle>
                <CardDescription>Personaliza tu experiencia en el portal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Idioma</Label>
                    <Select
                      value={settings.preferences.language}
                      onValueChange={(value) => updatePreference("language", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Tema</Label>
                    <Select
                      value={settings.preferences.theme}
                      onValueChange={(value) => updatePreference("theme", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
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
                  <Label>Región de interés</Label>
                  <Select
                    value={settings.preferences.region}
                    onValueChange={(value) => updatePreference("region", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cauca">Todo el Cauca</SelectItem>
                      <SelectItem value="norte">Norte del Cauca</SelectItem>
                      <SelectItem value="centro">Centro del Cauca</SelectItem>
                      <SelectItem value="sur">Sur del Cauca</SelectItem>
                      <SelectItem value="costa">Costa Pacífica</SelectItem>
                      <SelectItem value="macizo">Macizo Colombiano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información de la Cuenta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Usuario</Label>
                  <p className="text-sm text-muted-foreground">{user.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Rol</Label>
                  <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                </div>
                <Separator />
                <div>
                  <Label className="text-sm font-medium">Miembro desde</Label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acciones de Cuenta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="mr-2 h-4 w-4" />
                  Exportar Datos
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Cambiar Contraseña
                </Button>
                <Separator />
                <Button variant="destructive" className="w-full justify-start">
                  Eliminar Cuenta
                </Button>
              </CardContent>
            </Card>

            <Button onClick={handleSave} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
