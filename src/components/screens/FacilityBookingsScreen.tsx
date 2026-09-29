import React, { useState } from 'react';
import {
  Dumbbell,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Plus,
  Filter,
  ShieldCheck,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SportsCourtBooking } from '../../types';

export const FacilityBookingsScreen: React.FC = () => {
  const { sportsBookings, checkInSportsBooking, t, language } = useApp();
  const [sportFilter, setSportFilter] = useState<'All' | 'Tennis' | 'Padel' | 'Lap Swimming'>('All');
  const [date, setDate] = useState('2026-09-25');
  const [sessionLength, setSessionLength] = useState<number>(90);

  const filtered = sportsBookings.filter(b => {
    if (sportFilter !== 'All' && b.sport !== sportFilter) return false;
    if (b.date !== date) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            {t.sidebar.facilityBookings}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {language === 'es' ? 'Canchas de tenis de arcilla, pabellones de pádel, squash y carriles de natación.' : 'Championship clay tennis hydro-courts, glass padel pavilions, squash suites, and competition swimming lanes.'}
          </p>
        </div>

        {/* Date & Sport Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-[#F2F8F4] border border-[#E3EFE7] p-1 rounded-full text-xs font-semibold">
            {(['All', 'Tennis', 'Padel', 'Lap Swimming'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSportFilter(s)}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  sportFilter === s ? 'bg-black text-white shadow-xs font-bold' : 'text-neutral-600 hover:text-black'
                }`}
              >
                {s === 'All' ? t.common.all : s === 'Lap Swimming' ? (language === 'es' ? 'Natación' : s) : s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-neutral-300 bg-white text-xs font-mono">
            <Calendar className="w-3.5 h-3.5 text-[#3B7A57]" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-none bg-transparent outline-none cursor-pointer font-bold text-neutral-800"
            />
          </div>
        </div>
      </div>

      {/* Rules & Policy Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-white border border-neutral-200/80 space-y-1">
          <span className="font-bold text-neutral-900">{language === 'es' ? 'Duración de Sesión' : 'Session Windows'}</span>
          <p className="text-neutral-500 text-[11px]">{language === 'es' ? 'Tenis y Pádel: 90 mins. Natación: 60 mins.' : 'Tennis & Padel standard slot: 90 mins. Lap swimming: 60 mins.'}</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-neutral-200/80 space-y-1">
          <span className="font-bold text-neutral-900">{language === 'es' ? 'Límites de Reserva' : 'Booking Limits'}</span>
          <p className="text-neutral-500 text-[11px]">{language === 'es' ? 'Máximo 2 reservas activas simultáneas por cuenta de socio.' : 'Max 2 active advance court holds per member account simultaneously.'}</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-neutral-200/80 space-y-1">
          <span className="font-bold text-neutral-900">{language === 'es' ? 'Entrenador Profesional' : 'Professional Coaching'}</span>
          <p className="text-neutral-500 text-[11px]">{language === 'es' ? 'Entrenador Mateo Rossi disponible. Clases facturadas a la cuenta del socio.' : 'Coach Mateo Rossi on duty. Lesson rates billed via member charge.'}</p>
        </div>
      </div>

      {/* Bookings Table / List */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="p-4 bg-neutral-50/80 border-b border-neutral-200 flex items-center justify-between text-xs font-bold text-neutral-700">
          <span>{language === 'es' ? 'Asignación de Canchas y Horario' : 'Court Allocation & Player Schedule'}</span>
          <span>{language === 'es' ? 'Registro y Facturación' : 'Check-in & Billing'}</span>
        </div>

        <div className="divide-y divide-neutral-100 text-xs">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-neutral-500">
              {language === 'es' ? `No hay reservas de canchas para ${sportFilter} el ${date}.` : `No court reservations recorded for ${sportFilter} on ${date}.`}
            </div>
          ) : (
            filtered.map((b) => (
              <div
                key={b.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 p-2 rounded-xl bg-neutral-100 text-center shrink-0">
                    <div className="font-mono text-base font-extrabold text-neutral-900">{b.startTime}</div>
                    <div className="font-mono text-[10px] text-neutral-400">{b.endTime}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-neutral-900">{b.facilityName}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {b.sport}
                      </span>
                      {b.isLesson && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          {language === 'es' ? 'Clase con' : 'Lesson with'} {b.coachName}
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-neutral-500">
                      {language === 'es' ? 'Reservado por' : 'Booked by'} <strong className="text-neutral-800">{b.bookedBy}</strong> · {b.playersCount} {language === 'es' ? 'Jugadores' : 'Players'} · ${b.fee} {b.paymentStatus.replace('_', ' ')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-mono ${
                    b.status === 'checked_in'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {b.status === 'checked_in' ? t.dashboard.checkedIn : b.status.replace('_', ' ')}
                  </span>

                  {b.status !== 'checked_in' && (
                    <button
                      onClick={() => checkInSportsBooking(b.id)}
                      className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs transition-colors cursor-pointer"
                    >
                      {t.dashboard.checkInPlayer}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

