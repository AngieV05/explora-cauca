"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Bed, Star, MapPin, Wifi, Car, Coffee, Utensils, Phone, ExternalLink, Search, Filter } from "lucide-react"

const hoteles = [
  {
    id: 1,
    nombre: "Hotel Camino Real",
    categoria: "hotel",
    ciudad: "Popayán",
    descripcion: "Hotel boutique en el corazón del centro histórico de Popayán",
    precio: 180000,
    rating: 4.8,
    imagen: "/images/popayan-centro-historico.png",
    servicios: ["wifi", "parking", "restaurant", "breakfast"],
    telefono: "+57 2 824 0009",
    direccion: "Calle 5 No. 5-59, Centro Histórico",
    website: "https://hotelcaminoreal.com.co",
    destacado: true,
  },
  {
    id: 2,
    nombre: "Hotel Dann Monasterio",
    categoria: "hotel",
    ciudad: "Popayán",
    descripcion: "Elegante hotel en edificio colonial restaurado",
    precio: 220000,
    rating: 4.7,
    imagen: "/images/explora-cauca-hero.png",
    servicios: ["wifi", "parking", "restaurant", "breakfast", "spa"],
    telefono: "+57 2 824 2191",
    direccion: "Calle 4 No. 10-14, Centro",
    website: "https://dann.com.co",
    destacado: true,
  },
  {
    id: 3,
    nombre: "Hotel La Plazuela",
    categoria: "hostal",
    ciudad: "Popayán",
    descripcion: "Acogedor hostal familiar cerca del parque principal",
    precio: 65000,
    rating: 4.5,
    imagen: "/images/explora-cauca-hero.png",
    servicios: ["wifi", "breakfast"],
    telefono: "+57 2 820 1084",
    direccion: "Calle 5 No. 8-13, Centro",
    website: "https://laplazuelapopayan.com",
    destacado: false,
  },
  {
    id: 4,
    nombre: "Ecohotel Coconuco",
    categoria: "ecohotel",
    ciudad: "Coconuco",
    descripcion: "Hotel ecológico con acceso directo a termales naturales",
    precio: 95000,
    rating: 4.6,
    imagen: "/images/explora-cauca-hero.png",
    servicios: ["wifi", "parking", "restaurant", "spa"],
    telefono: "+57 2 825 0123",
    direccion: "Vereda Coconuco, Puracé",
    website: "https://ecohotelcoconuco.com",
    destacado: true,
  },
  {
    id: 5,
    nombre: "Hotel Misak",
    categoria: "hotel",
    ciudad: "Silvia",
    descripcion: "Hotel con arquitectura tradicional guambiana",
    precio: 75000,
    rating: 4.4,
    imagen: "/images/explora-cauca-hero.png",
    servicios: ["wifi", "restaurant", "breakfast"],
    telefono: "+57 2 825 9876",
    direccion: "Carrera 2 No. 1-45, Silvia",
    website: "https://hotelmisak.com",
    destacado: false,
  },
  {
    id: 6,
    nombre: "Hotel Pacífico",
    categoria: "hotel",
    ciudad: "Guapi",
    descripcion: "Hotel frente al río con aire acondicionado",
    precio: 85000,
    rating: 4.2,
    imagen: "/images/explora-cauca-hero.png",
    servicios: ["wifi", "restaurant", "breakfast"],
    telefono: "+57 2 847 0123",
    direccion: "Malecón del Río Guapi",
    website: "https://hotelpacifico-guapi.com",
    destacado: false,
  },
]

