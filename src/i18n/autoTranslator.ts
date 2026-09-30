import { Language } from './translations';

let currentLanguage: Language = 'en';

export function setGlobalLanguage(lang: Language): void {
  currentLanguage = lang;
}

export function getGlobalLanguage(): Language {
  return currentLanguage;
}

const translationDictionary: Record<string, string> = {
  // Common terms & status strings
  'Today': 'Hoy',
  'Yesterday': 'Ayer',
  'Tomorrow': 'Mañana',
  'Confirmed': 'Confirmado',
  'Pending': 'Pendiente',
  'Hold': 'En Espera',
  'On Hold': 'En Espera',
  'Cancelled': 'Cancelado',
  'Completed': 'Completado',
  'In Progress': 'En Progreso',
  'Active': 'Activo',
  'Manager': 'Gerente',
  'Admin': 'Administrador',
  'Search': 'Buscar',
  'Save': 'Guardar',
  'Cancel': 'Cancelar',
  'Close': 'Cerrar',
  'Edit': 'Editar',
  'Delete': 'Eliminar',
  'View': 'Ver',
  'Actions': 'Acciones',
  'Status': 'Estado',
  'Date': 'Fecha',
  'Time': 'Hora',
  'Details': 'Detalles',
  'Filter': 'Filtrar',
  'Export': 'Exportar',
  'Refresh': 'Actualizar',
  'Submit': 'Enviar',
  'Back': 'Volver',
  'Next': 'Siguiente',
  'Previous': 'Anterior',
  'All': 'Todos',
  'None': 'Ninguno',
  'Yes': 'Sí',
  'No': 'No',
  'Success': 'Éxito',
  'Error': 'Error',
  'Warning': 'Advertencia',
  'Info': 'Información',
  'Total': 'Total',
  'Amount': 'Monto',
  'Member': 'Socio',
  'Guest': 'Invitado',
  'Room': 'Salón',
  'Court': 'Cancha',
  'Golf': 'Golf',
  'Event': 'Evento',
  'Calendar': 'Calendario',
  'Overview': 'Resumen',
  'Reports': 'Informes',
  'Settings': 'Configuración',
  'Profile': 'Perfil',
  'Logout': 'Cerrar Sesión',
  'Login': 'Iniciar Sesión',

  // Departments
  'Events': 'Eventos Privados',
  'Sports': 'Deportes de Raqueta',
  'Billing': 'Facturación del Club',
  'Concierge': 'Conserjería',
  'Catering': 'Banquetes y Gastronomía',

  // Member Tiers
  'Executive Social': 'Ejecutivo Social',
  'Platinum Founding': 'Platino Fundador',
  'Full Golf & Athletic': 'Golf Completo y Atlético',

  // Staff & Assignees
  'Eleanor Vance': 'Eleanor Vance',
  'Coach Mateo Rossi': 'Entrenador Mateo Rossi',
  'Staff': 'Personal',
  'Manager (All Depts)': 'Gerente General (Todos los Deptos)',

  // Time Relatives
  '12 mins ago': 'Hace 12 mins',
  '45 mins ago': 'Hace 45 mins',
  '2 hours ago': 'Hace 2 horas',
  '3 hours ago': 'Hace 3 horas',
  'Today, 08:15 AM': 'Hoy, 08:15 AM',
  'Today, 08:32 AM': 'Hoy, 08:32 AM',
  'Today, 09:10 AM': 'Hoy, 09:10 AM',
  'Today, 07:45 AM': 'Hoy, 07:45 AM',
  'Yesterday, 18:20': 'Ayer, 18:20',

  // Subjects
  'Autumn Wedding Ballroom Date Conflict & Tasting Request': 'Conflicto de Fecha en Gran Salón para Boda de Otoño y Solicitud de Caza de Sabores',
  'Boardroom AV & Vintage Wine Cellar Reserve': 'Equipo Audiovisual para Sala de Juntas y Cava de Vinos de Cosecha',
  'Request for Saturday Padel League Court Block': 'Solicitud de Bloqueo de Canchas de Pádel para Liga del Sábado',

  // Messages & Snippets
  'We would love to know if the 25th evening can be cleared, or if Palm Terrace is an option.': 'Nos encantaría saber si la noche del 25 se puede liberar o si la Terraza Palma es una opción.',
  'Please ensure the 2015 Château Margaux is decanted at 17:30 sharp.': 'Por favor asegúrese de que el Château Margaux 2015 se decante exactamente a las 17:30.',
  'Can we reserve all 4 glass courts between 10am and 1pm on Oct 10th?': '¿Podemos reservar las 4 canchas de cristal de 10:00 a 13:00 el 10 de octubre?',

  'Hello Eleanor, our wedding planner inspected the Grand Ballroom photos and we are captivated. We noticed a tentative hold on the 25th. Could you advise if there is any flexibility, or perhaps recommend the Palm Terrace as an alternative?': 'Hola Eleanor, nuestra planificadora de bodas inspeccionó las fotos del Gran Salón y quedamos cautivados. Notamos un bloqueo tentativo el 25. ¿Podrías indicarnos si hay flexibilidad o tal vez recomendarnos la Terraza Palma como alternativa?',
  
  'Good morning Victoria! It is lovely to hear from you. The 25th is held for the annual Sterling Gala, but I am already preparing a side-by-side walkthrough for the Palm Terrace, which accommodates up to 180 guests with our panoramic heaters and fireplace.': '¡Buenos días Victoria! Qué gusto saber de ti. El día 25 está reservado para la Gala Sterling anual, pero ya estoy preparando un recorrido comparativo para la Terraza Palma, que alberga hasta 180 invitados con nuestros calentadores panorámicos y chimenea.',

  'That sounds delightful! Could we also schedule a private chef tasting for my fiancé and parents next Wednesday afternoon?': '¡Suena encantador! ¿Podríamos también programar una degustación privada con el chef para mi prometido y mis padres el próximo miércoles por la tarde?',

  'Eleanor, for tonight\'s dinner in the Founders Room, our Singapore board members are joining via video. Please ensure the telepresence rig is pre-tested. Also, please have Henri decant the 2015 Margaux at 17:30.': 'Eleanor, para la cena de esta noche en el Salón Founders, los miembros de nuestra junta de Singapur se unirá por video. Por favor asegúrate de que el equipo de telepresencia esté probado. Además, por favor pídele a Henri que decante el Margaux 2015 a las 17:30.',

  'Hi Team, we have 24 club members interested in an Autumn Padel Doubles shootout on Saturday Oct 10th. Can we block all 4 courts from 10 to 1?': 'Hola equipo, tenemos 24 socios interesados en un torneo de dobles de pádel de otoño el sábado 10 de octubre. ¿Podemos bloquear las 4 canchas de 10 a 1?',

  // AI Summaries
  'Member is inquiring about Grand Ballroom availability for Sept 25/26, currently encountering a schedule conflict with the Sterling Gala hold. Suggest offering Palm Terrace or Sunday the 27th.': 'La socia consulta sobre la disponibilidad del Gran Salón para el 25/26 de sept., enfrentando actualmente un conflicto con el bloqueo de la Gala Sterling. Se sugiere ofrecer la Terraza Palma o el domingo 27.',

  'Member requests specific vintage decanting schedule and dual-screen teleconference setup for the Founders Oak Boardroom tonight.': 'El socio solicita un horario específico de decantación de vino de cosecha y configuración de videoconferencia con doble pantalla para la Sala de Juntas Founders esta noche.',

  'Request for full-facility padel block for 24 players. Requires manager override as standard member rules cap reservations at 2 courts.': 'Solicitud de bloqueo completo de instalaciones de pádel para 24 jugadores. Requiere autorización del gerente ya que las reglas estándar limitan a 2 canchas.',

  // Extracted Requirements
  'Guest Count: 180-200 guests': 'Invitados: 180-200 personas',
  'Preferred Date: Sept 25 or 26': 'Fecha Preferida: 25 o 26 de septiembre',
  'Catering: Plated dinner + Champagne tower': 'Banquetes: Cena servida + Torre de Champagne',
  'Alternative Venue: Palm Terrace & Veranda': 'Lugar Alternativo: Terraza Palma y Galería',
  'Founders Oak Boardroom': 'Sala de Juntas Founders Oak',
  'Decant 2015 Château Margaux at 17:30': 'Decantar Château Margaux 2015 a las 17:30',
  'Dual screen Zoom setup with international dial-in': 'Configuración Zoom en doble pantalla con enlace internacional',
  'Padel Courts 1-4': 'Canchas de Pádel 1-4',
  'Oct 10, 10:00 - 13:00 (3 hours)': '10 de oct, 10:00 - 13:00 (3 horas)',
  '24 players social tournament': 'Torneo social de 24 jugadores',
  'Requesting beverage station': 'Solicitan estación de bebidas y refrigerios',

  // Suggested Responses
  'Dear Victoria, thank you for your note. While the Grand Ballroom is currently held for the Sterling Foundation on the 25th, our heated Palm Terrace & Veranda is available, or we could secure Sunday Sept 27th exclusively for your wedding reception. May I prepare a tailored comparative proposal?': 'Estimada Victoria, gracias por su mensaje. Aunque el Gran Salón está reservado actualmente para la Fundación Sterling el 25, nuestra Terraza Palma con calefacción está disponible, o podríamos asegurar el domingo 27 de septiembre exclusivamente para su recepción. ¿Le preparo una propuesta comparativa a la medida?',

  'Confirmed, Mr. Kensington. Head Sommelier Henri has retrieved the 2015 Margaux from our temperature-controlled cellar and will decant precisely at 17:30. Tech lead Marcus has verified the boardroom telepresence bridge.': 'Confirmado, Sr. Kensington. El Sommelier Principal Henri ha retirado el Margaux 2015 de nuestra cava climatizada y lo decantará precisamente a las 17:30. El líder técnico Marcus ha verificado el enlace de telepresencia.',

  'Hi Elena, what a fantastic initiative! Under club tournament rules, reserving all 4 courts for 3 hours requires athletic director sign-off ($480 facility fee). I have forwarded this for approval and will confirm within 2 hours.': 'Hola Elena, ¡qué fantástica iniciativa! Según las reglas de torneos del club, reservar las 4 canchas por 3 horas requiere la firma del director deportivo (cuota de $480). He reenviado esto para aprobación y confirmaré dentro de 2 horas.',

  // Staff Notes
  'Member spoke with Hospitality Lead on Wednesday; highly enthusiastic about autumn wedding date.': 'La socia habló con la Directora de Hospitalidad el miércoles; muy entusiasmada con la fecha de boda de otoño.',
  'VIP father-in-law is an honorary member of St. Andrews.': 'El suegro VIP es miembro honorario de St. Andrews.',

  // Venues & Facilities
  'Grand Crystal Ballroom': 'Gran Salón de Cristal',
  'Palm Terrace & Veranda': 'Terraza Palma y Galería',
  'North Championship Course (18 Holes)': 'Campo de Campeonato Norte (18 Hoyos)',
  'South Links Executive (9 Holes)': 'Campo Ejecutivo Links Sur (9 Hoyos)',
  'Clay Tennis Pavilion (Courts 1–6)': 'Pabellón de Tenis de Arcilla (Canchas 1–6)',
  'Glass Padel Courts (Courts 1–4)': 'Canchas de Pádel de Cristal (Canchas 1–4)',
  'Aquatics Complex & Lap Pool': 'Complejo Acuático y Piscina de Natación',
  'Executive Boardroom': 'Sala de Juntas Ejecutiva',

  // Locations & Categories
  'Club Clubhouse - Main Level': 'Casa Club - Nivel Principal',
  'West Terrace Overlooking Course': 'Terraza Oeste con Vista al Campo',
  'North Fairways': 'Calles Norte',
  'South Fairways': 'Calles Sur',
  'Sports Pavilion': 'Pabellón Deportivo',
  'Padel Club Center': 'Centro del Club de Pádel',
  'Athletic Center': 'Centro Atlético',
  'Clubhouse Executive Wing': 'Ala Ejecutiva de la Casa Club',
  'event_hall': 'Salón de Eventos',
  'sports': 'Instalaciones Deportivas',

  // Descriptions
  'Grand ballroom featuring crystal chandeliers, private foyer, and stage.': 'Gran salón con arañas de cristal, vestíbulo privado y escenario.',
  'Open-air covered terrace with panoramic fairway views and stone fireplace.': 'Terraza cubierta al aire libre con vistas panorámicas al campo y chimenea de piedra.',
  'Pristine 18-hole championship course designed by Robert Trent Jones.': 'Prístino campo de campeonato de 18 hoyos diseñado por Robert Trent Jones.',

  // Amenities
  'Crystal Chandeliers': 'Arañas de Cristal',
  'Private Foyer': 'Vestíbulo Privado',
  'AV Stage': 'Escenario con AV',
  'Dancefloor': 'Pista de Baile',
  'Panorama Heaters': 'Calentadores Panorámicos',
  'Fireplace': 'Chimenea',
  'Fairway View': 'Vista al Campo',
  'GPS Carts': 'Carritos con GPS',
  'Pro Shop': 'Tienda de Golf',
  'Practice Range': 'Campo de Prácticas',
  'Clay Courts': 'Canchas de Arcilla',
  'Night Lights': 'Iluminación Nocturna',
  'Glass Walls': 'Paredes de Cristal',
  'Pro Shop Locker': 'Casilleros Pro Shop',
  'Heated Pool': 'Piscina Climatizada',
  'Lap Lanes': 'Carriles de Natación',
  'Boardroom TV': 'TV para Conferencia',
  'Telepresence': 'Telepresencia',

  // Packages & Inclusions
  'Grand Royal Gala Experience': 'Experiencia Gala Real Gran Salón',
  'Veranda Twilight Cocktail Soirée': 'Coctelera al Atardecer en la Terraza',
  'Championship Pro-Am Golf Outing': 'Torneo Pro-Am de Golf en Campo de Campeonato',
  'Exclusive 10-hour Ballroom & Foyer access': 'Acceso exclusivo de 10 horas al Salón y Vestíbulo',
  'Plated 4-course French service dinner by Chef Laurent': 'Cena servida de 4 tiempos estilo francés por el Chef Laurent',
  'Sommelier Reserve 5-hour open bar (Dom Pérignon toast)': 'Barra libre de 5 horas Reserva del Sommelier (brindis con Dom Pérignon)',
  'Full AV lighting production, staging & wireless microphones': 'Producción completa de iluminación AV, escenario y micrófonos inalámbricos',
  'Complimentary private bridal dressing suite with champagne': 'Suite privada de vestidor para novias con champagne de cortesía',
  'Covered limestone fireplace terrace with radiant heating': 'Terraza cubierta de piedra caliza con chimenea y calefacción radiante',
  'Passed chef canapés (6 selections) & raw seafood bar': 'Canapés pasados del chef (6 selecciones) y barra de mariscos',
  'Craft cocktail bar & artisanal estate wine list': 'Barra de coctelería de autor y carta de vinos artesanales',
  'Perimeter sound system & acoustic musicians stage': 'Sistema de sonido perimetral y escenario para músicos acústicos',
  '18 holes with GPS luxury cart and personalized cart signs': '18 hoyos con carrito de lujo con GPS y señalización personalizada',
  'Halfway house beverage vouchers & Titleist practice balls': 'Vales de bebidas para la casa de descanso y bolas de práctica Titleist',
  'Post-round BBQ awards buffet on the Club Lawn': 'Buffet de premiación con barbacoa en el césped del club',
  'Live scoring via TrackMan digital leaderboard': 'Puntuación en vivo a través de la tabla de clasificación digital TrackMan',

  // Event Types & Member Tiers
  'Wedding': 'Boda',
  'Corporate Gala': 'Gala Corporativa',
  'Executive Summit': 'Cumbre Ejecutiva',
  'Anniversary': 'Aniversario',
  'Golf Tournament': 'Torneo de Golf',
  'Private Dining': 'Cena Privada',
  'Full Athletic': 'Atleta Completo',
  'Founding Member': 'Socio Fundador',

  // Add-ons
  'Late-Night Truffle Fries & Slider Bar': 'Barra de Papas Fritas con Trufa y Mini Hamburguesas Nocturna',
  'Signature Espresso Martini Rolling Trolley': 'Carrito Móvil de Espresso Martini de Autor',
  'Laser Projection & 4K Live Camera Relay': 'Proyección Láser y Transmisión en Vivo 4K',
  'Custom Monogram Ice Sculpture & Chiller': 'Escultura de Hielo con Monograma Personalizado y Enfriador',
  'per guest': 'por invitado',
  'per event': 'por evento',
  'per sculpture': 'por escultura',
  'AV Tech': 'Tecnología AV',
  'Decor': 'Decoración',
  'Beverage': 'Bebidas'
};

export function tr(text: string, targetLang?: Language): string {
  if (!text) return '';
  const lang = targetLang || currentLanguage;
  if (lang === 'en') return text;

  if (translationDictionary[text]) {
    return translationDictionary[text];
  }

  const lower = text.trim();
  const foundKey = Object.keys(translationDictionary).find(
    (k) => k.toLowerCase() === lower.toLowerCase()
  );
  if (foundKey) {
    return translationDictionary[foundKey];
  }

  return text;
}

export function autoTranslate(text: string, targetLang?: Language): string {
  return tr(text, targetLang);
}
