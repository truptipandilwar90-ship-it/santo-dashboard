import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  AlertTriangle,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  XCircle,
  Eye,
  Plus,
  ArrowRight,
  ShieldAlert,
  Building,
  Flag,
  Dumbbell
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FacilityCategory, BookingStatus, MasterCalendarEvent } from '../../types';

export const MasterCalendarScreen: React.FC = () => {
  const {
    calendarEvents,
    facilities,
    updateCalendarEventStatus,
    resolveConflict,
    navigateTo,
    addCalendarEvent,
    t,
    language
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<FacilityCategory | 'all'>('all');
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [currentDateStr, setCurrentDateStr] = useState<string>('2026-09-25');
  const [selectedEvent, setSelectedEvent] = useState<MasterCalendarEvent | null>(null);
  const [conflictModalEvent, setConflictModalEvent] = useState<MasterCalendarEvent | null>(null);

  // Filter events
  const filteredEvents = calendarEvents.filter(ev => {
    if (activeCategory !== 'all' && ev.facilityCategory !== activeCategory) return false;
    if (selectedFacilityId !== 'all' && ev.facilityId !== selectedFacilityId) return false;
    if (viewMode === 'day' && ev.date !== currentDateStr) return false;
    return true;
  });

  const conflictsList = calendarEvents.filter(e => e.hasConflict && e.status !== 'cancelled');

  const facilitiesInView = facilities.filter(f => {
    if (activeCategory !== 'all' && f.category !== activeCategory) return false;
    if (selectedFacilityId !== 'all' && f.id !== selectedFacilityId) return false;
    return true;
  });

  const timeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00', '22:00'
  ];

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return <span className="text-[11px] font-bold text-[#3B7A57] bg-[#F2F8F4] border border-[#E3EFE7] px-3 py-1 rounded-full shadow-2xs">{t.common.confirmed}</span>;
      case 'hold':
        return <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">{t.common.hold}</span>;
      case 'closure':
        return <span className="text-[11px] font-bold text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">{t.modal.closure}</span>;
      case 'inquiry':
        return <span className="text-[11px] font-bold text-sky-800 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">{language === 'es' ? 'Consulta' : 'Inquiry'}</span>;
      case 'cancelled':
        return <span className="text-[11px] font-bold text-neutral-500 bg-neutral-100 border border-neutral-300 px-3 py-1 rounded-full">{t.common.cancelled}</span>;
      default:
        return <span className="text-[11px] font-bold text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full">{status}</span>;
    }
  };

  const getEventCardStyle = (ev: MasterCalendarEvent) => {
    if (ev.hasConflict) {
      return 'bg-rose-50 border-2 border-rose-500 text-rose-950 shadow-sm animate-pulse';
    }
    switch (ev.status) {
      case 'confirmed':
        return 'bg-emerald-50 border-l-4 border-l-emerald-600 border-neutral-200 text-emerald-950 hover:bg-emerald-100/70';
      case 'hold':
        return 'bg-amber-50/90 border-l-4 border-l-amber-500 border-neutral-200 text-amber-950 hover:bg-amber-100/70 border-dashed';
      case 'closure':
        return 'bg-rose-50/80 border-l-4 border-l-rose-500 border-neutral-200 text-rose-950';
      case 'inquiry':
        return 'bg-sky-50 border-l-4 border-l-sky-500 border-neutral-200 text-sky-950';
      default:
        return 'bg-neutral-50 border-neutral-200 text-neutral-900';
    }
  };

  const handlePrevDay = () => {
    const d = new Date(currentDateStr);
    d.setDate(d.getDate() - 1);
    setCurrentDateStr(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const d = new Date(currentDateStr);
    d.setDate(d.getDate() + 1);
    setCurrentDateStr(d.toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-6">
      
      {/* Visual Heart Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-900">
              {t.screenTitles.master_calendar}
            </h1>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#F2F8F4] text-[#3B7A57] border border-[#E3EFE7]">
              {language === 'es' ? 'Horario en Vivo' : 'Live Club Schedule'}
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            {language === 'es'
              ? 'Cuadrícula en tiempo real para salones, 27 hoyos de golf y pabellón deportivo.'
              : 'Real-time schedule grid across banquet halls, 27 holes of golf, and the racquet sports pavilion.'}
          </p>
        </div>

        {/* View Switcher (Day, Week, Month) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#F2F8F4] border border-[#E3EFE7] p-1 rounded-full text-xs font-semibold">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                viewMode === 'day' ? 'bg-black text-white shadow-xs font-bold' : 'text-neutral-600 hover:text-black'
              }`}
            >
              {language === 'es' ? 'Día' : 'Day View'}
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                viewMode === 'week' ? 'bg-black text-white shadow-xs font-bold' : 'text-neutral-600 hover:text-black'
              }`}
            >
              {language === 'es' ? 'Semana' : 'Week View'}
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                viewMode === 'month' ? 'bg-black text-white shadow-xs font-bold' : 'text-neutral-600 hover:text-black'
              }`}
            >
              {language === 'es' ? 'Mes' : 'Month View'}
            </button>
          </div>
        </div>
      </div>

      {/* Prominent Conflict Warning Banner (CRITICAL REQUIREMENT) */}
      {conflictsList.length > 0 && (
        <div className="p-5 rounded-[24px] bg-rose-50 border border-rose-200 text-rose-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-600 text-white shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-rose-950 flex items-center gap-2">
                <span>{language === 'es' ? 'Advertencia de Conflicto de Bloqueo Duplicado' : 'Facility Double-Hold Collision Warning'}</span>
                <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-rose-200/80 text-rose-900 font-bold">
                  {conflictsList.length} {language === 'es' ? 'Colisión Activa' : 'Active Collision'}
                </span>
              </div>
              <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                {conflictsList[0].conflictDetails}
              </p>
            </div>
          </div>
          <button
            onClick={() => setConflictModalEvent(conflictsList[0])}
            className="px-5 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white text-xs font-bold shrink-0 transition-colors shadow-xs cursor-pointer"
          >
            {language === 'es' ? 'Revisar y Resolver Colisión' : 'Review & Resolve Collision'}
          </button>
        </div>
      )}

      {/* Controls Bar: Category Filters & Date Navigator */}
      <div className="bg-white p-5 rounded-[28px] border border-[#E3EFE7] shadow-xs space-y-4">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setActiveCategory('all'); setSelectedFacilityId('all'); }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-[#F2F8F4] text-neutral-700 hover:bg-[#EAF4ED] border border-[#E3EFE7]'
              }`}
            >
              {language === 'es' ? 'Todas las Instalaciones' : 'All Facilities'} ({facilities.length})
            </button>
            <button
              onClick={() => { setActiveCategory('event_hall'); setSelectedFacilityId('all'); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'event_hall'
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-[#F2F8F4] text-neutral-700 hover:bg-[#EAF4ED] border border-[#E3EFE7]'
              }`}
            >
              <Building className="w-3.5 h-3.5 text-[#3B7A57]" />
              <span>{t.modal.eventHalls}</span>
            </button>
            <button
              onClick={() => { setActiveCategory('golf'); setSelectedFacilityId('all'); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'golf'
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-[#F2F8F4] text-neutral-700 hover:bg-[#EAF4ED] border border-[#E3EFE7]'
              }`}
            >
              <Flag className="w-3.5 h-3.5 text-[#3B7A57]" />
              <span>{t.modal.golf}</span>
            </button>
            <button
              onClick={() => { setActiveCategory('sports'); setSelectedFacilityId('all'); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'sports'
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-[#F2F8F4] text-neutral-700 hover:bg-[#EAF4ED] border border-[#E3EFE7]'
              }`}
            >
              <Dumbbell className="w-3.5 h-3.5 text-[#3B7A57]" />
              <span>{t.modal.sportsPavilion}</span>
            </button>
          </div>

          {/* Specific Facility Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 font-medium">
              {language === 'es' ? 'Instalación Específica:' : 'Specific Facility:'}
            </span>
            <select
              value={selectedFacilityId}
              onChange={(e) => setSelectedFacilityId(e.target.value)}
              className="px-4 py-2 rounded-full border border-neutral-300 bg-white text-neutral-800 font-semibold outline-none focus:border-black cursor-pointer shadow-xs"
            >
              <option value="all">{language === 'es' ? 'Todas en Vista' : 'Every Facility in View'}</option>
              {facilities
                .filter(f => activeCategory === 'all' || f.category === activeCategory)
                .map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
            </select>
          </div>
        </div>

        {/* Date Navigator & Legend */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-neutral-100">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevDay}
              className="p-2 rounded-full border border-neutral-200 hover:bg-[#F2F8F4] text-neutral-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentDateStr('2026-09-25')}
              className="px-4 py-1.5 rounded-full border border-neutral-300 hover:bg-[#F2F8F4] text-xs font-bold text-neutral-800 shadow-xs"
            >
              {language === 'es' ? 'Hoy' : 'Today'}
            </button>
            <button
              onClick={handleNextDay}
              className="p-2 rounded-full border border-neutral-200 hover:bg-[#F2F8F4] text-neutral-700 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-1.5 pl-2">
              <CalendarIcon className="w-4 h-4 text-[#3B7A57]" />
              <input
                type="date"
                value={currentDateStr}
                onChange={(e) => setCurrentDateStr(e.target.value)}
                className="font-mono text-xs font-bold text-neutral-900 border-none bg-transparent outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Color Status Legend */}
          <div className="flex items-center gap-3 text-[11px] text-neutral-600 overflow-x-auto pb-1 sm:pb-0 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#48BB78]" />
              <span>{t.common.confirmed}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-600" />
              <span>{language === 'es' ? 'Bloqueo Temporal' : 'Temporary Hold'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span>{t.modal.closure}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 ring-2 ring-rose-300 animate-pulse" />
              <span className="font-bold text-rose-700">{language === 'es' ? 'Conflicto de Colisión' : 'Conflict Collision'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Schedule Visual Grid */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
        
        {viewMode === 'day' && (
          <div className="overflow-x-auto">
            <div className="min-w-max">
              
              {/* Header: Facilities Columns */}
              <div
                className="grid border-b border-neutral-200 bg-neutral-50/80 text-xs font-bold text-neutral-700 sticky top-0 z-10"
                style={{
                  gridTemplateColumns: `90px repeat(${facilitiesInView.length}, minmax(260px, 1fr))`
                }}
              >
                <div className="p-3.5 border-r border-neutral-200 flex items-center justify-center text-neutral-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                {facilitiesInView.map((facility) => (
                  <div key={facility.id} className="p-3.5 border-r border-neutral-200 last:border-r-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-neutral-900 text-xs truncate">{facility.name}</span>
                      <span className="text-[10px] font-mono font-medium text-neutral-500 bg-white px-2 py-0.5 rounded-full border border-neutral-200 shrink-0">
                        {facility.category === 'event_hall' ? `${facility.capacity} pax` : facility.category}
                      </span>
                    </div>
                    <div className="text-[10px] text-neutral-500 truncate font-medium mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                      <span className="truncate">{facility.location}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Time rows */}
              <div className="divide-y divide-neutral-100 text-xs">
                {timeSlots.map((time) => {
                  const hourNum = parseInt(time.split(':')[0], 10);

                  return (
                    <div
                      key={time}
                      className="grid min-h-[64px]"
                      style={{
                        gridTemplateColumns: `90px repeat(${facilitiesInView.length}, minmax(260px, 1fr))`
                      }}
                    >
                      {/* Hour Label */}
                      <div className="p-2.5 border-r border-neutral-200 font-mono text-[11px] text-neutral-400 flex items-start justify-center bg-neutral-50/40 shrink-0 font-semibold">
                        {time}
                      </div>

                      {/* Facility Slots */}
                      {facilitiesInView.map((facility) => {
                        // Find events overlapping this hour
                        const matchingEvents = filteredEvents.filter(ev => {
                          if (ev.facilityId !== facility.id) return false;
                          const evStartHour = parseInt(ev.startTime.split(':')[0], 10);
                          const evEndHour = parseInt(ev.endTime.split(':')[0], 10);
                          return hourNum >= evStartHour && hourNum < evEndHour;
                        });

                        return (
                          <div
                            key={facility.id}
                            className="p-2 border-r border-neutral-100 last:border-r-0 relative group hover:bg-neutral-50/70 transition-colors"
                          >
                            {matchingEvents.length > 0 ? (
                              <div className="space-y-2">
                                {matchingEvents.map((ev) => (
                                  <div
                                    key={ev.id}
                                    onClick={() => setSelectedEvent(ev)}
                                    className={`p-3 rounded-xl text-left cursor-pointer transition-all border shadow-2xs ${getEventCardStyle(ev)}`}
                                  >
                                    <div className="flex items-start justify-between gap-1.5">
                                      <div className="font-bold text-xs leading-snug break-words">
                                        {ev.title}
                                      </div>
                                      {ev.hasConflict && (
                                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 animate-bounce" />
                                      )}
                                    </div>
                                    <div className="text-[11px] opacity-90 flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1.5 font-mono">
                                      <span className="font-semibold">{ev.startTime} - {ev.endTime}</span>
                                      <span>·</span>
                                      <span className="font-semibold truncate">{ev.memberName}</span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between gap-2 pt-1 border-t border-black/5">
                                      <span className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-white/70 shadow-2xs">
                                        {ev.status}
                                      </span>
                                      {ev.guestCount && (
                                        <span className="text-[10px] font-mono font-semibold opacity-90 shrink-0">
                                          {ev.guestCount} {language === 'es' ? 'invitados' : 'guests'}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              // Empty available slot
                              <button
                                onClick={() => {
                                  addCalendarEvent({
                                    title: 'New Member Booking',
                                    facilityId: facility.id,
                                    facilityName: facility.name,
                                    facilityCategory: facility.category,
                                    startTime: time,
                                    endTime: `${hourNum + 2}:00`,
                                    date: currentDateStr,
                                    status: 'confirmed',
                                    memberName: 'Member Reservation',
                                    memberId: 'mem_custom',
                                    type: facility.category === 'event_hall' ? 'Private Event' : 'Facility Session'
                                  });
                                }}
                                className="w-full h-full min-h-[48px] rounded-xl opacity-0 group-hover:opacity-100 hover:bg-emerald-50/60 border border-dashed border-emerald-300 text-emerald-700 flex items-center justify-center text-[11px] font-semibold transition-opacity cursor-pointer shadow-2xs"
                              >
                                <Plus className="w-3.5 h-3.5 mr-1" />
                                <span>{language === 'es' ? `Reservar ${time}` : `Book ${time}`}</span>
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {viewMode !== 'day' && (
          <div className="p-12 text-center text-xs text-neutral-500 space-y-3">
            <CalendarIcon className="w-8 h-8 text-neutral-400 mx-auto" />
            <div className="font-semibold text-neutral-800 text-sm">
              {viewMode === 'week' ? (language === 'es' ? 'Horario Semanal Multiprocesos' : 'Weekly Multi-Facility Schedule') : (language === 'es' ? 'Vista de Ocupación Mensual' : 'Monthly Occupancy View')}
            </div>
            <p className="max-w-md mx-auto text-neutral-500">
              {language === 'es' ? 'Cambie a la vista de día para inspección hora por hora.' : 'Switching to Day View provides hour-by-hour collision inspection across all banquet halls and courses.'}
            </p>
            <button
              onClick={() => setViewMode('day')}
              className="px-4 py-2 rounded-lg bg-emerald-700 text-white font-medium hover:bg-emerald-800 transition-colors cursor-pointer"
            >
              {language === 'es' ? 'Volver a Vista Diaria de Alta Resolución' : 'Return to High-Resolution Day View'}
            </button>
          </div>
        )}

      </div>

      {/* Selected Event Details Drawer / Side Sheet */}
      {selectedEvent && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-neutral-200 p-6 overflow-y-auto animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                {language === 'es' ? 'Registro de Reserva de Instalación' : 'Facility Reservation Record'}
              </span>
              <h2 className="text-base font-bold text-neutral-900 mt-0.5">{selectedEvent.title}</h2>
            </div>
            <button
              onClick={() => setSelectedEvent(null)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          <div className="py-5 space-y-4 text-xs">
            {selectedEvent.hasConflict && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>{language === 'es' ? '¡Alerta de Conflicto de Bloqueo Duplicado!' : 'Double-Hold Conflict Alert!'}</span>
                </div>
                <p className="text-[11px] text-rose-700 leading-relaxed">
                  {selectedEvent.conflictDetails}
                </p>
                <button
                  onClick={() => {
                    setConflictModalEvent(selectedEvent);
                    setSelectedEvent(null);
                  }}
                  className="mt-2 w-full py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  {language === 'es' ? 'Resolver Conflicto Ahora' : 'Resolve This Conflict Now'}
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
              <div>
                <span className="text-neutral-400 text-[10px] uppercase font-semibold">{t.common.status}</span>
                <div className="mt-1">{getStatusBadge(selectedEvent.status)}</div>
              </div>
              <div>
                <span className="text-neutral-400 text-[10px] uppercase font-semibold">{t.modal.facility}</span>
                <div className="mt-1 font-semibold text-neutral-900 truncate">{selectedEvent.facilityName}</div>
              </div>
              <div>
                <span className="text-neutral-400 text-[10px] uppercase font-semibold">{t.common.date} &amp; {language === 'es' ? 'Hora' : 'Time'}</span>
                <div className="mt-1 font-mono text-neutral-800">{selectedEvent.date} · {selectedEvent.startTime} - {selectedEvent.endTime}</div>
              </div>
              <div>
                <span className="text-neutral-400 text-[10px] uppercase font-semibold">{t.modal.member}</span>
                <div className="mt-1 font-semibold text-neutral-900 truncate">{selectedEvent.memberName}</div>
              </div>
            </div>

            {selectedEvent.guestCount && (
              <div className="flex justify-between py-2 border-b border-neutral-100">
                <span className="text-neutral-500">{t.modal.guests}</span>
                <span className="font-semibold text-neutral-900 font-mono">{selectedEvent.guestCount} {language === 'es' ? 'personas' : 'attendees'}</span>
              </div>
            )}

            {selectedEvent.totalAmount && (
              <div className="flex justify-between py-2 border-b border-neutral-100">
                <span className="text-neutral-500">{language === 'es' ? 'Valor de Reserva' : 'Booking Value'}</span>
                <span className="font-semibold text-neutral-900 font-mono">${selectedEvent.totalAmount.toLocaleString()}</span>
              </div>
            )}

            {selectedEvent.holdExpiresAt && (
              <div className="flex justify-between py-2 border-b border-neutral-100 text-amber-800">
                <span>{language === 'es' ? 'Expiración de Bloqueo' : 'Hold Expiry Countdown'}</span>
                <span className="font-semibold font-mono">{selectedEvent.holdExpiresAt}</span>
              </div>
            )}

            {selectedEvent.notes && (
              <div className="space-y-1 pt-1">
                <span className="text-neutral-500 font-medium">{t.modal.notes}</span>
                <p className="p-2.5 rounded-lg bg-neutral-100/70 text-neutral-700 text-xs leading-relaxed">
                  {selectedEvent.notes}
                </p>
              </div>
            )}

            {/* Actions for this slot */}
            <div className="pt-4 space-y-2 border-t border-neutral-100">
              {selectedEvent.status === 'hold' && (
                <button
                  onClick={() => {
                    updateCalendarEventStatus(selectedEvent.id, 'confirmed');
                    setSelectedEvent(null);
                  }}
                  className="w-full py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{language === 'es' ? 'Convertir Bloqueo a Confirmado' : 'Convert Hold to Confirmed'}</span>
                </button>
              )}

              {selectedEvent.facilityCategory === 'event_hall' && (
                <button
                  onClick={() => {
                    navigateTo('event_detail', { eventId: selectedEvent.id });
                    setSelectedEvent(null);
                  }}
                  className="w-full py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>{language === 'es' ? 'Abrir Expediente de Evento' : 'Open Full Event Working File'}</span>
                </button>
              )}

              {selectedEvent.status !== 'cancelled' && (
                <button
                  onClick={() => {
                    updateCalendarEventStatus(selectedEvent.id, 'cancelled');
                    setSelectedEvent(null);
                  }}
                  className="w-full py-2 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 font-medium transition-colors cursor-pointer"
                >
                  {language === 'es' ? 'Liberar / Cancelar Reserva' : 'Release / Cancel Reservation'}
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Conflict Resolution Modal */}
      {conflictModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-lg p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-rose-100 text-rose-700 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">{language === 'es' ? 'Resolver Conflicto de Horario' : 'Resolve Schedule Conflict'}</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {language === 'es' ? 'Dos reservas ocupan el mismo espacio y horario en el Gran Salón.' : 'Two reservations occupy the same space and time slot in Grand Crystal Ballroom.'}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
              <div className="font-semibold text-neutral-800">{language === 'es' ? 'Bloqueo en Conflicto:' : 'Conflicting Hold:'}</div>
              <div className="font-medium text-rose-900">{conflictModalEvent.title}</div>
              <div className="text-neutral-500 font-mono">{language === 'es' ? 'Socio' : 'Host'}: {conflictModalEvent.memberName} · 17:00 - 23:00</div>
              <div className="text-neutral-600 text-[11px] pt-1">
                {language === 'es' ? 'Evento Principal:' : 'Primary Event:'} <span className="font-semibold text-neutral-900">{language === 'es' ? 'Gala Anual Sterling (Confirmado y Depósito Pagado)' : 'Sterling Annual Gala (Confirmed & Deposit Paid)'}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-semibold text-neutral-700">{language === 'es' ? 'Elija Acción de Resolución:' : 'Choose Resolution Action:'}</div>
              
              <button
                onClick={() => {
                  resolveConflict(conflictModalEvent.id, 'move_venue');
                  setConflictModalEvent(null);
                }}
                className="w-full p-3 rounded-xl border border-emerald-300 hover:bg-emerald-50/80 text-left transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="font-bold text-emerald-950">{language === 'es' ? 'Reubicar Bloqueo a Terraza de Palmeras' : 'Relocate Hold to Palm Terrace & Veranda'}</div>
                  <div className="text-[11px] text-emerald-800">{language === 'es' ? 'Acomoda a 180 invitados, elimina conflicto y preserva la fecha del socio.' : 'Accommodates 180 guests, removes conflict, preserves member option.'}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-700" />
              </button>

              <button
                onClick={() => {
                  resolveConflict(conflictModalEvent.id, 'release_hold');
                  setConflictModalEvent(null);
                }}
                className="w-full p-3 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-left transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="font-bold text-neutral-900">{language === 'es' ? 'Liberar Bloqueo Vanderbilt' : 'Release Vanderbilt Hold'}</div>
                  <div className="text-[11px] text-neutral-500">{language === 'es' ? 'Cancelar bloqueo tentativo y notificar indisponibilidad.' : 'Cancel tentative hold and notify member of ballroom unavailability.'}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setConflictModalEvent(null)}
                className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-xs font-semibold cursor-pointer"
              >
                {t.common.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

