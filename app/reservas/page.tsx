"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { getUserReservations, type Reservation } from "@/lib/mock-data"

export default function ReservasPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [activeTab, setActiveTab] = useState("todas")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    } else if (user) {
      // Cargar reservas del usuario
      const userReservations = getUserReservations(user.id)
      setReservations(userReservations)
    }
  }, [user, isLoading, router])

  const filteredReservations = reservations.filter((reservation) => {
    if (activeTab === "todas") return true
    if (activeTab === "pendientes") return reservation.status === "pending"
    if (activeTab === "confirmadas") return reservation.status === "confirmed"
    if (activeTab === "canceladas") return reservation.status === "cancelled"
    return true
  })

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d 'de' MMMM, yyyy", { locale: es })
  }

  const getStatusBadge = (status: Reservation["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pendiente
          </Badge>
        )
      case "confirmed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Confirmada
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Cancelada
          </Badge>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Cargando reservas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mis Reservas</h1>
        <p className="text-muted-foreground">Administra tus reservas y paquetes turísticos.</p>
      </div>

      <Tabs defaultValue="todas" onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
          <TabsTrigger value="confirmadas">Confirmadas</TabsTrigger>
          <TabsTrigger value="canceladas">Canceladas</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {filteredReservations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-10 w-10 text-muted-foreground"
                >
                  <path d="M16 16h.01"></path>
                  <path d="M8 16h.01"></path>
                  <path d="M12 20v.01"></path>
                  <path d="M18 12a6 6 0 0 0-12 0"></path>
                  <path d="M15.5 15.5c-.3.3-1 .5-1.5.5h-4c-.5 0-1.2-.2-1.5-.5"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium">No tienes reservas {activeTab !== "todas" ? `${activeTab}` : ""}</h3>
              <p className="text-muted-foreground mt-2 mb-6">
                Explora nuestros paquetes turísticos y realiza tu primera reserva.
              </p>
              <Button onClick={() => router.push("/turismo")}>Ver paquetes turísticos</Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredReservations.map((reservation) => (
                <Card key={reservation.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{reservation.packageName}</CardTitle>
                      {getStatusBadge(reservation.status)}
                    </div>
                    <CardDescription>{reservation.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fecha de inicio:</span>
                        <span className="font-medium">{formatDate(reservation.startDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fecha de fin:</span>
                        <span className="font-medium">{formatDate(reservation.endDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Huéspedes:</span>
                        <span className="font-medium">{reservation.guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Precio total:</span>
                        <span className="font-medium">
                          ${new Intl.NumberFormat("es-CO").format(reservation.totalPrice)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/turismo/${reservation.location.toLowerCase()}`)}
                    >
                      Ver destino
                    </Button>
                    {reservation.status === "pending" && (
                      <Button variant="destructive" size="sm">
                        Cancelar
                      </Button>
                    )}
                    {reservation.status === "confirmed" && (
                      <Button variant="default" size="sm">
                        Ver detalles
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
