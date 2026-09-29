import React, { useState } from 'react';
import {
  ArrowLeft,
  Flag,
  Calendar,
  Clock,
  Users,
  CreditCard,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Edit2,
  DollarSign,
  History,
  Car
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GolfBookingDetailScreen: React.FC = () => {
  const {
    golfBookings,
    selectedGolfBookingId,
    checkInGolfPlayer,
    cancelGolfBooking,
    navigateTo,
    currentRole,
    t,
    language
  } = useApp();

  const booking = golfBookings.find(b => b.id === selectedGolfBookingId) || golfBookings[0];
  const [internalNotes, setInternalNotes] = useState(booking?.notes || '');

  if (!booking) {
    return <div className="p-8 text-center text-xs text-neutral-500">{language === 'es' ? 'No hay reserva de golf seleccionada.' : 'No golf reservation selected.'}</div>;
  }

  const handleCheckInAll = () => {
    booking.players.forEach(p => checkInGolfPlayer(booking.id, p.id));
  };

  const handleCancel = () => {
    if (confirm(language === 'es' ? '¿Cancelar esta reserva de salida?' : 'Cancel this tee time reservation? Under 24h rules, penalty fee may apply if not weather exempt.')) {
      cancelGolfBooking(booking.id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('tee_sheet')}
            className="p-2.5 rounded-full border border-neutral-300 hover:border-black hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
                {language === 'es' ? 'Reserva de Salida' : 'Tee Time Reservation'} #{booking.id}
              </h1>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full font-mono ${
                booking.status === 'checked_in'
                  ? 'bg-[#F2F8F4] text-[#3B7A57] border border-[#E3EFE7]'
                  : booking.status === 'cancelled'
                  ? 'bg-rose-50 text-rose-800 border border-rose-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}>
                {booking.status === 'checked_in' ? t.dashboard.checkedIn : booking.status.replace('_', ' ')}
              </span>
            </div>
            <div className="text-xs text-neutral-500 mt-0.5">
              {booking.course} · {booking.date} {language === 'es' ? 'a las' : 'at'} {booking.teeTime}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {booking.status !== 'checked_in' && booking.status !== 'cancelled' && (
            <button
              onClick={handleCheckInAll}
              className="px-5 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#88D49E]" />
              <span>{language === 'es' ? 'Registrar Todos los Jugadores' : 'Check In All Players'}</span>
            </button>
          )}

          {booking.status !== 'cancelled' && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-full border border-rose-300 text-rose-700 hover:bg-rose-50 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Cancelar Reserva' : 'Cancel Reservation'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Reservation Details */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-5 space-y-3 text-xs">
          <h2 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
            <Flag className="w-4 h-4 text-emerald-700" />
            <span>{language === 'es' ? 'Información del Campo y Reserva' : 'Course & Booking Info'}</span>
          </h2>
          <div className="space-y-2 pt-1 font-mono">
            <div className="flex justify-between py-1 border-b border-neutral-100">
              <span className="font-sans text-neutral-500">{language === 'es' ? 'Campo' : 'Course'}</span>
              <span className="font-bold text-neutral-900">{booking.course}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-100">
              <span className="font-sans text-neutral-500">{t.common.date} &amp; {language === 'es' ? 'Hora' : 'Tee Time'}</span>
              <span className="font-bold text-neutral-900">{booking.date} · {booking.teeTime}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-100">
              <span className="font-sans text-neutral-500">{language === 'es' ? 'Organizador' : 'Organizer'}</span>
              <span className="font-sans font-semibold text-neutral-900">{booking.bookedBy}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-sans text-neutral-500">{language === 'es' ? 'Correo de Contacto' : 'Contact Email'}</span>
              <span className="text-neutral-600 font-sans">{booking.bookedByEmail}</span>
            </div>
          </div>
        </div>

        {/* Financial Charges & Payment */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-5 space-y-3 text-xs">
          <h2 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-700" />
            <span>{language === 'es' ? 'Cargos y Facturación' : 'Charges & Billing'}</span>
          </h2>
          <div className="space-y-2 pt-1 font-mono">
            <div className="flex justify-between py-1 border-b border-neutral-100">
              <span className="font-sans text-neutral-500">{language === 'es' ? 'Green Fees (4 jugadores)' : 'Green Fees (4 players)'}</span>
              <span>$280.00</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-100">
              <span className="font-sans text-neutral-500">{language === 'es' ? 'Carrito GPS de Lujo' : 'Luxury GPS Cart Fleet'}</span>
              <span>$50.00</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-100">
              <span className="font-sans text-neutral-500">{language === 'es' ? 'Alquiler de Palos' : 'Rental Club Sets'}</span>
              <span>$30.00</span>
            </div>
            <div className="flex justify-between py-1 text-sm font-bold text-neutral-900">
              <span className="font-sans">{language === 'es' ? 'Total Facturado' : 'Total Billed'}</span>
              <span className="text-emerald-700">${booking.totalCharge}.00</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-neutral-50 text-[11px] text-neutral-600 flex justify-between items-center">
            <span>{language === 'es' ? 'Método de Pago:' : 'Payment Method:'}</span>
            <span className="font-semibold text-neutral-800 capitalize">{booking.paymentStatus.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Applicable Club Rules */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-5 space-y-3 text-xs">
          <h2 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-700" />
            <span>{language === 'es' ? 'Políticas Aplicables' : 'Applicable Policies'}</span>
          </h2>
          <div className="space-y-2 text-neutral-600 leading-relaxed text-[11px]">
            <p>· <strong>{language === 'es' ? 'Ritmo de Juego Objetivo:' : 'Pace of Play Target:'}</strong> {language === 'es' ? '4 horas 15 minutos para 18 hoyos.' : '4 hours 15 minutes for 18 holes.'}</p>
            <p>· <strong>{language === 'es' ? 'Aviso de Cancelación:' : 'Cancellation Notice:'}</strong> {language === 'es' ? 'Cancelación gratuita hasta 24 horas antes.' : 'Free cancellation up to 24 hours prior. Weather exemptions waive all penalties automatically.'}</p>
            <p>· <strong>{language === 'es' ? 'Código de Vestimenta:' : 'Dress Policy:'}</strong> {language === 'es' ? 'Vestimenta tradicional de golf, camisas con cuello.' : 'Traditional golf attire, tucked collared shirts, soft spikes only.'}</p>
          </div>
        </div>

      </div>

      {/* Players List Table */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-4 text-xs">
        <h2 className="font-bold text-sm text-neutral-900">{language === 'es' ? 'Jugadores Registrados y Equipamiento' : 'Registered Players & Equipment'}</h2>

        <div className="border border-neutral-200 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 border-b border-neutral-200 font-bold text-neutral-700">
              <tr>
                <th className="p-3">{language === 'es' ? 'Nombre del Jugador' : 'Player Name'}</th>
                <th className="p-3">{language === 'es' ? 'Clasificación' : 'Classification'}</th>
                <th className="p-3 font-mono">{language === 'es' ? 'Hándicap' : 'Handicap'}</th>
                <th className="p-3">{language === 'es' ? 'Carrito / Caddy' : 'Cart / Caddy'}</th>
                <th className="p-3">{language === 'es' ? 'Palos de Alquiler' : 'Rental Clubs'}</th>
                <th className="p-3 text-right">{language === 'es' ? 'Estado de Registro' : 'Check-in Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-mono">
              {booking.players.map((p) => (
                <tr key={p.id} className="hover:bg-neutral-50/60">
                  <td className="p-3 font-sans font-bold text-neutral-900">{p.name}</td>
                  <td className="p-3 font-sans">
                    {p.isMember ? (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        {language === 'es' ? 'Socio del Club' : 'Club Member'}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                        {language === 'es' ? 'InvitadoPatrocinado' : 'Sponsored Guest'}
                      </span>
                    )}
                  </td>
                  <td className="p-3 font-bold text-neutral-800">{p.handicap}</td>
                  <td className="p-3 font-sans text-neutral-700">
                    {p.cartRequested ? (language === 'es' ? 'Carrito Incluido' : 'Cart Included') : (language === 'es' ? 'Caminando' : 'Walking')}
                  </td>
                  <td className="p-3 font-sans text-neutral-700">
                    {p.rentalClubs ? 'Callaway Rogue' : (language === 'es' ? 'Palos Propios' : 'Own Clubs')}
                  </td>
                  <td className="p-3 text-right font-sans">
                    {p.checkedIn ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {t.dashboard.checkedIn}
                      </span>
                    ) : (
                      <button
                        onClick={() => checkInGolfPlayer(booking.id, p.id)}
                        className="px-2.5 py-1 rounded bg-neutral-900 text-white font-semibold text-[10px] cursor-pointer"
                      >
                        {t.dashboard.checkInPlayer}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modifications History */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-3 text-xs">
        <h2 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
          <History className="w-4 h-4 text-neutral-500" />
          <span>{language === 'es' ? 'Historial de Modificaciones' : 'Modification History'}</span>
        </h2>
        {booking.modifications.length === 0 ? (
          <p className="text-neutral-500 text-[11px]">{language === 'es' ? 'Sin modificaciones registradas desde la confirmación.' : 'No modifications recorded since booking confirmation.'}</p>
        ) : (
          <div className="space-y-2">
            {booking.modifications.map((mod, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-700 flex items-center justify-between">
                <span>{mod.change} ({language === 'es' ? 'por' : 'by'} {mod.user})</span>
                <span className="font-mono text-[10px] text-neutral-400">{mod.timestamp}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

