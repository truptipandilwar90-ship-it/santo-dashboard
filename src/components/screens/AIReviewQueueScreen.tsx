import React, { useState } from 'react';
import {
  Bot,
  CheckCircle2,
  XCircle,
  Edit3,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Database,
  ThumbsUp,
  ThumbsDown,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AIReviewItem } from '../../types';

export const AIReviewQueueScreen: React.FC = () => {
  const { aiReviews, approveAiReview, rejectAiReview, editAiReview, language } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>('');

  const isEs = language === 'es';

  const pendingItems = aiReviews.filter(i => i.status === 'pending');
  const resolvedItems = aiReviews.filter(i => i.status !== 'pending');

  const startEdit = (item: AIReviewItem) => {
    setEditingId(item.id);
    setEditedText(item.proposedOutput);
  };

  const saveEdit = (id: string) => {
    editAiReview(id, editedText);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
              {isEs ? 'Cola de Revisión y Aprobación Humana de IA' : 'AI Review & Human Approval Queue'}
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
              {isEs ? 'Supervisión Humana Obligatoria' : 'Human-in-the-Loop Guardrail'}
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            {isEs ? 'Revise cotizaciones, recomendaciones de salones, exoneraciones de cuotas y mensajes antes de enviarlos.' : 'Review proposed quotations, venue recommendations, fee waivers, and sensitive responses before dispatch.'}
          </p>
        </div>

        <div className="text-xs font-semibold text-neutral-500 font-mono">
          {pendingItems.length} {isEs ? 'Acciones Esperando Aprobación' : 'Actions Awaiting Staff Sign-Off'}
        </div>
      </div>

      {/* Pending Items List */}
      <div className="space-y-4">
        {pendingItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center text-xs text-neutral-500 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <div className="font-bold text-neutral-900 text-sm">{isEs ? 'Cola de Revisión Vacía' : 'Review Queue Cleared'}</div>
            <p className="text-neutral-500">{isEs ? 'Todas las respuestas y cotizaciones asistidas por IA han sido auditadas.' : 'All AI-assisted quotations and policy outputs have been audited.'}</p>
          </div>
        ) : (
          pendingItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-4 text-xs"
            >
              {/* Item Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-neutral-900">{item.title}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.2 rounded bg-neutral-100 text-neutral-700 font-mono">
                      {item.type.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    {isEs ? 'Solicitado por' : 'Requested by'} <strong>{item.requestedByMember}</strong> ({item.memberTier}) · {item.createdAt}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-neutral-500">{isEs ? 'Confianza del Modelo:' : 'Model Confidence:'}</span>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {item.confidenceScore}%
                  </span>
                </div>
              </div>

              {/* Inbound Member Prompt vs Proposed Output */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Member Input */}
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    {isEs ? 'Mensaje o Solicitud del Socio' : 'Inbound Member Request'}
                  </div>
                  <p className="text-xs text-neutral-800 leading-relaxed italic">
                    "{item.memberPrompt}"
                  </p>
                </div>

                {/* Proposed Output */}
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-300 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>{isEs ? 'Respuesta / Acción Propuesta por IA' : 'AI Proposed Response / Action'}</span>
                    </span>
                    {editingId !== item.id && (
                      <button
                        onClick={() => startEdit(item)}
                        className="text-[10px] text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>{isEs ? 'Editar Texto' : 'Edit Text'}</span>
                      </button>
                    )}
                  </div>

                  {editingId === item.id ? (
                    <div className="space-y-2">
                      <textarea
                        rows={4}
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="w-full p-2 bg-white rounded-lg border border-neutral-300 text-xs text-neutral-900 outline-none"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-2.5 py-1 rounded-md border border-neutral-300 text-[11px]"
                        >
                          {isEs ? 'Cancelar' : 'Cancel'}
                        </button>
                        <button
                          onClick={() => saveEdit(item.id)}
                          className="px-2.5 py-1 rounded-md bg-emerald-700 text-white font-semibold text-[11px]"
                        >
                          {isEs ? 'Guardar Cambios' : 'Save Changes'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-900 leading-relaxed font-sans">
                      {item.proposedOutput}
                    </p>
                  )}
                </div>

              </div>

              {/* Source Information Used */}
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                  <Database className="w-3 h-3 text-neutral-400" />
                  <span>{isEs ? 'Información de Soporte y Reglas Utilizadas' : 'Grounding Information & Policy Rules Used'}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.sourceInformationUsed.map((src, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-white border border-neutral-200 text-neutral-700 text-[11px] font-mono"
                    >
                      {src}
                    </span>
                  ))}
                </div>
              </div>

              {/* Review Controls (Approve, Edit, Reject) */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-neutral-100">
                <button
                  onClick={() => rejectAiReview(item.id)}
                  className="px-4 py-2 rounded-full border border-rose-300 hover:bg-rose-50 text-rose-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>{isEs ? 'Rechazar Propuesta' : 'Reject Proposal'}</span>
                </button>
                <button
                  onClick={() => approveAiReview(item.id)}
                  className="px-5 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#88D49E]" />
                  <span>{isEs ? 'Aprobar y Enviar al Socio' : 'Approve & Dispatch to Member'}</span>
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Resolved Audited History */}
      {resolvedItems.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-4 text-xs">
          <h2 className="font-bold text-sm text-neutral-900">{isEs ? 'Envíos Aprobados y Auditados Recientemente' : 'Recently Approved & Audited Dispatches'}</h2>
          <div className="divide-y divide-neutral-100">
            {resolvedItems.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-neutral-900">{item.title}</div>
                  <div className="text-[11px] text-neutral-500">{isEs ? 'Socio:' : 'Member:'} {item.requestedByMember}</div>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-mono ${
                  item.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {isEs ? (item.status === 'approved' ? 'aprobado' : item.status) : item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