const restaurantes = [
  {
    id: 1,
    nombre: "Restaurante Italiano",
    categoria: "internacional",
    ciudad: "Popayán",
    descripcion: "Auténtica cocina italiana en el centro histórico",
    precio: 45000,
    rating: 4.7,
    imagen: "/images/popayan-centro-historico.png",
    especialidad: "Pasta y Pizza",
    telefono: "+57 2 820 1234",
    direccion: "Calle 4 No. 8-83, Centro",
    website: "https://restauranteitaliano-popayan.com",
    destacado: true,
  },
  {
    id: 2,
    nombre: "La Cosecha Payanesa",
    categoria: "tradicional",
    ciudad: "Popayán",
    descripcion: "Gastronomía tradicional caucana, Ciudad Gastronómica UNESCO",
    precio: 35000,
    rating: 4.9,
    imagen: "/images/explora-cauca-hero.png",
    especialidad: "Empanadas de pipián, Tamales",
    telefono: "+57 2 824 5678",
    direccion: "Carrera 6 No. 2-05, Centro",
    website: "https://lacosechapayanesa.com",
    destacado: true,
  },
  {
    id: 3,
    nombre: "Restaurante Balcón de los Arrieros",
    categoria: "tradicional",
    ciudad: "Popayán",
    descripcion: "Comida típica en ambiente colonial",
    precio: 28000,
    rating: 4.5,
    imagen: "/images/explora-cauca-hero.png",
    especialidad: "Sancocho, Cuy asado",
    telefono: "+57 2 820 9876",
    direccion: "Calle 3 No. 4-56, Centro",
    website: "https://balcondelosarrieros.com",
    destacado: false,
  },
  {
    id: 4,
    nombre: "Sabores del Pacífico",
    categoria: "mariscos",
    ciudad: "Guapi",
    descripcion: "Mariscos frescos y cocina afrocolombiana",
    precio: 32000,
    rating: 4.6,
    imagen: "/images/explora-cauca-hero.png",
    especialidad: "Pescado frito, Arroz con coco",
    telefono: "+57 2 847 1234",
    direccion: "Malecón Principal, Guapi",
    website: "https://saboresdelpacifico.com",
    destacado: true,
  },
  {
    id: 5,
    nombre: "Restaurante Guambiano",
    categoria: "indigena",
    ciudad: "Silvia",
    descripcion: "Comida tradicional del pueblo Misak",
    precio: 25000,
    rating: 4.4,
    imagen: "/images/explora-cauca-hero.png",
    especialidad: "Cuy, Mote de maíz",
    telefono: "+57 2 825 4321",
    direccion: "Plaza Principal, Silvia",
    website: "https://restauranteguambiano.com",
    destacado: false,
  },
]

