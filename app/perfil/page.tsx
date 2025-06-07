"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Calendar, Camera, Save, Shield } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { redirect } from "next/navigation"

export default function PerfilPage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  if (!user) {
    redirect("/")
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Mi Perfil</h1>
        <p className="text-muted-foreground">Gestiona tu información personal y preferencias</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="flex items-center justify-center gap-2">
              {user.name}
              <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                {user.role === "admin" ? (
                  <>
                    <Shield className="mr-1 h-3 w-3" />
                    Administrador
                  </>
                ) : (
                  <>
                    <User className="mr-1 h-3 w-3" />
                    Usuario
                  </>
                )}
              </Badge>
            </CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+57 300 123 4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Popayán, Cauca</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Miembro desde Enero 2023</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <Tabs defaultValue="informacion" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="informacion">Información Personal</TabsTrigger>
                <TabsTrigger value="actividad">Actividad</TabsTrigger>
                <TabsTrigger value="configuracion">Configuración</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="informacion" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Información Personal</h3>
                  <Button variant={isEditing ? "default" : "outline"} onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Guardar
                      </>
                    ) : (
                      "Editar"
                    )}
                  </Button>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre completo</Label>
                    <Input id="nombre" defaultValue={user.name} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input id="email" type="email" defaultValue={user.email} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input id="telefono" defaultValue="+57 300 123 4567" disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ciudad">Ciudad</Label>
                    <Input id="ciudad" defaultValue="Popayán, Cauca" disabled={!isEditing} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="biografia">Biografía</Label>
                  <Textarea
                    id="biografia"
                    placeholder="Cuéntanos un poco sobre ti..."
                    disabled={!isEditing}
                    defaultValue="Apasionado por el turismo y la cultura del Cauca. Me encanta explorar nuevos destinos y compartir experiencias con otros viajeros."
                  />
                </div>
              </TabsContent>

              <TabsContent value="actividad" className="space-y-6">
                <h3 className="text-lg font-medium">Actividad Reciente</h3>
                <Separator />

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg border">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                    <div className="flex-1">
                      <p className="font-medium">Archivo subido</p>
                      <p className="text-sm text-muted-foreground">Subiste "Informe_Turismo_2023.pdf"</p>
                      <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg border">
                    <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
                    <div className="flex-1">
                      <p className="font-medium">Destino visitado</p>
                      <p className="text-sm text-muted-foreground">Exploraste "Parque Nacional Natural Puracé"</p>
                      <p className="text-xs text-muted-foreground">Hace 1 día</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg border">
                    <div className="h-2 w-2 rounded-full bg-purple-500 mt-2" />
                    <div className="flex-1">
                      <p className="font-medium">Datos procesados</p>
                      <p className="text-sm text-muted-foreground">Generaste un reporte de visitantes</p>
                      <p className="text-xs text-muted-foreground">Hace 3 días</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="configuracion" className="space-y-6">
                <h3 className="text-lg font-medium">Configuración de Cuenta</h3>
                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Notificaciones por email</p>
                      <p className="text-sm text-muted-foreground">Recibe actualizaciones sobre nuevos destinos</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Privacidad del perfil</p>
                      <p className="text-sm text-muted-foreground">Controla quién puede ver tu información</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Cambiar contraseña</p>
                      <p className="text-sm text-muted-foreground">Actualiza tu contraseña de acceso</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Cambiar
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-red-200">
                    <div>
                      <p className="font-medium text-red-600">Eliminar cuenta</p>
                      <p className="text-sm text-muted-foreground">Esta acción no se puede deshacer</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Eliminar
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
