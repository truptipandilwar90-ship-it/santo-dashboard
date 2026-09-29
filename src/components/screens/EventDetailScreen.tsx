import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  DollarSign,
  CheckSquare,
  CreditCard,
  MessageSquare,
  History,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Users,
  Utensils,
  Volume2,
  Printer,
  Share2,
  Plus,
  Send,
  ArrowRight,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DetailedEvent, EventTask, EventQuoteLineItem } from '../../types';

export const EventDetailScreen: React.FC = () => {
  const {
    detailedEvent,
    updateEventDetailed,
    addEventTask,
    toggleEventTask,
    aiGenerateChecklist,
    sendEventMessage,
    approveEventQuote,
    navigateTo,
    t,
    language
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'requirements' | 'calendar' | 'proposal' | 'tasks' | 'payments' | 'messages' | 'history'
  >('requirements');

  const [showAiCopilot, setShowAiCopilot] = useState(true);
  const [replyMessage, setReplyMessage] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('Eleanor Vance');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addEventTask({
      title: newTaskTitle,
      assignee: newTaskAssignee,
      dueDate: '2026-09-25 18:00',
      completed: false,
      priority: 'medium',
      category: 'catering'
    });
    setNewTaskTitle('');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;
    sendEventMessage(replyMessage);
    setReplyMessage('');
  };

  const tabs = [
    { id: 'requirements', label: language === 'es' ? 'Requisitos' : 'Requirements', icon: Utensils },
    { id: 'calendar', label: language === 'es' ? 'Programa y Minuta' : 'Calendar & Run of Show', icon: Calendar },
    { id: 'proposal', label: language === 'es' ? 'Propuesta y Cotización' : 'Proposal & Quote', icon: DollarSign },
    { id: 'tasks', label: language === 'es' ? `Tareas (${detailedEvent.tasks.filter(t => !t.completed).length})` : `Tasks (${detailedEvent.tasks.filter(t => !t.completed).length})`, icon: CheckSquare },
    { id: 'payments', label: language === 'es' ? 'Pagos' : 'Payments', icon: CreditCard },
    { id: 'messages', label: language === 'es' ? 'Mensajes' : 'Messages', icon: MessageSquare },
    { id: 'history', label: language === 'es' ? 'Historial de Auditoría' : 'Audit History', icon: History }
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. TOP EVENT SUMMARY & STATUS WORKING FILE BANNER */}
      <div className="bg-[#F2F8F4] border border-[#E3EFE7] rounded-[32px] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-200/60">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white text-[#3B7A57] border border-[#E3EFE7]">
                {language === 'es' ? 'Expediente de Evento' : 'Event Working File'}
              </span>
              <span className="text-[10px] font-mono text-neutral-400">ID: {detailedEvent.id}</span>
              <span className="text-neutral-300">·</span>
              <span className="text-xs font-bold text-neutral-800">{detailedEvent.eventType}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {detailedEvent.title}
            </h1>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-neutral-600 mt-1.5">
              <span className="font-bold text-neutral-900">{detailedEvent.memberName}</span>
              <span>({detailedEvent.memberTier} Member)</span>
              <span>·</span>
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#3B7A57]" />
                {detailedEvent.venueName}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                {detailedEvent.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 font-mono">
                <Users className="w-3.5 h-3.5 text-neutral-400" />
                {detailedEvent.guestCount} {language === 'es' ? 'Invitados' : 'Guests'}
              </span>
            </div>
          </div>

          {/* Quick Actions & Status */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowAiCopilot(!showAiCopilot)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer border ${
                showAiCopilot
                  ? 'bg-black text-white border-black'
                  : 'bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#88D49E]" />
              <span>{showAiCopilot ? (language === 'es' ? 'Ocultar Copiloto IA' : 'Hide AI Copilot') : (language === 'es' ? 'Mostrar Copiloto IA' : 'Show AI Copilot')}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Imprimir Hoja' : 'Print Sheet'}</span>
            </button>

            {detailedEvent.stage !== 'confirmed' ? (
              <button
                onClick={approveEventQuote}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#88D49E]" />
                <span>{language === 'es' ? 'Aprobar Cotización Final' : 'Approve Final Quote'}</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#E3EFE7] text-[#3B7A57] text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#48BB78]" />
                <span>{language === 'es' ? 'Cotización Aprobada y Confirmada' : 'Quote Approved & Confirmed'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Financial Progress Metric Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
          <div>
            <div className="text-[10px] uppercase font-bold text-neutral-400">{language === 'es' ? 'Valor Contrato Total' : 'Total Contract Value'}</div>
            <div className="text-base font-extrabold font-mono text-neutral-900 mt-0.5">
              ${detailedEvent.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-neutral-400">{language === 'es' ? 'Depósito Liquidado' : 'Deposit Settled'}</div>
            <div className="text-base font-extrabold font-mono text-[#3B7A57] mt-0.5 flex items-center gap-1">
              <span>${detailedEvent.depositPaid.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#48BB78]" />
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-neutral-400">{language === 'es' ? 'Balance Pendiente' : 'Outstanding Balance'}</div>
            <div className="text-base font-extrabold font-mono text-amber-700 mt-0.5">
              ${detailedEvent.balanceDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-neutral-400">{language === 'es' ? 'Encargado del Evento' : 'Event Lead Steward'}</div>
            <div className="text-xs font-bold text-neutral-900 mt-1 truncate">
              {detailedEvent.ownerStaff}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Tabs & Optional AI Copilot Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Working Tabs Container */}
        <div className={showAiCopilot ? 'lg:col-span-8 space-y-4' : 'lg:col-span-12 space-y-4'}>
          
          {/* Tab Navigation Pill Bar */}
          <div className="bg-white p-2 rounded-full border border-[#E3EFE7] shadow-xs flex items-center gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-black text-white shadow-xs font-bold'
                      : 'text-neutral-600 hover:text-black hover:bg-[#F2F8F4]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: REQUIREMENTS */}
          {activeTab === 'requirements' && (
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-6 text-xs">
              
              <div>
                <h3 className="font-bold text-sm text-neutral-900 mb-3 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-emerald-700" />
                  <span>{language === 'es' ? 'Configuración de Espacio y Especificaciones Gastronómicas' : 'Event Setup & Dining Specifications'}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                    <span className="font-bold text-neutral-800">{language === 'es' ? 'Montaje del Salón' : 'Venue Layout Configuration'}</span>
                    <select
                      value={detailedEvent.layout}
                      onChange={(e) => updateEventDetailed({ ...detailedEvent, layout: e.target.value as any })}
                      className="w-full p-2 bg-white rounded-lg border border-neutral-300 font-medium text-neutral-800 outline-none cursor-pointer"
                    >
                      <option value="Banquet Rounds">{language === 'es' ? 'Mesas Redondas (Mesas de 10 con pista de baile)' : 'Banquet Rounds (10-top round tables with dance floor)'}</option>
                      <option value="Cocktail Reception">{language === 'es' ? 'Cóctel (Mesas altas y lounge)' : 'Cocktail Reception (High tops & lounge seating)'}</option>
                      <option value="Theater">{language === 'es' ? 'Auditorio' : 'Theater (Staged keynote seating)'}</option>
                      <option value="Boardroom">{language === 'es' ? 'Mesa Ejecutiva en U' : 'Boardroom (U-shape executive configuration)'}</option>
                    </select>
                    <p className="text-[11px] text-neutral-500">
                      {language === 'es' ? `Capacidad del Gran Salón para banquetes: hasta 280 personas. Invitados actuales: ${detailedEvent.guestCount}.` : `Grand Ballroom capacity for Banquet Rounds: up to 280 guests. Current headcount: ${detailedEvent.guestCount}.`}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                    <span className="font-bold text-neutral-800">{language === 'es' ? 'Formato de Servicio de Catering' : 'Catering Service Format'}</span>
                    <div className="p-2 bg-white rounded-lg border border-neutral-300 font-medium text-neutral-900">
                      {detailedEvent.cateringRequirements.serviceType}
                    </div>
                    <div className="text-[11px] text-neutral-600">
                      {language === 'es' ? 'Menú' : 'Menu'}: {detailedEvent.cateringRequirements.menuSelection}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dietary Restrictions List */}
              <div className="pt-2">
                <span className="font-bold text-neutral-800 block mb-2">{language === 'es' ? 'Restricciones Dietéticas Verificadas' : 'Verified Dietary Restrictions'}</span>
                <div className="flex flex-wrap gap-2">
                  {detailedEvent.cateringRequirements.dietaryRestrictions.map((diet, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold font-mono"
                    >
                      {diet}
                    </span>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>{language === 'es' ? 'Solicitudes Especiales VIP' : 'VIP Special Requests'}</span>
                </span>
                <p className="text-xs leading-relaxed text-amber-900">
                  {detailedEvent.cateringRequirements.specialRequests}
                </p>
              </div>

              {/* AV & Staging */}
              <div className="pt-2">
                <h4 className="font-bold text-neutral-800 mb-2 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-emerald-700" />
                  <span>{language === 'es' ? 'Requerimientos Audiovisuales y Escenario' : 'Audiovisual & Staging Deliverables'}</span>
                </h4>
                <div className="space-y-2">
                  {detailedEvent.avRequirements.map((av, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 font-medium text-neutral-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{av}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CALENDAR & TIMELINE */}
          {activeTab === 'calendar' && (
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-6 text-xs">
              <div>
                <h3 className="font-bold text-sm text-neutral-900 mb-1">{language === 'es' ? 'Minuta y Programa de Ejecución' : 'Run of Show Timeline'}</h3>
                <p className="text-neutral-500">{language === 'es' ? 'Cronograma maestro de producción para banquetes, proveedores y audio.' : 'Master production schedule for banquet staff, vendors, and audio technicians.'}</p>
              </div>

              <div className="relative pl-6 border-l-2 border-emerald-300 space-y-6">
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white" />
                  <div className="font-mono font-bold text-emerald-800">{detailedEvent.timeline.vendorLoadIn}</div>
                  <div className="font-semibold text-neutral-900 text-sm">{language === 'es' ? 'Ingreso y Montaje de Proveedores' : 'Vendor Load-In & Staging Rigging'}</div>
                  <div className="text-neutral-500 mt-0.5">{language === 'es' ? 'Floristas, técnicos de audio y personal de utilería.' : 'Florist Botanica Studio, AV laser technicians, and ice sculptors arrive via service bay.'}</div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white" />
                  <div className="font-mono font-bold text-emerald-800">{detailedEvent.timeline.guestArrival}</div>
                  <div className="font-semibold text-neutral-900 text-sm">{language === 'es' ? 'Llegada de Invitados y Bienvenida' : 'Red Carpet Guest Arrival & Champagne Welcome'}</div>
                  <div className="text-neutral-500 mt-0.5">{language === 'es' ? 'Recepción de valet parking activa. Copa de bienvenida en Foyer Gran Salón.' : 'Valet team on station. Passed Dom Pérignon and heirloom burrata canapés in the Grand Foyer.'}</div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white" />
                  <div className="font-mono font-bold text-emerald-800">{detailedEvent.timeline.dinnerService}</div>
                  <div className="font-semibold text-neutral-900 text-sm">{language === 'es' ? 'Servicio de Cena Gala (4 Tiempos)' : 'Plated 4-Course Gala Dinner Service'}</div>
                  <div className="text-neutral-500 mt-0.5">{language === 'es' ? 'Servicio sincronizado por capitanes de salón.' : 'Synchronized service by 12 white-glove captains. Wine pairings poured table-side.'}</div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white" />
                  <div className="font-mono font-bold text-emerald-800">{detailedEvent.timeline.eventEnd}</div>
                  <div className="font-semibold text-neutral-900 text-sm">{language === 'es' ? 'Conclusión de Subasta y Baile' : 'Charity Auction Conclusion & Dancing'}</div>
                  <div className="text-neutral-500 mt-0.5">{language === 'es' ? 'Banda de música en vivo y bocadillos nocturnos.' : 'Live 6-piece jazz ensemble transitions to DJ set. Late-night truffle bites served.'}</div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-neutral-400 border-2 border-white" />
                  <div className="font-mono font-bold text-neutral-600">{detailedEvent.timeline.teardownComplete}</div>
                  <div className="font-semibold text-neutral-900 text-sm">{language === 'es' ? 'Desmontaje y Sanitización' : 'Full Teardown & Kitchen Sanitization'}</div>
                  <div className="text-neutral-500 mt-0.5">{language === 'es' ? 'Restauración del salón para evento de la mañana.' : 'Ballroom restored for morning member brunch.'}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROPOSAL & QUOTE */}
          {activeTab === 'proposal' && (
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-6 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-neutral-900">{language === 'es' ? 'Detalle de Cotización Oficial' : 'Official Quotation Line Items'}</h3>
                  <p className="text-neutral-500">{language === 'es' ? 'Desglose facturable aprobado para Sir Arthur Sterling.' : 'Itemized billing breakdown approved for Sir Arthur Sterling.'}</p>
                </div>
                <button
                  onClick={() => alert(language === 'es' ? 'PDF de propuesta exportado.' : 'Proposal PDF export generated and saved to member folder.')}
                  className="px-3 py-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-50 font-semibold text-neutral-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Descargar PDF de Cotización' : 'Download Quotation PDF'}</span>
                </button>
              </div>

              <div className="border border-neutral-200 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-neutral-50 border-b border-neutral-200 font-bold text-neutral-700">
                    <tr>
                      <th className="p-3">{language === 'es' ? 'Descripción' : 'Description'}</th>
                      <th className="p-3 text-right">{language === 'es' ? 'Cant' : 'Qty'}</th>
                      <th className="p-3 text-right">{language === 'es' ? 'Precio Unitario' : 'Unit Price'}</th>
                      <th className="p-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 font-mono">
                    {detailedEvent.quoteItems.map((item) => (
                      <tr key={item.id} className="hover:bg-neutral-50/50">
                        <td className="p-3 font-sans font-medium text-neutral-900">{item.description}</td>
                        <td className="p-3 text-right text-neutral-600">{item.quantity}</td>
                        <td className="p-3 text-right text-neutral-600">${item.unitPrice.toLocaleString()}</td>
                        <td className="p-3 text-right font-bold text-neutral-900">${item.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Math breakdown */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2 font-mono text-right max-w-sm ml-auto">
                <div className="flex justify-between text-neutral-600 font-sans">
                  <span>Subtotal:</span>
                  <span className="font-mono">${detailedEvent.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-600 font-sans">
                  <span>{language === 'es' ? 'Cargo por Servicio (20%):' : 'Club Service Charge (20%):'}</span>
                  <span className="font-mono">${detailedEvent.serviceCharge.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-600 font-sans">
                  <span>{language === 'es' ? 'Impuestos (8.25%):' : 'State & Local Tax (8.25%):'}</span>
                  <span className="font-mono">${detailedEvent.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-neutral-900 border-t border-neutral-200 pt-2 font-sans">
                  <span>{language === 'es' ? 'Precio Total del Evento:' : 'Total Event Price:'}</span>
                  <span className="font-mono">${detailedEvent.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TASKS & STAFF */}
          {activeTab === 'tasks' && (
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-6 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-sm text-neutral-900">{language === 'es' ? 'Lista de Verificación de Tareas' : 'Event Action Checklist'}</h3>
                  <p className="text-neutral-500">{language === 'es' ? 'Asignaciones de personal y preparativos operativos.' : 'Staff assignments and critical pre-event readiness checks.'}</p>
                </div>
                <button
                  onClick={aiGenerateChecklist}
                  className="px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold hover:bg-emerald-100 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'es' ? 'Generar Lista de Tareas con IA' : 'AI Auto-Draft Prep Checklist'}</span>
                </button>
              </div>

              {/* Add task bar */}
              <form onSubmit={handleAddTask} className="flex gap-2">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder={language === 'es' ? 'Agregar tarea operativa...' : 'Add a new operational task...'}
                  className="flex-1 px-3 py-2 rounded-lg border border-neutral-300 text-neutral-800 outline-none focus:border-emerald-600"
                />
                <select
                  value={newTaskAssignee}
                  onChange={(e) => setNewTaskAssignee(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-neutral-300 bg-white font-medium cursor-pointer"
                >
                  <option value="Eleanor Vance">Eleanor Vance</option>
                  <option value="Marcus Vance (Tech)">Marcus Vance (Tech)</option>
                  <option value="Chef Laurent">Chef Laurent</option>
                  <option value="Clara Hayes">Clara Hayes</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Agregar' : 'Add'}</span>
                </button>
              </form>

              {/* Task list */}
              <div className="space-y-2">
                {detailedEvent.tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleEventTask(task.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                      task.completed
                        ? 'bg-neutral-50 border-neutral-200 text-neutral-400 line-through'
                        : 'bg-white border-neutral-200 text-neutral-800 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => {}}
                        className="rounded border-neutral-300 text-emerald-700 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                      <div>
                        <div className="font-semibold text-xs">{task.title}</div>
                        <div className="text-[11px] text-neutral-500 font-mono">
                          {language === 'es' ? 'Asignado a' : 'Assignee'}: {task.assignee} · {language === 'es' ? 'Vence' : 'Due'}: {task.dueDate}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-mono ${
                        task.priority === 'high'
                          ? 'bg-rose-100 text-rose-800'
                          : task.priority === 'medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-6 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-neutral-900">{language === 'es' ? 'Libro de Pagos y Depósitos' : 'Payment & Deposit Ledger'}</h3>
                  <p className="text-neutral-500">{language === 'es' ? 'Seguimiento de transferencias, tarjeta y balances.' : 'Track ACH wires, card charges, and outstanding balances.'}</p>
                </div>
                <button
                  onClick={() => alert(language === 'es' ? 'Enlace de pago enviado a Sir Arthur Sterling.' : 'Stripe payment link generated and emailed to Sir Arthur Sterling.')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors cursor-pointer"
                >
                  {language === 'es' ? 'Enviar Enlace de Pago de Saldo' : 'Send Balance Invoice Link'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] uppercase font-bold text-emerald-800">{language === 'es' ? 'Depósito Inicial (Liquidado)' : 'Initial Deposit (Settled)'}</span>
                  <div className="text-xl font-bold font-mono text-emerald-950 mt-1">
                    ${detailedEvent.depositPaid.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-mono mt-1">{language === 'es' ? 'Pagado el' : 'Paid'} {detailedEvent.depositPaidDate} {language === 'es' ? 'vía Transferencia' : 'via ACH Wire'}</div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] uppercase font-bold text-amber-800">{language === 'es' ? 'Saldo Final Pendiente' : 'Final Balance Due'}</span>
                  <div className="text-xl font-bold font-mono text-amber-950 mt-1">
                    ${detailedEvent.balanceDue.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-amber-700 font-mono mt-1">{language === 'es' ? 'Vence el' : 'Due'} {detailedEvent.balanceDueDate}</div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-[10px] uppercase font-bold text-neutral-600">{language === 'es' ? 'Cuenta de Socio' : 'Member Billing Account'}</span>
                  <div className="text-sm font-bold text-neutral-900 mt-1">Account #VH-00142</div>
                  <div className="text-[11px] text-neutral-500 mt-1">{language === 'es' ? 'Socio Fundador Platinum · Tarjeta Al Día' : 'Platinum Founding · High-Limit Card on File'}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-4 text-xs">
              <div>
                <h3 className="font-bold text-sm text-neutral-900">{language === 'es' ? 'Comunicaciones del Evento' : 'Member & Planner Communications'}</h3>
                <p className="text-neutral-500">{language === 'es' ? 'Mensajes directos con Sir Arthur Sterling.' : 'Direct message history between Sir Arthur Sterling and the events team.'}</p>
              </div>

              {/* Message thread */}
              <div className="space-y-3 max-h-96 overflow-y-auto p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                {detailedEvent.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3.5 rounded-xl space-y-1 ${
                      msg.senderRole === 'client'
                        ? 'bg-white border border-neutral-200 text-neutral-800 max-w-lg'
                        : msg.senderRole === 'ai'
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-950 max-w-lg ml-auto'
                        : 'bg-neutral-900 text-white max-w-lg ml-auto'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] opacity-75">
                      <span className="font-bold">{msg.sender}</span>
                      <span className="font-mono">{msg.timestamp}</span>
                    </div>
                    <p className="text-xs leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Send message form */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder={language === 'es' ? 'Escriba un mensaje para Sir Arthur...' : 'Type a message or response to Sir Arthur...'}
                  className="flex-1 px-3 py-2 rounded-lg border border-neutral-300 text-neutral-800 outline-none focus:border-emerald-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Enviar' : 'Send'}</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 7: HISTORY & AUDIT */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-4 text-xs">
              <div>
                <h3 className="font-bold text-sm text-neutral-900">{language === 'es' ? 'Registro de Auditoría de Cambios' : 'Working File Change Audit Log'}</h3>
                <p className="text-neutral-500">{language === 'es' ? 'Registro inmutable de actualizaciones de cotización y depósitos.' : 'Immutable ledger of quotation updates, deposit receipts, and headcount revisions.'}</p>
              </div>

              <div className="divide-y divide-neutral-100 border border-neutral-200 rounded-xl overflow-hidden">
                {detailedEvent.auditHistory.map((item) => (
                  <div key={item.id} className="p-3.5 flex items-start justify-between gap-4 hover:bg-neutral-50">
                    <div>
                      <div className="font-bold text-neutral-900 flex items-center gap-2">
                        <span>{item.action}</span>
                        <span className="text-[10px] font-normal text-neutral-400">por {item.staffName}</span>
                      </div>
                      <p className="text-neutral-600 text-xs mt-0.5">{item.details}</p>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400 shrink-0">{item.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* 2. DEDICATED AI COPILOT WORKING PANEL (IN LOGIN PAGE BLACK & MINT THEME) */}
        {showAiCopilot && (
          <div className="lg:col-span-4 bg-black text-white rounded-[32px] p-6 shadow-xl space-y-5 text-xs border border-neutral-800">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4 text-[#88D49E]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">{language === 'es' ? 'Copiloto IA del Evento' : 'AI Event Copilot'}</h3>
                  <p className="text-[10px] text-neutral-400">{language === 'es' ? 'Análisis continuo de riesgos y detalles' : 'Continuous brief & risk analysis'}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F2F8F4] text-[#3B7A57]">
                {t.common.active}
              </span>
            </div>

            {/* AI Summary Brief */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{language === 'es' ? 'Resumen Ejecutivo' : 'Executive Summary'}</span>
              <p className="text-neutral-200 leading-relaxed bg-neutral-900/80 p-3.5 rounded-2xl border border-neutral-800">
                {detailedEvent.aiBrief.summary}
              </p>
            </div>

            {/* Missing Details Detected */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'es' ? 'Detalles Faltantes Detectados' : 'Missing Details Flagged'}</span>
              </span>
              <div className="space-y-1.5">
                {detailedEvent.aiBrief.missingDetails.map((detail, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-amber-950/40 border border-amber-900/60 text-amber-200 text-[11px] leading-snug">
                    · {detail}
                  </div>
                ))}
              </div>
            </div>

            {/* Upsell Suggestion */}
            <div className="p-4 rounded-2xl bg-[#F2F8F4] text-neutral-900 border border-[#E3EFE7] space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3B7A57] flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-[#3B7A57]" />
                <span>{language === 'es' ? 'Oportunidad de Ingresos IA' : 'AI Revenue Opportunity'}</span>
              </span>
              <p className="text-[11px] text-neutral-700 leading-relaxed font-medium">
                {detailedEvent.aiBrief.suggestedUpsell}
              </p>
              <button
                onClick={() => {
                  sendEventMessage('AI Proposal: Would you like to add our signature Late-Night Espresso Martini Trolley ($1,200) for dancing?', true);
                }}
                className="mt-1 text-[11px] font-extrabold text-black hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{language === 'es' ? 'Sugerir al Socio' : 'Draft Suggestion to Member'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Quick Venue Alternative */}
            <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 space-y-1">
              <span className="font-bold text-white">{language === 'es' ? 'Control de Capacidad:' : 'Capacity & Space Check:'}</span>
              <p>{language === 'es' ? 'Capacidad del Gran Salón: 280 (78% ocupación con 220 invitados). Verificado.' : 'Grand Ballroom capacity: 280 (At 78% occupancy with 220 guests). Fire marshal clearance verified.'}</p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

