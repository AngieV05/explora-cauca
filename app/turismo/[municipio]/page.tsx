import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  MapPin,
  Star,
  Clock,
  Camera,
  UtensilsCrossed,
  Calendar,
  Users,
  ArrowLeft,
  Phone,
  Globe,
  Thermometer,
  Mountain,
  Car,
  Bed,
  Lightbulb,
  Church,
  Waves,
  TreePine,
} from "lucide-react"
import { getMunicipioBySlug, getAllMunicipioSlugs } from "@/lib/municipios-data"

interface PageProps {
  params: {
    municipio: string
  }
}

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

const getAttractionIcon = (tipo: string) => {
  switch (tipo) {
    case "naturaleza":
      return <Mountain className="h-4 w-4 text-green-500" />
    case "cultural":
      return <Users className="h-4 w-4 text-purple-500" />
    case "religioso":
      return <Church className="h-4 w-4 text-blue-500" />
    case "museo":
      return <Camera className="h-4 w-4 text-orange-500" />
    case "arqueologico":
      return <Users className="h-4 w-4 text-amber-500" />
    case "arquitectura":
      return <Church className="h-4 w-4 text-gray-500" />
    default:
      return <MapPin className="h-4 w-4 text-gray-500" />
  }
}

export async function generateStaticParams() {
  const slugs = getAllMunicipioSlugs()
  return slugs.map((slug) => ({
    municipio: slug,
  }))
}

export default function MunicipioPage({ params }: PageProps) {
  const municipio = getMunicipioBySlug(params.municipio)

  if (!municipio) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/10 dark:to-slate-900">
      {/* Header con imagen principal */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={municipio.imagen || "/placeholder.svg"}
            alt={`${municipio.nombre} - ${municipio.descripcion}`}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />

        {/* Botón de regreso */}
        <div className="absolute top-8 left-8 z-30">
          <Button
            asChild
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            <Link href="/turismo">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Destinos
            </Link>
          </Button>
        </div>

        {/* Contenido del header */}
        <div className="relative z-20 flex h-full items-end pb-16">
          <div className="container">
            <div className="max-w-3xl text-white">
              <div className="flex items-center gap-3 mb-4">
                <Badge className={`${getCategoryColor(municipio.categoria)} text-white border-0`}>
                  {getCategoryIcon(municipio.categoria)}
                  <span className="ml-1 capitalize">{municipio.categoria}</span>
                </Badge>
                <Badge variant="secondary" className="bg-black/50 text-white border-0">
                  <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {municipio.rating}
                </Badge>
              </div>
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-4">{municipio.nombre}</h1>
              <p className="text-xl opacity-90 mb-6">{municipio.descripcion}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{municipio.tiempo} recomendados</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{municipio.poblacion} habitantes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mountain className="h-4 w-4" />
                  <span>{municipio.altitud}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  <span>{municipio.temperatura}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contenido principal */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="descripcion" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="descripcion">Descripción</TabsTrigger>
                <TabsTrigger value="atracciones">Atracciones</TabsTrigger>
                <TabsTrigger value="gastronomia">Gastronomía</TabsTrigger>
                <TabsTrigger value="eventos">Eventos</TabsTrigger>
                <TabsTrigger value="planifica">Planifica</TabsTrigger>
              </TabsList>

              <TabsContent value="descripcion" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      Sobre {municipio.nombre}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-gray max-w-none">
                    <p className="text-muted-foreground leading-relaxed">{municipio.descripcionExtendida}</p>
                  </CardContent>
                </Card>

                {municipio.recomendaciones.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        Recomendaciones
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3">
                        {municipio.recomendaciones.map((recomendacion, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20"
                          >
                            <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                            <span className="text-sm">{recomendacion}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="atracciones" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5 text-blue-500" />
                      Principales Atracciones
                    </CardTitle>
                    <CardDescription>Los lugares imperdibles de {municipio.nombre}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {municipio.atracciones.map((atraccion, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 rounded-lg border bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20"
                        >
                          <div className="flex-shrink-0 mt-1">{getAttractionIcon(atraccion.tipo)}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">{atraccion.nombre}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{atraccion.descripcion}</p>
                            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                              {atraccion.horario && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {atraccion.horario}
                                </div>
                              )}
                              {atraccion.precio && (
                                <div className="flex items-center gap-1">
                                  <span className="font-medium">Precio:</span>
                                  {atraccion.precio}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gastronomia" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UtensilsCrossed className="h-5 w-5 text-green-500" />
                      Gastronomía Local
                    </CardTitle>
                    <CardDescription>Sabores tradicionales de {municipio.nombre}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {municipio.gastronomia.map((plato, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20"
                        >
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="font-medium">{plato}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="eventos" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-500" />
                      Eventos y Festivales
                    </CardTitle>
                    <CardDescription>Celebraciones especiales en {municipio.nombre}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {municipio.eventos.map((evento, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg border bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold">{evento.nombre}</h4>
                            <Badge variant="outline">{evento.fecha}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{evento.descripcion}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="planifica" className="space-y-6 mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Car className="h-5 w-5 text-blue-500" />
                        Cómo Llegar
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {municipio.comoLlegar.map((ruta, index) => (
                          <div key={index} className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">Desde {ruta.desde}</span>
                              <Badge variant="outline">{ruta.tiempo}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              <strong>{ruta.medio}:</strong> {ruta.descripcion}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bed className="h-5 w-5 text-green-500" />
                        Alojamiento
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {municipio.alojamiento.map((hotel, index) => (
                          <div key={index} className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{hotel.nombre}</span>
                              <Badge variant="outline">{hotel.tipo}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">{hotel.descripcion}</p>
                            <p className="text-sm font-medium text-green-600">{hotel.precio}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Información práctica */}
            <Card>
              <CardHeader>
                <CardTitle>Información Práctica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Altitud</p>
                    <p className="text-sm text-muted-foreground">{municipio.altitud}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Thermometer className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Clima</p>
                    <p className="text-sm text-muted-foreground">
                      {municipio.clima} ({municipio.temperatura})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Población</p>
                    <p className="text-sm text-muted-foreground">{municipio.poblacion} habitantes</p>
                  </div>
                </div>

                {municipio.fundacion && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Fundación</p>
                      <p className="text-sm text-muted-foreground">{municipio.fundacion}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Tiempo recomendado</p>
                    <p className="text-sm text-muted-foreground">{municipio.tiempo}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Acciones */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Globe className="mr-2 h-4 w-4" />
                  Sitio Web Oficial
                </Button>
                <Button variant="outline" className="w-full">
                  <MapPin className="mr-2 h-4 w-4" />
                  Ver en Mapa
                </Button>
                <Button variant="outline" className="w-full">
                  <Camera className="mr-2 h-4 w-4" />
                  Galería de Fotos
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Contactar Guía Local
                </Button>
              </CardContent>
            </Card>

            {/* Municipios relacionados */}
            <Card>
              <CardHeader>
                <CardTitle>Destinos Cercanos</CardTitle>
                <CardDescription>Otros lugares que podrían interesarte</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/turismo/popayan">
                    <Church className="mr-2 h-4 w-4" />
                    Popayán
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/turismo/silvia">
                    <Users className="mr-2 h-4 w-4" />
                    Silvia
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/turismo/purace">
                    <Mountain className="mr-2 h-4 w-4" />
                    Puracé
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
