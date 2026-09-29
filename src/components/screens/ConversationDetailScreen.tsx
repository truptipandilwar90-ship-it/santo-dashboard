import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Send,
  User,
  Clock,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Calendar,
  Building,
  Edit3,
  Archive,
  Forward,
  CornerDownLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ConversationDetailScreen: React.FC = () => {
  const {
    conversations,
    selectedConversationId,
    sendConversationReply,
    updateConversationStatus,
    navigateTo,
    currentUser,
    t,
    language,
    tr
  } = useApp();

  const conversation = conversations.find(c => c.id === selectedConversationId) || conversations[0];
  const [replyText, setReplyText] = useState(conversation?.suggestedResponse || '');
  const [internalNote, setInternalNote] = useState('');
  const [notesList, setNotesList] = useState<string[]>([
    'Member spoke with Hospitality Lead on Wednesday; highly enthusiastic about autumn wedding date.',
    'VIP father-in-law is an honorary member of St. Andrews.'
  ]);

  if (!conversation) {
    return (
      <div className="p-8 text-center text-xs text-neutral-500">
        {language === 'es' ? 'No hay conversación seleccionada.' : 'No conversation selected.'}
      </div>
    );
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    sendConversationReply(conversation.id, replyText);
    setReplyText('');
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!internalNote.trim()) return;
    setNotesList([...notesList, internalNote]);
    setInternalNote('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Bar with back button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('inbox')}
            className="p-2.5 rounded-full border border-neutral-300 hover:border-black hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
                {tr(conversation.subject)}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F2F8F4] text-[#3B7A57] border border-[#E3EFE7]">
                {tr(conversation.department)}
              </span>
            </div>
            <div className="text-xs text-neutral-500 mt-0.5 flex items-center gap-2">
              <span className="font-semibold text-neutral-800">{conversation.memberName}</span>
              <span>·</span>
              <span>{tr(conversation.memberTier)}</span>
              <span>·</span>
              <span className="font-mono">{language === 'es' ? 'Asignado a' : 'Assignee'}: {tr(conversation.assignee)}</span>
            </div>
          </div>
        </div>

        {/* Quick Conversation Actions */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => updateConversationStatus(conversation.id, 'resolved')}
            className="px-4 py-2 rounded-full border border-neutral-300 hover:border-black hover:bg-neutral-50 text-neutral-700 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#48BB78]" />
            <span>{language === 'es' ? 'Marcar Resuelta' : 'Mark Resolved'}</span>
          </button>
          <button
            onClick={() => navigateTo('event_detail')}
            className="px-4 py-2 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Building className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Planificador de Evento' : 'Open Event Planner'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Thread on Left, Context & AI on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols): Full Conversation Thread & Composer */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Thread list */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-4">
            <h2 className="font-bold text-sm text-neutral-900">{language === 'es' ? 'Historial de Comunicación' : 'Communication History'}</h2>

            <div className="space-y-4 text-xs">
              {conversation.thread.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-2xl space-y-1.5 ${
                    msg.senderType === 'member'
                      ? 'bg-neutral-50 border border-neutral-200 text-neutral-800'
                      : 'bg-emerald-950 text-white ml-6'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] opacity-75">
                    <span className="font-bold">{tr(msg.sender)}</span>
                    <span className="font-mono">{tr(msg.timestamp)}</span>
                  </div>
                  <p className="text-xs leading-relaxed whitespace-pre-wrap">{tr(msg.content)}</p>
                </div>
              ))}
            </div>

            {/* AI Suggested Response Box */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-300 space-y-2 text-xs">
              <div className="flex items-center justify-between text-emerald-900 font-bold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>{language === 'es' ? 'Respuesta Sugerida por IA (Basada en Reglas)' : 'AI Suggested Response (Grounded in Venue Rules)'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setReplyText(tr(conversation.suggestedResponse))}
                  className="text-[11px] text-emerald-800 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <CornerDownLeft className="w-3 h-3" />
                  <span>{language === 'es' ? 'Insertar en Editor' : 'Insert Into Composer'}</span>
                </button>
              </div>
              <p className="text-emerald-950 leading-relaxed italic bg-white/70 p-3 rounded-lg border border-emerald-200">
                "{tr(conversation.suggestedResponse)}"
              </p>
            </div>

            {/* Reply Composer */}
            <form onSubmit={handleSend} className="space-y-3 pt-2">
              <label className="block font-semibold text-neutral-700 text-xs">
                {language === 'es' ? `Responder a ${conversation.memberName}` : `Reply to ${conversation.memberName}`}
              </label>
              <textarea
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={language === 'es' ? 'Escriba su respuesta o edite el borrador de IA...' : 'Write your response or edit the AI suggested draft...'}
                className="w-full p-3 rounded-xl border border-neutral-300 text-xs text-neutral-800 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 leading-relaxed"
              />
              <div className="flex items-center justify-between">
                <div className="text-[11px] text-neutral-400">
                  {language === 'es' ? 'Enviando como' : 'Sending as'} <span className="font-semibold text-neutral-700">{currentUser.name}</span>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Enviar Respuesta' : 'Send Response'}</span>
                </button>
              </div>
            </form>

          </div>

          {/* Internal Staff Notes */}
          <div className="bg-white rounded-[28px] border border-[#E3EFE7] shadow-xs p-6 space-y-3 text-xs">
            <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-neutral-600" />
              <span>{language === 'es' ? 'Notas Internas Confidenciales' : 'Internal Confidential Staff Notes'}</span>
            </h3>
            
            <div className="space-y-2">
              {notesList.map((note, i) => (
                <div key={i} className="p-3 rounded-2xl bg-[#F2F8F4] border border-[#E3EFE7] text-neutral-700 leading-snug">
                  · {tr(note)}
                </div>
              ))}
            </div>

            <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
              <input
                type="text"
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                placeholder={language === 'es' ? 'Agregar nota privada para personal...' : 'Add private note for concierge or banquet captains...'}
                className="flex-1 px-4 py-2.5 rounded-full border border-neutral-300 text-xs outline-none focus:border-black focus:ring-1 focus:ring-black placeholder:text-neutral-400"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-black text-white font-semibold text-xs hover:bg-neutral-800 cursor-pointer shadow-xs"
              >
                {language === 'es' ? 'Agregar Nota' : 'Add Note'}
              </button>
            </form>
          </div>

        </div>

        {/* Right Column (5 cols): AI Summary, Extracted Requirements, Related Records */}
        <div className="lg:col-span-5 space-y-4 text-xs">
          
          {/* AI Summary Card */}
          <div className="bg-black text-white rounded-[28px] p-6 shadow-sm space-y-3 border border-neutral-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#88D49E]" />
              </div>
              <span className="font-bold text-xs uppercase tracking-wider text-[#88D49E]">
                {language === 'es' ? 'Intención y Síntesis de IA' : 'AI Intent & Synthesis'}
              </span>
            </div>
            <p className="text-neutral-200 text-xs leading-relaxed bg-neutral-900/70 p-3.5 rounded-2xl border border-neutral-800">
              {tr(conversation.aiSummary)}
            </p>
          </div>

          {/* Extracted Requirements */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-5 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-500">
              {language === 'es' ? 'Requisitos Extraídos de la Solicitud' : 'Extracted Inbound Requirements'}
            </h3>
            <div className="space-y-2">
              {conversation.extractedRequirements.map((req, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 font-medium text-neutral-800 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{tr(req)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Bookings & Financial Account */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-5 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-500">
              {language === 'es' ? 'Cuenta y Reservas del Socio' : 'Related Member Ledger & Holds'}
            </h3>
            
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1.5">
              <div className="flex items-center justify-between font-bold text-neutral-900">
                <span>{language === 'es' ? 'Bloqueo: Boda Vanderbilt' : 'Hold: Vanderbilt Wedding'}</span>
                <span className="text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded text-[10px]">{language === 'es' ? 'Bloqueo Activo' : 'Hold Active'}</span>
              </div>
              <div className="text-neutral-500 font-mono">{language === 'es' ? 'Fecha: 25 sep 2026 · Gran Salón' : 'Date: Sept 25, 2026 · Grand Crystal Ballroom'}</div>
              <div className="text-[11px] text-rose-700 font-semibold pt-1">
                {language === 'es' ? 'Nota: Coincide con bloqueo confirmado de Gala Sterling.' : 'Note: Overlaps with confirmed Sterling Gala hold.'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
              <div className="text-neutral-500">{language === 'es' ? 'Balance Actual en Club' : 'Current Club Ledger Balance'}</div>
              <div className="text-lg font-bold font-mono text-neutral-900">$2,800.00</div>
              <div className="text-[11px] text-neutral-500 font-medium">{language === 'es' ? 'Límite de Crédito: $12,000 · Al Día' : 'Credit Limit: $12,000 · In Good Standing'}</div>
            </div>

            <button
              onClick={() => navigateTo('member_directory', { memberId: conversation.memberId })}
              className="w-full py-2 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-semibold text-center transition-colors block cursor-pointer"
            >
              {language === 'es' ? 'Ver Expediente Completo' : 'View Full Member Dossier'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

