"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  CalendarIcon,
  Users,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  CreditCard,
  CalendarIcon as CalendarLucide,
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

// Datos de ejemplo para reservas
const reservasEjemplo = [
  {
    id: 1,
    destino: "Popayán",
    tipo: "Tour Gastronómico",
    fecha: "2024-01-15",
    estado: "confirmada",
    precio: 85000,
    personas: 2,
    imagen: "/images/popayan-centro-historico.png",
  },
  {
    id: 2,
    destino: "Puracé",
    tipo: "Ascenso al Volcán",
    fecha: "2024-01-22",
    estado: "pendiente",
    precio: 120000,
    personas: 4,
    imagen: "/images/explora-cauca-hero.png",
  },
  {
    id: 3,
    destino: "Silvia",
    tipo: "Mercado Indígena",
    fecha: "2024-01-08",
    estado: "completada",
    precio: 45000,
    personas: 3,
    imagen: "/images/festival-cultural-cauca.jpeg",
  },
]

const paquetesTuristicos = [
  {
    id: 1,
    nombre: "Tour Gastronómico Popayán",
    descripcion: "Recorrido por restaurantes tradicionales y degustación de platos típicos",
    precio: 85000,
    duracion: "6 horas",
    incluye: ["Guía especializado", "Degustaciones", "Transporte"],
    imagen: "/images/popayan-centro-historico.png",
    categoria: "gastronomia",
  },
  {
    id: 2,
    nombre: "Ascenso Volcán Puracé",
    descripcion: "Expedición guiada al cráter del volcán más activo del Cauca",
    precio: 120000,
    duracion: "2 días",
    incluye: ["Guía de montaña", "Equipo básico", "Alimentación", "Alojamiento"],
    imagen: "/images/explora-cauca-hero.png",
    categoria: "aventura",
  },
  {
    id: 3,
    nombre: "Mercado Indígena Silvia",
    descripcion: "Experiencia cultural en el mercado guambiano más auténtico",
    precio: 45000,
    duracion: "4 horas",
    incluye: ["Guía cultural", "Transporte", "Artesanías"],
    imagen: "/images/festival-cultural-cauca.jpeg",
    categoria: "cultura",
  },
  {
    id: 4,
    nombre: "Termales de Coconuco",
    descripcion: "Relajación en aguas termales naturales con propiedades medicinales",
    precio: 65000,
    duracion: "1 día",
    incluye: ["Entrada a termales", "Almuerzo", "Transporte"],
    imagen: "/images/represa-cauca-paisaje.jpeg",
    categoria: "bienestar",
  },
]

