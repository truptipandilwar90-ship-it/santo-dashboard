import React from 'react';
import {
  Radio,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  ExternalLink,
  ShieldCheck,
  Server,
  Layers,
  Database,
  Calendar,
  CreditCard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const IntegrationsHealthScreen: React.FC = () => {
  const { integrations, retryIntegrationSync, language } = useApp();

  const isEs = language === 'es';

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            {isEs ? 'Integraciones y Estado del Sistema' : 'Integrations & System Health'}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {isEs ? 'Estado de sincronización en tiempo real entre pasarelas de pago, base de datos del club, Google Calendar y APIs de golf.' : 'Real-time synchronization status across payment gateways, PMS club databases, Google Calendar, and golf feed APIs.'}
          </p>
        </div>

        <button
          onClick={() => {
            integrations.forEach(i => retryIntegrationSync(i.id));
            alert(isEs ? 'Sincronización bidireccional ejecutada en todos los puntos conectados.' : 'Triggered comprehensive bi-directional sync across all connected endpoints.');
          }}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>{isEs ? 'Sincronizar Todo' : 'Sync All Endpoints'}</span>
        </button>
      </div>

      {/* Grid of integration cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((int) => (
          <div
            key={int.id}
            className="bg-white rounded-[28px] border border-[#E3EFE7] shadow-xs p-6 space-y-4 text-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-2xl bg-[#F2F8F4] border border-[#E3EFE7] flex items-center justify-center text-neutral-700">
                    {int.category === 'payments' ? (
                      <CreditCard className="w-4 h-4 text-[#3B7A57]" />
                    ) : int.category === 'calendar' ? (
                      <Calendar className="w-4 h-4 text-[#3B7A57]" />
                    ) : (
                      <Database className="w-4 h-4 text-[#3B7A57]" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900">{int.serviceName}</h3>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 font-mono">
                      {isEs ? 'Categoría:' : 'Category:'} {int.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2F8F4] border border-[#E3EFE7]">
                  <span className={`w-2 h-2 rounded-full ${
                    int.status === 'healthy' ? 'bg-[#48BB78]' : 'bg-amber-500 animate-pulse'
                  }`} />
                  <span className={`text-[11px] font-bold font-mono capitalize ${
                    int.status === 'healthy' ? 'text-[#3B7A57]' : 'text-amber-800'
                  }`}>
                    {isEs ? (int.status === 'healthy' ? 'Saludable' : 'Alerta') : int.status}
                  </span>
                </div>
              </div>

              <p className="text-neutral-600 text-xs mt-3 leading-relaxed">
                {int.description}
              </p>

              <div className="mt-4 p-3.5 rounded-2xl bg-[#F2F8F4] border border-[#E3EFE7] font-mono text-[11px] space-y-1">
                <div className="flex justify-between text-neutral-500 font-sans">
                  <span>{isEs ? 'URL del Punto de Conexión:' : 'Endpoint URL:'}</span>
                  <span className="text-neutral-800 font-mono truncate max-w-[200px]">{int.endpointUrl}</span>
                </div>
                <div className="flex justify-between text-neutral-500 font-sans">
                  <span>{isEs ? 'Última Sincronización:' : 'Last Synchronization:'}</span>
                  <span className="text-neutral-900 font-bold">{int.lastSync}</span>
                </div>
                <div className="flex justify-between text-neutral-500 font-sans">
                  <span>{isEs ? 'Cola de Registros Fallidos:' : 'Failed Record Queue:'}</span>
                  <span className={`font-bold ${int.failedRecordsCount > 0 ? 'text-amber-700' : 'text-[#3B7A57]'}`}>
                    {int.failedRecordsCount} {isEs ? 'registros' : 'records'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-neutral-100">
              <span className="text-[10px] text-neutral-400">
                {isEs ? 'Reintento automático: Cada 15 minutos' : 'Automatic retry policy: Every 15 minutes'}
              </span>
              <button
                onClick={() => retryIntegrationSync(int.id)}
                className="px-4 py-1.5 rounded-full border border-neutral-300 hover:border-black hover:bg-neutral-50 text-neutral-800 font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCw className="w-3 h-3 text-neutral-600" />
                <span>{isEs ? 'Forzar Resincronización' : 'Force Resync'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
