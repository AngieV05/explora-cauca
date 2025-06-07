export interface Municipio {
  id: number
  nombre: string
  slug: string
  descripcion: string
  descripcionExtendida: string
  imagen: string
  categoria: string
  rating: number
  tiempo: string
  dificultad: string
  destacado: boolean
  poblacion: string
  altitud: string
  fundacion?: string
  clima: string
  temperatura: string
  atracciones: {
    nombre: string
    descripcion: string
    horario?: string
    precio?: string
    tipo: string
  }[]
  gastronomia: string[]
  eventos: {
    nombre: string
    fecha: string
    descripcion: string
  }[]
  comoLlegar: {
    desde: string
    medio: string
    tiempo: string
    descripcion: string
  }[]
  alojamiento: {
    tipo: string
    nombre: string
    precio: string
    descripcion: string
  }[]
  recomendaciones: string[]
}

// Datos completos para municipios principales
export const municipiosData: Municipio[] = [
  {
    id: 1,
    nombre: "Popayán",
    slug: "popayan",
    descripcion: "Capital del departamento, Ciudad Blanca de Colombia con arquitectura colonial única.",
    descripcionExtendida:
      "Popayán, conocida como la 'Ciudad Blanca de Colombia', es la capital del departamento del Cauca y una de las ciudades coloniales mejor conservadas del país. Fundada en 1537 por Sebastián de Belalcázar, esta hermosa ciudad se caracteriza por sus edificaciones de color blanco que le dan su distintivo apodo. La ciudad es famosa por su arquitectura colonial, sus tradiciones religiosas (especialmente la Semana Santa), su exquisita gastronomía y por ser cuna de 17 presidentes de Colombia.",
    imagen: "/images/popayan-centro-historico.png",
    categoria: "ciudad",
    rating: 4.9,
    tiempo: "1-2 días",
    dificultad: "Fácil",
    destacado: true,
    poblacion: "280,000",
    altitud: "1,760 msnm",
    fundacion: "1537",
    clima: "Templado",
    temperatura: "18-24°C",
    atracciones: [
      {
        nombre: "Torre del Reloj",
        descripcion: "Símbolo icónico de la ciudad, construida en 1673",
        horario: "24 horas",
        precio: "Gratis",
        tipo: "arquitectura",
      },
      {
        nombre: "Catedral Basílica de Popayán",
        descripcion: "Majestuosa catedral de arquitectura colonial",
        horario: "6:00 AM - 8:00 PM",
        precio: "Gratis",
        tipo: "religioso",
      },
      {
        nombre: "Casa Museo Mosquera",
        descripcion: "Museo dedicado al General Tomás Cipriano de Mosquera",
        horario: "9:00 AM - 5:00 PM",
        precio: "$8,000 COP",
        tipo: "museo",
      },
      {
        nombre: "Puente del Humilladero",
        descripcion: "Histórico puente de piedra del siglo XVIII",
        horario: "24 horas",
        precio: "Gratis",
        tipo: "arquitectura",
      },
    ],
    gastronomia: [
      "Empanadas de pipián",
      "Tamales de Popayán",
      "Carantanta",
      "Salpicón de frutas",
      "Champús",
      "Aplanchado",
    ],
    eventos: [
      {
        nombre: "Semana Santa",
        fecha: "Marzo/Abril",
        descripcion: "Procesiones Patrimonio UNESCO, las más importantes de Colombia",
      },
      {
        nombre: "Festival Gastronómico",
        fecha: "Septiembre",
        descripcion: "Celebración de la gastronomía caucana, Ciudad Gastronómica UNESCO",
      },
      {
        nombre: "Festival de Música Religiosa",
        fecha: "Agosto",
        descripcion: "Festival internacional de música sacra",
      },
    ],
    comoLlegar: [
      {
        desde: "Bogotá",
        medio: "Avión",
        tiempo: "1 hora",
        descripcion: "Vuelos directos al Aeropuerto Guillermo León Valencia",
      },
      {
        desde: "Cali",
        medio: "Bus",
        tiempo: "3 horas",
        descripcion: "Buses frecuentes por la vía Panamericana",
      },
      {
        desde: "Medellín",
        medio: "Avión",
        tiempo: "1.5 horas",
        descripcion: "Vuelos con conexión o directos",
      },
    ],
    alojamiento: [
      {
        tipo: "Hotel Boutique",
        nombre: "Hotel Camino Real",
        precio: "$150,000 - $250,000 COP",
        descripcion: "Hotel colonial en el centro histórico",
      },
      {
        tipo: "Hostal",
        nombre: "La Plazuela",
        precio: "$40,000 - $80,000 COP",
        descripcion: "Hostal acogedor cerca del parque principal",
      },
    ],
    recomendaciones: [
      "Visita durante Semana Santa para vivir las procesiones",
      "Prueba la gastronomía local en restaurantes tradicionales",
      "Camina por el centro histórico en las tardes",
      "Visita el Morro de Tulcán para una vista panorámica",
    ],
  },
  {
    id: 2,
    nombre: "Silvia",
    slug: "silvia",
    descripcion: "Pueblo guambiano famoso por su mercado indígena y cultura ancestral.",
    descripcionExtendida:
      "Silvia es un pintoresco municipio ubicado en la cordillera Central, conocido principalmente por ser el hogar del pueblo indígena Guambiano (Misak). Este lugar es famoso por su colorido mercado indígena que se realiza todos los martes, donde se puede apreciar la rica cultura ancestral, artesanías tradicionales y productos agrícolas de la región. Los Guambianos conservan sus tradiciones, idioma (nam trik) y vestimenta tradicional.",
    imagen: "/images/festival-cultural-cauca.jpeg",
    categoria: "cultura",
    rating: 4.7,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: true,
    poblacion: "35,000",
    altitud: "2,621 msnm",
    fundacion: "1562",
    clima: "Frío de montaña",
    temperatura: "8-18°C",
    atracciones: [
      {
        nombre: "Mercado Indígena de los Martes",
        descripcion: "Mercado tradicional guambiano con artesanías y productos locales",
        horario: "Martes 6:00 AM - 4:00 PM",
        precio: "Gratis",
        tipo: "cultural",
      },
      {
        nombre: "Laguna de Ñimbe",
        descripcion: "Laguna sagrada para el pueblo Guambiano",
        horario: "24 horas",
        precio: "Gratis",
        tipo: "naturaleza",
      },
      {
        nombre: "Casa del Cabildo Guambiano",
        descripcion: "Centro cultural y administrativo del pueblo Misak",
        horario: "8:00 AM - 5:00 PM",
        precio: "Gratis",
        tipo: "cultural",
      },
    ],
    gastronomia: [
      "Cuy asado",
      "Mote de maíz",
      "Chicha de maíz",
      "Trucha frita",
      "Mazamorra de maíz",
      "Queso campesino",
    ],
    eventos: [
      {
        nombre: "Mercado de los Martes",
        fecha: "Todos los martes",
        descripcion: "Mercado tradicional indígena más importante del Cauca",
      },
      {
        nombre: "Festival del Retorno",
        fecha: "Octubre",
        descripcion: "Celebración de la cultura Guambiana",
      },
    ],
    comoLlegar: [
      {
        desde: "Popayán",
        medio: "Bus",
        tiempo: "1.5 horas",
        descripcion: "Buses cada hora desde la terminal de Popayán",
      },
      {
        desde: "Piendamó",
        medio: "Bus",
        tiempo: "45 minutos",
        descripcion: "Conexión desde la vía Panamericana",
      },
    ],
    alojamiento: [
      {
        tipo: "Hotel Rural",
        nombre: "Hotel Misak",
        precio: "$60,000 - $100,000 COP",
        descripcion: "Hotel con arquitectura tradicional guambiana",
      },
      {
        tipo: "Hospedaje Familiar",
        nombre: "Casa Guambiana",
        precio: "$30,000 - $50,000 COP",
        descripcion: "Experiencia de turismo comunitario",
      },
    ],
    recomendaciones: [
      "Visita en martes para el mercado indígena",
      "Respeta las tradiciones y costumbres locales",
      "Lleva ropa abrigada por el clima frío",
      "Aprende algunas palabras en nam trik",
    ],
  },
  {
    id: 3,
    nombre: "Puracé",
    slug: "purace",
    descripcion: "Hogar del Parque Nacional Natural Puracé con volcanes activos y aguas termales.",
    descripcionExtendida:
      "Puracé es un municipio ubicado en el macizo colombiano, hogar del Parque Nacional Natural Puracé. Este territorio alberga la cadena volcánica de Los Coconucos, con el volcán Puracé como el más prominente. La región es conocida por sus aguas termales, páramos únicos, lagunas de origen glaciar y una biodiversidad excepcional. Es un destino ideal para el ecoturismo y el turismo de aventura.",
    imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    categoria: "naturaleza",
    rating: 4.8,
    tiempo: "2-3 días",
    dificultad: "Moderada",
    destacado: true,
    poblacion: "18,000",
    altitud: "3,200 msnm",
    fundacion: "1905",
    clima: "Páramo",
    temperatura: "2-12°C",
    atracciones: [
      {
        nombre: "Volcán Puracé",
        descripcion: "Volcán activo de 4,646 msnm, ideal para montañismo",
        horario: "6:00 AM - 4:00 PM",
        precio: "$15,000 COP",
        tipo: "naturaleza",
      },
      {
        nombre: "Termales de San Juan",
        descripcion: "Aguas termales naturales con propiedades medicinales",
        horario: "8:00 AM - 6:00 PM",
        precio: "$12,000 COP",
        tipo: "naturaleza",
      },
      {
        nombre: "Laguna de San Rafael",
        descripcion: "Laguna de origen glaciar en el páramo",
        horario: "24 horas",
        precio: "Incluido en entrada al parque",
        tipo: "naturaleza",
      },
      {
        nombre: "Cascada del Bedón",
        descripcion: "Impresionante cascada de 400 metros de altura",
        horario: "6:00 AM - 5:00 PM",
        precio: "Incluido en entrada al parque",
        tipo: "naturaleza",
      },
    ],
    gastronomia: [
      "Trucha al ajillo",
      "Caldo de papa criolla",
      "Cuy asado",
      "Mazamorra de maíz",
      "Chicha de maíz",
      "Queso de páramo",
    ],
    eventos: [
      {
        nombre: "Festival del Cuy",
        fecha: "Julio",
        descripcion: "Celebración gastronómica tradicional",
      },
      {
        nombre: "Caminata al Volcán",
        fecha: "Todo el año",
        descripcion: "Expediciones guiadas al cráter del volcán",
      },
    ],
    comoLlegar: [
      {
        desde: "Popayán",
        medio: "Bus",
        tiempo: "2 horas",
        descripcion: "Buses hacia La Plata con parada en Puracé",
      },
      {
        desde: "Coconuco",
        medio: "Jeep",
        tiempo: "30 minutos",
        descripcion: "Transporte local en vehículos 4x4",
      },
    ],
    alojamiento: [
      {
        tipo: "Ecolodge",
        nombre: "Refugio del Páramo",
        precio: "$80,000 - $120,000 COP",
        descripcion: "Alojamiento ecológico en el páramo",
      },
      {
        tipo: "Camping",
        nombre: "Zona de Camping PNN",
        precio: "$20,000 COP",
        descripcion: "Camping dentro del parque nacional",
      },
    ],
    recomendaciones: [
      "Lleva ropa muy abrigada e impermeable",
      "Contrata guía local para ascenso al volcán",
      "Aclimátate gradualmente a la altura",
      "Respeta las normas del parque nacional",
    ],
  },
  {
    id: 11,
    nombre: "Cajibío",
    slug: "cajibio",
    descripcion: "Municipio agrícola con tradiciones campesinas y paisajes rurales.",
    descripcionExtendida:
      "Cajibío es un municipio ubicado en el centro del departamento del Cauca, caracterizado por su vocación agrícola y sus hermosos paisajes rurales. Este territorio se distingue por sus extensas áreas de cultivo, especialmente de café, caña de azúcar y productos de pancoger. Sus habitantes conservan las tradiciones campesinas y la cultura paisa que llegó con los colonos antioqueños. El municipio ofrece un ambiente tranquilo y auténtico para quienes buscan conocer la vida rural caucana.",
    imagen: "/images/represa-cauca-paisaje.jpeg",
    categoria: "rural",
    rating: 3.9,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "40,000",
    altitud: "1,500 msnm",
    fundacion: "1912",
    clima: "Templado",
    temperatura: "18-26°C",
    atracciones: [
      {
        nombre: "Fincas Cafeteras",
        descripcion: "Recorridos por plantaciones de café con degustación",
        horario: "8:00 AM - 5:00 PM",
        precio: "$25,000 COP",
        tipo: "rural",
      },
      {
        nombre: "Mirador de Cajibío",
        descripcion: "Vista panorámica del valle del Cauca",
        horario: "24 horas",
        precio: "Gratis",
        tipo: "naturaleza",
      },
      {
        nombre: "Iglesia San Antonio",
        descripcion: "Templo colonial del siglo XVIII",
        horario: "6:00 AM - 6:00 PM",
        precio: "Gratis",
        tipo: "religioso",
      },
      {
        nombre: "Mercado Campesino",
        descripcion: "Mercado local con productos agrícolas frescos",
        horario: "Sábados 6:00 AM - 2:00 PM",
        precio: "Gratis",
        tipo: "cultural",
      },
    ],
    gastronomia: [
      "Sancocho de gallina criolla",
      "Arepa de chócolo",
      "Tamales caucanos",
      "Mazamorra de maíz",
      "Chicharrón",
      "Café de la región",
    ],
    eventos: [
      {
        nombre: "Festival del Café",
        fecha: "Octubre",
        descripcion: "Celebración de la cultura cafetera local",
      },
      {
        nombre: "Fiestas Patronales",
        fecha: "Junio",
        descripcion: "Festividades en honor a San Antonio",
      },
    ],
    comoLlegar: [
      {
        desde: "Popayán",
        medio: "Bus",
        tiempo: "45 minutos",
        descripcion: "Buses frecuentes desde la terminal de Popayán",
      },
      {
        desde: "Piendamó",
        medio: "Bus",
        tiempo: "20 minutos",
        descripcion: "Conexión rápida por carretera pavimentada",
      },
    ],
    alojamiento: [
      {
        tipo: "Finca Agroturística",
        nombre: "Hacienda El Cafetal",
        precio: "$60,000 - $90,000 COP",
        descripcion: "Experiencia rural con actividades agrícolas",
      },
      {
        tipo: "Hospedaje Familiar",
        nombre: "Casa Campesina",
        precio: "$35,000 - $50,000 COP",
        descripcion: "Alojamiento en casa de familia local",
      },
    ],
    recomendaciones: [
      "Visita las fincas cafeteras para conocer el proceso",
      "Prueba el café local recién tostado",
      "Participa en actividades agrícolas tradicionales",
      "Disfruta de la tranquilidad del ambiente rural",
    ],
  },
]

