import React, { useState } from 'react';
import {
  Flag,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Car,
  UserCheck,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GolfBooking } from '../../types';

export const TeeSheetScreen: React.FC = () => {
  const { golfBookings, checkInGolfPlayer, navigateTo, t, language } = useApp();
  const [course, setCourse] = useState<'Championship 18-Hole' | 'Executive 9-Hole'>('Championship 18-Hole');
  const [date, setDate] = useState('2026-09-25');

  const filteredBookings = golfBookings.filter(b => b.course === course && b.date === date);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            {t.sidebar.teeSheet}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {language === 'es' ? 'Gestión de salidas en tiempo real, registro de jugadores, caddies y cierres.' : 'Real-time tee time management, player check-in, caddy assignments, and fairway closures.'}
          </p>
        </div>

        {/* Date & Course Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-[#F2F8F4] border border-[#E3EFE7] p-1 rounded-full text-xs font-semibold">
            <button
              onClick={() => setCourse('Championship 18-Hole')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                course === 'Championship 18-Hole' ? 'bg-black text-white shadow-xs font-bold' : 'text-neutral-600 hover:text-black'
              }`}
            >
              {language === 'es' ? 'Campo Principal 18 Hoyos' : 'Championship 18-Hole'}
            </button>
            <button
              onClick={() => setCourse('Executive 9-Hole')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                course === 'Executive 9-Hole' ? 'bg-black text-white shadow-xs font-bold' : 'text-neutral-600 hover:text-black'
              }`}
            >
              {language === 'es' ? 'Campo Ejecutivo 9 Hoyos' : 'Executive 9-Hole'}
            </button>
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

      {/* Course Conditions Alert in Login Mint Theme */}
      <div className="bg-[#F2F8F4] border border-[#E3EFE7] rounded-[28px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-black text-white flex items-center justify-center shrink-0 shadow-xs">
            <Flag className="w-4 h-4 text-[#88D49E]" />
          </div>
          <div>
            <div className="font-extrabold text-neutral-900">{language === 'es' ? 'Condiciones Actuales del Campo: Excelentes' : 'Current Course Conditions: Pristine'}</div>
            <div className="text-neutral-600 text-[11px] mt-0.5">
              {language === 'es' ? 'Velocidad de greens 11.5 en el stimpmeter. Regla de carritos a 90 grados en hoyos 3 y 12.' : 'Greens running 11.5 on the stimpmeter. 90-degree cart rule in effect on holes 3 & 12.'}
            </div>
          </div>
        </div>
        <div className="text-[11px] font-mono text-[#3B7A57] font-bold shrink-0 bg-white px-3 py-1 rounded-full border border-[#E3EFE7]">
          {language === 'es' ? 'Primera Salida: 07:00 AM · Atardecer: 19:15 PM' : 'First Tee: 07:00 AM · Sunset: 19:15 PM'}
        </div>
      </div>

      {/* Tee Times Grid */}
      <div className="bg-white rounded-[28px] border border-[#E3EFE7] shadow-xs overflow-hidden">
        <div className="p-4 bg-neutral-50/80 border-b border-neutral-200 flex items-center justify-between text-xs font-bold text-neutral-700">
          <span>{language === 'es' ? 'Horario de Salida y Jugadores' : 'Tee Time & Foursome Roster'}</span>
          <span>{language === 'es' ? 'Estado y Acciones' : 'Status & Actions'}</span>
        </div>

        <div className="divide-y divide-neutral-100 text-xs">
          {filteredBookings.length === 0 ? (
            <div className="p-12 text-center text-neutral-500">
              {language === 'es' ? `No hay salidas reservadas para este campo el ${date}.` : `No tee times booked for this course on ${date}.`}
            </div>
          ) : (
            filteredBookings.map((bk) => (
              <div
                key={bk.id}
                className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-neutral-50/70 transition-colors"
              >
                {/* Time & Players */}
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-16 p-2 rounded-xl bg-neutral-100 text-center shrink-0">
                    <div className="font-mono text-base font-extrabold text-neutral-900">{bk.teeTime}</div>
                    <div className="text-[9px] uppercase tracking-wider font-semibold text-neutral-500">Tee #1</div>
                  </div>

                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-xs text-neutral-900">
                        {language === 'es' ? 'Reservado por' : 'Booked by'} {bk.bookedBy}
                      </span>
                      <span className="text-neutral-300">·</span>
                      <span className="font-mono text-[11px] text-neutral-500">
                        {bk.players.length} / 4 {language === 'es' ? 'Jugadores' : 'Players'}
                      </span>
                      <span className="text-neutral-300">·</span>
                      <span className="font-mono font-bold text-neutral-800">
                        ${bk.totalCharge} Total
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-mono ${
                        bk.status === 'checked_in'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {bk.status === 'checked_in' ? t.dashboard.checkedIn : bk.status.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Players pill grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-1">
                      {bk.players.map((player) => (
                        <div
                          key={player.id}
                          className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${
                            player.checkedIn
                              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                              : 'bg-white border-neutral-200 text-neutral-800'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="font-semibold text-xs truncate flex items-center gap-1">
                              <span>{player.name}</span>
                              {player.isMember ? (
                                <span className="text-[9px] text-emerald-700 bg-emerald-100 px-1 rounded">{language === 'es' ? 'Socio' : 'Mem'}</span>
                              ) : (
                                <span className="text-[9px] text-neutral-500 bg-neutral-100 px-1 rounded">{language === 'es' ? 'Invitado' : 'Guest'}</span>
                              )}
                            </div>
                            <div className="text-[10px] text-neutral-500 font-mono mt-0.5">
                              HCP: {player.handicap} {player.cartRequested && (language === 'es' ? '· Carrito' : '· Cart')}
                            </div>
                          </div>

                          {!player.checkedIn ? (
                            <button
                              onClick={() => checkInGolfPlayer(bk.id, player.id)}
                              className="px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-white text-[10px] font-semibold shrink-0 cursor-pointer"
                            >
                              {t.dashboard.checkInPlayer}
                            </button>
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>

                    {bk.notes && (
                      <div className="text-[11px] text-neutral-500 italic">
                        {language === 'es' ? 'Nota' : 'Note'}: {bk.notes}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Action */}
                <div className="flex items-center gap-2 shrink-0 border-t lg:border-t-0 pt-2 lg:pt-0">
                  <button
                    onClick={() => navigateTo('golf_booking_detail', { golfId: bk.id })}
                    className="w-full sm:w-auto px-3 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{language === 'es' ? 'Ver Detalle de Reserva' : 'View Booking Details'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

