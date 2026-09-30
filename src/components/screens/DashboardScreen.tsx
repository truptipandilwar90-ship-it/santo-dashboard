import React from 'react';
import {
  CalendarDays,
  Inbox,
  AlertTriangle,
  Bot,
  CreditCard,
  XCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Building,
  Flag,
  Dumbbell,
  Users,
  ChevronRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SantoDomingoLogo } from '../common/SantoDomingoLogo';

export const DashboardScreen: React.FC = () => {
  const {
    calendarEvents,
    conversations,
    aiReviews,
    payments,
    detailedEvent,
    navigateTo,
    currentRole,
    t,
    language
  } = useApp();

  const todayEvents = calendarEvents.filter(e => e.date === '2026-09-25');
  const conflicts = calendarEvents.filter(e => e.hasConflict && e.status !== 'cancelled');
  const pendingAi = aiReviews.filter(r => r.status === 'pending');
  const unreadInquiries = conversations.filter(c => c.unread || c.status === 'pending_staff');
  const pendingPayments = payments.filter(p => p.status === 'Pending' || !p.reconciled);
  const openTasks = detailedEvent.tasks.filter(t => !t.completed);

  return (
    <div className="space-y-6">
      
      {/* Welcome Showcase Banner in Login Page Mint Card Theme */}
      <div className="bg-[#F2F8F4] border border-[#E3EFE7] rounded-[32px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-start gap-5">
          <div className="bg-white p-2.5 rounded-2xl border border-[#E3EFE7] shadow-xs shrink-0 hidden sm:block">
            <SantoDomingoLogo size="sm" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-white text-[#3B7A57] border border-[#E3EFE7] text-[11px] font-bold tracking-tight">
                {t.dashboard.todaysOverview}
              </span>
              <span className="text-xs text-neutral-500 font-mono">{t.dashboard.dateDisplay}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              {t.dashboard.welcomeTitle}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl leading-relaxed">
              {todayEvents.length} {t.dashboard.welcomeSubtitle}
            </p>
          </div>
        </div>

        {/* Action Badges in Black & Soft Mint */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {conflicts.length > 0 && (
            <button
              onClick={() => navigateTo('master_calendar')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-50 border border-rose-300 text-rose-800 text-xs font-bold hover:bg-rose-100 transition-colors shadow-xs cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>{conflicts.length} {t.dashboard.calendarCollision}</span>
            </button>
          )}

          {pendingAi.length > 0 && (
            <button
              onClick={() => navigateTo('ai_review_queue')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#E3EFE7] text-neutral-900 text-xs font-bold hover:bg-neutral-50 transition-colors shadow-xs cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-[#3B7A57]" />
              <span>{pendingAi.length} {t.dashboard.aiDraftsReview}</span>
            </button>
          )}

          <button
            onClick={() => navigateTo('master_calendar')}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
          >
            <span>{t.dashboard.openCalendar}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div
          onClick={() => navigateTo('master_calendar')}
          className="bg-white p-5 rounded-[24px] border border-[#E3EFE7] shadow-xs hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-xs font-bold text-neutral-900">{t.dashboard.kpiBookings}</span>
              <span className="px-2.5 py-0.5 rounded-full border border-neutral-300 text-[10px] font-semibold text-neutral-700">
                {language === 'es' ? 'En Vivo' : 'Live'}
              </span>
            </div>
            <div className="text-[11px] text-neutral-500 mb-3">{t.dashboard.kpiBookingsDesc}</div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
            <span className="text-2xl font-extrabold font-mono text-neutral-900">{todayEvents.length}</span>
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#48BB78" strokeWidth="3" strokeDasharray="88" strokeDashoffset="12" strokeLinecap="round" />
              </svg>
              <span className="absolute text-[8px] font-bold font-mono text-neutral-800">88%</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div
          onClick={() => navigateTo('inbox')}
          className="bg-white p-5 rounded-[24px] border border-[#E3EFE7] shadow-xs hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-xs font-bold text-neutral-900">{t.dashboard.kpiInquiries}</span>
              <span className="px-2.5 py-0.5 rounded-full border border-neutral-300 text-[10px] font-semibold text-neutral-700">
                {language === 'es' ? 'Bandeja' : 'Inbox'}
              </span>
            </div>
            <div className="text-[11px] text-neutral-500 mb-3">{t.dashboard.kpiInquiriesDesc}</div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
            <span className="text-2xl font-extrabold font-mono text-neutral-900">{unreadInquiries.length}</span>
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#3B7A57" strokeWidth="3" strokeDasharray="88" strokeDashoffset="24" strokeLinecap="round" />
              </svg>
              <span className="absolute text-[8px] font-bold font-mono text-neutral-800">72%</span>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div
          onClick={() => navigateTo('payments_transactions')}
          className="bg-white p-5 rounded-[24px] border border-[#E3EFE7] shadow-xs hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-xs font-bold text-neutral-900">{t.dashboard.kpiPayments}</span>
              <span className="px-2.5 py-0.5 rounded-full border border-neutral-300 text-[10px] font-semibold text-neutral-700">
                {language === 'es' ? 'Finanzas' : 'Finance'}
              </span>
            </div>
            <div className="text-[11px] text-neutral-500 mb-3">{t.dashboard.kpiPaymentsDesc}</div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
            <span className="text-xl font-extrabold font-mono text-neutral-900">${(detailedEvent.balanceDue / 1000).toFixed(1)}k</span>
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#48BB78" strokeWidth="3" strokeDasharray="88" strokeDashoffset="14" strokeLinecap="round" />
              </svg>
              <span className="absolute text-[8px] font-bold font-mono text-neutral-800">84%</span>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div
          onClick={() => navigateTo('event_detail')}
          className="bg-white p-5 rounded-[24px] border border-[#E3EFE7] shadow-xs hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-xs font-bold text-neutral-900">{t.dashboard.kpiTasks}</span>
              <span className="px-2.5 py-0.5 rounded-full border border-neutral-300 text-[10px] font-semibold text-neutral-700">
                {language === 'es' ? 'Tareas' : 'Tasks'}
              </span>
            </div>
            <div className="text-[11px] text-neutral-500 mb-3">{t.dashboard.kpiTasksDesc}</div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
            <span className="text-2xl font-extrabold font-mono text-neutral-900">{openTasks.length}</span>
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#48BB78" strokeWidth="3" strokeDasharray="88" strokeDashoffset="8" strokeLinecap="round" />
              </svg>
              <span className="absolute text-[8px] font-bold font-mono text-neutral-800">92%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid: Today's Schedule & Records Needing Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Today's Schedule & Occupancy */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Today's Schedule List */}
          <div className="bg-white rounded-[28px] border border-[#E3EFE7] shadow-xs p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-extrabold text-lg text-neutral-900 tracking-tight">{t.dashboard.todaysSchedule}</h2>
                <p className="text-xs text-neutral-500">
                  {language === 'es' ? 'Banquetes, torneos y canchas asignadas confirmadas' : 'Confirmed banquets, tournaments, and court allocations'}
                </p>
              </div>
              <button
                onClick={() => navigateTo('master_calendar')}
                className="text-xs font-bold text-neutral-900 hover:text-[#3B7A57] flex items-center gap-1 cursor-pointer"
              >
                <span>{language === 'es' ? 'Ver Calendario Completo' : 'View Full Grid'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-neutral-100">
              {todayEvents.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => {
                    if (ev.facilityCategory === 'event_hall') {
                      navigateTo('event_detail', { eventId: ev.id });
                    } else if (ev.facilityCategory === 'golf') {
                      navigateTo('tee_sheet');
                    } else {
                      navigateTo('facility_bookings');
                    }
                  }}
                  className="py-3.5 flex items-center justify-between gap-3 hover:bg-[#F2F8F4] px-3 rounded-2xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-14 text-center shrink-0 bg-[#F2F8F4] p-2 rounded-2xl border border-[#E3EFE7]">
                      <div className="font-mono text-xs font-bold text-neutral-900">{ev.startTime}</div>
                      <div className="font-mono text-[10px] text-neutral-500">{ev.endTime}</div>
                    </div>

                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm text-neutral-900 truncate flex items-center gap-2">
                        <span>{ev.title}</span>
                        {ev.hasConflict && (
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full animate-pulse">
                            {language === 'es' ? 'Conflicto' : 'Conflict'}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-neutral-500 flex items-center gap-2 mt-0.5">
                        <span className="font-semibold text-[#3B7A57]">{ev.facilityName}</span>
                        <span>·</span>
                        <span>{language === 'es' ? 'Socio' : 'Host'}: {ev.memberName}</span>
                        {ev.guestCount && <span>({ev.guestCount} {language === 'es' ? 'personas' : 'pax'})</span>}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 ${
                    ev.status === 'confirmed'
                      ? 'bg-[#F2F8F4] text-[#3B7A57] border border-[#E3EFE7]'
                      : ev.status === 'hold'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}>
                    {ev.status === 'confirmed' ? t.common.confirmed : ev.status === 'hold' ? t.common.hold : t.common.cancelled}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Facility Usage Overview in Light Theme */}
          <div className="bg-white rounded-[28px] border border-[#E3EFE7] shadow-xs p-6 sm:p-7 space-y-4">
            <h2 className="font-extrabold text-lg text-neutral-900 tracking-tight">
              {language === 'es' ? 'Uso de Instalaciones y Tasas de Ocupación' : 'Facility Usage & Occupancy Rates'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#F2F8F4] border border-[#E3EFE7] space-y-2">
                <div className="flex items-center justify-between font-bold text-neutral-800">
                  <span className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#3B7A57]" />
                    <span>{t.modal.eventHalls}</span>
                  </span>
                  <span className="font-mono text-neutral-900">92%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-neutral-200/60">
                  <div className="bg-[#48BB78] h-2 rounded-full w-[92%]" />
                </div>
                <div className="text-[11px] text-neutral-500">
                  {language === 'es' ? 'Gran Salón y Terraza reservados esta tarde' : 'Ballroom & Terrace booked for evening'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F2F8F4] border border-[#E3EFE7] space-y-2">
                <div className="flex items-center justify-between font-bold text-neutral-800">
                  <span className="flex items-center gap-1.5">
                    <Flag className="w-3.5 h-3.5 text-[#3B7A57]" />
                    <span>{t.modal.golf}</span>
                  </span>
                  <span className="font-mono text-neutral-900">84%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-neutral-200/60">
                  <div className="bg-[#48BB78] h-2 rounded-full w-[84%]" />
                </div>
                <div className="text-[11px] text-neutral-500">
                  {language === 'es' ? '42 salidas matutinas registradas' : '42 morning tee times checked-in'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F2F8F4] border border-[#E3EFE7] space-y-2">
                <div className="flex items-center justify-between font-bold text-neutral-800">
                  <span className="flex items-center gap-1.5">
                    <Dumbbell className="w-3.5 h-3.5 text-[#3B7A57]" />
                    <span>{t.modal.sportsPavilion}</span>
                  </span>
                  <span className="font-mono text-neutral-900">76%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-neutral-200/60">
                  <div className="bg-[#48BB78] h-2 rounded-full w-[76%]" />
                </div>
                <div className="text-[11px] text-neutral-500">
                  {language === 'es' ? 'Canchas de arcilla 1-4 activas toda la mañana' : 'Clay courts 1-4 active all morning'}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Shortcuts to Records Needing Attention */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Records Needing Attention */}
          <div className="bg-white rounded-[28px] border border-[#E3EFE7] shadow-xs p-6 space-y-4">
            <h2 className="font-bold text-xs uppercase tracking-wider text-neutral-400">
              {language === 'es' ? 'Registros Que Requieren Atención' : 'Records Needing Attention'}
            </h2>

            <div className="space-y-3 text-xs">
              
              {/* Shortcut 1: Conflict */}
              <div
                onClick={() => navigateTo('master_calendar')}
                className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 hover:bg-rose-100/70 transition-colors cursor-pointer space-y-1"
              >
                <div className="font-bold text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-rose-900">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>{language === 'es' ? 'Colisión de Salón en Calendario' : 'Ballroom Hold Collision'}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-600" />
                </div>
                <p className="text-[11px] text-rose-800 leading-snug">
                  {language === 'es'
                    ? 'Bloqueo de Victoria Vanderbilt coincide con Gala Sterling. Decisión requerida.'
                    : 'Victoria Vanderbilt hold conflicts with Sterling Gala. Decision needed before 18:00.'}
                </p>
              </div>

              {/* Shortcut 2: AI Review */}
              <div
                onClick={() => navigateTo('ai_review_queue')}
                className="p-4 rounded-2xl bg-[#F2F8F4] border border-[#E3EFE7] text-neutral-900 hover:bg-[#EAF4ED] transition-colors cursor-pointer space-y-1"
              >
                <div className="font-bold text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#3B7A57]">
                    <Bot className="w-3.5 h-3.5 text-[#3B7A57]" />
                    <span>{language === 'es' ? 'Exención de Clima por IA' : 'AI Weather Cancellation Waiver'}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#3B7A57]" />
                </div>
                <p className="text-[11px] text-neutral-600 leading-snug">
                  {language === 'es'
                    ? 'Charles Montgomery solicitó crédito de $180 por tormenta en Campo Norte.'
                    : 'Charles Montgomery requested $180 cart fee credit due to North Course thunderstorm alert.'}
                </p>
              </div>

              {/* Shortcut 3: Event Working File */}
              <div
                onClick={() => navigateTo('event_detail')}
                className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-black transition-colors cursor-pointer space-y-1 shadow-xs"
              >
                <div className="font-bold text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-neutral-900">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#48BB78]" />
                    <span>{language === 'es' ? 'Gala Sterling: Minuta de Montaje' : 'Sterling Gala Run of Show'}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-900" />
                </div>
                <p className="text-[11px] text-neutral-500 leading-snug">
                  {language === 'es'
                    ? 'Mesa VIP 1 confirmada. Prueba de sonido programada a las 15:30.'
                    : 'VIP Table 1 seating finalized. Soundcheck scheduled for 15:30 today.'}
                </p>
              </div>

              {/* Shortcut 4: Unread Message */}
              <div
                onClick={() => navigateTo('conversation_detail', { convId: 'conv_01' })}
                className="p-4 rounded-2xl bg-[#F2F8F4] border border-[#E3EFE7] text-neutral-900 hover:bg-[#EAF4ED] transition-colors cursor-pointer space-y-1"
              >
                <div className="font-bold text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-neutral-800">
                    <Inbox className="w-3.5 h-3.5 text-neutral-600" />
                    <span>{language === 'es' ? 'Consulta de Boda: Vanderbilt' : 'Wedding Inquiry: Vanderbilt'}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                </div>
                <p className="text-[11px] text-neutral-600 leading-snug">
                  {language === 'es'
                    ? 'Fecha de cata solicitada para el miércoles. Terraza de Palmeras propuesta.'
                    : 'Requested tasting date for Wednesday. Palm Terrace alternate proposed.'}
                </p>
              </div>

            </div>
          </div>

          {/* Quick Staff Task List */}
          <div className="bg-white rounded-[28px] border border-[#E3EFE7] shadow-xs p-6 space-y-3 text-xs">
            <h2 className="font-bold text-xs uppercase tracking-wider text-neutral-400">
              {language === 'es' ? 'Tareas del Turno por Departamento' : 'Department Shift Tasks'}
            </h2>
            <div className="space-y-2">
              {openTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="p-3 rounded-2xl border border-neutral-200/80 flex items-start gap-2.5 bg-neutral-50/50">
                  <div className="w-2 h-2 rounded-full bg-[#48BB78] mt-1.5 shrink-0" />
                  <div>
                    <div className="font-bold text-neutral-900">{task.title}</div>
                    <div className="text-[10px] text-neutral-500 font-mono">
                      {language === 'es' ? 'Asignado a' : 'Assigned to'}: {task.assignee}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
