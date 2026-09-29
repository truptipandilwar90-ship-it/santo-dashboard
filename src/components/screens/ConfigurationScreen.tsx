import React, { useState } from 'react';
import {
  Settings,
  Clock,
  Calendar,
  AlertTriangle,
  Mail,
  DollarSign,
  CheckCircle2,
  Save,
  Bell,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ConfigurationScreen: React.FC = () => {
  const { config, updateClubConfig, language } = useApp();
  const [formData, setFormData] = useState(config);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const isEs = language === 'es';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateClubConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            {isEs ? 'Configuración Operativa del Club' : 'Club Operational Configuration'}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {isEs ? 'Horarios de servicio, horizontes de reserva por categoría, periodos de gracia de cancelación y plantillas de notificación.' : 'Clubhouse operating hours, tier booking horizons, cancellation grace periods, and automated notification templates.'}
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F2F8F4] border border-[#E3EFE7] text-[#3B7A57] text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-[#48BB78]" />
            <span>{isEs ? 'Configuración Guardada Exitosamente' : 'Configuration Saved Successfully'}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        
        {/* Operating Hours */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
            <Clock className="w-4 h-4 text-emerald-700" />
            <h2 className="font-bold text-sm text-neutral-900">{isEs ? 'Horarios de Servicio de Instalaciones' : 'Facility Operating Hours'}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
              <span className="font-bold text-neutral-800">{isEs ? 'Casa Club y Restaurante' : 'Main Clubhouse & Dining'}</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-neutral-500 font-semibold uppercase">{isEs ? 'Apertura' : 'Open'}</label>
                  <input
                    type="time"
                    value={formData.operatingHours.clubhouseOpen}
                    onChange={(e) => setFormData({
                      ...formData,
                      operatingHours: { ...formData.operatingHours, clubhouseOpen: e.target.value }
                    })}
                    className="w-full p-2 rounded-lg border border-neutral-300 bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-500 font-semibold uppercase">{isEs ? 'Cierre' : 'Close'}</label>
                  <input
                    type="time"
                    value={formData.operatingHours.clubhouseClose}
                    onChange={(e) => setFormData({
                      ...formData,
                      operatingHours: { ...formData.operatingHours, clubhouseClose: e.target.value }
                    })}
                    className="w-full p-2 rounded-lg border border-neutral-300 bg-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
              <span className="font-bold text-neutral-800">{isEs ? 'Campo de Golf de Campeonato' : 'Championship Golf Course'}</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-neutral-500 font-semibold uppercase">{isEs ? 'Apertura' : 'Open'}</label>
                  <input
                    type="time"
                    value={formData.operatingHours.golfCourseOpen}
                    onChange={(e) => setFormData({
                      ...formData,
                      operatingHours: { ...formData.operatingHours, golfCourseOpen: e.target.value }
                    })}
                    className="w-full p-2 rounded-lg border border-neutral-300 bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-500 font-semibold uppercase">{isEs ? 'Cierre' : 'Close'}</label>
                  <input
                    type="time"
                    value={formData.operatingHours.golfCourseClose}
                    onChange={(e) => setFormData({
                      ...formData,
                      operatingHours: { ...formData.operatingHours, golfCourseClose: e.target.value }
                    })}
                    className="w-full p-2 rounded-lg border border-neutral-300 bg-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
              <span className="font-bold text-neutral-800">{isEs ? 'Pabellón Deportivo y Tenis' : 'Athletic & Tennis Pavilion'}</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-neutral-500 font-semibold uppercase">{isEs ? 'Apertura' : 'Open'}</label>
                  <input
                    type="time"
                    value={formData.operatingHours.sportsPavilionOpen}
                    onChange={(e) => setFormData({
                      ...formData,
                      operatingHours: { ...formData.operatingHours, sportsPavilionOpen: e.target.value }
                    })}
                    className="w-full p-2 rounded-lg border border-neutral-300 bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-500 font-semibold uppercase">{isEs ? 'Cierre' : 'Close'}</label>
                  <input
                    type="time"
                    value={formData.operatingHours.sportsPavilionClose}
                    onChange={(e) => setFormData({
                      ...formData,
                      operatingHours: { ...formData.operatingHours, sportsPavilionClose: e.target.value }
                    })}
                    className="w-full p-2 rounded-lg border border-neutral-300 bg-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advance Booking Windows & Cancellation Penalties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <h2 className="font-bold text-sm text-neutral-900">{isEs ? 'Ventana de Reserva Anticipada (Días)' : 'Advance Booking Windows (Days)'}</h2>
            </div>

            <div className="space-y-3 font-mono">
              <div className="flex items-center justify-between">
                <span className="font-sans font-semibold text-neutral-800">{isEs ? 'Membresía Platino Fundador:' : 'Platinum Founding Tier:'}</span>
                <input
                  type="number"
                  value={formData.bookingWindows.platinumDaysAdvance}
                  onChange={(e) => setFormData({
                    ...formData,
                    bookingWindows: { ...formData.bookingWindows, platinumDaysAdvance: Number(e.target.value) }
                  })}
                  className="w-24 p-2 rounded-lg border border-neutral-300 bg-neutral-50 text-right font-bold"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="font-sans font-semibold text-neutral-800">{isEs ? 'Membresía Golf Completo y Atletismo:' : 'Full Golf & Athletic Tier:'}</span>
                <input
                  type="number"
                  value={formData.bookingWindows.goldDaysAdvance}
                  onChange={(e) => setFormData({
                    ...formData,
                    bookingWindows: { ...formData.bookingWindows, goldDaysAdvance: Number(e.target.value) }
                  })}
                  className="w-24 p-2 rounded-lg border border-neutral-300 bg-neutral-50 text-right font-bold"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="font-sans font-semibold text-neutral-800">{isEs ? 'Membresía Social Ejecutiva:' : 'Executive Social Tier:'}</span>
                <input
                  type="number"
                  value={formData.bookingWindows.socialDaysAdvance}
                  onChange={(e) => setFormData({
                    ...formData,
                    bookingWindows: { ...formData.bookingWindows, socialDaysAdvance: Number(e.target.value) }
                  })}
                  className="w-24 p-2 rounded-lg border border-neutral-300 bg-neutral-50 text-right font-bold"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <DollarSign className="w-4 h-4 text-emerald-700" />
              <h2 className="font-bold text-sm text-neutral-900">{isEs ? 'Propina, Impuestos y Tarifas de Facturación' : 'Gratuities, Tax & Billing Rates'}</h2>
            </div>

            <div className="space-y-3 font-mono">
              <div className="flex items-center justify-between">
                <span className="font-sans font-semibold text-neutral-800">{isEs ? 'Cargo de Servicio de Banquetes (%):' : 'Club Banquet Service Charge (%):'}</span>
                <input
                  type="number"
                  step="0.5"
                  value={formData.serviceChargePercent}
                  onChange={(e) => setFormData({ ...formData, serviceChargePercent: Number(e.target.value) })}
                  className="w-24 p-2 rounded-lg border border-neutral-300 bg-neutral-50 text-right font-bold"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="font-sans font-semibold text-neutral-800">{isEs ? 'Impuesto Estatal y Local (%):' : 'State & Local Tax (%):'}</span>
                <input
                  type="number"
                  step="0.05"
                  value={formData.taxPercent}
                  onChange={(e) => setFormData({ ...formData, taxPercent: Number(e.target.value) })}
                  className="w-24 p-2 rounded-lg border border-neutral-300 bg-neutral-50 text-right font-bold"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="font-sans font-semibold text-neutral-800">{isEs ? 'Depósito Requerido para Eventos (%):' : 'Required Event Deposit (%):'}</span>
                <input
                  type="number"
                  value={formData.depositRequiredPercent}
                  onChange={(e) => setFormData({ ...formData, depositRequiredPercent: Number(e.target.value) })}
                  className="w-24 p-2 rounded-lg border border-neutral-300 bg-neutral-50 text-right font-bold"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#88D49E]" />
            <span>{isEs ? 'Guardar Cambios de Configuración' : 'Save All Configuration Changes'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
