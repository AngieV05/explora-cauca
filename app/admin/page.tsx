"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Users, FileText, BarChart3, Settings, TrendingUp, TrendingDown, Activity, Shield } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { redirect } from "next/navigation"
import Link from "next/link"

export default function AdminPage() {
  const { user } = useAuth()

  if (!user || user.role !== "admin") {
    redirect("/")
  }

  const estadisticas = [
    {
      titulo: "Total Usuarios",
      valor: "1,234",
      cambio: "+12%",
      tendencia: "up",
      icono: Users,
    },
    {
      titulo: "Archivos Subidos",
      valor: "5,678",
      cambio: "+8%",
      tendencia: "up",
      icono: FileText,
    },
    {
      titulo: "Visitantes Únicos",
      valor: "89,012",
      cambio: "-3%",
      tendencia: "down",
      icono: Activity,
    },
    {
      titulo: "Reportes Generados",
      valor: "234",
      cambio: "+15%",
      tendencia: "up",
      icono: BarChart3,
    },
  ]

  const usuariosRecientes = [
    { id: 1, nombre: "Ana García", email: "ana@example.com", rol: "user", estado: "activo", fecha: "2023-12-15" },
    { id: 2, nombre: "Carlos López", email: "carlos@example.com", rol: "user", estado: "activo", fecha: "2023-12-14" },
    { id: 3, nombre: "Laura Martín", email: "laura@example.com", rol: "admin", estado: "activo", fecha: "2023-12-13" },
    { id: 4, nombre: "Pedro Ruiz", email: "pedro@example.com", rol: "user", estado: "inactivo", fecha: "2023-12-12" },
  ]

  const actividadReciente = [
    { accion: "Usuario registrado", usuario: "Ana García", tiempo: "Hace 2 horas" },
    { accion: "Archivo subido", usuario: "Carlos López", tiempo: "Hace 4 horas" },
    { accion: "Reporte generado", usuario: "Laura Martín", tiempo: "Hace 6 horas" },
    { accion: "Configuración actualizada", usuario: "Sistema", tiempo: "Hace 1 día" },
  ]

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Panel de Administración</h1>
        </div>
        <p className="text-muted-foreground">Gestiona usuarios, contenido y configuraciones del sistema</p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {estadisticas.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.titulo}</CardTitle>
              <stat.icono className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.valor}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.tendencia === "up" ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={stat.tendencia === "up" ? "text-green-500" : "text-red-500"}>{stat.cambio}</span>
                <span className="ml-1">vs mes anterior</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <Tabs defaultValue="usuarios" className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gestión del Sistema</CardTitle>
                  <CardDescription>Administra usuarios, contenido y configuraciones</CardDescription>
                </div>
                <TabsList>
                  <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
                  <TabsTrigger value="contenido">Contenido</TabsTrigger>
                  <TabsTrigger value="sistema">Sistema</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>

            <CardContent>
              <TabsContent value="usuarios" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Usuarios Recientes</h3>
                  <Button asChild size="sm">
                    <Link href="/admin/usuarios">Ver todos</Link>
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usuariosRecientes.map((usuario) => (
                        <TableRow key={usuario.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{usuario.nombre}</p>
                              <p className="text-sm text-muted-foreground">{usuario.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={usuario.rol === "admin" ? "default" : "secondary"}>
                              {usuario.rol === "admin" ? "Admin" : "Usuario"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={usuario.estado === "activo" ? "default" : "secondary"}>
                              {usuario.estado}
                            </Badge>
                          </TableCell>
                          <TableCell>{usuario.fecha}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="contenido" className="space-y-4">
                <h3 className="text-lg font-medium">Gestión de Contenido</h3>

                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Destinos Turísticos</p>
                      <p className="text-sm text-muted-foreground">Gestiona lugares y atracciones</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Administrar
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Archivos del Sistema</p>
                      <p className="text-sm text-muted-foreground">Revisa y modera archivos subidos</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Revisar
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Reportes y Estadísticas</p>
                      <p className="text-sm text-muted-foreground">Configura reportes automáticos</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sistema" className="space-y-4">
                <h3 className="text-lg font-medium">Configuración del Sistema</h3>

                <div className="grid gap-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Uso del Servidor</p>
                      <span className="text-sm text-muted-foreground">72%</span>
                    </div>
                    <Progress value={72} />
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Almacenamiento</p>
                      <span className="text-sm text-muted-foreground">45%</span>
                    </div>
                    <Progress value={45} />
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Base de Datos</p>
                      <span className="text-sm text-muted-foreground">38%</span>
                    </div>
                    <Progress value={38} />
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>Últimas acciones en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actividadReciente.map((actividad, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{actividad.accion}</p>
                      <p className="text-xs text-muted-foreground">{actividad.usuario}</p>
                      <p className="text-xs text-muted-foreground">{actividad.tiempo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>Herramientas de administración</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/admin/usuarios">
                  <Users className="mr-2 h-4 w-4" />
                  Gestionar Usuarios
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/admin/reportes">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Ver Reportes
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/admin/configuracion">
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
