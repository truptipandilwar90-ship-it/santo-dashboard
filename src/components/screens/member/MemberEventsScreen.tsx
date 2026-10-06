import React, { useState } from 'react';
import {
  Building,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Plus,
  Sparkles,
  MapPin,
  Layers,
  Award
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const MemberEventsScreen: React.FC = () => {
  const { language, addCalendarEvent } = useApp();

  const [venue, setVenue] = useState('Salón Anacaona Grand Ballroom');
  const [eventType, setEventType] = useState('Gala & Private Celebration');
  const [date, setDate] = useState('2026-11-20');
  const [guests, setGuests] = useState(150);
  const [cateringTier, setCateringTier] = useState('Platinum Executive Banquet');
  const [specialNotes, setSpecialNotes] = useState('');
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const handleHoldSpace = (e: React.FormEvent) => {
    e.preventDefault();
    addCalendarEvent({
      title: `${eventType} (${guests} Guests) - ${venue}`,
      facilityId: 'fac_event_01',
      facilityName: venue,
      facilityCategory: 'event_hall',
      startTime: '18:00',
      endTime: '23:30',
      date: date,
      status: 'hold',
      memberName: 'Sir Arthur Sterling',
      memberId: 'mem_1029',
      type: 'Member Reservation'
    });
    setBookedSuccess(true);
    setTimeout(() => {
      setBookedSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Ballrooms Header Banner */}
      <div className="bg-indigo-50/70 border border-indigo-100 rounded-[28px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-indigo-200 text-indigo-700 flex items-center justify-center shadow-2xs shrink-0">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {language === 'es' ? 'Salones de Eventos y Celebraciones' : 'Ballrooms & Private Event Spaces'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              {language === 'es'
                ? 'Espacios para Bodas, Galas, Banquetes y Asambleas Privadas con Montaje de Lujo'
                : 'Exclusive Venues for Weddings, Galas, Banquets & Private Assemblies'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-indigo-200 shadow-2xs shrink-0 text-xs">
          <div className="px-3 border-r border-neutral-100 text-center">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Gran Salón</div>
            <div className="font-bold text-indigo-900">Hasta 500 Inv.</div>
          </div>
          <div className="px-3 text-center">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Mirador</div>
            <div className="font-bold text-indigo-900">180 Inv. Terraza</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Event Space Hold Request + Venue Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hold Request Widget */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div>
              <h2 className="text-base font-extrabold text-neutral-900">
                {language === 'es' ? 'Solicitud de Bloqueo de Espacio Privado' : 'Request Private Event Space Hold'}
              </h2>
              <p className="text-xs text-neutral-500">
                {language === 'es' ? 'Pre-reserva prioritaria para eventos sociales o corporativos de socios' : 'Priority pre-booking hold for member celebrations'}
              </p>
            </div>
            <span className="text-[11px] font-bold text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
              {language === 'es' ? 'Bloqueo sin Compromiso' : 'Non-Binding Hold'}
            </span>
          </div>

          {bookedSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {language === 'es'
                  ? '¡Solicitud de bloqueo enviada! Nuestro equipo de eventos le contactará.'
                  : 'Hold request submitted! Our events team will confirm your banquet details.'}
              </span>
            </div>
          )}

          <form onSubmit={handleHoldSpace} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Salón / Espacio' : 'Select Venue'}
                </label>
                <select
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-indigo-600 outline-none cursor-pointer"
                >
                  <option value="Salón Anacaona Grand Ballroom">Salón Anacaona Grand Ballroom (Cap. 500)</option>
                  <option value="El Mirador Sunset Terrace">El Mirador Sunset Terrace (Cap. 180)</option>
                  <option value="Founders Executive Boardroom">Founders Executive Boardroom (Cap. 30)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Tipo de Evento' : 'Event Type'}
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-indigo-600 outline-none cursor-pointer"
                >
                  <option value="Gala & Private Celebration">Gala / Anniversary Celebration</option>
                  <option value="Wedding Reception">Wedding Reception & Banquet</option>
                  <option value="Corporate Summit">Corporate Board Summit</option>
                  <option value="Birthday Party">Birthday / Milestone Celebration</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Fecha Estimada' : 'Estimated Date'}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-indigo-600 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Estimado de Invitados' : 'Estimated Guests'}
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min={10}
                    max={500}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-indigo-600 outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {language === 'es' ? 'Paquete de Banquete / Catering' : 'Catering & Banquet Package'}
              </label>
              <select
                value={cateringTier}
                onChange={(e) => setCateringTier(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-indigo-600 outline-none cursor-pointer"
              >
                <option value="Platinum Executive Banquet">Platinum 4-Course Gourmet Dinner & Open Bar</option>
                <option value="Sunset Cocktail & Passed Hors d'oeuvres">Sunset Cocktail & Passed Hors d'oeuvres</option>
                <option value="Custom Chef Tasting Menu">Custom Chef Tasting & Sommelier Selection</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {language === 'es' ? 'Requerimientos de Sonido, Pantallas o Decoración' : 'AV, Lighting & Decor Notes'}
              </label>
              <input
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder={language === 'es' ? 'Ej: Escenario para orquesta, proyector 4K, pista de baile...' : 'e.g. Stage for live orchestra, 4K projector, dance floor...'}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-indigo-600 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-black hover:bg-neutral-800 text-white rounded-full font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'es' ? 'Solicitar Bloqueo de Salón' : 'Request Event Space Hold'}</span>
            </button>
          </form>
        </div>

        {/* Sidebar: Venues Showcase */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-2xs space-y-4 text-xs">
            <h3 className="font-extrabold text-neutral-900 text-sm border-b border-neutral-100 pb-2">
              {language === 'es' ? 'Capacidad de Espacios' : 'Venue Capacities'}
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="font-bold text-neutral-900">Salón Anacaona</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">500 Banquet · Lámparas de Cristal & Escenario</div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="font-bold text-neutral-900">El Mirador Sunset</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">180 Cocktail · Vista Panorámica al Campo de Golf</div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="font-bold text-neutral-900">Founders Boardroom</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">30 Personas · Sistema Multimedia Integrado</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
