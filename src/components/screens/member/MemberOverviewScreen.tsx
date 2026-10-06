import React from 'react';
import {
  UserCheck,
  Flag,
  Dumbbell,
  Utensils,
  Building,
  Calendar,
  Clock,
  ChevronRight,
  CheckCircle2,
  BellRing,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { SantoDomingoLogo } from '../../common/SantoDomingoLogo';

export const MemberOverviewScreen: React.FC = () => {
  const { navigateTo, language } = useApp();

  return (
    <div className="space-y-6">
      {/* Simple Member Welcome & Summary Header */}
      <div className="bg-[#F2F8F4] border border-[#E3EFE7] rounded-[28px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="bg-white p-3 rounded-2xl border border-[#E3EFE7] shadow-2xs shrink-0 hidden sm:block">
            <SantoDomingoLogo size="sm" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-white text-[#3B7A57] border border-[#E3EFE7] text-[11px] font-bold tracking-tight">
                {language === 'es' ? 'Portal de Socios' : 'Member Portal'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase font-mono">
                {language === 'es' ? 'Socio Fundador Platino' : 'Platinum Founding Member'} #1029
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              {language === 'es' ? 'Bienvenido, Sir Arthur Sterling' : 'Welcome back, Sir Arthur Sterling'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl leading-relaxed">
              {language === 'es'
                ? 'Acceda de forma rápida a sus reservas, consulte disponibilidad de instalaciones y gestione su cuenta.'
                : 'Quickly access your reservations, check facility availability, and manage your member account.'}
            </p>
          </div>
        </div>

        {/* Member Quick Summary Pills */}
        <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-[#E3EFE7] shadow-2xs shrink-0 text-xs">
          <div className="px-3 border-r border-neutral-100 space-y-0.5">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Handicap</div>
            <div className="font-mono font-extrabold text-base text-neutral-900">6.2 HI</div>
          </div>
          <div className="px-3 border-r border-neutral-100 space-y-0.5">
            <div className="text-[10px] uppercase font-bold text-neutral-400">{language === 'es' ? 'Cuenta' : 'Account'}</div>
            <div className="font-extrabold text-xs text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Al Día' : 'Good Standing'}</span>
            </div>
          </div>
          <div className="px-3 space-y-0.5">
            <div className="text-[10px] uppercase font-bold text-neutral-400">{language === 'es' ? 'Saldo' : 'Balance'}</div>
            <div className="font-mono font-extrabold text-base text-[#3B7A57]">$0.00</div>
          </div>
        </div>
      </div>

      {/* Quick Action Category Shortcuts (4 Primary Club Services) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm font-extrabold text-neutral-900 uppercase tracking-wider">
            {language === 'es' ? 'Accesos Rápidos a Servicios' : 'Quick Actions & Facilities'}
          </h2>
          <span className="text-xs text-neutral-500">
            {language === 'es' ? 'Seleccione para acceder' : 'Select a service to begin'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Golf Card */}
          <div
            onClick={() => navigateTo('member_golf')}
            className="group bg-white p-5 rounded-2xl border border-neutral-200/90 hover:border-[#3B7A57] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#3B7A57] flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform">
                <Flag className="w-5 h-5" />
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#3B7A57] group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base group-hover:text-[#3B7A57] transition-colors">
                {language === 'es' ? 'Campo de Golf' : 'Golf & Tee Times'}
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-snug">
                {language === 'es' ? 'Reservar salidas de 18 hoyos y caddies' : 'Book 18-hole championship tee times & caddies'}
              </p>
            </div>
          </div>

          {/* Tennis & Padel Card */}
          <div
            onClick={() => navigateTo('member_tennis')}
            className="group bg-white p-5 rounded-2xl border border-neutral-200/90 hover:border-teal-600 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100 group-hover:scale-105 transition-transform">
                <Dumbbell className="w-5 h-5" />
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base group-hover:text-teal-700 transition-colors">
                {language === 'es' ? 'Tenis y Pádel' : 'Tennis & Padel'}
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-snug">
                {language === 'es' ? 'Reservar canchas de arcilla y pádel con iluminación' : 'Reserve clay tennis and panoramic padel courts'}
              </p>
            </div>
          </div>

          {/* Dining Card */}
          <div
            onClick={() => navigateTo('member_dining')}
            className="group bg-white p-5 rounded-2xl border border-neutral-200/90 hover:border-amber-600 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100 group-hover:scale-105 transition-transform">
                <Utensils className="w-5 h-5" />
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base group-hover:text-amber-700 transition-colors">
                {language === 'es' ? 'Restaurantes y Cava' : 'Dining & Restaurants'}
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-snug">
                {language === 'es' ? 'Reservas de mesa en La Veranda y Cava 1920' : 'Reserve tables at La Veranda & Cava 1920 Wine Cellar'}
              </p>
            </div>
          </div>

          {/* Ballrooms Card */}
          <div
            onClick={() => navigateTo('member_events')}
            className="group bg-white p-5 rounded-2xl border border-neutral-200/90 hover:border-indigo-600 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100 group-hover:scale-105 transition-transform">
                <Building className="w-5 h-5" />
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-indigo-700 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base group-hover:text-indigo-700 transition-colors">
                {language === 'es' ? 'Salones de Eventos' : 'Ballrooms & Events'}
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-snug">
                {language === 'es' ? 'Solicitud de bloqueo para celebraciones privadas' : 'Request private event holds & ballroom bookings'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Next Upcoming Booking & Club Notice Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Nearest Upcoming Reservation Highlight */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#3B7A57]" />
              <h3 className="font-bold text-neutral-900 text-sm">
                {language === 'es' ? 'Próxima Reserva Confirmada' : 'Next Upcoming Reservation'}
              </h3>
            </div>
            <button
              onClick={() => navigateTo('member_reservations')}
              className="text-xs font-bold text-[#3B7A57] hover:underline flex items-center gap-1"
            >
              <span>{language === 'es' ? 'Ver Todas Mis Reservas' : 'View All My Bookings'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-[#F2F8F4] border border-[#E3EFE7] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white text-[#3B7A57] border border-[#E3EFE7]">
                  Golf
                </span>
                <span className="text-xs font-semibold text-neutral-500">
                  Sábado, 26 de Septiembre
                </span>
              </div>
              <h4 className="font-bold text-neutral-900 text-base">
                Salida de Golf 18 Hoyos · Foursome
              </h4>
              <p className="text-xs text-neutral-600">
                Campo de Golf Principal (Hoyos 1-18) · 08:30 AM · 4 Jugadores
              </p>
            </div>

            <button
              onClick={() => navigateTo('member_reservations')}
              className="px-4 py-2 bg-black hover:bg-neutral-800 text-white rounded-full text-xs font-bold shrink-0 transition-colors cursor-pointer"
            >
              {language === 'es' ? 'Ver Pase Digital' : 'View Pass / QR'}
            </button>
          </div>
        </div>

        {/* Club Notices / Announcements */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
            <BellRing className="w-4 h-4 text-amber-600" />
            <h3 className="font-bold text-neutral-900 text-sm">
              {language === 'es' ? 'Avisos del Club' : 'Club Notices'}
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100 space-y-1">
              <div className="font-bold text-amber-900">
                {language === 'es' ? 'Torneo Anual de Fundadores' : 'Founders Golf Championship'}
              </div>
              <p className="text-amber-800 text-[11px] leading-relaxed">
                {language === 'es'
                  ? 'Las inscripciones abren este viernes. Cupos limitados para categoría Platino.'
                  : 'Inscriptions open this Friday. Priority registration for Platinum members.'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 space-y-1">
              <div className="font-bold text-neutral-800">
                {language === 'es' ? 'Cata Privada en Cava 1920' : 'Cava 1920 Wine Tasting'}
              </div>
              <p className="text-neutral-600 text-[11px] leading-relaxed">
                {language === 'es'
                  ? 'Jueves 7:00 PM. Selección exclusiva de tintos de la Rioja y maridaje de quesos.'
                  : 'Thursday at 7:00 PM. Exclusive Rioja red wines & artisan cheese pairing.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
