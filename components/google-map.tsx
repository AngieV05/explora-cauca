"use client"

import { useState, useCallback } from "react"
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ExternalLink, AlertCircle } from "lucide-react"

// Estilos para el contenedor del mapa
const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "0.5rem",
}

// Opciones del mapa
const options = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: false,
  mapTypeId: "terrain",
}

// Clases de Tailwind para los colores de categoría
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

interface GoogleMapComponentProps {
  municipios: any[]
  apiKey: string
  center?: { lat: number; lng: number }
  zoom?: number
  onSelectMunicipio?: (municipio: any) => void
  selectedMunicipio?: any
}

// Componente de mapa demo/fallback
function DemoMapComponent({
  municipios,
  onSelectMunicipio,
}: { municipios: any[]; onSelectMunicipio?: (municipio: any) => void }) {
  const [selectedPoint, setSelectedPoint] = useState<any>(null)

  const handlePointClick = (municipio: any) => {
    setSelectedPoint(municipio)
    if (onSelectMunicipio) {
      onSelectMunicipio(municipio)
    }
  }

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-green-100 via-blue-100 to-orange-100 dark:from-green-900/20 dark:via-blue-900/20 dark:to-orange-900/20 rounded-lg border overflow-hidden">
      {/* Fondo del mapa estilizado */}
      <div className="absolute inset-0 opacity-30">
        <svg viewBox="0 0 800 500" className="w-full h-full">
          {/* Ríos y montañas estilizados */}
          <path
            d="M0,300 Q200,250 400,280 T800,300 L800,500 L0,500 Z"
            fill="currentColor"
            className="text-blue-200 dark:text-blue-800"
          />
          <path
            d="M0,200 Q300,150 600,180 T800,200 L800,0 L0,0 Z"
            fill="currentColor"
            className="text-green-200 dark:text-green-800"
          />
        </svg>
      </div>

      {/* Puntos de municipios */}
      {municipios.map((municipio, index) => (
        <div
          key={municipio.slug}
          className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group z-10"
          style={{
            left: `${15 + (index % 6) * 12}%`,
            top: `${20 + Math.floor(index / 6) * 15}%`,
          }}
          onClick={() => handlePointClick(municipio)}
        >
          <div
            className={`w-4 h-4 rounded-full ${getCategoryColorClass(municipio.categoria)} shadow-lg group-hover:scale-125 transition-transform border-2 border-white`}
          ></div>
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
            {municipio.nombre}
          </div>
        </div>
      ))}

      {/* Información del punto seleccionado */}
      {selectedPoint && (
        <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border z-20">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="relative w-12 h-12 rounded overflow-hidden">
                <Image
                  src={selectedPoint.imagen || "/placeholder.svg"}
                  alt={selectedPoint.nombre}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold flex items-center gap-2">
                  {selectedPoint.nombre}
                  <Badge className={`${getCategoryColorClass(selectedPoint.categoria)} text-white border-0 text-xs`}>
                    {selectedPoint.categoria}
                  </Badge>
                </h4>
                <p className="text-sm text-muted-foreground">Población: {selectedPoint.poblacion}</p>
              </div>
            </div>
            <Button asChild size="sm">
              <Link href={`/turismo/${selectedPoint.slug}`}>Ver Detalles</Link>
            </Button>
          </div>
        </div>
      )}

      {/* Mensaje informativo */}
      <div className="absolute top-4 left-4 right-4 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-3 z-10">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-blue-800 dark:text-blue-200">Mapa Demo</p>
            <p className="text-blue-600 dark:text-blue-300">
              Para usar Google Maps real, configura tu API key en el código.{" "}
              <a
                href="https://developers.google.com/maps/documentation/javascript/get-api-key"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline inline-flex items-center gap-1"
              >
                Obtener API Key <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GoogleMapComponent({
  municipios,
  apiKey,
  center = { lat: 2.7, lng: -76.5 },
  zoom = 8,
  onSelectMunicipio,
  selectedMunicipio,
}: GoogleMapComponentProps) {
  const [mapRef, setMapRef] = useState<any | null>(null)
  const [infoWindowOpen, setInfoWindowOpen] = useState(false)
  const [activeMarker, setActiveMarker] = useState<any | null>(null)

  // Verificar si tenemos una API key válida
  const hasValidApiKey = apiKey && apiKey !== "TU_API_KEY_AQUI" && apiKey.length > 10

  // Cargar la API de Google Maps solo si tenemos una API key válida
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
    // Solo intentar cargar si tenemos una API key válida
    ...(hasValidApiKey ? {} : { googleMapsApiKey: "" }),
  })

  // Función para manejar el clic en un marcador
  const handleMarkerClick = useCallback(
    (municipio: any) => {
      setActiveMarker(municipio)
      setInfoWindowOpen(true)

      if (onSelectMunicipio) {
        onSelectMunicipio(municipio)
      }

      // Centrar el mapa en el municipio seleccionado
      if (mapRef) {
        mapRef.panTo({ lat: municipio.lat, lng: municipio.lng })
        mapRef.setZoom(10)
      }
    },
    [mapRef, onSelectMunicipio],
  )

  // Función para cerrar la ventana de información
  const handleInfoWindowClose = useCallback(() => {
    setInfoWindowOpen(false)
    setActiveMarker(null)
  }, [])

  // Función para guardar la referencia del mapa
  const onMapLoad = useCallback((map: any) => {
    setMapRef(map)
  }, [])

  // Si no hay API key válida, mostrar el mapa demo
  if (!hasValidApiKey) {
    return <DemoMapComponent municipios={municipios} onSelectMunicipio={onSelectMunicipio} />
  }

  // Renderizar mensaje de error si la carga falla
  if (loadError) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="text-center p-6">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h3 className="text-lg font-semibold mb-2">Error al cargar Google Maps</h3>
          <p className="text-muted-foreground mb-4">
            Verifica que tu API key sea válida y que tengas habilitada la API de Maps JavaScript.
          </p>
          <Button asChild variant="outline">
            <a
              href="https://developers.google.com/maps/documentation/javascript/get-api-key"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Obtener API Key
            </a>
          </Button>
        </div>
      </div>
    )
  }

  // Mostrar un indicador de carga mientras se carga el mapa
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="text-center">
          <div className="h-12 w-12 mx-auto mb-4 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <h3 className="text-lg font-semibold mb-2">Cargando Google Maps...</h3>
        </div>
      </div>
    )
  }

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={zoom} options={options} onLoad={onMapLoad}>
      {/* Marcadores para cada municipio */}
      {municipios.map((municipio) => (
        <Marker
          key={municipio.slug}
          position={{ lat: municipio.lat, lng: municipio.lng }}
          onClick={() => handleMarkerClick(municipio)}
          title={municipio.nombre}
        />
      ))}

      {/* Ventana de información para el municipio seleccionado */}
      {activeMarker && infoWindowOpen && (
        <InfoWindow position={{ lat: activeMarker.lat, lng: activeMarker.lng }} onCloseClick={handleInfoWindowClose}>
          <div className="p-2 max-w-xs">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg">{activeMarker.nombre}</h3>
              <div className={`w-3 h-3 rounded-full ${getCategoryColorClass(activeMarker.categoria)}`}></div>
            </div>
            <div className="relative w-full h-24 mb-2 overflow-hidden rounded">
              <Image
                src={activeMarker.imagen || "/placeholder.svg"}
                alt={activeMarker.nombre}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm mb-2">Población: {activeMarker.poblacion}</p>
            <Button asChild size="sm" className="w-full">
              <Link href={`/turismo/${activeMarker.slug}`}>Ver Detalles</Link>
            </Button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}
