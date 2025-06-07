"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, Filter, Navigation, Layers } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Datos de municipios con coordenadas aproximadas
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
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedMunicipio, setSelectedMunicipio] = useState<any>(null)
  const [filtroCategoria, setFiltroCategoria] = useState("todos")
  const [busqueda, setBusqueda] = useState("")

  useEffect(() => {
    // Simulación de mapa interactivo con Leaflet
    if (typeof window !== "undefined" && mapRef.current) {
      // En una implementación real, aquí cargarías Leaflet
      console.log("Mapa inicializado")
    }
  }, [])

  const municipiosFiltrados = municipiosConCoordenadas.filter((municipio) => {
    const coincideBusqueda = municipio.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = filtroCategoria === "todos" || municipio.categoria === filtroCategoria
    return coincideBusqueda && coincideCategoria
  })

  const getCategoryColor = (categoria: string) => {
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 dark:from-green-950/10 dark:to-blue-950/10">
      {/* Header con imagen de fondo */}
      <section className="relative h-64 overflow-hidden">
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
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Mapa Interactivo del Cauca</h1>
              </div>
              <p className="text-lg opacity-90">Explora los 42 municipios desde una perspectiva geográfica</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8">
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
                Explora los 42 municipios del Cauca. Haz clic en cualquier punto para ver más información.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Simulación de mapa interactivo */}
              <div
                ref={mapRef}
                className="relative w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden"
              >
                {/* Simulación de puntos en el mapa */}
                {municipiosFiltrados.map((municipio, index) => (
                  <div
                    key={municipio.slug}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{
                      left: `${20 + (index % 8) * 10}%`,
                      top: `${20 + Math.floor(index / 8) * 15}%`,
                    }}
                    onClick={() => setSelectedMunicipio(municipio)}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${getCategoryColor(municipio.categoria)} shadow-lg group-hover:scale-125 transition-transform`}
                    ></div>
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {municipio.nombre}
                    </div>
                  </div>
                ))}

                {/* Mensaje de mapa interactivo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8 bg-white/80 dark:bg-black/80 rounded-lg backdrop-blur-sm">
                    <Layers className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Mapa Interactivo del Cauca</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      En una implementación completa, aquí se cargaría un mapa real con Leaflet o Google Maps
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Los puntos mostrados representan la ubicación aproximada de los municipios
                    </p>
                  </div>
                </div>
              </div>

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
                          <Badge className={`${getCategoryColor(selectedMunicipio.categoria)} text-white border-0`}>
                            {selectedMunicipio.categoria}
                          </Badge>
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Población: {selectedMunicipio.poblacion} habitantes
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Coordenadas: {selectedMunicipio.lat}, {selectedMunicipio.lng}
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
                    <div className={`w-3 h-3 rounded-full ${getCategoryColor(municipio.categoria)}`}></div>
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
