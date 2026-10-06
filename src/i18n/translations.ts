export type Language = 'en' | 'es';

export interface Translations {
  common: {
    language: string;
    english: string;
    spanish: string;
    save: string;
    cancel: string;
    close: string;
    edit: string;
    delete: string;
    filter: string;
    export: string;
    status: string;
    date: string;
    all: string;
    search: string;
    actions: string;
    confirmed: string;
    pending: string;
    hold: string;
    cancelled: string;
    switchLanguage: string;
    active: string;
    viewAll: string;
    completed: string;
    inProgress: string;
  };
  login: {
    title: string;
    subtitle: string;
    memberLoginTab: string;
    staffLoginTab: string;
    memberIdPlaceholder: string;
    rememberMe: string;
    memberSignInBtn: string;
    quickMemberLogin: string;
    adminSuite: string;
    username: string;
    password: string;
    forgotPassword: string;
    signInBtn: string;
    orContinueWith: string;
    roleSelector: string;
    oneClickLogin: string;
    notMember: string;
    registerNow: string;
    slogan: string;
    banner18Hole: string;
    bannerTeeTimes: string;
    bannerCourts: string;
    bannerCapacity: string;
    bannerOfficial: string;
    resetSent: string;
    registrationNotice: string;
    continueGoogle: string;
    continueApple: string;
    continueFacebook: string;
  };
  header: {
    searchPlaceholder: string;
    newBooking: string;
    alerts: string;
    liveFeed: string;
    conflictAlert: string;
    conflictDesc: string;
    aiPending: string;
    aiPendingDesc: string;
    teeSheetCheckIn: string;
    teeSheetDesc: string;
    adminLogin: string;
    logout: string;
    console: string;
  };
  sidebar: {
    overview: string;
    dashboard: string;
    memberDashboard: string;
    workQueue: string;
    inbox: string;
    conversationDetail: string;
    calendar: string;
    masterCalendar: string;
    events: string;
    eventInquiries: string;
    eventDetail: string;
    venuesPackages: string;
    golf: string;
    teeSheet: string;
    golfBookingDetail: string;
    otherSports: string;
    facilityBookings: string;
    members: string;
    memberDirectory: string;
    finance: string;
    paymentsTransactions: string;
    aiCenter: string;
    aiReviewQueue: string;
    knowledgeRules: string;
    insights: string;
    reports: string;
    administration: string;
    staffPermissions: string;
    integrationsHealth: string;
    configuration: string;
    adminRole: string;
    keyBadge: string;
    conflictBadge: string;
  };
  dashboard: {
    todaysOverview: string;
    dateDisplay: string;
    welcomeTitle: string;
    welcomeSubtitle: string;
    calendarCollision: string;
    aiDraftsReview: string;
    openCalendar: string;
    kpiBookings: string;
    kpiBookingsDesc: string;
    kpiInquiries: string;
    kpiInquiriesDesc: string;
    kpiPayments: string;
    kpiPaymentsDesc: string;
    kpiTasks: string;
    kpiTasksDesc: string;
    quickActions: string;
    actionNewBooking: string;
    actionProposal: string;
    actionTeeSheet: string;
    actionCourt: string;
    todaysSchedule: string;
    liveTeeSheet: string;
    pendingInquiries: string;
    financialPulse: string;
    todayRevenue: string;
    occupancyRate: string;
    activeMembersCount: string;
    viewAllCalendar: string;
    viewAllInbox: string;
    viewTeeSheet: string;
    conflictWarning: string;
    resolveConflict: string;
    checkInPlayer: string;
    checkedIn: string;
    reviewDraft: string;
    noConflicts: string;
    noConflictsSub: string;
  };
  modal: {
    title: string;
    subtitle: string;
    facilityType: string;
    eventHalls: string;
    golf: string;
    sportsPavilion: string;
    facility: string;
    bookingTitle: string;
    bookingTitlePlaceholder: string;
    member: string;
    date: string;
    startTime: string;
    endTime: string;
    bookingStatus: string;
    confirmed: string;
    hold: string;
    closure: string;
    guests: string;
    notes: string;
    notesPlaceholder: string;
    cancel: string;
    confirmBooking: string;
  };
  roles: {
    manager: string;
    events_team: string;
    golf_sports: string;
    finance: string;
    front_desk: string;
    sysadmin: string;
    member: string;
  };
  screenTitles: Record<string, string>;
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      language: 'Language',
      english: 'English',
      spanish: 'Español',
      save: 'Save Changes',
      cancel: 'Cancel',
      close: 'Close',
      edit: 'Edit',
      delete: 'Delete',
      filter: 'Filter',
      export: 'Export',
      status: 'Status',
      date: 'Date',
      all: 'All',
      search: 'Search',
      actions: 'Actions',
      confirmed: 'Confirmed',
      pending: 'Pending',
      hold: 'Hold',
      cancelled: 'Cancelled',
      switchLanguage: 'Switch to Spanish',
      active: 'Active',
      viewAll: 'View All',
      completed: 'Completed',
      inProgress: 'In Progress'
    },
    login: {
      title: 'Santo Domingo Country Club',
      subtitle: 'Welcome to the Exclusive Member Portal & Concierge Suite.',
      memberLoginTab: 'Member Portal Login',
      staffLoginTab: 'Staff Operations Login',
      memberIdPlaceholder: 'Email or Member ID (e.g. #1029)',
      rememberMe: 'Remember me on this device',
      memberSignInBtn: 'Sign In to Member Portal',
      quickMemberLogin: 'Quick Member Access',
      adminSuite: 'Admin Suite',
      username: 'Username',
      password: 'Password',
      forgotPassword: 'Forgot Password?',
      signInBtn: 'Sign In to Admin Hub',
      orContinueWith: 'or continue with',
      roleSelector: 'Admin Role Selector',
      oneClickLogin: '1-Click Auto Login',
      notMember: 'Not a member?',
      registerNow: 'Register now',
      slogan: 'Make your club operations easier and organized with Santo Domingo Country Club Hub',
      banner18Hole: '18-Hole Course',
      bannerTeeTimes: 'Tee Times Live',
      bannerCourts: 'Courts & Events',
      bannerCapacity: 'Full Capacity',
      bannerOfficial: 'Est. 1920 • Official Management Console',
      resetSent: 'A password reset link has been dispatched to your administrator email.',
      registrationNotice: 'Registration request routed to Santo Domingo Country Club Membership Committee.',
      continueGoogle: 'Continue with Google',
      continueApple: 'Continue with Apple',
      continueFacebook: 'Continue with Facebook'
    },
    header: {
      searchPlaceholder: 'Search bookings, members, events, or inquiries... (Enter)',
      newBooking: 'New Booking / Hold',
      alerts: 'Operational Alerts',
      liveFeed: 'Live Feed',
      conflictAlert: 'Calendar Double-Hold Conflict!',
      conflictDesc: 'Grand Ballroom hold overlaps with Sterling Gala. Requires staff resolution.',
      aiPending: 'AI Drafts Awaiting Approval',
      aiPendingDesc: 'Member proposal responses and cancellation fee waivers need review.',
      teeSheetCheckIn: 'Tee Sheet 07:30 Checked-In',
      teeSheetDesc: 'Julian Sterling foursome on Championship #1 tee.',
      adminLogin: 'Admin Login',
      logout: 'Sign Out',
      console: 'Console'
    },
    sidebar: {
      overview: 'Overview',
      dashboard: 'Staff Operations',
      memberDashboard: 'Member Portal & Traffic',
      workQueue: 'Work Queue',
      inbox: 'Unified Inbox',
      conversationDetail: 'Conversation Detail',
      calendar: 'Calendar',
      masterCalendar: 'Master Calendar',
      events: 'Events',
      eventInquiries: 'Event Inquiries',
      eventDetail: 'Event Detail / Planner',
      venuesPackages: 'Venues & Packages',
      golf: 'Golf',
      teeSheet: 'Tee Sheet',
      golfBookingDetail: 'Golf Booking Detail',
      otherSports: 'Other Sports',
      facilityBookings: 'Facility Bookings',
      members: 'Members',
      memberDirectory: 'Member Directory',
      finance: 'Finance',
      paymentsTransactions: 'Payments & Transactions',
      aiCenter: 'AI Center',
      aiReviewQueue: 'AI Review Queue',
      knowledgeRules: 'Knowledge & AI Rules',
      insights: 'Insights',
      reports: 'Reports & Analytics',
      administration: 'Administration',
      staffPermissions: 'Staff & Permissions',
      integrationsHealth: 'Integrations & Health',
      configuration: 'Configuration',
      adminRole: 'Admin Role',
      keyBadge: 'Key',
      conflictBadge: 'conflict'
    },
    dashboard: {
      todaysOverview: "Today's Overview",
      dateDisplay: 'Friday, September 25, 2026',
      welcomeTitle: 'Make your club operations organized & effortless',
      welcomeSubtitle: 'bookings scheduled across event halls, championship fairways, and athletic facilities today.',
      calendarCollision: 'Calendar Collision',
      aiDraftsReview: 'AI Drafts to Review',
      openCalendar: 'Open Master Calendar',
      kpiBookings: "Today's Bookings",
      kpiBookingsDesc: 'Events, golf & courts active',
      kpiInquiries: 'Inquiries to Action',
      kpiInquiriesDesc: 'Unread or awaiting reply',
      kpiPayments: 'Pending Payments',
      kpiPaymentsDesc: 'Requires reconciliation',
      kpiTasks: 'Event Prep Tasks',
      kpiTasksDesc: 'Due before guest arrival',
      quickActions: 'Operational Quick Actions',
      actionNewBooking: 'New Booking / Hold',
      actionProposal: 'Prepare Quote',
      actionTeeSheet: 'Tee Sheet Live',
      actionCourt: 'Book Sport Court',
      todaysSchedule: "Today's Scheduled Master Events",
      liveTeeSheet: 'Golf Tee Sheet Active Play',
      pendingInquiries: 'Member Communications & Inquiries',
      financialPulse: 'Financial & Revenue Snapshot',
      todayRevenue: "Today's Cashflow",
      occupancyRate: 'Venue Utilization',
      activeMembersCount: 'Active Memberships',
      viewAllCalendar: 'View Master Calendar',
      viewAllInbox: 'Open Unified Inbox',
      viewTeeSheet: 'View Full Tee Sheet',
      conflictWarning: 'Facility Schedule Collision Detected',
      resolveConflict: 'Resolve Hold Collision',
      checkInPlayer: 'Check-In',
      checkedIn: 'Checked-In',
      reviewDraft: 'Review Draft',
      noConflicts: 'Schedule in Harmony',
      noConflictsSub: 'No room or fairway conflicts detected today.'
    },
    modal: {
      title: 'Create Reservation or Hold',
      subtitle: 'Record a booking, member hold, or facility closure',
      facilityType: 'Facility Type',
      eventHalls: 'Event Halls',
      golf: 'Golf Course',
      sportsPavilion: 'Sports Pavilion',
      facility: 'Facility / Space',
      bookingTitle: 'Event / Booking Title',
      bookingTitlePlaceholder: 'e.g. Sterling Executive Dinner',
      member: 'Member Name',
      date: 'Date',
      startTime: 'Start Time',
      endTime: 'End Time',
      bookingStatus: 'Booking Status',
      confirmed: 'Confirmed',
      hold: 'Hold (Tentative)',
      closure: 'Closure / Maintenance',
      guests: 'Guest / Player Count',
      notes: 'Special Notes & Instructions',
      notesPlaceholder: 'Add dietary restrictions, room setups, caddy requests...',
      cancel: 'Cancel',
      confirmBooking: 'Confirm & Save Booking'
    },
    roles: {
      manager: 'Manager (All Depts)',
      events_team: 'Events Team',
      golf_sports: 'Golf & Sports Staff',
      finance: 'Finance Specialist',
      front_desk: 'Front Desk Concierge',
      sysadmin: 'System Administrator',
      member: 'Member / Country Club Member'
    },
    screenTitles: {
      dashboard: 'Dashboard Overview',
      member_dashboard: 'Member Portal & Golf Course Traffic',
      inbox: 'Unified Work Inbox',
      conversation_detail: 'Conversation Detail',
      master_calendar: 'Master Facilities Calendar',
      event_inquiries: 'Event Inquiries & Pipeline',
      event_detail: 'Event Planner & Working File',
      venues_packages: 'Venues, Layouts & Packages',
      tee_sheet: 'Golf Tee Sheet',
      golf_booking_detail: 'Golf Booking Detail',
      facility_bookings: 'Sports & Court Bookings',
      member_directory: 'Member Directory & Profile',
      payments_transactions: 'Payments & Transactions',
      ai_review_queue: 'AI Human Review Queue',
      knowledge_rules: 'Knowledge Base & AI Guardrails',
      reports: 'Operations & Financial Reports',
      staff_permissions: 'Staff Accounts & Permissions',
      integrations_health: 'System Health & Integrations',
      configuration: 'Club Configuration'
    }
  },
  es: {
    common: {
      language: 'Idioma',
      english: 'English',
      spanish: 'Español',
      save: 'Guardar Cambios',
      cancel: 'Cancelar',
      close: 'Cerrar',
      edit: 'Editar',
      delete: 'Eliminar',
      filter: 'Filtrar',
      export: 'Exportar',
      status: 'Estado',
      date: 'Fecha',
      all: 'Todos',
      search: 'Buscar',
      actions: 'Acciones',
      confirmed: 'Confirmado',
      pending: 'Pendiente',
      hold: 'En Espera',
      cancelled: 'Cancelado',
      switchLanguage: 'Cambiar a Inglés',
      active: 'Activo',
      viewAll: 'Ver Todos',
      completed: 'Completado',
      inProgress: 'En Progreso'
    },
    login: {
      title: 'Santo Domingo Country Club',
      subtitle: 'Bienvenido al Portal Exclusivo de Socios y Conserjería.',
      memberLoginTab: 'Acceso a Portal de Socios',
      staffLoginTab: 'Acceso a Personal de Consola',
      memberIdPlaceholder: 'Correo electrónico o Nº de Socio (ej. #1029)',
      rememberMe: 'Recordarme en este dispositivo',
      memberSignInBtn: 'Ingresar al Portal de Socios',
      quickMemberLogin: 'Acceso Rápido de Socio',
      adminSuite: 'Suite de Administración',
      username: 'Usuario',
      password: 'Contraseña',
      forgotPassword: '¿Olvidó su Contraseña?',
      signInBtn: 'Iniciar Sesión en Admin Hub',
      orContinueWith: 'o continuar con',
      roleSelector: 'Selector de Rol de Administrador',
      oneClickLogin: 'Acceso en 1 Clic',
      notMember: '¿No es miembro?',
      registerNow: 'Solicite registro aquí',
      slogan: 'Haga que las operaciones de su club sean más fáciles y organizadas con Santo Domingo Country Club Hub',
      banner18Hole: 'Campo de 18 Hoyos',
      bannerTeeTimes: 'Horarios de Salida en Vivo',
      bannerCourts: 'Canchas y Eventos',
      bannerCapacity: 'Capacidad Completa',
      bannerOfficial: 'Fund. 1920 • Consola de Gestión Oficial',
      resetSent: 'Se ha enviado un enlace de restablecimiento de contraseña a su correo de administrador.',
      registrationNotice: 'Su solicitud de registro ha sido remitida al Comité de Membresías de Santo Domingo Country Club.',
      continueGoogle: 'Continuar con Google',
      continueApple: 'Continuar con Apple',
      continueFacebook: 'Continuar con Facebook'
    },
    header: {
      searchPlaceholder: 'Buscar reservas, socios, eventos o solicitudes... (Enter)',
      newBooking: 'Nueva Reserva / Bloqueo',
      alerts: 'Alertas Operativas',
      liveFeed: 'Transmisión en Vivo',
      conflictAlert: '¡Conflicto de Bloqueo Duplicado!',
      conflictDesc: 'El bloqueo del Gran Salón coincide con la Gala Sterling. Requiere resolución del personal.',
      aiPending: 'Borradores de IA Esperando Aprobación',
      aiPendingDesc: 'Las respuestas a socios y exenciones de cargos necesitan revisión.',
      teeSheetCheckIn: 'Tee Sheet 07:30 Registrado',
      teeSheetDesc: 'Foursome de Julian Sterling en el Tee #1 del Campeonato.',
      adminLogin: 'Ingreso Admin',
      logout: 'Cerrar Sesión',
      console: 'Consola'
    },
    sidebar: {
      overview: 'Resumen',
      dashboard: 'Operaciones de Personal',
      memberDashboard: 'Portal de Socios y Tráfico',
      workQueue: 'Cola de Trabajo',
      inbox: 'Bandeja Unificada',
      conversationDetail: 'Detalle de Mensaje',
      calendar: 'Calendario',
      masterCalendar: 'Calendario Maestro',
      events: 'Eventos',
      eventInquiries: 'Consultas de Eventos',
      eventDetail: 'Planificador de Eventos',
      venuesPackages: 'Espacios y Paquetes',
      golf: 'Golf',
      teeSheet: 'Hoja de Salidas (Tee Sheet)',
      golfBookingDetail: 'Detalle Reserva Golf',
      otherSports: 'Otros Deportes',
      facilityBookings: 'Reservas Deportivas',
      members: 'Socios',
      memberDirectory: 'Directorio de Socios',
      finance: 'Finanzas',
      paymentsTransactions: 'Pagos y Transacciones',
      aiCenter: 'Centro de IA',
      aiReviewQueue: 'Cola de Revisión IA',
      knowledgeRules: 'Reglas y Base de Datos IA',
      insights: 'Analíticas',
      reports: 'Reportes y Finanzas',
      administration: 'Administración',
      staffPermissions: 'Personal y Permisos',
      integrationsHealth: 'Integraciones y Estado',
      configuration: 'Configuración del Club',
      adminRole: 'Rol de Admin',
      keyBadge: 'Clave',
      conflictBadge: 'conflicto'
    },
    dashboard: {
      todaysOverview: 'Resumen del Día',
      dateDisplay: 'Viernes, 25 de septiembre de 2026',
      welcomeTitle: 'Haga las operaciones de su club organizadas y fluidas',
      welcomeSubtitle: 'reservas programadas en salones, campo de campeonato y pabellón deportivo hoy.',
      calendarCollision: 'Conflicto de Calendario',
      aiDraftsReview: 'Borradores de IA por Revisar',
      openCalendar: 'Abrir Calendario Maestro',
      kpiBookings: 'Reservas de Hoy',
      kpiBookingsDesc: 'Eventos, golf y canchas activas',
      kpiInquiries: 'Consultas Pendientes',
      kpiInquiriesDesc: 'Sin leer o esperando respuesta',
      kpiPayments: 'Cobros Pendientes',
      kpiPaymentsDesc: 'Requieren conciliación contable',
      kpiTasks: 'Tareas de Preparación',
      kpiTasksDesc: 'Vencen antes de la llegada de socios',
      quickActions: 'Acciones Rápidas Operativas',
      actionNewBooking: 'Nueva Reserva / Bloqueo',
      actionProposal: 'Preparar Cotización',
      actionTeeSheet: 'Hoja de Salidas en Vivo',
      actionCourt: 'Reservar Cancha',
      todaysSchedule: 'Eventos Maestros Programados Hoy',
      liveTeeSheet: 'Juego Activo en Campo de Golf',
      pendingInquiries: 'Comunicaciones y Solicitudes de Socios',
      financialPulse: 'Pulso Financiero y Recaudación',
      todayRevenue: 'Ingresos del Día',
      occupancyRate: 'Ocupación de Espacios',
      activeMembersCount: 'Membresías Activas',
      viewAllCalendar: 'Ver Calendario Completo',
      viewAllInbox: 'Abrir Bandeja Unificada',
      viewTeeSheet: 'Ver Tee Sheet Completo',
      conflictWarning: 'Conflicto de Horario Detectado',
      resolveConflict: 'Resolver Colisión',
      checkInPlayer: 'Registrar',
      checkedIn: 'Registrado',
      reviewDraft: 'Revisar Borrador',
      noConflicts: 'Calendario en Armonía',
      noConflictsSub: 'Sin colisiones en salones o campos de golf hoy.'
    },
    modal: {
      title: 'Crear Reserva o Bloqueo',
      subtitle: 'Registre una reserva, bloqueo de socio o cierre de instalación',
      facilityType: 'Tipo de Instalación',
      eventHalls: 'Salones de Eventos',
      golf: 'Campo de Golf',
      sportsPavilion: 'Pabellón Deportivo',
      facility: 'Instalación / Cancha',
      bookingTitle: 'Título de la Reserva o Evento',
      bookingTitlePlaceholder: 'ej. Cena Ejecutiva Sterling',
      member: 'Nombre del Socio',
      date: 'Fecha',
      startTime: 'Hora de Inicio',
      endTime: 'Hora de Fin',
      bookingStatus: 'Estado de la Reserva',
      confirmed: 'Confirmado',
      hold: 'En Espera (Tentativo)',
      closure: 'Cierre / Mantenimiento',
      guests: 'Cantidad de Invitados / Jugadores',
      notes: 'Instrucciones y Notas Especiales',
      notesPlaceholder: 'Restricciones dietéticas, montajes, caddies...',
      cancel: 'Cancelar',
      confirmBooking: 'Confirmar y Guardar Reserva'
    },
    roles: {
      manager: 'Gerente General (Todos los Deptos)',
      events_team: 'Equipo de Eventos',
      golf_sports: 'Personal de Golf y Deportes',
      finance: 'Especialista en Finanzas',
      front_desk: 'Conserjería / Recepción',
      sysadmin: 'Administrador del Sistema',
      member: 'Socio / Miembro del Country Club'
    },
    screenTitles: {
      dashboard: 'Resumen del Panel de Control',
      member_dashboard: 'Portal de Socios y Tráfico de Campo',
      inbox: 'Bandeja de Trabajo Unificada',
      conversation_detail: 'Detalle de la Conversación',
      master_calendar: 'Calendario Maestro de Instalaciones',
      event_inquiries: 'Consultas de Eventos y Pipeline',
      event_detail: 'Planificador de Eventos y Expediente',
      venues_packages: 'Espacios, Montajes y Paquetes',
      tee_sheet: 'Hoja de Salidas de Golf',
      golf_booking_detail: 'Detalle de Reserva de Golf',
      facility_bookings: 'Reservas de Canchas y Deportes',
      member_directory: 'Directorio y Perfiles de Socios',
      payments_transactions: 'Pagos y Transacciones Financieras',
      ai_review_queue: 'Cola de Revisión Humana de IA',
      knowledge_rules: 'Base de Conocimientos y Reglas de IA',
      reports: 'Informes Operativos y Financieros',
      staff_permissions: 'Cuentas de Personal y Permisos',
      integrations_health: 'Estado del Sistema e Integraciones',
      configuration: 'Configuración del Club'
    }
  }
};
