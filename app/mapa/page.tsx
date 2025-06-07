"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Search, Filter, Navigation, ExternalLink, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import GoogleMapComponent from "@/components/google-map"

// Datos de municipios con coordenadas reales
const municipiosConCoordenadas = [
  {
    nombre: "Popayán",
    slug: "popayan",
    lat: 2.4448,
    lng: -76.6147,
    categoria: "ciudad",
    poblacion: "280,000",
    imagen: "/images/popayan-centro-historico.png",
  },
  {
    nombre: "Silvia",
    slug: "silvia",
    lat: 2.6167,
    lng: -76.3833,
    categoria: "cultura",
    poblacion: "35,000",
    imagen: "/images/festival-cultural-cauca.jpeg",
  },
  {
    nombre: "Puracé",
    slug: "purace",
    lat: 2.3167,
    lng: -76.4,
    categoria: "naturaleza",
    poblacion: "18,000",
    imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  },
  {
    nombre: "Coconuco",
    slug: "coconuco",
    lat: 2.3333,
    lng: -76.3667,
    categoria: "naturaleza",
    poblacion: "12,000",
    imagen: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
  },
  {
    nombre: "Inzá",
    slug: "inza",
    lat: 2.55,
    lng: -76.0667,
    categoria: "cultura",
    poblacion: "28,000",
    imagen: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&h=600&fit=crop",
  },
  {
    nombre: "Guapi",
    slug: "guapi",
    lat: 2.5667,
    lng: -77.8833,
    categoria: "costa",
    poblacion: "30,000",
    imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
  },
  {
    nombre: "Timbío",
    slug: "timbio",
    lat: 2.35,
    lng: -76.6833,
    categoria: "ciudad",
    poblacion: "35,000",
    imagen: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
  },
  {
    nombre: "Santander de Quilichao",
    slug: "santander-de-quilichao",
    lat: 3.0167,
    lng: -76.4833,
    categoria: "ciudad",
    poblacion: "95,000",
    imagen: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
  },
  {
    nombre: "Caldono",
    slug: "caldono",
    lat: 2.7833,
    lng: -76.5333,
    categoria: "cultura",
    poblacion: "38,000",
    imagen: "/images/festival-cultural-cauca.jpeg",
  },
  {
    nombre: "Toribío",
    slug: "toribio",
    lat: 3.0167,
    lng: -76.05,
    categoria: "cultura",
    poblacion: "32,000",
    imagen: "/images/festival-cultural-cauca.jpeg",
  },
  {
    nombre: "Morales",
    slug: "morales",
    lat: 3.1167,
    lng: -76.6333,
    categoria: "rural",
    poblacion: "28,000",
    imagen: "/images/morales-represa.jpeg",
  },
]

export default function MapaPage() {
  const [selectedMunicipio, setSelectedMunicipio] = useState<any>(null)
  const [filtroCategoria, setFiltroCategoria] = useState("todos")
  const [busqueda, setBusqueda] = useState("")

  // Función para filtrar municipios
  const municipiosFiltrados = municipiosConCoordenadas.filter((municipio) => {
    const coincideBusqueda = municipio.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = filtroCategoria === "todos" || municipio.categoria === filtroCategoria
    return coincideBusqueda && coincideCategoria
  })

  // Función para obtener el color de la categoría
  const getCategoryColorClass = (categoria: string) => {
    switch (categoria) {
      case "naturaleza":
        return "bg-green-500"
      case "ciudad":
        return "bg-orange-500"
      case "cultura":
        return "bg-purple-500"
      case "costa":
        return "bg-blue-500"
      case "rural":
        return "bg-yellow-600"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-blue-50 to-orange-50 dark:from-green-950/10 dark:via-blue-950/10 dark:to-orange-950/10">
      {/* Header con imagen de fondo */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/represa-cauca-paisaje.jpeg"
            alt="Paisajes del Cauca desde el aire"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="relative z-20 flex h-full items-center">
          <div className="container">
            <div className="max-w-3xl text-white">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-8 w-8 text-primary" />
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Mapa Interactivo del Cauca</h1>
              </div>
              <p className="text-xl opacity-90">Explora los 42 municipios desde una perspectiva geográfica</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8">
        {/* Alerta informativa sobre la API key */}
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Modo Demo:</strong> Este mapa funciona en modo demostración. Para usar Google Maps real, necesitas
            configurar una API key válida.{" "}
            <a
              href="https://developers.google.com/maps/documentation/javascript/get-api-key"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline inline-flex items-center gap-1"
            >
              Obtener API Key <ExternalLink className="h-3 w-3" />
            </a>
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Panel de control */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros y Búsqueda
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Buscar municipio</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Nombre del municipio..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Categoría</label>
                <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="naturaleza">Naturaleza</SelectItem>
                    <SelectItem value="cultura">Cultura</SelectItem>
                    <SelectItem value="ciudad">Ciudades</SelectItem>
                    <SelectItem value="costa">Costa</SelectItem>
                    <SelectItem value="rural">Rural</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Leyenda</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Naturaleza</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-sm">Ciudades</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm">Cultura</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Costa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                    <span className="text-sm">Rural</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mapa */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Mapa del Departamento del Cauca
              </CardTitle>
              <CardDescription>
                Explora los municipios del Cauca. Haz clic en cualquier marcador para ver más información.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Componente de Google Maps con fallback */}
              <GoogleMapComponent
                municipios={municipiosFiltrados}
                apiKey="DEMO_MODE" // Esto activará el modo demo
                onSelectMunicipio={setSelectedMunicipio}
                selectedMunicipio={selectedMunicipio}
              />

              {/* Información del municipio seleccionado */}
              {selectedMunicipio && (
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={selectedMunicipio.imagen || "/placeholder.svg"}
                          alt={selectedMunicipio.nombre}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold flex items-center gap-2">
                          {selectedMunicipio.nombre}
                          <Badge
                            className={`${getCategoryColorClass(selectedMunicipio.categoria)} text-white border-0`}
                          >
                            {selectedMunicipio.categoria}
                          </Badge>
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Población: {selectedMunicipio.poblacion} habitantes
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Coordenadas: {selectedMunicipio.lat.toFixed(4)}, {selectedMunicipio.lng.toFixed(4)}
                        </p>
                      </div>
                    </div>
                    <Button asChild size="sm">
                      <Link href={`/turismo/${selectedMunicipio.slug}`}>Ver Detalles</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Lista de municipios */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Lista de Municipios</CardTitle>
            <CardDescription>{municipiosFiltrados.length} municipios encontrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {municipiosFiltrados.map((municipio) => (
                <div
                  key={municipio.slug}
                  className="flex items-center justify-between p-3 rounded-lg border bg-white dark:bg-gray-800 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedMunicipio(municipio)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded overflow-hidden">
                      <Image
                        src={municipio.imagen || "/placeholder.svg"}
                        alt={municipio.nombre}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getCategoryColorClass(municipio.categoria)}`}></div>
                    <div>
                      <p className="font-medium">{municipio.nombre}</p>
                      <p className="text-sm text-muted-foreground">{municipio.poblacion} hab.</p>
                    </div>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/turismo/${municipio.slug}`}>Ver</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
