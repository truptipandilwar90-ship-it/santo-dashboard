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
  'Login': 'Iniciar Sesión'
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