export default function ReservasPage() {
  const [tabActiva, setTabActiva] = useState("nueva")
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date>()
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState("")
  const [numeroPersonas, setNumeroPersonas] = useState("1")
  const [datosPersonales, setDatosPersonales] = useState({
    nombre: "",
    email: "",
    telefono: "",
    comentarios: "",
  })
  const [reservaEnviada, setReservaEnviada] = useState(false)

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "confirmada":
        return <Badge className="bg-green-500 text-white">Confirmada</Badge>
      case "pendiente":
        return <Badge className="bg-yellow-500 text-white">Pendiente</Badge>
      case "completada":
        return <Badge className="bg-blue-500 text-white">Completada</Badge>
      case "cancelada":
        return <Badge variant="destructive">Cancelada</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "gastronomia":
        return "bg-orange-500"
      case "aventura":
        return "bg-green-500"
      case "cultura":
        return "bg-purple-500"
      case "bienestar":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleSubmitReserva = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular envío de reserva
    setReservaEnviada(true)
    setTimeout(() => {
      setReservaEnviada(false)
      // Limpiar formulario
      setFechaSeleccionada(undefined)
      setPaqueteSeleccionado("")
      setNumeroPersonas("1")
      setDatosPersonales({
        nombre: "",
        email: "",
        telefono: "",
        comentarios: "",
      })
    }, 3000)
  }

  const paqueteActual = paquetesTuristicos.find((p) => p.id.toString() === paqueteSeleccionado)
  const precioTotal = paqueteActual ? paqueteActual.precio * Number.parseInt(numeroPersonas) : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 dark:from-blue-950/10 dark:to-green-950/10">
      <div className="container py-8">
        <div className="flex items-center gap-2 mb-8">
          <CalendarLucide className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Reservas Turísticas</h1>
        </div>

        <Tabs value={tabActiva} onValueChange={setTabActiva} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="nueva">Nueva Reserva</TabsTrigger>
            <TabsTrigger value="mis-reservas">Mis Reservas</TabsTrigger>
            <TabsTrigger value="paquetes">Paquetes Disponibles</TabsTrigger>
          </TabsList>

          {/* Nueva Reserva */}
          <TabsContent value="nueva" className="space-y-6 mt-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Crear Nueva Reserva</CardTitle>
                  <CardDescription>Completa los datos para reservar tu experiencia turística</CardDescription>
                </CardHeader>
                <CardContent>
                  {reservaEnviada ? (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription className="text-green-600">
                        ¡Reserva enviada exitosamente! Te contactaremos pronto para confirmar los detalles.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <form onSubmit={handleSubmitReserva} className="space-y-6">
                      {/* Selección de paquete */}
                      <div className="space-y-2">
                        <Label htmlFor="paquete">Paquete Turístico *</Label>
                        <Select value={paqueteSeleccionado} onValueChange={setPaqueteSeleccionado}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un paquete turístico" />
                          </SelectTrigger>
                          <SelectContent>
                            {paquetesTuristicos.map((paquete) => (
                              <SelectItem key={paquete.id} value={paquete.id.toString()}>
                                {paquete.nombre} - ${paquete.precio.toLocaleString()} COP
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Fecha y personas */}
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Fecha de la experiencia *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !fechaSeleccionada && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {fechaSeleccionada ? (
                                  format(fechaSeleccionada, "PPP", { locale: es })
                                ) : (
                                  <span>Selecciona una fecha</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={fechaSeleccionada}
                                onSelect={setFechaSeleccionada}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="personas">Número de personas *</Label>
                          <Select value={numeroPersonas} onValueChange={setNumeroPersonas}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? "persona" : "personas"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Datos personales */}
                      <Separator />
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Datos de Contacto</h3>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre completo *</Label>
                            <Input
                              id="nombre"
                              value={datosPersonales.nombre}
                              onChange={(e) => setDatosPersonales({ ...datosPersonales, nombre: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Correo electrónico *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={datosPersonales.email}
                              onChange={(e) => setDatosPersonales({ ...datosPersonales, email: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="telefono">Teléfono *</Label>
                          <Input
                            id="telefono"
                            type="tel"
                            value={datosPersonales.telefono}
                            onChange={(e) => setDatosPersonales({ ...datosPersonales, telefono: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="comentarios">Comentarios adicionales</Label>
                          <Textarea
                            id="comentarios"
                            placeholder="Menciona cualquier requerimiento especial, alergias alimentarias, etc."
                            value={datosPersonales.comentarios}
                            onChange={(e) => setDatosPersonales({ ...datosPersonales, comentarios: e.target.value })}
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={
                          !paqueteSeleccionado ||
                          !fechaSeleccionada ||
                          !datosPersonales.nombre ||
                          !datosPersonales.email ||
                          !datosPersonales.telefono
                        }
                      >
                        Enviar Reserva
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* Resumen de reserva */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumen de Reserva</CardTitle>
                </CardHeader>
                <CardContent>
                  {paqueteActual ? (
                    <div className="space-y-4">
                      <div className="aspect-video overflow-hidden rounded-lg">
                        <div className="h-full w-full bg-gradient-to-br from-blue-400 to-green-600 flex items-center justify-center">
                          <MapPin className="h-16 w-16 text-white/80" />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold">{paqueteActual.nombre}</h4>
                        <p className="text-sm text-muted-foreground">{paqueteActual.descripcion}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>Duración: {paqueteActual.duracion}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4" />
                          <span>
                            {numeroPersonas} {Number.parseInt(numeroPersonas) === 1 ? "persona" : "personas"}
                          </span>
                        </div>
                        {fechaSeleccionada && (
                          <div className="flex items-center gap-2 text-sm">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{format(fechaSeleccionada, "PPP", { locale: es })}</span>
                          </div>
                        )}
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h5 className="font-medium">Incluye:</h5>
                        <ul className="text-sm space-y-1">
                          {paqueteActual.incluye.map((item, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Precio por persona:</span>
                          <span>${paqueteActual.precio.toLocaleString()} COP</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Cantidad:</span>
                          <span>
                            {numeroPersonas} {Number.parseInt(numeroPersonas) === 1 ? "persona" : "personas"}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>${precioTotal.toLocaleString()} COP</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Selecciona un paquete para ver el resumen</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Mis Reservas */}
          <TabsContent value="mis-reservas" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Mis Reservas</CardTitle>
                <CardDescription>Historial y estado de tus reservas turísticas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservasEjemplo.map((reserva) => (
                    <div
                      key={reserva.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-white dark:bg-gray-800"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <div className="h-full w-full bg-gradient-to-br from-blue-400 to-green-600 flex items-center justify-center">
                            <MapPin className="h-8 w-8 text-white/80" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold">{reserva.tipo}</h4>
                          <p className="text-sm text-muted-foreground">{reserva.destino}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span>{reserva.fecha}</span>
                            <span>{reserva.personas} personas</span>
                            <span>${reserva.precio.toLocaleString()} COP</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getEstadoBadge(reserva.estado)}
                        <Button variant="outline" size="sm">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Paquetes Disponibles */}
          <TabsContent value="paquetes" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paquetesTuristicos.map((paquete) => (
                <Card key={paquete.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video overflow-hidden">
                    <div
                      className={`h-full w-full bg-gradient-to-br ${getCategoriaColor(paquete.categoria)} flex items-center justify-center`}
                    >
                      <MapPin className="h-16 w-16 text-white/80" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white text-black capitalize">{paquete.categoria}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {paquete.nombre}
                      <span className="text-lg font-bold text-primary">${paquete.precio.toLocaleString()}</span>
                    </CardTitle>
                    <CardDescription>{paquete.descripcion}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>Duración: {paquete.duracion}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Incluye:</p>
                        <ul className="text-sm space-y-1">
                          {paquete.incluye.slice(0, 3).map((item, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {item}
                            </li>
                          ))}
                          {paquete.incluye.length > 3 && (
                            <li className="text-muted-foreground">+{paquete.incluye.length - 3} más...</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardContent className="pt-0">
                    <Button
                      className="w-full"
                      onClick={() => {
                        setPaqueteSeleccionado(paquete.id.toString())
                        setTabActiva("nueva")
                      }}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Reservar Ahora
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
