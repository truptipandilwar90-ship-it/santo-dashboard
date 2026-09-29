import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Bot,
  Users,
  Download,
  DollarSign,
  Building,
  Flag,
  Dumbbell
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReportsScreen: React.FC = () => {
  const { language } = useApp();
  const [period, setPeriod] = useState<'30d' | 'quarter' | 'year'>('30d');

  const isEs = language === 'es';

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            {isEs ? 'Analíticas y Reportes de Operaciones Ejecutivas' : 'Insights & Executive Operations Reports'}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {isEs ? 'Ocupación de salones, embudo de conversión de eventos, tiempo de respuesta del personal y precisión de la IA.' : 'Facility occupancy metrics, event conversion funnels, staff response SLAs, and AI escalation precision.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#F2F8F4] border border-[#E3EFE7] p-1 rounded-full text-xs font-semibold">
            {(['30d', 'quarter', 'year'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 rounded-full transition-all capitalize cursor-pointer ${
                  period === p ? 'bg-black text-white shadow-xs font-bold' : 'text-neutral-600 hover:text-black'
                }`}
              >
                {p === '30d' ? (isEs ? 'Últimos 30 Días' : 'Last 30 Days') : p === 'quarter' ? (isEs ? 'Trimestre Actual' : 'Current Quarter') : (isEs ? 'Año a la Fecha' : 'Year to Date')}
              </button>
            ))}
          </div>

          <button
            onClick={() => alert(isEs ? 'Reporte ejecutivo descargado.' : 'Executive analytics report downloaded.')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-300 bg-white hover:border-black hover:bg-neutral-50 text-neutral-800 text-xs font-semibold transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isEs ? 'Descargar PDF' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
        <div className="bg-white p-5 rounded-[28px] border border-[#E3EFE7] shadow-xs space-y-1">
          <span className="font-sans text-neutral-500 font-bold uppercase text-[10px]">{isEs ? 'Ocupación Promedio de Salones' : 'Average Hall Occupancy'}</span>
          <div className="text-2xl font-extrabold text-neutral-900 tracking-tight">88.4%</div>
          <div className="font-sans text-[11px] text-[#3B7A57] font-semibold">{isEs ? '+6.2% vs mes anterior' : '+6.2% vs last month'}</div>
        </div>

        <div className="bg-white p-5 rounded-[28px] border border-[#E3EFE7] shadow-xs space-y-1">
          <span className="font-sans text-neutral-500 font-bold uppercase text-[10px]">{isEs ? 'Conversión de Consultas' : 'Event Inquiry Conversion'}</span>
          <div className="text-2xl font-bold text-emerald-700">74.2%</div>
          <div className="font-sans text-[11px] text-neutral-500">{isEs ? 'Consulta a depósito pagado' : 'Inquiry to paid deposit'}</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs space-y-1">
          <span className="font-sans text-neutral-500 font-bold uppercase text-[10px]">{isEs ? 'SLA de Respuesta del Personal' : 'Staff Response SLA'}</span>
          <div className="text-2xl font-bold text-neutral-900">18.4 min</div>
          <div className="font-sans text-[11px] text-emerald-700 font-semibold">{isEs ? 'Meta: <30 min (99.2% Cumplido)' : 'Target: <30 min (99.2% Met)'}</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs space-y-1">
          <span className="font-sans text-neutral-500 font-bold uppercase text-[10px]">{isEs ? 'Precisión y Aprobación IA' : 'AI Accuracy & Sign-Off'}</span>
          <div className="text-2xl font-bold text-neutral-900">96.8%</div>
          <div className="font-sans text-[11px] text-neutral-500">{isEs ? '3.2% tasa de corrección humana' : '3.2% human correction rate'}</div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Event Inquiry Conversion Funnel */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-4 text-xs">
          <h2 className="font-bold text-sm text-neutral-900 flex items-center justify-between">
            <span>{isEs ? 'Embudo de Conversión de Eventos' : 'Event Inquiry Conversion Funnel'}</span>
            <span className="text-[10px] font-mono text-neutral-400 font-normal">{isEs ? 'Últimos 30 Días' : 'Last 30 Days'}</span>
          </h2>

          <div className="space-y-3 font-mono">
            <div className="space-y-1">
              <div className="flex justify-between font-sans">
                <span className="font-semibold text-neutral-800">{isEs ? '1. Consultas Iniciales Recibidas' : '1. Initial Inquiries Received'}</span>
                <span className="font-bold text-neutral-900 font-mono">48 {isEs ? 'consultas' : 'inquiries'} (100%)</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-800 h-2 rounded-full w-full" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-sans">
                <span className="font-semibold text-neutral-800">{isEs ? '2. Cotizaciones Enviadas' : '2. Itemized Quotations Delivered'}</span>
                <span className="font-bold text-neutral-900 font-mono">42 {isEs ? 'propuestas' : 'proposals'} (87.5%)</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-700 h-2 rounded-full w-[87.5%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-sans">
                <span className="font-semibold text-neutral-800">{isEs ? '3. Depósitos Cobrados' : '3. Deposit Invoices Paid'}</span>
                <span className="font-bold text-neutral-900 font-mono">36 {isEs ? 'depósitos' : 'deposits'} (75.0%)</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-600 h-2 rounded-full w-[75%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-sans">
                <span className="font-semibold text-neutral-800">{isEs ? '4. Eventos Ejecutados' : '4. Executed & Completed Events'}</span>
                <span className="font-bold text-neutral-900 font-mono">34 {isEs ? 'eventos' : 'events'} (70.8%)</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-2 rounded-full w-[70.8%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Cancellation Reasons Breakdown */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-4 text-xs">
          <h2 className="font-bold text-sm text-neutral-900 flex items-center justify-between">
            <span>{isEs ? 'Análisis de Cancelaciones por Categoría' : 'Cancellation Analysis by Category'}</span>
            <span className="text-[10px] font-mono text-neutral-400 font-normal">{isEs ? 'Golf y Banquetes' : 'Golf & Banquets'}</span>
          </h2>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-bold text-neutral-900">{isEs ? 'Clima y Alertas de Tormenta (Condonación Aut.)' : 'Weather & Lightning Alerts (Automatic Waiver)'}</div>
                <div className="text-[11px] text-neutral-500">{isEs ? '18 salidas reembolsadas sin recargo' : '18 tee times refunded with zero fee applied'}</div>
              </div>
              <span className="font-mono font-bold text-neutral-800 text-sm">62%</span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-bold text-neutral-900">{isEs ? 'Cambio de Horario del Socio (>24 Horas)' : 'Advance Member Schedule Change (>24 Hours)'}</div>
                <div className="text-[11px] text-neutral-500">{isEs ? '7 salidas reprogramadas sin penalidad' : '7 tee times rescheduled without penalty'}</div>
              </div>
              <span className="font-mono font-bold text-neutral-800 text-sm">24%</span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-bold text-neutral-900">{isEs ? 'Aviso Tardío / No Presentado (Con Penalidad)' : 'Late Notice / No-Show (Penalty Applied)'}</div>
                <div className="text-[11px] text-neutral-500">{isEs ? '4 reservas cobradas al 50%' : '4 bookings billed 50% green fee'}</div>
              </div>
              <span className="font-mono font-bold text-rose-700 text-sm">14%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Member Inbound Request Themes & AI Insights */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-4 text-xs">
        <h2 className="font-bold text-sm text-neutral-900">{isEs ? 'Temas de Solicitudes y Frecuencia de Escalación' : 'Member Request Topics & Escalation Frequency'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
            <span className="font-bold text-neutral-800">{isEs ? 'Bodas y Galas' : 'Wedding & Gala Inquiries'}</span>
            <div className="text-xl font-bold font-mono text-neutral-900">38%</div>
            <div className="text-[11px] text-neutral-500">{isEs ? 'Mayor generador de ingresos' : 'Highest revenue driver'}</div>
          </div>
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
            <span className="font-bold text-neutral-800">{isEs ? 'Salidas de Golf y Caddies' : 'Golf Tee Times & Caddies'}</span>
            <div className="text-xl font-bold font-mono text-neutral-900">32%</div>
            <div className="text-[11px] text-neutral-500">{isEs ? 'Respuesta más rápida (prom 4m)' : 'Fastest turnaround (avg 4m)'}</div>
          </div>
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
            <span className="font-bold text-neutral-800">{isEs ? 'Deportes de Raqueta y Clínicas' : 'Racquet Sports & Clinics'}</span>
            <div className="text-xl font-bold font-mono text-neutral-900">18%</div>
            <div className="text-[11px] text-neutral-500">{isEs ? 'Listas de espera de pádel' : 'Padel clinic waitlists'}</div>
          </div>
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
            <span className="font-bold text-neutral-800">{isEs ? 'Gastronomía y Catanas' : 'Dining & Cellar Tastings'}</span>
            <div className="text-xl font-bold font-mono text-neutral-900">12%</div>
            <div className="text-[11px] text-neutral-500">{isEs ? 'Reservas Salón Fundadores' : 'Founders Room bookings'}</div>
          </div>
        </div>
      </div>

    </div>
  );
};
