import React, { useState } from 'react';
import {
  BookOpenCheck,
  Search,
  Plus,
  Play,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Send,
  Languages,
  Filter,
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { KnowledgeRule } from '../../types';

export const KnowledgeRulesScreen: React.FC = () => {
  const { knowledgeRules, updateKnowledgeRule, addKnowledgeRule, language } = useApp();
  const [search, setSearch] = useState('');
  const [selectedRule, setSelectedRule] = useState<KnowledgeRule>(knowledgeRules[0]);

  const isEs = language === 'es';

  // Sandbox Tester state
  const [testPrompt, setTestPrompt] = useState('Can we wear denim in the Grand Ballroom for an evening dinner?');
  const [testResult, setTestResult] = useState<{
    answer: string;
    matchedRule: string;
    handedOffToStaff: boolean;
  } | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const filteredRules = knowledgeRules.filter(r => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return r.title.toLowerCase().includes(q) || r.approvedContent.toLowerCase().includes(q);
    }
    return true;
  });

  const runSimulation = () => {
    setIsTesting(true);
    setTimeout(() => {
      const q = testPrompt.toLowerCase();
      if (q.includes('denim') || q.includes('dress code') || q.includes('attire') || q.includes('vestimenta')) {
        setTestResult({
          answer: isEs 
            ? 'Se requiere camisa con cuello o cuello chino de golf en todo momento. Mezclilla, pantalones cortos deportivos y chancletas están estrictamente prohibidos en el Comedor Principal tras las 17:00.'
            : 'Collared shirts or recognized golf mock necks are required at all times. Denim, cargo shorts, and athletic flip-flops are strictly prohibited in the Main Dining Room and Crystal Ballroom after 17:00.',
          matchedRule: isEs ? 'Vestimenta de la Casa Club y Campo' : 'Clubhouse & Championship Course Attire',
          handedOffToStaff: false
        });
      } else if (q.includes('cancel') || q.includes('rain') || q.includes('weather') || q.includes('lluvia')) {
        setTestResult({
          answer: isEs
            ? 'Las cancelaciones de golf con al menos 24 horas de anticipación no conllevan cargo. Cancelaciones con menos de 24 horas sin alerta meteorológica se facturan al 50%.'
            : 'Golf cancellations made with at least 24 hours notice incur zero charge. Cancellations within 24 hours without weather advisory are billed 50% green fee.',
          matchedRule: isEs ? 'Política de Cancelación de 24 Horas' : 'Tee Time 24-Hour Notice Policy',
          handedOffToStaff: false
        });
      } else if (q.includes('contract') || q.includes('deposit') || q.includes('minimum') || q.includes('curfew') || q.includes('depósito')) {
        setTestResult({
          answer: isEs
            ? 'El horario límite de eventos es a las 00:00 medianoche. El consumo mínimo de A&B los sábados es de $18,000. Esta solicitud ha sido transferida directamente a la Dirección de Eventos Privados.'
            : 'Standard event curfew is 00:00 midnight (music ceases at 23:30). Saturday F&B minimum is $18,000. Because banquet contracts require custom quotation, this inquiry has been immediately routed to our Private Events Director.',
          matchedRule: isEs ? 'Mínimos y Horarios del Gran Salón Cristal' : 'Grand Crystal Ballroom Setup Minimums & Curfew',
          handedOffToStaff: true
        });
      } else {
        setTestResult({
          answer: isEs
            ? 'Bajo las normas de Santo Domingo Country Club, todas las consultas de socios sobre reservas son registradas y verificadas con la administración.'
            : 'Under Santo Domingo Country Club rules, all member inquiries regarding private reservations are logged and verified with club management.',
          matchedRule: isEs ? 'Reglamento General de Membresía' : 'General Membership Guidelines',
          handedOffToStaff: false
        });
      }
      setIsTesting(false);
    }, 400);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            {isEs ? 'Base de Conocimientos y Reglas de IA' : 'Knowledge Base & AI Escalation Guardrails'}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {isEs ? 'Mantenga especificaciones de salones, políticas de cancelación, código de vestimenta y reglas de transferencia al personal.' : 'Maintain verified venue specifications, cancellation policies, dress codes, and strict human handoff triggers.'}
          </p>
        </div>

        <button
          onClick={() => {
            addKnowledgeRule({
              category: 'FAQ',
              title: isEs ? 'Nueva Regla de Membresía' : 'New Member Guideline',
              approvedContent: isEs ? 'Agregue el contenido de la regla aquí...' : 'Add approved policy content here...',
              mustHandOffToStaff: false,
              triggerKeywords: ['policy', 'rule'],
              languages: ['English', 'Español'],
              lastUpdated: '2026-09-25',
              updatedBy: 'Staff Admin'
            });
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{isEs ? 'Nueva Regla' : 'New Knowledge Policy'}</span>
        </button>
      </div>

      {/* Main Grid: Rules Editor on Left, Live Simulator Sandbox on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left (7 cols): Knowledge Rules Directory & Editor */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs text-xs">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isEs ? "Buscar reglas y políticas aprobadas del club..." : "Search approved club rules and policies..."}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 text-xs outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredRules.map((rule) => {
              const isSelected = selectedRule.id === rule.id;
              return (
                <div
                  key={rule.id}
                  onClick={() => setSelectedRule(rule)}
                  className={`bg-white rounded-2xl border p-5 cursor-pointer transition-all space-y-3 text-xs ${
                    isSelected ? 'border-emerald-500 ring-2 ring-emerald-100 shadow-sm' : 'border-neutral-200/80 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-900 text-sm">{rule.title}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.2 rounded bg-neutral-100 text-neutral-700 font-mono">
                        {rule.category}
                      </span>
                    </div>

                    {rule.mustHandOffToStaff ? (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded flex items-center gap-1 font-mono">
                        <ShieldAlert className="w-3 h-3" />
                        {isEs ? 'Transferencia Obligatoria' : 'Staff Handoff Enforced'}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-3 h-3" />
                        {isEs ? 'Respuesta IA Permitida' : 'Autonomous Reply Permitted'}
                      </span>
                    )}
                  </div>

                  <p className="text-neutral-700 text-xs leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                    {rule.approvedContent}
                  </p>

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-neutral-400 font-mono">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-sans text-neutral-500 font-semibold">{isEs ? 'Desencadenantes:' : 'Triggers:'}</span>
                      {rule.triggerKeywords.slice(0, 3).map((kw, i) => (
                        <span key={i} className="bg-neutral-100 text-neutral-700 px-1.5 py-0.2 rounded">
                          {kw}
                        </span>
                      ))}
                    </div>
                    <span>{isEs ? 'Actualizado el' : 'Updated'} {rule.lastUpdated} {isEs ? 'por' : 'by'} {rule.updatedBy}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right (5 cols): Test an Answer Sandbox Simulator (CRITICAL REQUIREMENT) */}
        <div className="lg:col-span-5 space-y-4 text-xs">
          
          <div className="bg-neutral-900 text-white rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                  <Play className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{isEs ? 'Simulador de Respuestas de IA' : 'AI Policy Test Sandbox'}</h3>
                  <p className="text-[10px] text-neutral-400">{isEs ? 'Pruebe una respuesta antes de publicar cambios' : 'Test an answer before publishing changes'}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-emerald-400 font-semibold">
                {isEs ? 'Simulador en Vivo' : 'Live Simulator'}
              </span>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                {isEs ? 'Pregunta Simulada del Socio' : 'Simulated Member Query'}
              </label>
              <textarea
                rows={3}
                value={testPrompt}
                onChange={(e) => setTestPrompt(e.target.value)}
                placeholder={isEs ? "Escriba cualquier pregunta de un socio para probar la respuesta de IA..." : "Type any member question to test knowledge grounding..."}
                className="w-full p-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>

            <button
              onClick={runSimulation}
              disabled={isTesting}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isTesting ? (isEs ? 'Simulando Motor...' : 'Simulating Engine...') : (isEs ? 'Ejecutar Simulación' : 'Run Simulation')}</span>
            </button>

            {testResult && (
              <div className="pt-4 border-t border-neutral-800 space-y-3 animate-in fade-in">
                <div className="p-3.5 rounded-xl bg-neutral-800/80 border border-neutral-700 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-neutral-400">{isEs ? 'Regla Coincidente:' : 'Matched Policy:'}</span>
                    <span className="font-bold text-emerald-400">{testResult.matchedRule}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-neutral-400">{isEs ? 'Escalación a Personal:' : 'Staff Escalation:'}</span>
                    <span className={`font-bold ${testResult.handedOffToStaff ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {testResult.handedOffToStaff ? (isEs ? 'Transferencia Obligatoria' : 'Mandatory Hand-Off') : (isEs ? 'Respuesta Directa de IA' : 'Direct AI Response')}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-800/90 border border-neutral-700 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-neutral-400">
                    {isEs ? 'Respuesta Generada al Socio' : 'Generated Member Output'}
                  </div>
                  <p className="text-xs text-neutral-200 leading-relaxed font-sans">
                    {testResult.answer}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-2">
            <span className="font-bold text-xs uppercase tracking-wider text-neutral-500 block">
              {isEs ? 'Soporte Multilingüe' : 'Multi-Language Support'}
            </span>
            <p className="text-neutral-600 text-xs leading-relaxed">
              {isEs ? 'Las reglas del club se traducen y formatean automáticamente para nuestros socios internacionales en español e inglés.' : 'Approved club policies are automatically translated and formatted for our international members in English, Spanish, and French.'}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
