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
    imagen: "/images/explora-cauca-hero.png",
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
    imagen: "/images/explora-cauca-hero.png",
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
      "Lleva ropa muy abrigada y impermeable",
      "Contrata guía local para ascenso al volcán",
      "Aclimátate gradualmente a la altura",
      "Respeta las normas del parque nacional",
    ],
  },
  {
    id: 4,
    nombre: "Coconuco",
    slug: "coconuco",
    descripcion: "Famoso por sus termales naturales y paisajes de páramo.",
    descripcionExtendida:
      "Coconuco es un pequeño municipio ubicado en las estribaciones del macizo colombiano, famoso mundialmente por sus aguas termales naturales. Estas aguas, que emergen del subsuelo a temperaturas entre 60 y 85°C, tienen propiedades medicinales reconocidas. El municipio está rodeado de paisajes de páramo, con una biodiversidad única y vistas espectaculares de los volcanes circundantes.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "naturaleza",
    rating: 4.6,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "12,000",
    altitud: "2,400 msnm",
    fundacion: "1912",
    clima: "Frío de montaña",
    temperatura: "8-18°C",
    atracciones: [
      {
        nombre: "Termales de Coconuco",
        descripcion: "Complejos de aguas termales naturales con propiedades medicinales",
        horario: "8:00 AM - 6:00 PM",
        precio: "$15,000 - $25,000 COP",
        tipo: "naturaleza",
      },
      {
        nombre: "Aguas Hirviendo",
        descripcion: "Fuentes termales naturales que brotan del suelo",
        horario: "24 horas",
        precio: "Gratis",
        tipo: "naturaleza",
      },
      {
        nombre: "Mirador del Páramo",
        descripcion: "Vista panorámica de la cadena volcánica",
        horario: "24 horas",
        precio: "Gratis",
        tipo: "naturaleza",
      },
    ],
    gastronomia: [
      "Trucha a la plancha",
      "Caldo de costilla",
      "Cuy asado",
      "Mazamorra de maíz",
      "Agua de panela con queso",
      "Arepa de maíz",
    ],
    eventos: [
      {
        nombre: "Festival de las Aguas Termales",
        fecha: "Agosto",
        descripcion: "Celebración de las propiedades curativas de las aguas",
      },
    ],
    comoLlegar: [
      {
        desde: "Popayán",
        medio: "Bus",
        tiempo: "1.5 horas",
        descripcion: "Buses directos desde la terminal",
      },
      {
        desde: "Puracé",
        medio: "Jeep",
        tiempo: "30 minutos",
        descripcion: "Transporte local",
      },
    ],
    alojamiento: [
      {
        tipo: "Hotel Termal",
        nombre: "Hotel Coconuco",
        precio: "$70,000 - $120,000 COP",
        descripcion: "Hotel con acceso directo a termales",
      },
      {
        tipo: "Cabaña",
        nombre: "Cabañas del Páramo",
        precio: "$50,000 - $80,000 COP",
        descripcion: "Cabañas rústicas con vista al páramo",
      },
    ],
    recomendaciones: [
      "Visita las termales temprano en la mañana",
      "Lleva traje de baño y toalla",
      "Hidratate bien debido a la altura",
      "Respeta los tiempos recomendados en las aguas termales",
    ],
  },
  {
    id: 5,
    nombre: "Inzá",
    slug: "inza",
    descripcion: "Puerta de entrada al Parque Arqueológico de Tierradentro.",
    descripcionExtendida:
      "Inzá es un municipio ubicado en la cordillera Central, conocido principalmente por ser la puerta de entrada al Parque Arqueológico Nacional de Tierradentro, declarado Patrimonio de la Humanidad por la UNESCO. Este territorio alberga la cultura precolombina más importante del suroccidente colombiano, con hipogeos (tumbas subterráneas) únicos en el mundo, estatuaria y vestigios de una civilización milenaria.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "cultura",
    rating: 4.5,
    tiempo: "2 días",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "28,000",
    altitud: "1,720 msnm",
    fundacion: "1905",
    clima: "Templado",
    temperatura: "16-24°C",
    atracciones: [
      {
        nombre: "Parque Arqueológico de Tierradentro",
        descripcion: "Hipogeos precolombinos Patrimonio de la Humanidad UNESCO",
        horario: "8:00 AM - 4:00 PM",
        precio: "$20,000 COP",
        tipo: "arqueologico",
      },
      {
        nombre: "Museo Arqueológico",
        descripcion: "Exhibición de piezas y explicación de la cultura Tierradentro",
        horario: "8:00 AM - 4:00 PM",
        precio: "Incluido",
        tipo: "museo",
      },
      {
        nombre: "Alto de San Andrés",
        descripcion: "Sitio arqueológico con hipogeos decorados",
        horario: "8:00 AM - 4:00 PM",
        precio: "Incluido",
        tipo: "arqueologico",
      },
    ],
    gastronomia: [
      "Sancocho de gallina criolla",
      "Tamales nasa",
      "Chicha de maíz",
      "Cuy asado",
      "Mazamorra de maíz",
      "Queso campesino",
    ],
    eventos: [
      {
        nombre: "Festival Arqueológico",
        fecha: "Octubre",
        descripcion: "Celebración de la cultura precolombina",
      },
      {
        nombre: "Encuentro de Culturas",
        fecha: "Agosto",
        descripcion: "Intercambio cultural entre comunidades indígenas",
      },
    ],
    comoLlegar: [
      {
        desde: "Popayán",
        medio: "Bus",
        tiempo: "3 horas",
        descripcion: "Buses hacia La Plata con parada en Inzá",
      },
      {
        desde: "Neiva",
        medio: "Bus",
        tiempo: "4 horas",
        descripcion: "Ruta por San Agustín",
      },
    ],
    alojamiento: [
      {
        tipo: "Hotel Arqueológico",
        nombre: "Hotel Tierradentro",
        precio: "$60,000 - $100,000 COP",
        descripcion: "Hotel temático cerca del parque",
      },
      {
        tipo: "Hospedaje Comunitario",
        nombre: "Casa Nasa",
        precio: "$40,000 - $60,000 COP",
        descripcion: "Turismo comunitario indígena",
      },
    ],
    recomendaciones: [
      "Dedica al menos dos días para visitar todos los sitios",
      "Contrata guía local para mejor comprensión",
      "Lleva calzado cómodo para caminar",
      "Respeta las normas del parque arqueológico",
    ],
  },
  {
    id: 6,
    nombre: "Guapi",
    slug: "guapi",
    descripcion: "Puerto en la costa pacífica, cultura afrocolombiana y biodiversidad marina.",
    descripcionExtendida:
      "Guapi es un municipio costero ubicado en el litoral Pacífico caucano, caracterizado por su rica cultura afrocolombiana, biodiversidad marina excepcional y tradiciones musicales únicas. Este puerto fluvial es el corazón de la cultura del Pacífico, donde se conservan tradiciones ancestrales, música tradicional como el currulao, y una gastronomía basada en productos del mar y la selva tropical.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "costa",
    rating: 4.4,
    tiempo: "2-3 días",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "30,000",
    altitud: "5 msnm",
    fundacion: "1772",
    clima: "Tropical húmedo",
    temperatura: "24-32°C",
    atracciones: [
      {
        nombre: "Malecón de Guapi",
        descripcion: "Paseo fluvial con vista al río Guapi",
        horario: "24 horas",
        precio: "Gratis",
        tipo: "cultural",
      },
      {
        nombre: "Isla Gorgona (excursión)",
        descripcion: "Parque Nacional Natural con biodiversidad marina",
        horario: "Tours programados",
        precio: "$150,000 COP",
        tipo: "naturaleza",
      },
      {
        nombre: "Manglares del Pacífico",
        descripcion: "Ecosistema de manglar con fauna única",
        horario: "Tours diurnos",
        precio: "$50,000 COP",
        tipo: "naturaleza",
      },
    ],
    gastronomia: ["Sancocho de pescado", "Arroz con coco", "Pescado frito", "Patacones", "Borojó", "Viche"],
    eventos: [
      {
        nombre: "Festival de Currulao",
        fecha: "Agosto",
        descripcion: "Celebración de la música tradicional del Pacífico",
      },
      {
        nombre: "Festival del Folclor Chocoano",
        fecha: "Octubre",
        descripcion: "Muestra cultural afrocolombiana",
      },
    ],
    comoLlegar: [
      {
        desde: "Popayán",
        medio: "Bus + Lancha",
        tiempo: "6 horas",
        descripcion: "Bus a López de Micay, luego lancha",
      },
      {
        desde: "Cali",
        medio: "Avión",
        tiempo: "45 minutos",
        descripcion: "Vuelos charter al aeropuerto local",
      },
    ],
    alojamiento: [
      {
        tipo: "Hotel Costero",
        nombre: "Hotel Pacífico",
        precio: "$80,000 - $120,000 COP",
        descripcion: "Hotel frente al río con aire acondicionado",
      },
      {
        tipo: "Hospedaje Familiar",
        nombre: "Casa del Manglar",
        precio: "$40,000 - $70,000 COP",
        descripcion: "Hospedaje familiar tradicional",
      },
    ],
    recomendaciones: [
      "Lleva repelente para mosquitos",
      "Usa protector solar y ropa ligera",
      "Prueba la gastronomía local del Pacífico",
      "Respeta las tradiciones afrocolombianas",
    ],
  },
]

export function getMunicipioBySlug(slug: string): Municipio | undefined {
  return municipiosData.find((municipio) => municipio.slug === slug)
}

export function getAllMunicipioSlugs(): string[] {
  return municipiosData.map((municipio) => municipio.slug)
}
