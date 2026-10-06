import React, { useState } from 'react';
import {
  CalendarDays,
  Flag,
  Dumbbell,
  Utensils,
  Building,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  X,
  Trash2,
  QrCode,
  Plus
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

interface MemberReservation {
  id: string;
  category: 'golf' | 'tennis' | 'dining' | 'ballroom';
  title: string;
  facility: string;
  date: string;
  time: string;
  partySize: number;
  status: 'confirmed' | 'hold' | 'completed';
  details: string;
  caddyOrNotes?: string;
}

export const MemberReservationsScreen: React.FC = () => {
  const { navigateTo, language } = useApp();

  const [filterCategory, setFilterCategory] = useState<'all' | 'golf' | 'tennis' | 'dining' | 'ballroom'>('all');
  const [selectedQrRes, setSelectedQrRes] = useState<MemberReservation | null>(null);

  const [reservations, setReservations] = useState<MemberReservation[]>([
    {
      id: 'res_golf_01',
      category: 'golf',
      title: 'Salida de Golf 18 Hoyos · Foursome',
      facility: 'Campo de Golf Principal (Hoyos 1-18)',
      date: '2026-09-26',
      time: '08:30 AM',
      partySize: 4,
      status: 'confirmed',
      details: 'Sir Arthur Sterling, Dr. Raymond Chen, Marcus Kensington, Coach Mateo Rossi',
      caddyOrNotes: 'Servicio de Caddies Reservado (Eduardo & Mateo)'
    },
    {
      id: 'res_tennis_02',
      category: 'tennis',
      title: 'Partido de Tenis en Cancha de Arcilla',
      facility: 'Cancha de Arcilla #2 (Hydro-Clay)',
      date: '2026-09-25',
      time: '04:30 PM',
      partySize: 2,
      status: 'confirmed',
      details: 'Sir Arthur Sterling vs. Victoria Vanderbilt',
      caddyOrNotes: 'Iluminación LED activada y bolas ProPenn'
    },
    {
      id: 'res_dining_03',
      category: 'dining',
      title: 'Cena en La Veranda y Cata de Vinos',
      facility: 'La Veranda & Terraza al Aire Libre',
      date: '2026-09-27',
      time: '07:30 PM',
      partySize: 6,
      status: 'confirmed',
      details: 'Mesa 14 (Vista al Campo de Golf)',
      caddyOrNotes: 'Maridaje Sommelier y selección de mariscos'
    },
    {
      id: 'res_ballroom_04',
      category: 'ballroom',
      title: 'Gala Anual Sterling y Subasta de Beneficencia',
      facility: 'Salón Anacaona Grand Ballroom',
      date: '2026-10-15',
      time: '06:00 PM',
      partySize: 220,
      status: 'hold',
      details: 'Banquete Ejecutivo y Escenario para Orquesta',
      caddyOrNotes: 'Cotización preparada, depósito en revisión'
    }
  ]);

  const handleCancelReservation = (id: string) => {
    setReservations(reservations.filter(r => r.id !== id));
  };

  const filteredReservations = reservations.filter(r => {
    if (filterCategory === 'all') return true;
    return r.category === filterCategory;
  });

  const categoryIcons = {
    golf: Flag,
    tennis: Dumbbell,
    dining: Utensils,
    ballroom: Building
  };

  return (
    <div className="space-y-6">
      {/* Reservations Header Banner */}
      <div className="bg-white border border-neutral-200/90 rounded-[28px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F2F8F4] border border-[#E3EFE7] text-[#3B7A57] flex items-center justify-center shadow-2xs shrink-0">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {language === 'es' ? 'Mis Reservas Activas' : 'My Active Reservations'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              {language === 'es'
                ? 'Consulte sus reservas de Golf, Tenis, Restaurantes y Salones de Eventos'
                : 'Manage your active bookings across Golf, Courts, Dining & Ballrooms'}
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-neutral-100 p-1.5 rounded-2xl text-xs font-bold shrink-0">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
              filterCategory === 'all' ? 'bg-black text-white shadow-2xs' : 'text-neutral-600 hover:text-black'
            }`}
          >
            {language === 'es' ? 'Todas' : 'All'} ({reservations.length})
          </button>
          <button
            onClick={() => setFilterCategory('golf')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
              filterCategory === 'golf' ? 'bg-[#3B7A57] text-white shadow-2xs' : 'text-neutral-600 hover:text-black'
            }`}
          >
            Golf
          </button>
          <button
            onClick={() => setFilterCategory('tennis')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
              filterCategory === 'tennis' ? 'bg-teal-700 text-white shadow-2xs' : 'text-neutral-600 hover:text-black'
            }`}
          >
            Tenis/Pádel
          </button>
          <button
            onClick={() => setFilterCategory('dining')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
              filterCategory === 'dining' ? 'bg-amber-700 text-white shadow-2xs' : 'text-neutral-600 hover:text-black'
            }`}
          >
            Restaurante
          </button>
          <button
            onClick={() => setFilterCategory('ballroom')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
              filterCategory === 'ballroom' ? 'bg-indigo-700 text-white shadow-2xs' : 'text-neutral-600 hover:text-black'
            }`}
          >
            Salones
          </button>
        </div>
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-12 text-center space-y-3">
            <CalendarDays className="w-10 h-10 text-neutral-300 mx-auto" />
            <h3 className="font-bold text-neutral-900 text-base">
              {language === 'es' ? 'No tiene reservas en esta categoría' : 'No active bookings in this category'}
            </h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              {language === 'es'
                ? 'Seleccione una instalación en el menú para programar una nueva reserva.'
                : 'Select a club facility from the sidebar to schedule a new reservation.'}
            </p>
          </div>
        ) : (
          filteredReservations.map((res) => {
            const IconComponent = categoryIcons[res.category];
            return (
              <div
                key={res.id}
                className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-neutral-300 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                      res.category === 'golf'
                        ? 'bg-emerald-50 text-[#3B7A57] border-emerald-100'
                        : res.category === 'tennis'
                        ? 'bg-teal-50 text-teal-700 border-teal-100'
                        : res.category === 'dining'
                        ? 'bg-amber-50 text-amber-700 border-amber-100'
                        : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-extrabold text-neutral-900 text-base">
                        {res.title}
                      </h3>
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          res.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {res.status === 'confirmed' ? (language === 'es' ? 'Confirmada' : 'Confirmed') : (language === 'es' ? 'Bloqueo en Espera' : 'Hold Pending')}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-600 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="font-semibold text-neutral-900">{res.facility}</span>
                      <span>•</span>
                      <span>{res.date} a las {res.time}</span>
                      <span>•</span>
                      <span>{res.partySize} {language === 'es' ? 'personas' : 'guests'}</span>
                    </div>

                    <p className="text-xs text-neutral-500 italic pt-0.5">
                      {res.caddyOrNotes || res.details}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-neutral-100">
                  <button
                    onClick={() => setSelectedQrRes(res)}
                    className="px-3.5 py-2 rounded-xl bg-[#F2F8F4] text-[#3B7A57] border border-[#E3EFE7] hover:bg-[#E3EFE7] font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>{language === 'es' ? 'Pase Digital' : 'Digital QR Pass'}</span>
                  </button>

                  <button
                    onClick={() => handleCancelReservation(res.id)}
                    title={language === 'es' ? 'Cancelar Reserva' : 'Cancel Booking'}
                    className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Digital QR Modal */}
      {selectedQrRes && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-5 text-center shadow-2xl relative">
            <button
              onClick={() => setSelectedQrRes(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#3B7A57] border border-emerald-100 flex items-center justify-center mx-auto">
              <QrCode className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#3B7A57] bg-[#F2F8F4] px-2.5 py-1 rounded-full border border-[#E3EFE7]">
                {language === 'es' ? 'Acceso de Socio' : 'Member Access Pass'}
              </span>
              <h3 className="text-lg font-bold text-neutral-900 mt-2">
                {selectedQrRes.title}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                {selectedQrRes.facility} · {selectedQrRes.date} ({selectedQrRes.time})
              </p>
            </div>

            <div className="bg-neutral-900 p-4 rounded-2xl text-white inline-block shadow-inner mx-auto">
              <div className="w-36 h-36 bg-white p-2 rounded-xl flex items-center justify-center mx-auto">
                {/* Simulated QR Pattern */}
                <div className="w-full h-full border-4 border-black grid grid-cols-4 gap-1 p-1">
                  <div className="bg-black rounded-xs" />
                  <div className="bg-black rounded-xs" />
                  <div className="bg-transparent" />
                  <div className="bg-black rounded-xs" />
                  <div className="bg-black rounded-xs" />
                  <div className="bg-transparent" />
                  <div className="bg-black rounded-xs" />
                  <div className="bg-black rounded-xs" />
                  <div className="bg-transparent" />
                  <div className="bg-black rounded-xs" />
                  <div className="bg-black rounded-xs" />
                  <div className="bg-transparent" />
                  <div className="bg-black rounded-xs" />
                  <div className="bg-transparent" />
                  <div className="bg-black rounded-xs" />
                  <div className="bg-black rounded-xs" />
                </div>
              </div>
              <div className="text-[10px] font-mono text-neutral-400 mt-2">
                MEMBER #1029 · PASS-{selectedQrRes.id.toUpperCase()}
              </div>
            </div>

            <button
              onClick={() => setSelectedQrRes(null)}
              className="w-full py-2.5 bg-neutral-900 text-white text-xs font-bold rounded-full hover:bg-black cursor-pointer"
            >
              {language === 'es' ? 'Cerrar' : 'Close Pass'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