// Lista completa de todos los municipios del Cauca para generar rutas
export const todosMunicipiosSlugs = [
  "popayan",
  "silvia",
  "purace",
  "coconuco",
  "inza",
  "guapi",
  "timbio",
  "santander-de-quilichao",
  "caldono",
  "toribio",
  "cajibio",
  "piendamo",
  "morales",
  "padilla",
  "puerto-tejada",
  "villa-rica",
  "corinto",
  "miranda",
  "suarez",
  "buenos-aires",
  "caloto",
  "guachene",
  "jambalo",
  "paez-belalcazar",
  "sotara",
  "totoro",
  "rosas",
  "la-sierra",
  "la-vega",
  "almaguer",
  "argelia",
  "balboa",
  "bolivar",
  "mercaderes",
  "patia-el-bordo",
  "piamonte",
  "san-sebastian",
  "santa-rosa",
  "sucre",
  "timbiqui",
  "lopez-de-micay",
  "florencia",
]

// Función para crear datos básicos para municipios sin información detallada
function createBasicMunicipioData(slug: string): Municipio {
  // Mapeo de información básica para municipios
  const basicInfo: Record<string, Partial<Municipio>> = {
    timbio: {
      nombre: "Timbío",
      descripcion: "Conocido como la 'Villa de Leyva del Cauca' por su arquitectura colonial.",
      categoria: "ciudad",
      poblacion: "35,000",
      altitud: "1,710 msnm",
      clima: "Templado",
      temperatura: "18-24°C",
    },
    "santander-de-quilichao": {
      nombre: "Santander de Quilichao",
      descripcion: "Centro industrial y cultural del norte del Cauca.",
      categoria: "ciudad",
      poblacion: "95,000",
      altitud: "1,071 msnm",
      clima: "Cálido",
      temperatura: "22-28°C",
    },
    piendamo: {
      nombre: "Piendamó",
      descripcion: "Municipio agrícola conocido por su producción y cercanía a Popayán.",
      categoria: "rural",
      poblacion: "45,000",
      altitud: "1,400 msnm",
      clima: "Templado",
      temperatura: "20-26°C",
    },
    // Agregar más municipios según sea necesario
  }

  const info = basicInfo[slug] || {}

  return {
    id: Math.floor(Math.random() * 1000) + 100,
    nombre: info.nombre || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
    slug,
    descripcion: info.descripcion || `Municipio del departamento del Cauca con rica tradición cultural y natural.`,
    descripcionExtendida: `${info.nombre || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")} es un municipio del departamento del Cauca que forma parte de la rica diversidad territorial de la región. Este territorio conserva las tradiciones culturales y naturales que caracterizan al Cauca, ofreciendo a los visitantes una experiencia auténtica de la vida local. Sus habitantes mantienen vivas las costumbres ancestrales mientras trabajan en el desarrollo sostenible de su territorio.`,
    imagen: "/images/represa-cauca-paisaje.jpeg",
    categoria: info.categoria || "rural",
    rating: 3.5,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: info.poblacion || "25,000",
    altitud: info.altitud || "1,500 msnm",
    fundacion: "Siglo XIX",
    clima: info.clima || "Templado",
    temperatura: info.temperatura || "18-24°C",
    atracciones: [
      {
        nombre: "Plaza Principal",
        descripcion: "Centro histórico y cultural del municipio",
        horario: "24 horas",
        precio: "Gratis",
        tipo: "cultural",
      },
      {
        nombre: "Iglesia Principal",
        descripcion: "Templo religioso de arquitectura tradicional",
        horario: "6:00 AM - 6:00 PM",
        precio: "Gratis",
        tipo: "religioso",
      },
      {
        nombre: "Mirador Municipal",
        descripcion: "Vista panorámica del territorio",
        horario: "24 horas",
        precio: "Gratis",
        tipo: "naturaleza",
      },
    ],
    gastronomia: ["Sancocho tradicional", "Arepa de maíz", "Tamales caucanos", "Mazamorra", "Chicharrón", "Café local"],
    eventos: [
      {
        nombre: "Fiestas Patronales",
        fecha: "Según calendario local",
        descripcion: "Celebración tradicional del municipio",
      },
      {
        nombre: "Festival Cultural",
        fecha: "Anual",
        descripcion: "Muestra de tradiciones locales",
      },
    ],
    comoLlegar: [
      {
        desde: "Popayán",
        medio: "Bus",
        tiempo: "1-2 horas",
        descripcion: "Transporte público desde la terminal",
      },
    ],
    alojamiento: [
      {
        tipo: "Hospedaje Local",
        nombre: "Casa Familiar",
        precio: "$40,000 - $60,000 COP",
        descripcion: "Alojamiento en casa de familia",
      },
    ],
    recomendaciones: [
      "Visita la plaza principal y la iglesia",
      "Prueba la gastronomía local",
      "Interactúa con los habitantes locales",
      "Respeta las tradiciones culturales",
    ],
  }
}

export function getMunicipioBySlug(slug: string): Municipio | undefined {
  // Primero buscar en los datos detallados
  const detailedMunicipio = municipiosData.find((municipio) => municipio.slug === slug)
  if (detailedMunicipio) {
    return detailedMunicipio
  }

  // Si no está en los datos detallados, verificar si está en la lista completa
  if (todosMunicipiosSlugs.includes(slug)) {
    return createBasicMunicipioData(slug)
  }

  return undefined
}

export function getAllMunicipioSlugs(): string[] {
  return todosMunicipiosSlugs
}
