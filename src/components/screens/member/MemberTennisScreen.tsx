import React, { useState } from 'react';
import {
  Dumbbell,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Plus,
  Zap,
  Activity,
  Trophy
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const MemberTennisScreen: React.FC = () => {
  const { language, addCalendarEvent } = useApp();

  const [courtType, setCourtType] = useState<'tennis' | 'padel'>('tennis');
  const [selectedCourt, setSelectedCourt] = useState('Hydro-Clay Tennis Court #2');
  const [date, setDate] = useState('2026-10-11');
  const [time, setTime] = useState('17:00');
  const [matchType, setMatchType] = useState('Singles Match');
  const [nightLights, setNightLights] = useState(true);
  const [ballMachine, setBallMachine] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const courtsList = courtType === 'tennis'
    ? [
        { id: 't1', name: 'Clay Court #1 (Stadium)', status: 'Occupied until 05:00 PM' },
        { id: 't2', name: 'Clay Court #2', status: 'Available' },
        { id: 't3', name: 'Clay Court #3', status: 'Available' },
        { id: 't4', name: 'Clay Court #4', status: 'Reserved 06:00 PM' },
        { id: 't5', name: 'Clay Court #5', status: 'Available' },
        { id: 't6', name: 'Clay Court #6', status: 'Available' }
      ]
    : [
        { id: 'p1', name: 'Padel Court A (Center Glass)', status: 'Available' },
        { id: 'p2', name: 'Padel Court B', status: 'Occupied' },
        { id: 'p3', name: 'Padel Court C', status: 'Available' },
        { id: 'p4', name: 'Padel Court D', status: 'Available' }
      ];

  const handleBookCourt = (e: React.FormEvent) => {
    e.preventDefault();
    addCalendarEvent({
      title: `${selectedCourt} (${matchType})`,
      facilityId: 'fac_tennis_01',
      facilityName: selectedCourt,
      facilityCategory: 'sports',
      startTime: time,
      endTime: '18:30',
      date: date,
      status: 'confirmed',
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
      {/* Tennis & Padel Header Banner */}
      <div className="bg-teal-50/70 border border-teal-100 rounded-[28px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-teal-200 text-teal-700 flex items-center justify-center shadow-2xs shrink-0">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {language === 'es' ? 'Canchas de Tenis y Pádel' : 'Tennis & Padel Courts'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              {language === 'es'
                ? '6 Canchas de Arcilla Hydro-Clay y 4 Canchas Panorámicas de Pádel'
                : '6 Hydro-Clay Tennis Courts & 4 Panoramic Glass Padel Courts'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-teal-200 shadow-2xs shrink-0 text-xs">
          <div className="px-3 border-r border-neutral-100 text-center">
            <div className="text-[10px] uppercase font-bold text-neutral-400">{language === 'es' ? 'Tenis' : 'Tennis'}</div>
            <div className="font-bold text-teal-700">6 {language === 'es' ? 'Canchas' : 'Courts'}</div>
          </div>
          <div className="px-3 border-r border-neutral-100 text-center">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Pádel</div>
            <div className="font-bold text-teal-700">4 {language === 'es' ? 'Canchas' : 'Courts'}</div>
          </div>
          <div className="px-3 text-center">
            <div className="text-[10px] uppercase font-bold text-neutral-400">{language === 'es' ? 'Luz' : 'Lights'}</div>
            <div className="font-bold text-emerald-700">LED Floodlights</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Court Booking Widget + Live Court Availability */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reservation Widget */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div>
              <h2 className="text-base font-extrabold text-neutral-900">
                {language === 'es' ? 'Reservar Cancha de Tenis o Pádel' : 'Book a Racquet Court'}
              </h2>
              <p className="text-xs text-neutral-500">
                {language === 'es' ? 'Seleccione tipo de deporte y horario' : 'Select sport category and court schedule'}
              </p>
            </div>

            {/* Sport Toggle */}
            <div className="flex items-center bg-neutral-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => {
                  setCourtType('tennis');
                  setSelectedCourt('Hydro-Clay Tennis Court #2');
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  courtType === 'tennis' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500'
                }`}
              >
                Tenis
              </button>
              <button
                onClick={() => {
                  setCourtType('padel');
                  setSelectedCourt('Padel Court A (Center Glass)');
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  courtType === 'padel' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500'
                }`}
              >
                Pádel
              </button>
            </div>
          </div>

          {bookedSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {language === 'es'
                  ? '¡Cancha reservada con éxito! Se ha añadido a sus reservas.'
                  : 'Court successfully reserved! Added to your active bookings.'}
              </span>
            </div>
          )}

          <form onSubmit={handleBookCourt} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Seleccionar Cancha' : 'Select Court'}
                </label>
                <select
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-teal-600 outline-none cursor-pointer"
                >
                  {courtsList.map(c => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.status})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Tipo de Partido' : 'Match Type'}
                </label>
                <select
                  value={matchType}
                  onChange={(e) => setMatchType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-teal-600 outline-none cursor-pointer"
                >
                  <option value="Singles Match">Singles (1 vs 1)</option>
                  <option value="Doubles Match">Doubles (2 vs 2)</option>
                  <option value="Hitting Partner Session">Pro Hitting Partner Session</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Fecha' : 'Date'}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-teal-600 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Hora de Inicio' : 'Start Time'}
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-teal-600 outline-none cursor-pointer"
                >
                  <option value="07:00">07:00 AM</option>
                  <option value="08:30">08:30 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:00">05:00 PM</option>
                  <option value="18:30">06:30 PM (Night Floodlights)</option>
                  <option value="20:00">08:00 PM (Night Floodlights)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-neutral-700">
                <input
                  type="checkbox"
                  checked={nightLights}
                  onChange={(e) => setNightLights(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-teal-600 focus:ring-teal-500"
                />
                <span>{language === 'es' ? 'Activar Iluminación Nocturna LED' : 'Enable Night LED Floodlights'}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-bold text-neutral-700">
                <input
                  type="checkbox"
                  checked={ballMachine}
                  onChange={(e) => setBallMachine(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-teal-600 focus:ring-teal-500"
                />
                <span>{language === 'es' ? 'Solicitar Máquina Lanza-Pelotas' : 'Request Ball Machine Rental'}</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-black hover:bg-neutral-800 text-white rounded-full font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'es' ? 'Confirmar Reserva de Cancha' : 'Confirm Court Reservation'}</span>
            </button>
          </form>
        </div>

        {/* Live Courts Overview List */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
            <h3 className="font-extrabold text-neutral-900 text-sm">
              {courtType === 'tennis' ? 'Estado Canchas de Tenis' : 'Estado Canchas de Pádel'}
            </h3>
            <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
              Live
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {courtsList.map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-xl border border-neutral-100 flex items-center justify-between bg-neutral-50/50"
              >
                <div className="font-bold text-neutral-900">{c.name}</div>
                <div
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    c.status === 'Available'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {c.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
