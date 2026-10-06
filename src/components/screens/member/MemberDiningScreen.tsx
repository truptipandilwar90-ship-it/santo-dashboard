import React, { useState } from 'react';
import {
  Utensils,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Plus,
  Sparkles,
  Wine,
  MapPin
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const MemberDiningScreen: React.FC = () => {
  const { language, addCalendarEvent } = useApp();

  const [venue, setVenue] = useState('La Veranda Main Dining Room');
  const [date, setDate] = useState('2026-10-12');
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState(4);
  const [seatingArea, setSeatingArea] = useState('Fairway View Table');
  const [specialNotes, setSpecialNotes] = useState('');
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const handleBookTable = (e: React.FormEvent) => {
    e.preventDefault();
    addCalendarEvent({
      title: `Table Reservation (${guests} Guests) - ${venue}`,
      facilityId: 'fac_dining_01',
      facilityName: venue,
      facilityCategory: 'event_hall',
      startTime: time,
      endTime: '21:30',
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
      {/* Dining Header Banner */}
      <div className="bg-amber-50/70 border border-amber-100 rounded-[28px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-amber-200 text-amber-700 flex items-center justify-center shadow-2xs shrink-0">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {language === 'es' ? 'Restaurantes y Cava de Vinos' : 'Dining & Wine Cellar'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              {language === 'es'
                ? 'Gastronomía de Alta Cocina, Terraza al Aire Libre y Cata Sommelier en Cava 1920'
                : 'Fine Dining, Open-Air Patio Terrace & Sommelier Tastings at Cava 1920'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-amber-200 shadow-2xs shrink-0 text-xs">
          <div className="px-3 border-r border-neutral-100 text-center">
            <div className="text-[10px] uppercase font-bold text-neutral-400">La Veranda</div>
            <div className="font-bold text-amber-800">12:00 PM - 11:00 PM</div>
          </div>
          <div className="px-3 text-center">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Cava 1920</div>
            <div className="font-bold text-amber-800">06:00 PM - 11:00 PM</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Table Reservation Widget + Chef Specials */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table Reservation Widget */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div>
              <h2 className="text-base font-extrabold text-neutral-900">
                {language === 'es' ? 'Reservar Mesa de Restaurante' : 'Reserve a Dining Table'}
              </h2>
              <p className="text-xs text-neutral-500">
                {language === 'es' ? 'Reserva directa de mesa para socios y sus invitados' : 'Direct table booking for members and private guests'}
              </p>
            </div>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              {language === 'es' ? 'Servicio de Conserjería' : 'Concierge Service'}
            </span>
          </div>

          {bookedSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {language === 'es'
                  ? '¡Mesa reservada con éxito! Se ha añadido a sus reservas.'
                  : 'Table successfully reserved! Added to your active bookings.'}
              </span>
            </div>
          )}

          <form onSubmit={handleBookTable} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Restaurante / Ambiente' : 'Dining Venue'}
                </label>
                <select
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-amber-600 outline-none cursor-pointer"
                >
                  <option value="La Veranda Main Dining Room">La Veranda Main Dining Room</option>
                  <option value="Cava 1920 Wine Cellar (Private)">Cava 1920 Wine Cellar (Private Tasting)</option>
                  <option value="Patio Terrace & Bistro">Patio Terrace & Bistro (Outdoor)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Número de Comensales' : 'Party Size'}
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-amber-600 outline-none cursor-pointer"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests (Table for 2)</option>
                    <option value={4}>4 Guests (Standard Table)</option>
                    <option value={6}>6 Guests (Family Table)</option>
                    <option value={8}>8 Guests (Large Banquet)</option>
                    <option value={12}>12 Guests (Private Dining Room)</option>
                  </select>
                </div>
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
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-amber-600 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Hora Preferida' : 'Preferred Time'}
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-amber-600 outline-none cursor-pointer"
                >
                  <option value="12:30">12:30 PM (Lunch)</option>
                  <option value="14:00">02:00 PM (Lunch)</option>
                  <option value="19:00">07:00 PM (Dinner Slot 1)</option>
                  <option value="19:30">07:30 PM (Dinner Slot 1)</option>
                  <option value="20:30">08:30 PM (Dinner Slot 2)</option>
                  <option value="21:00">09:00 PM (Late Dinner)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {language === 'es' ? 'Ubicación de Mesa Preferida' : 'Seating Preference'}
              </label>
              <select
                value={seatingArea}
                onChange={(e) => setSeatingArea(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-amber-600 outline-none cursor-pointer"
              >
                <option value="Fairway View Table">Fairway & Sunset Overlook Table</option>
                <option value="Indoor Quiet Booth">Indoor Air-Conditioned Quiet Booth</option>
                <option value="Patio Outdoor Lounge">Patio Outdoor Lounge (Grill & Breeze)</option>
                <option value="Wine Cellar Tasting Table">Sommelier Reserve Cellar Table</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {language === 'es' ? 'Alergias o Requerimientos Especiales' : 'Dietary Restrictions or Special Notes'}
              </label>
              <input
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder={language === 'es' ? 'Ej: Cumpleaños, alergia a mariscos, vino reserva...' : 'e.g. Birthday celebration, seafood allergy...'}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-amber-600 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-black hover:bg-neutral-800 text-white rounded-full font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'es' ? 'Confirmar Reserva de Mesa' : 'Confirm Table Reservation'}</span>
            </button>
          </form>
        </div>

        {/* Sidebar: Chef Specials & Sommelier Picks */}
        <div className="space-y-6">
          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-900 border-b border-amber-200/80 pb-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>{language === 'es' ? 'Sugerencias del Chef Hoy' : "Today's Chef Specials"}</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="font-bold text-neutral-900">Langosta del Caribe a la Parrilla</div>
                <p className="text-[11px] text-neutral-600 leading-snug">
                  Mantequilla de hierbas finas, risotto de azafrán y vegetales baby del huerto del club.
                </p>
              </div>
              <div>
                <div className="font-bold text-neutral-900">Ribeye Prime 18oz Madurado</div>
                <p className="text-[11px] text-neutral-600 leading-snug">
                  Corte madurado 45 días con reducción de vino tinto de la Cava 1920.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-neutral-900 border-b border-neutral-100 pb-2">
              <Wine className="w-4 h-4 text-rose-800" />
              <span>{language === 'es' ? 'Recomendación Sommelier' : 'Sommelier Pairing'}</span>
            </div>
            <p className="text-[11px] text-neutral-600 leading-relaxed">
              <strong>Gran Reserva Rioja 2018:</strong> Maridaje perfecto para carnes rojas y quesos madurados. Disponible por copa o botella en Cava 1920.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
