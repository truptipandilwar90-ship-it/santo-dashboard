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
  Sparkles,
  ChevronLeft,
  X,
  TrendingUp,
  Building,
  UserCheck,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EventInquiryStage } from '../../types';

interface InquiryCard {
  id: string;
  title: string;
  stage: EventInquiryStage;
  member: string;
  memberAvatar: string;
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
  const { navigateTo, t, language, tr } = useApp();
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form state for creating a new inquiry
  const [newTitle, setNewTitle] = useState('');
  const [newMember, setNewMember] = useState('');
  const [newEventType, setNewEventType] = useState('Wedding');
  const [newVenue, setNewVenue] = useState('Grand Crystal Ballroom');
  const [newDate, setNewDate] = useState('2026-10-18');
  const [newGuestCount, setNewGuestCount] = useState(120);
  const [newEstimatedValue, setNewEstimatedValue] = useState(25000);

  const [inquiries, setInquiries] = useState<InquiryCard[]>([
    {
      id: 'ev_detailed_2026_01',
      title: 'Sterling Annual Gala & Charity Auction',
      stage: 'confirmed',
      member: 'Sir Arthur Sterling',
      memberAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      memberTier: 'Platinum Founding',
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
      memberAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
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
      memberAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
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
      memberAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
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
      memberAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      memberTier: 'Founding Member',
      eventType: 'Golf Tournament',
      venue: 'Executive Boardroom',
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
      memberAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
      memberTier: 'Platinum Founding',
      eventType: 'Private Dining',
      venue: 'Executive Boardroom',
      date: '2026-10-15',
      guestCount: 22,
      estimatedValue: 8500,
      owner: 'Eleanor Vance',
      depositStatus: 'none'
    }
  ]);

