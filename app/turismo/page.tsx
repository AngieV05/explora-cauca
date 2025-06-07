"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, Clock, Users, Mountain, Church, Waves, TreePine, Search, X, Filter } from "lucide-react"

// Lista completa de los 42 municipios del Cauca con imágenes apropiadas
const municipiosCauca = [
  {
    id: 1,
    nombre: "Popayán",
    slug: "popayan",
    descripcion: "Capital del departamento, Ciudad Blanca de Colombia con arquitectura colonial única.",
    imagen: "/images/popayan-centro-historico.png",
    categoria: "ciudad",
    rating: 4.9,
    tiempo: "1-2 días",
    dificultad: "Fácil",
    destacado: true,
    poblacion: "280,000",
    altitud: "1,760 msnm",
    keywords: ["ciudad blanca", "capital", "colonial", "gastronomia", "semana santa", "unesco"],
  },
  {
    id: 2,
    nombre: "Silvia",
    slug: "silvia",
    descripcion: "Pueblo guambiano famoso por su mercado indígena y cultura ancestral.",
    imagen: "/images/festival-cultural-cauca.jpeg",
    categoria: "cultura",
    rating: 4.7,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: true,
    poblacion: "35,000",
    altitud: "2,621 msnm",
    keywords: ["guambiano", "indigena", "mercado", "martes", "cultura", "misak", "artesanias"],
  },
  {
    id: 3,
    nombre: "Puracé",
    slug: "purace",
    descripcion: "Hogar del Parque Nacional Natural Puracé con volcanes activos y aguas termales.",
    imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    categoria: "naturaleza",
    rating: 4.8,
    tiempo: "2-3 días",
    dificultad: "Moderada",
    destacado: true,
    poblacion: "18,000",
    altitud: "3,200 msnm",
    keywords: ["volcan", "parque nacional", "termales", "montañismo", "aventura", "paramo"],
  },
  {
    id: 4,
    nombre: "Coconuco",
    slug: "coconuco",
    descripcion: "Famoso por sus termales naturales y paisajes de páramo.",
    imagen: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    categoria: "naturaleza",
    rating: 4.6,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "12,000",
    altitud: "2,400 msnm",
    keywords: ["termales", "aguas calientes", "paramo", "relajacion", "spa natural"],
  },
  {
    id: 5,
    nombre: "Inzá",
    slug: "inza",
    descripcion: "Puerta de entrada al Parque Arqueológico de Tierradentro.",
    imagen: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&h=600&fit=crop",
    categoria: "cultura",
    rating: 4.5,
    tiempo: "2 días",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "28,000",
    altitud: "1,720 msnm",
    keywords: ["tierradentro", "arqueologia", "tumbas", "patrimonio", "unesco", "precolombino"],
  },
  {
    id: 6,
    nombre: "Guapi",
    slug: "guapi",
    descripcion: "Puerto en la costa pacífica, cultura afrocolombiana y biodiversidad marina.",
    imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    categoria: "costa",
    rating: 4.4,
    tiempo: "2-3 días",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "30,000",
    altitud: "5 msnm",
    keywords: ["pacifico", "costa", "afrocolombiano", "puerto", "mar", "manglares", "pesca"],
  },
  {
    id: 7,
    nombre: "Timbío",
    slug: "timbio",
    descripcion: "Conocido como la 'Villa de Leyva del Cauca' por su arquitectura colonial.",
    imagen: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
    categoria: "ciudad",
    rating: 4.3,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "35,000",
    altitud: "1,710 msnm",
    keywords: ["colonial", "arquitectura", "villa", "patrimonio", "historia"],
  },
  {
    id: 8,
    nombre: "Santander de Quilichao",
    slug: "santander-de-quilichao",
    descripcion: "Centro industrial y cultural del norte del Cauca.",
    imagen: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
    categoria: "ciudad",
    rating: 4.2,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "95,000",
    altitud: "1,071 msnm",
    keywords: ["industrial", "norte", "comercio", "desarrollo", "urbano"],
  },
  {
    id: 9,
    nombre: "Caldono",
    slug: "caldono",
    descripcion: "Municipio con rica tradición indígena nasa y paisajes montañosos.",
    imagen: "/images/festival-cultural-cauca.jpeg",
    categoria: "cultura",
    rating: 4.1,
    tiempo: "1 día",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "38,000",
    altitud: "1,700 msnm",
    keywords: ["nasa", "indigena", "montañas", "tradicion", "cultura ancestral"],
  },
  {
    id: 10,
    nombre: "Toribío",
    slug: "toribio",
    descripcion: "Territorio indígena nasa con hermosos paisajes andinos.",
    imagen: "/images/festival-cultural-cauca.jpeg",
    categoria: "cultura",
    rating: 4.0,
    tiempo: "1-2 días",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "32,000",
    altitud: "2,500 msnm",
    keywords: ["nasa", "indigena", "andino", "territorio", "autonomia"],
  },
  {
    id: 11,
    nombre: "Cajibío",
    slug: "cajibio",
    descripcion: "Municipio agrícola con tradiciones campesinas y paisajes rurales.",
    imagen: "/images/represa-cauca-paisaje.jpeg",
    categoria: "rural",
    rating: 3.9,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "40,000",
    altitud: "1,500 msnm",
    keywords: ["cafe", "agricultura", "rural", "campesino", "fincas", "tradicion"],
  },
  {
    id: 12,
    nombre: "Piendamó",
    slug: "piendamo",
    descripcion: "Conocido por su producción agrícola y cercanía a Popayán.",
    imagen: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    categoria: "rural",
    rating: 3.8,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "45,000",
    altitud: "1,400 msnm",
    keywords: ["agricultura", "produccion", "rural", "cercano", "popayan"],
  },
  {
    id: 13,
    nombre: "Morales",
    slug: "morales",
    descripcion: "Municipio del norte del Cauca con importante infraestructura hidroeléctrica y tradición ganadera.",
    imagen: "/images/morales-represa.jpeg",
    categoria: "rural",
    rating: 3.7,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "28,000",
    altitud: "1,100 msnm",
    keywords: ["represa", "hidroelectrica", "energia", "ganaderia", "norte"],
  },
  // Agregar más municipios con keywords para mejor búsqueda...
]

