import React, { useState } from 'react';
import {
  Flag,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  Wind,
  Sun,
  Activity,
  Plus,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const MemberGolfScreen: React.FC = () => {
  const { language, addCalendarEvent, navigateTo } = useApp();

  const [date, setDate] = useState('2026-10-10');
  const [time, setTime] = useState('08:30');
  const [courseLoop, setCourseLoop] = useState('Championship 18-Holes');
  const [players, setPlayers] = useState(4);
  const [caddyOption, setCaddyOption] = useState('Forecaddie & 2 Caddies');
  const [notes, setNotes] = useState('');
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const handleBookTeeTime = (e: React.FormEvent) => {
    e.preventDefault();
    addCalendarEvent({
      title: `Golf Tee Time (${players} Golfers)`,
      facilityId: 'fac_golf_main',
      facilityName: courseLoop,
      facilityCategory: 'golf',
      startTime: time,
      endTime: '12:30',
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
      {/* Golf Header Banner */}
      <div className="bg-[#F2F8F4] border border-[#E3EFE7] rounded-[28px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#E3EFE7] text-[#3B7A57] flex items-center justify-center shadow-2xs shrink-0">
            <Flag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {language === 'es' ? 'Campo de Golf & Salidas de Tee' : 'Golf & Championship Tee Times'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              {language === 'es'
                ? 'Santo Domingo Country Club · Campo de Golf de 18 Hoyos Par 72'
                : 'Santo Domingo Country Club · 18-Hole Championship Par 72 Course'}
            </p>
          </div>
        </div>

        {/* Live Weather & Course Status */}
        <div className="flex items-center gap-4 bg-white p-3.5 rounded-2xl border border-[#E3EFE7] shadow-2xs shrink-0 text-xs">
          <div className="flex items-center gap-2 pr-3 border-r border-neutral-100">
            <Sun className="w-4 h-4 text-amber-500" />
            <div>
              <div className="font-extrabold text-neutral-900">26°C / 78°F</div>
              <div className="text-[10px] text-neutral-500">{language === 'es' ? 'Soleado' : 'Sunny'}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 pr-3 border-r border-neutral-100">
            <Wind className="w-4 h-4 text-sky-600" />
            <div>
              <div className="font-extrabold text-neutral-900">8 mph SW</div>
              <div className="text-[10px] text-neutral-500">{language === 'es' ? 'Viento Suave' : 'Light Breeze'}</div>
            </div>
          </div>
          <div>
            <div className="font-extrabold text-[#3B7A57]">Stimp 11.5</div>
            <div className="text-[10px] text-neutral-500">{language === 'es' ? 'Greens Rápidos' : 'Fast Greens'}</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Tee Time Reservation Form + Course Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tee Time Reservation Widget */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div>
              <h2 className="text-base font-extrabold text-neutral-900">
                {language === 'es' ? 'Reservar Hora de Salida (Tee Time)' : 'Book a Golf Tee Time'}
              </h2>
              <p className="text-xs text-neutral-500">
                {language === 'es'
                  ? 'Reserve su salida directa para socios Platino'
                  : 'Direct online tee-time booking for Platinum members'}
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#3B7A57] bg-[#F2F8F4] px-2.5 py-1 rounded-full border border-[#E3EFE7]">
              {language === 'es' ? 'Confirmación Inmediata' : 'Instant Confirmation'}
            </span>
          </div>

          {bookedSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {language === 'es'
                  ? '¡Salida reservada con éxito! Se ha añadido a sus reservas.'
                  : 'Tee time successfully reserved! Added to your reservations.'}
              </span>
            </div>
          )}

          <form onSubmit={handleBookTeeTime} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Fecha de Salida' : 'Date'}
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-[#3B7A57] outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Hora Preferida' : 'Preferred Tee Time'}
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-[#3B7A57] outline-none cursor-pointer"
                  >
                    <option value="07:00">07:00 AM</option>
                    <option value="07:30">07:30 AM</option>
                    <option value="08:00">08:00 AM</option>
                    <option value="08:30">08:30 AM</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="09:30">09:30 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="02:00">02:00 PM</option>
                    <option value="03:00">03:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Recorrido / Circuito' : 'Course Loop'}
                </label>
                <select
                  value={courseLoop}
                  onChange={(e) => setCourseLoop(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-[#3B7A57] outline-none cursor-pointer"
                >
                  <option value="Championship 18-Holes">Championship Course (18 Holes)</option>
                  <option value="Front 9 Loop">Front 9 Loop (Holes 1-9)</option>
                  <option value="Back 9 Sunset Loop">Back 9 Sunset Loop (Holes 10-18)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Cantidad de Jugadores' : 'Players Count'}
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={players}
                    onChange={(e) => setPlayers(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-[#3B7A57] outline-none cursor-pointer"
                  >
                    <option value={1}>1 Golfer (Single)</option>
                    <option value={2}>2 Golfers (Twosome)</option>
                    <option value={3}>3 Golfers (Threesome)</option>
                    <option value={4}>4 Golfers (Foursome)</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {language === 'es' ? 'Servicio de Caddie' : 'Caddy Service Preference'}
              </label>
              <select
                value={caddyOption}
                onChange={(e) => setCaddyOption(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-[#3B7A57] outline-none cursor-pointer"
              >
                <option value="Forecaddie & 2 Caddies">Forecaddie & 2 Dedicated Caddies</option>
                <option value="Master Pro Caddy">Master Pro Caddy (1-on-1)</option>
                <option value="Cart Rental Only">Golf Cart Rental Only</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {language === 'es' ? 'Notas o Nombres de Acompañantes' : 'Guest Names or Special Requests'}
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={language === 'es' ? 'Ej: Dr. Chen, Marcus Kensington...' : 'e.g., Dr. Chen, Marcus Kensington...'}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-[#3B7A57] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-black hover:bg-neutral-800 text-white rounded-full font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'es' ? 'Confirmar Reserva de Tee Time' : 'Confirm Golf Tee Time Reservation'}</span>
            </button>
          </form>
        </div>

        {/* Sidebar Info: Course Specs & Pro Shop Hours */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-neutral-900 text-sm border-b border-neutral-100 pb-2">
              {language === 'es' ? 'Especificaciones del Campo' : 'Course Specifications'}
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">{language === 'es' ? 'Hoyos Total' : 'Total Holes'}</span>
                <span className="font-bold text-neutral-900">18 Hoyos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">{language === 'es' ? 'Par del Campo' : 'Course Par'}</span>
                <span className="font-bold text-neutral-900">Par 72</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">{language === 'es' ? 'Longitud Total' : 'Total Yardage'}</span>
                <span className="font-mono font-bold text-neutral-900">7,120 Yards</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">{language === 'es' ? 'Rating / Slope' : 'Rating / Slope'}</span>
                <span className="font-mono font-bold text-neutral-900">74.2 / 138</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F2F8F4] border border-[#E3EFE7] rounded-2xl p-5 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-[#3B7A57]">
              <Activity className="w-4 h-4" />
              <span>{language === 'es' ? 'Campo de Práctica & Pro Shop' : 'Driving Range & Pro Shop'}</span>
            </div>
            <div className="space-y-1.5 text-neutral-700">
              <div className="flex justify-between">
                <span>{language === 'es' ? 'Campo de Práctica:' : 'Driving Range:'}</span>
                <span className="font-semibold">06:30 AM - 07:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'es' ? 'Tienda Pro Shop:' : 'Pro Shop Hours:'}</span>
                <span className="font-semibold">07:00 AM - 06:30 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