  const stages: { id: EventInquiryStage; label: string; labelEs: string; color: string; badgeBg: string }[] = [
    { id: 'inquiry', label: 'New Inquiry', labelEs: 'Nueva Solicitud', color: 'border-t-sky-500', badgeBg: 'bg-sky-50 text-sky-800 border-sky-200' },
    { id: 'quotation', label: 'Quotation Prepared', labelEs: 'Cotización Enviada', color: 'border-t-indigo-500', badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
    { id: 'deposit', label: 'Deposit Pending', labelEs: 'Depósito Pendiente', color: 'border-t-amber-500', badgeBg: 'bg-amber-50 text-amber-800 border-amber-200' },
    { id: 'confirmed', label: 'Confirmed & Contracted', labelEs: 'Confirmado y Contratado', color: 'border-t-emerald-600', badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { id: 'completed', label: 'Completed', labelEs: 'Completado', color: 'border-t-neutral-400', badgeBg: 'bg-neutral-100 text-neutral-700 border-neutral-200' },
    { id: 'closed', label: 'Closed / Archived', labelEs: 'Cerrado / Archivado', color: 'border-t-neutral-300', badgeBg: 'bg-neutral-100 text-neutral-500 border-neutral-200' }
  ];

  const filteredInquiries = inquiries.filter(inq => {
    if (typeFilter !== 'all' && inq.eventType !== typeFilter) return false;
    if (stageFilter !== 'all' && inq.stage !== stageFilter) return false;
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

  const totalValue = inquiries.reduce((acc, i) => acc + i.estimatedValue, 0);
  const confirmedValue = inquiries.filter(i => i.stage === 'confirmed' || i.stage === 'completed').reduce((acc, i) => acc + i.estimatedValue, 0);
  const pendingValue = inquiries.filter(i => i.stage === 'quotation' || i.stage === 'deposit').reduce((acc, i) => acc + i.estimatedValue, 0);

  const handleStageShift = (id: string, direction: 'prev' | 'next') => {
    const stageOrder: EventInquiryStage[] = ['inquiry', 'quotation', 'deposit', 'confirmed', 'completed', 'closed'];
    setInquiries(prev => prev.map(item => {
      if (item.id !== id) return item;
      const currentIndex = stageOrder.indexOf(item.stage);
      let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex < 0) nextIndex = 0;
      if (nextIndex >= stageOrder.length) nextIndex = stageOrder.length - 1;
      return { ...item, stage: stageOrder[nextIndex] };
    }));
  };

  const handleCreateInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newMember.trim()) return;

    const newInq: InquiryCard = {
      id: `inq_${Date.now()}`,
      title: newTitle,
      stage: 'inquiry',
      member: newMember,
      memberAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      memberTier: 'Platinum Founding',
      eventType: newEventType,
      venue: newVenue,
      date: newDate,
      guestCount: newGuestCount,
      estimatedValue: newEstimatedValue,
      owner: 'Eleanor Vance',
      depositStatus: 'pending'
    };

    setInquiries([newInq, ...inquiries]);
    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewMember('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-neutral-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#F2F8F4] text-[#3B7A57] border border-[#E3EFE7] text-[10px] font-bold tracking-tight uppercase">
              {language === 'es' ? 'Gestión de Banquetes y Eventos' : 'Banquet & Event Operations'}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
            {language === 'es' ? 'Solicitudes de Eventos y Embudo' : 'Event Inquiries & Pipeline'}
          </h1>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
            {language === 'es'
              ? 'Control integral del ciclo de vida de eventos privados: propuestas, cotizaciones, depósitos y confirmación.'
              : 'End-to-end event progression tracking across proposals, tasting quotes, holds, deposits, and confirmed contracts.'}
          </p>
        </div>

        {/* View Toggle & New Inquiry Action */}
        <div className="flex items-center gap-3 shrink-0">
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

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold text-xs transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Nueva Solicitud' : 'New Inquiry'}</span>
          </button>
        </div>
      </div>

      {/* Pipeline Performance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-[24px] border border-[#E3EFE7] shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              {language === 'es' ? 'Valor Total Embudo' : 'Total Pipeline Value'}
            </div>
            <div className="text-2xl font-black font-mono text-neutral-900">${totalValue.toLocaleString()}</div>
            <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span>{inquiries.length} {language === 'es' ? 'eventos activos' : 'active events'}</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-[24px] border border-[#E3EFE7] shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              {language === 'es' ? 'Ingreso Contratado' : 'Confirmed Revenue'}
            </div>
            <div className="text-2xl font-black font-mono text-emerald-800">${confirmedValue.toLocaleString()}</div>
            <div className="text-[10px] text-neutral-500 font-medium">
              {language === 'es' ? 'Depósito abonado y contrato firmado' : 'Deposit paid & contract executed'}
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#F2F8F4] border border-[#E3EFE7] flex items-center justify-center text-[#3B7A57]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-[24px] border border-[#E3EFE7] shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              {language === 'es' ? 'En Cotización / Depósito' : 'Pending Quotes & Holds'}
            </div>
            <div className="text-2xl font-black font-mono text-amber-800">${pendingValue.toLocaleString()}</div>
            <div className="text-[10px] text-amber-700 font-medium">
              {language === 'es' ? 'Cotizaciones enviadas a socios' : 'Proposals sent & holds active'}
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-[24px] border border-[#E3EFE7] shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              {language === 'es' ? 'Promedio por Evento' : 'Avg Event Value'}
            </div>
            <div className="text-2xl font-black font-mono text-neutral-900">
              ${Math.round(totalValue / (inquiries.length || 1)).toLocaleString()}
            </div>
            <div className="text-[10px] text-neutral-500 font-medium">
              {language === 'es' ? 'Banquete, bar y alquiler' : 'Banquet, beverage & space hire'}
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-700">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-[28px] border border-[#E3EFE7] shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative w-64 sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={language === 'es' ? 'Buscar socio, evento o espacio...' : 'Search member, event or venue...'}
              className="w-full pl-9 pr-4 py-2 rounded-full border border-neutral-300 text-xs text-neutral-800 outline-none focus:border-black focus:ring-1 focus:ring-black placeholder:text-neutral-400"
            />
          </div>

          {/* Event Type Filter */}
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
            <option value="Private Dining">{language === 'es' ? 'Cenas Privadas' : 'Private Dining'}</option>
          </select>

          {/* Stage Filter */}
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-4 py-2 rounded-full border border-neutral-300 bg-white font-medium text-neutral-800 outline-none focus:border-black focus:ring-1 focus:ring-black cursor-pointer"
          >
            <option value="all">{language === 'es' ? 'Todas las Etapas' : 'All Stages'}</option>
            {stages.map(st => (
              <option key={st.id} value={st.id}>{language === 'es' ? st.labelEs : st.label}</option>
            ))}
          </select>
        </div>

        <div className="font-mono text-neutral-500 font-semibold text-xs">
          {language === 'es' ? `Mostrando ${filteredInquiries.length} de ${inquiries.length}` : `Showing ${filteredInquiries.length} of ${inquiries.length}`}
        </div>
      </div>

      {/* Kanban Pipeline Board View */}
      {viewMode === 'kanban' && (
        <div className="flex gap-5 overflow-x-auto pb-6 pt-1 snap-x scrollbar-thin">
          {stages.map((stage) => {
            const columnItems = filteredInquiries.filter(i => i.stage === stage.id);
            return (
              <div
                key={stage.id}
                className={`bg-[#F8FAF9] rounded-[28px] p-4 sm:p-5 border border-neutral-200/90 border-t-4 ${stage.color} flex flex-col min-w-[310px] max-w-[340px] shrink-0 shadow-xs snap-start`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3.5 px-1 border-b border-neutral-200/80 mb-4">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-extrabold text-xs text-neutral-900 truncate">
                      {language === 'es' ? stage.labelEs : stage.label}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#3B7A57] bg-white px-3 py-0.5 rounded-full border border-[#E3EFE7] shadow-2xs">
                    {columnItems.length}
                  </span>
                </div>

                {/* Cards in Column */}
                <div className="space-y-4 flex-1">
                  {columnItems.length === 0 ? (
                    <div className="p-8 text-center text-xs text-neutral-400 italic bg-white/50 rounded-2xl border border-dashed border-neutral-200">
                      {language === 'es' ? 'Sin eventos en esta etapa' : 'No events in this stage'}
                    </div>
                  ) : (
                    columnItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-[20px] p-5 border border-neutral-200/90 shadow-xs hover:border-[#3B7A57] hover:shadow-md cursor-pointer transition-all space-y-4 text-xs group relative"
                      >
                        {/* Event Category Badge & Date */}
                        <div
                          onClick={() => navigateTo('event_detail', { eventId: item.id })}
                          className="space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F2F8F4] text-[#3B7A57] border border-[#E3EFE7]">
                              {tr(item.eventType)}
                            </span>
                            <span className="text-[11px] font-mono font-medium text-neutral-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-neutral-400" />
                              {item.date}
                            </span>
                          </div>
                          
                          <h3 className="font-bold text-sm text-neutral-900 group-hover:text-[#3B7A57] transition-colors leading-snug pt-0.5">
                            {item.title}
                          </h3>
                        </div>

                        {/* Member & Location Info */}
                        <div
                          onClick={() => navigateTo('event_detail', { eventId: item.id })}
                          className="space-y-2.5 pt-3 border-t border-neutral-100 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <img
                              src={item.memberAvatar}
                              alt={item.member}
                              className="w-6 h-6 rounded-full object-cover border border-neutral-200 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0">
                              <div className="font-bold text-neutral-900 truncate">{item.member}</div>
                              <div className="text-[10px] text-neutral-500 font-mono">{tr(item.memberTier)}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 text-neutral-600 text-xs bg-neutral-50 px-2.5 py-1.5 rounded-xl border border-neutral-100">
                            <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <span className="truncate font-medium">{tr(item.venue)}</span>
                          </div>

                          <div className="flex items-center justify-between text-neutral-600 font-mono text-xs pt-0.5">
                            <span className="flex items-center gap-1.5 font-medium text-neutral-700">
                              <Users className="w-3.5 h-3.5 text-neutral-400" />
                              {item.guestCount} pax
                            </span>
                            <span className="font-extrabold text-sm text-neutral-900">
                              ${item.estimatedValue.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Bottom Zone: Deposit Badge & Quick Stage Movement */}
                        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full font-mono ${
                            item.depositStatus === 'paid'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : item.depositStatus === 'pending'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                          }`}>
                            {language === 'es' ? (item.depositStatus === 'paid' ? 'Depósito Pagado' : item.depositStatus === 'pending' ? 'Depósito Pendiente' : 'Sin Depósito') : `Deposit ${item.depositStatus}`}
                          </span>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStageShift(item.id, 'prev');
                              }}
                              title={language === 'es' ? 'Mover a etapa anterior' : 'Move to previous stage'}
                              className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors cursor-pointer"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStageShift(item.id, 'next');
                              }}
                              title={language === 'es' ? 'Mover a siguiente etapa' : 'Move to next stage'}
                              className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors cursor-pointer"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-[28px] border border-[#E3EFE7] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F2F8F4] border-b border-[#E3EFE7] text-neutral-700 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">{language === 'es' ? 'Título del Evento' : 'Event Title'}</th>
                  <th className="p-4">{language === 'es' ? 'Socio Solicitante' : 'Member'}</th>
                  <th className="p-4">{language === 'es' ? 'Etapa' : 'Stage'}</th>
                  <th className="p-4">{language === 'es' ? 'Lugar' : 'Venue'}</th>
                  <th className="p-4 font-mono">{t.common.date}</th>
                  <th className="p-4 font-mono text-right">{language === 'es' ? 'Invitados' : 'Guests'}</th>
                  <th className="p-4 font-mono text-right">{language === 'es' ? 'Valor Est.' : 'Est. Value'}</th>
                  <th className="p-4">{language === 'es' ? 'Encargado' : 'Lead Owner'}</th>
                  <th className="p-4 text-center">{t.common.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredInquiries.map((item) => {
                  const stageObj = stages.find(s => s.id === item.stage) || stages[0];
                  return (
                    <tr key={item.id} className="hover:bg-[#F2F8F4]/40 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-neutral-900 text-xs">{item.title}</div>
                        <div className="text-[11px] text-neutral-500 font-medium">{tr(item.eventType)}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={item.memberAvatar}
                            alt={item.member}
                            className="w-7 h-7 rounded-full object-cover border border-neutral-200"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="font-bold text-neutral-900 text-xs">{item.member}</div>
                            <div className="text-[10px] text-neutral-500 font-mono">{tr(item.memberTier)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${stageObj.badgeBg}`}>
                          {language === 'es' ? stageObj.labelEs : stageObj.label}
                        </span>
                      </td>
                      <td className="p-4 font-medium text-neutral-800">{tr(item.venue)}</td>
                      <td className="p-4 font-mono text-neutral-600">{item.date}</td>
                      <td className="p-4 font-mono text-right text-neutral-700 font-bold">{item.guestCount} pax</td>
                      <td className="p-4 font-mono text-right font-black text-neutral-900 text-sm">
                        ${item.estimatedValue.toLocaleString()}
                      </td>
                      <td className="p-4 text-neutral-700 font-medium">{item.owner}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => navigateTo('event_detail', { eventId: item.id })}
                          className="px-3 py-1.5 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
                        >
                          {language === 'es' ? 'Ver Expediente' : 'Open Dossier'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* New Inquiry Creation Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] border border-neutral-200 shadow-2xl w-full max-w-lg p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#F2F8F4] text-[#3B7A57]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-neutral-900">
                    {language === 'es' ? 'Registrar Nueva Solicitud de Evento' : 'Register New Event Inquiry'}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {language === 'es' ? 'Ingrese los datos iniciales de la propuesta de banquete.' : 'Enter initial details for the member banquet proposal.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateInquiry} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Título del Evento' : 'Event Title'}
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={language === 'es' ? 'ej. Recepción de Boda Familia Sterling' : 'e.g. Sterling Family Autumn Wedding Reception'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    {language === 'es' ? 'Socio Solicitante' : 'Requesting Member'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                    placeholder={language === 'es' ? 'Nombre del socio' : 'Member name'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs outline-none focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    {language === 'es' ? 'Tipo de Evento' : 'Event Type'}
                  </label>
                  <select
                    value={newEventType}
                    onChange={(e) => setNewEventType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs outline-none focus:border-black focus:ring-1 focus:ring-black bg-white cursor-pointer"
                  >
                    <option value="Wedding">{language === 'es' ? 'Boda' : 'Wedding'}</option>
                    <option value="Corporate Gala">{language === 'es' ? 'Gala Corporativa' : 'Corporate Gala'}</option>
                    <option value="Executive Summit">{language === 'es' ? 'Cumbre Ejecutiva' : 'Executive Summit'}</option>
                    <option value="Anniversary">{language === 'es' ? 'Aniversario' : 'Anniversary'}</option>
                    <option value="Golf Tournament">{language === 'es' ? 'Torneo de Golf' : 'Golf Tournament'}</option>
                    <option value="Private Dining">{language === 'es' ? 'Cena Privada' : 'Private Dining'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    {language === 'es' ? 'Espacio / Salón' : 'Venue'}
                  </label>
                  <select
                    value={newVenue}
                    onChange={(e) => setNewVenue(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs outline-none focus:border-black focus:ring-1 focus:ring-black bg-white cursor-pointer"
                  >
                    <option value="Grand Crystal Ballroom">{tr('Grand Crystal Ballroom')}</option>
                    <option value="Palm Terrace & Veranda">{tr('Palm Terrace & Veranda')}</option>
                    <option value="Executive Boardroom">{tr('Executive Boardroom')}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    {language === 'es' ? 'Fecha Propuesta' : 'Proposed Date'}
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    {language === 'es' ? 'Invitados Estimados' : 'Est. Guest Count'}
                  </label>
                  <input
                    type="number"
                    value={newGuestCount}
                    onChange={(e) => setNewGuestCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs outline-none focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    {language === 'es' ? 'Valor Estimado ($)' : 'Est. Value ($)'}
                  </label>
                  <input
                    type="number"
                    value={newEstimatedValue}
                    onChange={(e) => setNewEstimatedValue(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs outline-none focus:border-black focus:ring-1 focus:ring-black font-mono font-bold"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-neutral-300 hover:bg-neutral-50 font-semibold text-neutral-700 cursor-pointer"
                >
                  {language === 'es' ? 'Cancelar' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold cursor-pointer shadow-xs"
                >
                  {language === 'es' ? 'Crear Solicitud' : 'Create Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
