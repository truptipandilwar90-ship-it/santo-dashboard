import React, { useState } from 'react';
import {
  Inbox,
  Filter,
  Search,
  MessageSquare,
  AlertCircle,
  Clock,
  User,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Tag,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ConversationItem } from '../../types';

export const UnifiedInboxScreen: React.FC = () => {
  const { conversations, navigateTo, updateConversationStatus, t, language } = useApp();

  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredConversations = conversations.filter(c => {
    if (deptFilter !== 'all' && c.department !== deptFilter) return false;
    if (urgencyFilter !== 'all' && c.urgency !== urgencyFilter) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.memberName.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getUrgencyBadge = (urgency: ConversationItem['urgency']) => {
    switch (urgency) {
      case 'urgent':
        return <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200">{language === 'es' ? 'Urgente' : 'Urgent'}</span>;
      case 'high':
        return <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">{language === 'es' ? 'Alta' : 'High'}</span>;
      case 'medium':
        return <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">{language === 'es' ? 'Media' : 'Medium'}</span>;
      case 'low':
        return <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">{language === 'es' ? 'Baja' : 'Low'}</span>;
    }
  };

  const getStatusBadge = (status: ConversationItem['status']) => {
    switch (status) {
      case 'open':
        return <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">{language === 'es' ? 'Abierta' : 'Open'}</span>;
      case 'pending_staff':
        return <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">{language === 'es' ? 'Requiere Respuesta' : 'Needs Reply'}</span>;
      case 'ai_drafted':
        return <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#F2F8F4] text-[#3B7A57] border border-[#E3EFE7] flex items-center gap-1"><Sparkles className="w-3 h-3 text-[#48BB78]" /> {language === 'es' ? 'Borrador IA Listo' : 'AI Draft Ready'}</span>;
      case 'resolved':
        return <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">{language === 'es' ? 'Resuelta' : 'Resolved'}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            {language === 'es' ? 'Bandeja Unificada de Socios' : 'Unified Member Inbox'}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {language === 'es' ? 'Solicitudes consolidadas de eventos privados, salidas de golf, canchas deportivas y conserjería.' : 'Consolidated requests across private events, golf tee reservations, court bookings, and concierge dining.'}
          </p>
        </div>

        <div className="text-xs font-semibold text-neutral-500">
          {language === 'es' ? `Mostrando ${filteredConversations.length} de ${conversations.length} consultas` : `Showing ${filteredConversations.length} of ${conversations.length} inquiries`}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-[28px] border border-[#E3EFE7] shadow-xs space-y-3 text-xs">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={language === 'es' ? 'Buscar socio, asunto o mensaje...' : 'Search member, subject, or text...'}
              className="w-full pl-9 pr-4 py-2.5 rounded-full border border-neutral-300 text-xs text-neutral-800 outline-none focus:border-black focus:ring-1 focus:ring-black bg-white placeholder:text-neutral-400"
            />
          </div>

          {/* Department */}
          <div>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full border border-neutral-300 bg-white font-medium text-neutral-800 outline-none focus:border-black focus:ring-1 focus:ring-black cursor-pointer"
            >
              <option value="all">{language === 'es' ? 'Todos los Departamentos' : 'All Departments'}</option>
              <option value="Events">{language === 'es' ? 'Eventos Privados' : 'Private Events'}</option>
              <option value="Golf">{language === 'es' ? 'Operaciones de Golf' : 'Golf Operations'}</option>
              <option value="Sports">{language === 'es' ? 'Deportes de Raqueta' : 'Racquet Sports'}</option>
              <option value="Billing">{language === 'es' ? 'Facturación del Club' : 'Club Billing'}</option>
            </select>
          </div>

          {/* Urgency */}
          <div>
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full border border-neutral-300 bg-white font-medium text-neutral-800 outline-none focus:border-black focus:ring-1 focus:ring-black cursor-pointer"
            >
              <option value="all">{language === 'es' ? 'Todos los Niveles de Urgencia' : 'All Urgency Levels'}</option>
              <option value="urgent">{language === 'es' ? 'Urgente' : 'Urgent'}</option>
              <option value="high">{language === 'es' ? 'Alta Prioridad' : 'High Priority'}</option>
              <option value="medium">{language === 'es' ? 'Media' : 'Medium'}</option>
              <option value="low">{language === 'es' ? 'Baja' : 'Low'}</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full border border-neutral-300 bg-white font-medium text-neutral-800 outline-none focus:border-black focus:ring-1 focus:ring-black cursor-pointer"
            >
              <option value="all">{language === 'es' ? 'Todos los Estados' : 'All Statuses'}</option>
              <option value="pending_staff">{language === 'es' ? 'Requiere Respuesta' : 'Needs Reply'}</option>
              <option value="ai_drafted">{language === 'es' ? 'Borrador IA Listo' : 'AI Draft Ready'}</option>
              <option value="open">{language === 'es' ? 'Abierta' : 'Open'}</option>
              <option value="resolved">{language === 'es' ? 'Resuelta' : 'Resolved'}</option>
            </select>
          </div>
        </div>

      </div>

      {/* Conversations List */}
      <div className="bg-white rounded-[28px] border border-[#E3EFE7] shadow-xs overflow-hidden divide-y divide-neutral-100">
        {filteredConversations.length === 0 ? (
          <div className="p-12 text-center text-xs text-neutral-500">
            {language === 'es' ? 'No hay consultas que coincidan con los filtros seleccionados.' : 'No inquiries match your current filter selections.'}
          </div>
        ) : (
          filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => navigateTo('conversation_detail', { convId: conv.id })}
              className={`p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-colors ${
                conv.unread ? 'bg-emerald-50/30 hover:bg-emerald-50/60' : 'hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <img
                  src={conv.memberAvatar}
                  alt={conv.memberName}
                  className="w-10 h-10 rounded-full object-cover shrink-0 border border-neutral-200"
                  referrerPolicy="no-referrer"
                />
                
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-xs text-neutral-900">{conv.memberName}</span>
                    <span className="text-[11px] text-neutral-500 font-medium font-mono">({conv.memberTier})</span>
                    <span className="text-neutral-300">·</span>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded">
                      {conv.department}
                    </span>
                    {getUrgencyBadge(conv.urgency)}
                    {getStatusBadge(conv.status)}
                  </div>

                  <div className="font-semibold text-xs text-neutral-800 truncate">
                    {conv.subject}
                  </div>

                  <p className="text-xs text-neutral-500 truncate max-w-xl">
                    {conv.lastMessage}
                  </p>

                  {/* AI Quick Insight Tag */}
                  <div className="pt-1 flex items-center gap-1.5 text-[11px] text-emerald-900 font-medium">
                    <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate italic">{language === 'es' ? 'Resumen de IA' : 'AI Summary'}: {conv.aiSummary}</span>
                  </div>
                </div>
              </div>

              {/* Right Zone: Assignee & Time */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center text-xs text-neutral-500 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                <span className="font-mono text-[11px] text-neutral-400">{conv.lastUpdated}</span>
                <span className="text-[11px] font-medium text-neutral-700 mt-1">{language === 'es' ? 'Asignado a' : 'Assignee'}: {conv.assignee}</span>
                <div className="hidden sm:flex items-center gap-1 text-emerald-700 font-semibold text-[11px] mt-1 hover:underline">
                  <span>{language === 'es' ? 'Ver Conversación' : 'Open Thread'}</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

