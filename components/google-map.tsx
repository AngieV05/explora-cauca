"use client"

import { useState, useCallback } from "react"
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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

// Colores para los marcadores según categoría
const getCategoryColor = (categoria) => {
  switch (categoria) {
    case "naturaleza":
      return "green"
    case "ciudad":
      return "orange"
    case "cultura":
      return "purple"
    case "costa":
      return "blue"
    case "rural":
      return "yellow"
    default:
      return "gray"
  }
}

// Clases de Tailwind para los colores de categoría
const getCategoryColorClass = (categoria) => {
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

export default function GoogleMapComponent({
  municipios,
  apiKey,
  center = { lat: 2.7, lng: -76.5 }, // Centro del Cauca por defecto
  zoom = 8,
  onSelectMunicipio,
  selectedMunicipio,
}: GoogleMapComponentProps) {
  const [mapRef, setMapRef] = useState(null)
  const [infoWindowOpen, setInfoWindowOpen] = useState(false)
  const [activeMarker, setActiveMarker] = useState(null)

  // Cargar la API de Google Maps
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  })

  // Función para manejar el clic en un marcador
  const handleMarkerClick = useCallback(
    (municipio) => {
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
  const onMapLoad = useCallback((map) => {
    setMapRef(map)
  }, [])

  // Renderizar mensaje de error si la carga falla
  if (loadError) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="text-center p-6">
          <h3 className="text-lg font-semibold mb-2">Error al cargar el mapa</h3>
          <p>No se pudo cargar Google Maps. Por favor, intenta de nuevo más tarde.</p>
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
          <h3 className="text-lg font-semibold mb-2">Cargando mapa...</h3>
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
          icon={{
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
            fillColor: getCategoryColor(municipio.categoria),
            fillOpacity: 0.9,
            strokeWeight: 1,
            strokeColor: "#ffffff",
            scale: 1.5,
            anchor: { x: 12, y: 22 },
          }}
          title={municipio.nombre}
          animation={window.google.maps.Animation.DROP}
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
