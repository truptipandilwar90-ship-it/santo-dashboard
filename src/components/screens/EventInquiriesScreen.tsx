import React, { useState } from 'react';
import {
  Kanban,
  List,
  Search,
  Plus,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  ChevronRight,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EventInquiryStage } from '../../types';

interface InquiryCard {
  id: string;
  title: string;
  stage: EventInquiryStage;
  member: string;
  memberTier: string;
  eventType: string;
  venue: string;
  date: string;
  guestCount: number;
  estimatedValue: number;
  owner: string;
  depositStatus: 'paid' | 'pending' | 'none';
}

export const EventInquiriesScreen: React.FC = () => {
  const { navigateTo, t, language } = useApp();
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const [inquiries, setInquiries] = useState<InquiryCard[]>([
    {
      id: 'ev_detailed_2026_01',
      title: 'Sterling Annual Gala & Charity Auction',
      stage: 'confirmed',
      member: 'Sir Arthur Sterling',
      memberTier: 'Platinum',
      eventType: 'Corporate Gala',
      venue: 'Grand Crystal Ballroom',
      date: '2026-09-25',
      guestCount: 220,
      estimatedValue: 66305,
      owner: 'Eleanor Vance',
      depositStatus: 'paid'
    },
    {
      id: 'inq_02',
      title: 'Vanderbilt Autumn Wedding Reception',
      stage: 'quotation',
      member: 'Victoria Vanderbilt',
      memberTier: 'Executive Social',
      eventType: 'Wedding',
      venue: 'Palm Terrace & Veranda',
      date: '2026-09-26',
      guestCount: 180,
      estimatedValue: 42000,
      owner: 'Julian Montgomery',
      depositStatus: 'pending'
    },
    {
      id: 'inq_03',
      title: 'BioTech Capital Leadership Summit',
      stage: 'deposit',
      member: 'Dr. Raymond Chen',
      memberTier: 'Full Athletic',
      eventType: 'Executive Summit',
      venue: 'Grand Crystal Ballroom',
      date: '2026-09-27',
      guestCount: 160,
      estimatedValue: 31500,
      owner: 'Eleanor Vance',
      depositStatus: 'pending'
    },
    {
      id: 'inq_04',
      title: 'Montague 50th Birthday Soirée',
      stage: 'confirmed',
      member: 'Lady Genevieve Montague',
      memberTier: 'Full Golf & Athletic',
      eventType: 'Anniversary',
      venue: 'Palm Terrace & Veranda',
      date: '2026-09-26',
      guestCount: 120,
      estimatedValue: 22800,
      owner: 'Julian Montgomery',
      depositStatus: 'paid'
    },
    {
      id: 'inq_05',
      title: 'Championship Golf Invitational Dinner',
      stage: 'completed',
      member: 'Tournament Committee',
      memberTier: 'Founding Member',
      eventType: 'Golf Tournament',
      venue: 'Founders Oak Boardroom',
      date: '2026-09-20',
      guestCount: 45,
      estimatedValue: 12400,
      owner: 'Coach Mateo Rossi',
      depositStatus: 'paid'
    },
    {
      id: 'inq_06',
      title: 'Heritage Wine Cellar Tasting Soirée',
      stage: 'inquiry',
      member: 'Marcus Kensington',
      memberTier: 'Platinum',
      eventType: 'Private Dining',
      venue: 'Founders Oak Boardroom',
      date: '2026-10-15',
      guestCount: 22,
      estimatedValue: 8500,
      owner: 'Eleanor Vance',
      depositStatus: 'none'
    }
  ]);

  const stages: { id: EventInquiryStage; label: string; color: string }[] = [
    { id: 'inquiry', label: language === 'es' ? 'Nueva Solicitud' : 'New Inquiry', color: 'border-t-sky-500' },
    { id: 'quotation', label: language === 'es' ? 'Cotización Preparada' : 'Quotation Prepared', color: 'border-t-indigo-500' },
    { id: 'deposit', label: language === 'es' ? 'Depósito Pendiente' : 'Deposit Pending', color: 'border-t-amber-500' },
    { id: 'confirmed', label: language === 'es' ? 'Confirmado y Contratado' : 'Confirmed & Contracted', color: 'border-t-emerald-600' },
    { id: 'completed', label: language === 'es' ? 'Completado' : 'Completed', color: 'border-t-neutral-400' },
    { id: 'closed', label: language === 'es' ? 'Cerrado / Archivado' : 'Closed / Archived', color: 'border-t-neutral-300' }
  ];

  const filteredInquiries = inquiries.filter(inq => {
    if (typeFilter !== 'all' && inq.eventType !== typeFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        inq.title.toLowerCase().includes(q) ||
        inq.member.toLowerCase().includes(q) ||
        inq.venue.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const moveStage = (id: string, nextStage: EventInquiryStage) => {
    setInquiries(prev => prev.map(item => item.id === id ? { ...item, stage: nextStage } : item));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            {language === 'es' ? 'Solicitudes de Eventos y Embudo' : 'Event Inquiries & Pipeline'}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {language === 'es' ? 'Progresión completa de eventos desde propuesta, cotización, depósito y ejecución.' : 'End-to-end event progression from member proposal through quotation, deposit payment, and execution.'}
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#F2F8F4] border border-[#E3EFE7] p-1 rounded-full text-xs font-semibold">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                viewMode === 'kanban' ? 'bg-black text-white shadow-xs font-bold' : 'text-neutral-600 hover:text-black'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Tablero Kanban' : 'Pipeline Board'}</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-black text-white shadow-xs font-bold' : 'text-neutral-600 hover:text-black'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Lista de Tabla' : 'Table List'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter controls */}
      <div className="bg-white p-4 sm:p-5 rounded-[28px] border border-[#E3EFE7] shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={language === 'es' ? 'Buscar socio, evento o espacio...' : 'Search member, event or venue...'}
              className="w-full pl-9 pr-4 py-2 rounded-full border border-neutral-300 text-xs text-neutral-800 outline-none focus:border-black focus:ring-1 focus:ring-black placeholder:text-neutral-400"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 rounded-full border border-neutral-300 bg-white font-medium text-neutral-800 outline-none focus:border-black focus:ring-1 focus:ring-black cursor-pointer"
          >
            <option value="all">{language === 'es' ? 'Todos los Tipos de Eventos' : 'All Event Types'}</option>
            <option value="Wedding">{language === 'es' ? 'Bodas' : 'Weddings'}</option>
            <option value="Corporate Gala">{language === 'es' ? 'Galas Corporativas' : 'Corporate Galas'}</option>
            <option value="Executive Summit">{language === 'es' ? 'Cumbres Ejecutivas' : 'Executive Summits'}</option>
            <option value="Anniversary">{language === 'es' ? 'Aniversarios' : 'Anniversaries'}</option>
            <option value="Golf Tournament">{language === 'es' ? 'Torneos de Golf' : 'Golf Tournaments'}</option>
          </select>
        </div>

        <div className="font-mono text-neutral-500 font-semibold">
          {language === 'es' ? 'Valor Total de Pipeline' : 'Active Pipeline Value'}: ${inquiries.reduce((acc, i) => acc + i.estimatedValue, 0).toLocaleString()}
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const columnItems = filteredInquiries.filter(i => i.stage === stage.id);
            return (
              <div
                key={stage.id}
                className={`bg-neutral-100/80 rounded-2xl p-3 border border-neutral-200/90 border-t-4 ${stage.color} flex flex-col min-w-[220px]`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 px-1">
                  <span className="font-bold text-xs text-neutral-900">{stage.label}</span>
                  <span className="font-mono text-[11px] font-bold text-neutral-500 bg-white px-2 py-0.5 rounded-full border border-neutral-200">
                    {columnItems.length}
                  </span>
                </div>

                {/* Cards in column */}
                <div className="space-y-3 flex-1">
                  {columnItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => navigateTo('event_detail', { eventId: item.id })}
                      className="bg-white rounded-xl p-3.5 border border-neutral-200/80 shadow-xs hover:border-emerald-400 hover:shadow-sm cursor-pointer transition-all space-y-2 text-xs"
                    >
                      <div className="font-bold text-xs text-neutral-900 leading-tight">
                        {item.title}
                      </div>

                      <div className="space-y-1 text-[11px] text-neutral-500">
                        <div className="font-medium text-neutral-800">{item.member}</div>
                        <div className="truncate text-emerald-800">{item.venue}</div>
                        <div className="font-mono flex items-center justify-between text-neutral-600">
                          <span>{item.date}</span>
                          <span>{item.guestCount} pax</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                        <span className="font-mono font-bold text-neutral-900">
                          ${item.estimatedValue.toLocaleString()}
                        </span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded font-mono ${
                          item.depositStatus === 'paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.depositStatus === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-neutral-100 text-neutral-500'
                        }`}>
                          {language === 'es' ? (item.depositStatus === 'paid' ? 'Depósito Pagado' : item.depositStatus === 'pending' ? 'Depósito Pendiente' : 'Sin Depósito') : `Deposit ${item.depositStatus}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table List View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-bold">
              <tr>
                <th className="p-3.5">{language === 'es' ? 'Título de Evento y Socio' : 'Event Title & Member'}</th>
                <th className="p-3.5">{language === 'es' ? 'Etapa' : 'Stage'}</th>
                <th className="p-3.5">{t.modal.facility}</th>
                <th className="p-3.5 font-mono">{t.common.date}</th>
                <th className="p-3.5 font-mono text-right">{language === 'es' ? 'Invitados' : 'Guests'}</th>
                <th className="p-3.5 font-mono text-right">{language === 'es' ? 'Valor' : 'Value'}</th>
                <th className="p-3.5">{language === 'es' ? 'Encargado' : 'Lead Owner'}</th>
                <th className="p-3.5">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredInquiries.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-neutral-900">{item.title}</div>
                    <div className="text-[11px] text-neutral-500">{item.member} · {item.memberTier}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {item.stage}
                    </span>
                  </td>
                  <td className="p-3.5 font-medium text-neutral-800">{item.venue}</td>
                  <td className="p-3.5 font-mono text-neutral-600">{item.date}</td>
                  <td className="p-3.5 font-mono text-right text-neutral-700">{item.guestCount}</td>
                  <td className="p-3.5 font-mono text-right font-bold text-neutral-900">
                    ${item.estimatedValue.toLocaleString()}
                  </td>
                  <td className="p-3.5 text-neutral-600">{item.owner}</td>
                  <td className="p-3.5">
                    <button
                      onClick={() => navigateTo('event_detail', { eventId: item.id })}
                      className="px-2.5 py-1 rounded-lg bg-neutral-900 text-white font-medium text-[11px] hover:bg-neutral-800 cursor-pointer"
                    >
                      {language === 'es' ? 'Ver Expediente' : 'Working File'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

