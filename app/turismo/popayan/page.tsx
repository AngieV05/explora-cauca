import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import {
  MapPin,
  Star,
  Clock,
  Camera,
  Church,
  UtensilsCrossed,
  Calendar,
  Users,
  ArrowLeft,
  Phone,
  Globe,
} from "lucide-react"

export default function PopayanPage() {
  const atracciones = [
    {
      nombre: "Torre del Reloj",
      descripcion: "Símbolo icónico de la ciudad, construida en 1673",
      horario: "24 horas",
      precio: "Gratis",
    },
    {
      nombre: "Catedral Basílica de Popayán",
      descripcion: "Majestuosa catedral de arquitectura colonial",
      horario: "6:00 AM - 8:00 PM",
      precio: "Gratis",
    },
    {
      nombre: "Casa Museo Mosquera",
      descripcion: "Museo dedicado al General Tomás Cipriano de Mosquera",
      horario: "9:00 AM - 5:00 PM",
      precio: "$8,000 COP",
    },
    {
      nombre: "Puente del Humilladero",
      descripcion: "Histórico puente de piedra del siglo XVIII",
      horario: "24 horas",
      precio: "Gratis",
    },
  ]

  const gastronomia = [
    "Empanadas de pipián",
    "Tamales de Popayán",
    "Carantanta",
    "Salpicón de frutas",
    "Champús",
    "Aplanchado",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/10 dark:to-slate-900">
      {/* Header con imagen principal */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/popayan-centro-historico.png"
            alt="Centro Histórico de Popayán - Torre del Reloj"
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
                <Badge className="bg-orange-500 text-white border-0">
                  <Church className="mr-1 h-3 w-3" />
                  Ciudad Colonial
                </Badge>
                <Badge variant="secondary" className="bg-black/50 text-white border-0">
                  <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                  4.9
                </Badge>
              </div>
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-4">
                Popayán
                <span className="block text-3xl sm:text-4xl text-orange-300 font-normal">
                  La Ciudad Blanca de Colombia
                </span>
              </h1>
              <p className="text-xl opacity-90 mb-6">
                Capital del Cauca y joya de la arquitectura colonial. Patrimonio histórico, gastronómico y cultural de
                Colombia.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>1-2 días recomendados</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Ideal para familias</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Centro del Cauca</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descripción */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Church className="h-5 w-5 text-orange-500" />
                  Sobre Popayán
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Popayán, conocida como la "Ciudad Blanca de Colombia", es la capital del departamento del Cauca y una
                  de las ciudades coloniales mejor conservadas del país. Fundada en 1537, esta hermosa ciudad se
                  caracteriza por sus edificaciones de color blanco que le dan su distintivo apodo.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  La ciudad es famosa por su arquitectura colonial, sus tradiciones religiosas (especialmente la Semana
                  Santa), su exquisita gastronomía y por ser cuna de 17 presidentes de Colombia. El centro histórico,
                  declarado Monumento Nacional, conserva intacta la belleza de sus calles empedradas, iglesias
                  coloniales y casas señoriales.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Popayán también es reconocida por la UNESCO como Ciudad Gastronómica, siendo el primer destino en
                  Colombia en recibir esta distinción, gracias a su rica tradición culinaria que combina influencias
                  indígenas, españolas y africanas.
                </p>
              </CardContent>
            </Card>

            {/* Principales atracciones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-blue-500" />
                  Principales Atracciones
                </CardTitle>
                <CardDescription>Los lugares imperdibles de la Ciudad Blanca</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {atracciones.map((atraccion, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg border bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20"
                    >
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">{atraccion.nombre}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{atraccion.descripcion}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {atraccion.horario}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">Precio:</span>
                            {atraccion.precio}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gastronomía */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UtensilsCrossed className="h-5 w-5 text-green-500" />
                  Gastronomía Tradicional
                </CardTitle>
                <CardDescription>Ciudad Gastronómica UNESCO - Sabores únicos del Cauca</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {gastronomia.map((plato, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="font-medium">{plato}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <p className="text-sm text-muted-foreground">
                  <strong>Recomendación:</strong> No te pierdas el recorrido gastronómico por el centro histórico, donde
                  podrás degustar estos platos tradicionales en restaurantes familiares que han conservado las recetas
                  ancestrales.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Información práctica */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Información Práctica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Ubicación</p>
                    <p className="text-sm text-muted-foreground">Centro del Cauca, 1,760 msnm</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Mejor época</p>
                    <p className="text-sm text-muted-foreground">Todo el año, especial en Semana Santa</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Población</p>
                    <p className="text-sm text-muted-foreground">280,000 habitantes aprox.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Código de área</p>
                    <p className="text-sm text-muted-foreground">+57 (2)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eventos especiales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Eventos Especiales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                  <p className="font-medium">Semana Santa</p>
                  <p className="text-sm text-muted-foreground">Marzo/Abril - Procesiones Patrimonio UNESCO</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <p className="font-medium">Festival Gastronómico</p>
                  <p className="text-sm text-muted-foreground">Septiembre - Celebración culinaria</p>
                </div>
                <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                  <p className="font-medium">Festival de Música Religiosa</p>
                  <p className="text-sm text-muted-foreground">Agosto - Música sacra internacional</p>
                </div>
              </CardContent>
            </Card>

            {/* Acciones */}
            <Card>
              <CardHeader>
                <CardTitle>Planifica tu Visita</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