export default function HotelesPage() {
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroCiudad, setFiltroCiudad] = useState("todas")
  const [busqueda, setBusqueda] = useState("")
  const [tabActiva, setTabActiva] = useState("hoteles")

  const ciudades = ["Popayán", "Silvia", "Coconuco", "Guapi", "Inzá"]

  const getServiceIcon = (service: string) => {
    switch (service) {
      case "wifi":
        return <Wifi className="h-4 w-4" />
      case "parking":
        return <Car className="h-4 w-4" />
      case "restaurant":
        return <Utensils className="h-4 w-4" />
      case "breakfast":
        return <Coffee className="h-4 w-4" />
      case "spa":
        return <Star className="h-4 w-4" />
      default:
        return null
    }
  }

  const filtrarHoteles = () => {
    return hoteles.filter((hotel) => {
      const coincideBusqueda =
        hotel.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        hotel.ciudad.toLowerCase().includes(busqueda.toLowerCase())
      const coincideTipo = filtroTipo === "todos" || hotel.categoria === filtroTipo
      const coincideCiudad = filtroCiudad === "todas" || hotel.ciudad === filtroCiudad
      return coincideBusqueda && coincideTipo && coincideCiudad
    })
  }

  const filtrarRestaurantes = () => {
    return restaurantes.filter((restaurante) => {
      const coincideBusqueda =
        restaurante.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        restaurante.ciudad.toLowerCase().includes(busqueda.toLowerCase())
      const coincideTipo = filtroTipo === "todos" || restaurante.categoria === filtroTipo
      const coincideCiudad = filtroCiudad === "todas" || restaurante.ciudad === filtroCiudad
      return coincideBusqueda && coincideTipo && coincideCiudad
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 dark:from-orange-950/10 dark:to-yellow-950/10">
      <div className="container py-8">
        <div className="flex items-center gap-2 mb-8">
          <Bed className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Hoteles y Restaurantes</h1>
        </div>

        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros de Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Nombre o ciudad..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Ciudad</label>
                <Select value={filtroCiudad} onValueChange={setFiltroCiudad}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las ciudades</SelectItem>
                    {ciudades.map((ciudad) => (
                      <SelectItem key={ciudad} value={ciudad}>
                        {ciudad}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo</label>
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los tipos</SelectItem>
                    {tabActiva === "hoteles" ? (
                      <>
                        <SelectItem value="hotel">Hotel</SelectItem>
                        <SelectItem value="hostal">Hostal</SelectItem>
                        <SelectItem value="ecohotel">Ecohotel</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="tradicional">Tradicional</SelectItem>
                        <SelectItem value="internacional">Internacional</SelectItem>
                        <SelectItem value="mariscos">Mariscos</SelectItem>
                        <SelectItem value="indigena">Indígena</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Fechas</label>
                <Input type="date" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={tabActiva} onValueChange={setTabActiva} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="hoteles" className="flex items-center gap-2">
              <Bed className="h-4 w-4" />
              Hoteles ({filtrarHoteles().length})
            </TabsTrigger>
            <TabsTrigger value="restaurantes" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              Restaurantes ({filtrarRestaurantes().length})
            </TabsTrigger>
          </TabsList>

          {/* Hoteles */}
          <TabsContent value="hoteles">
            {/* Destacados */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Hoteles Destacados
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtrarHoteles()
                  .filter((hotel) => hotel.destacado)
                  .map((hotel) => (
                    <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48 bg-gradient-to-br from-orange-400 to-red-500">
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white text-black capitalize">{hotel.categoria}</Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-black/50 text-white">
                            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                            {hotel.rating}
                          </Badge>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Bed className="h-16 w-16 text-white/50" />
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {hotel.nombre}
                          <span className="text-lg font-bold text-primary">${hotel.precio.toLocaleString()}</span>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {hotel.ciudad} • {hotel.descripcion}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            {hotel.servicios.map((servicio) => (
                              <div
                                key={servicio}
                                className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                              >
                                {getServiceIcon(servicio)}
                                <span className="capitalize">{servicio}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            {hotel.telefono}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button asChild className="flex-1">
                            <Link href={hotel.website} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Ver Hotel
                            </Link>
                          </Button>
                          <Button variant="outline" size="icon">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            {/* Todos los hoteles */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Todos los Hoteles</h3>
              <div className="grid gap-4">
                {filtrarHoteles().map((hotel) => (
                  <Card key={hotel.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-48 h-32 bg-gradient-to-br from-orange-400 to-red-500">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Bed className="h-12 w-12 text-white/50" />
                        </div>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-lg font-semibold">{hotel.nombre}</h4>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {hotel.ciudad} • {hotel.direccion}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{hotel.rating}</span>
                            </div>
                            <p className="text-lg font-bold text-primary">${hotel.precio.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">por noche</p>
                          </div>
                        </div>
                        <p className="text-sm mb-3">{hotel.descripcion}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {hotel.servicios.slice(0, 4).map((servicio) => (
                              <div
                                key={servicio}
                                className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                              >
                                {getServiceIcon(servicio)}
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Button asChild size="sm">
                              <Link href={hotel.website} target="_blank" rel="noopener noreferrer">
                                Ver Hotel
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Restaurantes */}
          <TabsContent value="restaurantes">
            {/* Destacados */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Restaurantes Destacados
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtrarRestaurantes()
                  .filter((restaurante) => restaurante.destacado)
                  .map((restaurante) => (
                    <Card key={restaurante.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48 bg-gradient-to-br from-green-400 to-blue-500">
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white text-black capitalize">{restaurante.categoria}</Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-black/50 text-white">
                            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                            {restaurante.rating}
                          </Badge>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Utensils className="h-16 w-16 text-white/50" />
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {restaurante.nombre}
                          <span className="text-lg font-bold text-primary">${restaurante.precio.toLocaleString()}</span>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {restaurante.ciudad} • {restaurante.especialidad}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-sm">{restaurante.descripcion}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            {restaurante.telefono}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button asChild className="flex-1">
                            <Link href={restaurante.website} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Ver Menú
                            </Link>
                          </Button>
                          <Button variant="outline" size="icon">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            {/* Todos los restaurantes */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Todos los Restaurantes</h3>
              <div className="grid gap-4">
                {filtrarRestaurantes().map((restaurante) => (
                  <Card key={restaurante.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-48 h-32 bg-gradient-to-br from-green-400 to-blue-500">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Utensils className="h-12 w-12 text-white/50" />
                        </div>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-lg font-semibold">{restaurante.nombre}</h4>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {restaurante.ciudad} • {restaurante.direccion}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{restaurante.rating}</span>
                            </div>
                            <p className="text-lg font-bold text-primary">${restaurante.precio.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">promedio</p>
                          </div>
                        </div>
                        <p className="text-sm mb-2">{restaurante.descripcion}</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          <strong>Especialidad:</strong> {restaurante.especialidad}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="capitalize">
                            {restaurante.categoria}
                          </Badge>
                          <div className="flex gap-2">
                            <Button asChild size="sm">
                              <Link href={restaurante.website} target="_blank" rel="noopener noreferrer">
                                Ver Menú
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