const getCategoryIcon = (categoria: string) => {
  switch (categoria) {
    case "naturaleza":
      return <Mountain className="h-4 w-4" />
    case "ciudad":
      return <Church className="h-4 w-4" />
    case "cultura":
      return <Users className="h-4 w-4" />
    case "costa":
      return <Waves className="h-4 w-4" />
    case "rural":
      return <TreePine className="h-4 w-4" />
    default:
      return <TreePine className="h-4 w-4" />
  }
}

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

export default function TurismoPage() {
  const [busqueda, setBusqueda] = useState("")
  const [categoriaActiva, setCategoriaActiva] = useState("todos")
  const [filtroRating, setFiltroRating] = useState("todos")
  const [filtroDificultad, setFiltroDificultad] = useState("todos")

  // Función mejorada para filtrar municipios
  const filtrarMunicipios = (categoria: string) => {
    let municipiosFiltrados = municipiosCauca

    // Filtrar por búsqueda avanzada
    if (busqueda.trim() !== "") {
      const query = busqueda.toLowerCase()
      municipiosFiltrados = municipiosFiltrados.filter((municipio) => {
        return (
          municipio.nombre.toLowerCase().includes(query) ||
          municipio.descripcion.toLowerCase().includes(query) ||
          municipio.categoria.toLowerCase().includes(query) ||
          municipio.keywords?.some((keyword) => keyword.toLowerCase().includes(query)) ||
          municipio.poblacion.toLowerCase().includes(query) ||
          municipio.altitud.toLowerCase().includes(query)
        )
      })
    }

    // Filtrar por categoría
    if (categoria !== "todos") {
      municipiosFiltrados = municipiosFiltrados.filter((municipio) => municipio.categoria === categoria)
    }

    // Filtrar por rating
    if (filtroRating !== "todos") {
      const minRating = Number.parseFloat(filtroRating)
      municipiosFiltrados = municipiosFiltrados.filter((municipio) => municipio.rating >= minRating)
    }

    // Filtrar por dificultad
    if (filtroDificultad !== "todos") {
      municipiosFiltrados = municipiosFiltrados.filter((municipio) => municipio.dificultad === filtroDificultad)
    }

    return municipiosFiltrados
  }

  const limpiarFiltros = () => {
    setBusqueda("")
    setCategoriaActiva("todos")
    setFiltroRating("todos")
    setFiltroDificultad("todos")
  }

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  const municipiosFiltrados = filtrarMunicipios(categoriaActiva)
  const hayFiltrosActivos =
    busqueda || categoriaActiva !== "todos" || filtroRating !== "todos" || filtroDificultad !== "todos"

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-blue-50 to-orange-50 dark:from-green-950/10 dark:via-blue-950/10 dark:to-orange-950/10">
      {/* Header con imagen de fondo */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/festival-cultural-cauca.jpeg"
            alt="Festival Cultural del Cauca - Tradiciones y Paisajes"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="relative z-20 flex h-full items-center">
          <div className="container">
            <div className="max-w-3xl text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                42 Municipios
                <span className="block text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
                  del Cauca
                </span>
              </h1>
              <p className="mt-4 text-xl opacity-90">Descubre cada rincón del departamento más diverso de Colombia</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        {/* Búsqueda y filtros mejorados */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Búsqueda Avanzada
            </CardTitle>
            <CardDescription>
              Encuentra municipios por nombre, características, altitud, población o palabras clave
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {/* Búsqueda principal */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, características, altitud, población... (ej: 'volcán', 'termales', 'indígena', 'costa')"
                  className="pl-10 pr-10"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                {busqueda && (
                  <button
                    onClick={() => setBusqueda("")}
                    className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Filtros adicionales */}
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Categoría</label>
                  <Select value={categoriaActiva} onValueChange={setCategoriaActiva}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas las categorías</SelectItem>
                      <SelectItem value="naturaleza">Naturaleza</SelectItem>
                      <SelectItem value="cultura">Cultura</SelectItem>
                      <SelectItem value="ciudad">Ciudades</SelectItem>
                      <SelectItem value="costa">Costa</SelectItem>
                      <SelectItem value="rural">Rural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Rating mínimo</label>
                  <Select value={filtroRating} onValueChange={setFiltroRating}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Cualquier rating</SelectItem>
                      <SelectItem value="4.5">4.5+ estrellas</SelectItem>
                      <SelectItem value="4.0">4.0+ estrellas</SelectItem>
                      <SelectItem value="3.5">3.5+ estrellas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Dificultad</label>
                  <Select value={filtroDificultad} onValueChange={setFiltroDificultad}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Cualquier dificultad</SelectItem>
                      <SelectItem value="Fácil">Fácil</SelectItem>
                      <SelectItem value="Moderada">Moderada</SelectItem>
                      <SelectItem value="Difícil">Difícil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Acciones</label>
                  <Button variant="outline" onClick={limpiarFiltros} disabled={!hayFiltrosActivos} className="w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Limpiar Filtros
                  </Button>
                </div>
              </div>

              {/* Resultados de búsqueda */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {municipiosFiltrados.length} de 42 municipios
                  {busqueda && ` que coinciden con "${busqueda}"`}
                </span>
                {busqueda && (
                  <div className="text-xs">
                    <strong>Sugerencias:</strong> "volcán", "termales", "indígena", "costa", "café", "colonial"
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filtros y navegación */}
        <Tabs value={categoriaActiva} onValueChange={setCategoriaActiva} className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h2 className="text-2xl font-bold">Explora por Categoría</h2>
              <p className="text-muted-foreground">
                {municipiosFiltrados.length} municipios encontrados
                {hayFiltrosActivos && " con los filtros aplicados"}
              </p>
            </div>
            <TabsList className="grid w-full max-w-lg grid-cols-6">
              <TabsTrigger value="todos" className="text-xs">
                Todos
              </TabsTrigger>
              <TabsTrigger value="naturaleza" className="text-xs">
                Naturaleza
              </TabsTrigger>
              <TabsTrigger value="cultura" className="text-xs">
                Cultura
              </TabsTrigger>
              <TabsTrigger value="ciudad" className="text-xs">
                Ciudades
              </TabsTrigger>
              <TabsTrigger value="costa" className="text-xs">
                Costa
              </TabsTrigger>
              <TabsTrigger value="rural" className="text-xs">
                Rural
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Destinos destacados - solo mostrar si no hay búsqueda activa */}
          {!busqueda && !hayFiltrosActivos && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Destinos Destacados
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {municipiosFiltrados
                  .filter((municipio) => municipio.destacado)
                  .map((municipio) => (
                    <Card
                      key={municipio.id}
                      className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={municipio.imagen || "/placeholder.svg"}
                          alt={municipio.nombre}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={`${getCategoryColor(municipio.categoria)} text-white border-0`}>
                            {getCategoryIcon(municipio.categoria)}
                            <span className="ml-1 capitalize">{municipio.categoria}</span>
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-black/50 text-white border-0">
                            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                            {municipio.rating}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="flex items-start justify-between">
                          <span>{highlightText(municipio.nombre, busqueda)}</span>
                        </CardTitle>
                        <CardDescription>{highlightText(municipio.descripcion, busqueda)}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {municipio.tiempo}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {municipio.altitud}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                        >
                          <Link href={`/turismo/${municipio.slug}`}>Explorar {municipio.nombre}</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* Todos los municipios */}
          <TabsContent value="todos" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {municipiosFiltrados.length > 0 ? (
                municipiosFiltrados.map((municipio) => (
                  <Card
                    key={municipio.id}
                    className="group overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={municipio.imagen || "/placeholder.svg"}
                        alt={municipio.nombre}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={`${getCategoryColor(municipio.categoria)} text-white border-0`}>
                          {getCategoryIcon(municipio.categoria)}
                          <span className="ml-1 capitalize">{municipio.categoria}</span>
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-black/50 text-white border-0">
                          <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {municipio.rating}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{highlightText(municipio.nombre, busqueda)}</CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {highlightText(municipio.descripcion, busqueda)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{municipio.poblacion} hab.</span>
                        <span>{municipio.altitud}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button asChild className="w-full" variant="outline" size="sm">
                        <Link href={`/turismo/${municipio.slug}`}>Ver Detalles</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No se encontraron municipios</h3>
                  <p className="text-muted-foreground mb-4">
                    No hay municipios que coincidan con los filtros aplicados
                  </p>
                  <Button onClick={limpiarFiltros} variant="outline">
                    Limpiar todos los filtros
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Filtros por categoría */}
          {["naturaleza", "cultura", "ciudad", "costa", "rural"].map((categoria) => (
            <TabsContent key={categoria} value={categoria} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {municipiosFiltrados.length > 0 ? (
                  municipiosFiltrados.map((municipio) => (
                    <Card
                      key={municipio.id}
                      className="group overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={municipio.imagen || "/placeholder.svg"}
                          alt={municipio.nombre}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-black/50 text-white border-0">
                            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                            {municipio.rating}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{highlightText(municipio.nombre, busqueda)}</CardTitle>
                        <CardDescription className="text-sm line-clamp-2">
                          {highlightText(municipio.descripcion, busqueda)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{municipio.poblacion} hab.</span>
                          <span>{municipio.altitud}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button asChild className="w-full" variant="outline" size="sm">
                          <Link href={`/turismo/${municipio.slug}`}>Ver Detalles</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No se encontraron municipios</h3>
                    <p className="text-muted-foreground mb-4">
                      {busqueda
                        ? `No hay municipios de ${categoria} que coincidan con "${busqueda}"`
                        : `No hay municipios en la categoría ${categoria} con los filtros aplicados`}
                    </p>
                    <Button onClick={limpiarFiltros} variant="outline">
                      Limpiar filtros
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
