import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Phone,
  CreditCard,
  Users,
  Flag,
  Save,
  Lock,
  Bell
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const MemberProfileScreen: React.FC = () => {
  const { language, currentUser } = useApp();

  const [email, setEmail] = useState('arthur.sterling@sterlingholdings.com');
  const [phone, setPhone] = useState('+1 (809) 555-0192');
  const [address, setAddress] = useState('Av. Anacaona 88, Penthouse A, Santo Domingo');
  const [handicap, setHandicap] = useState('6.2 HI');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Banner */}
      <div className="bg-[#F2F8F4] border border-[#E3EFE7] rounded-[28px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 rounded-full border-2 border-white shadow-xs overflow-hidden shrink-0 bg-white">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase font-mono">
                {language === 'es' ? 'Socio Fundador Platino' : 'Platinum Founding Member'} #1029
              </span>
              <span className="text-xs text-neutral-500">
                {language === 'es' ? 'Socio desde Marzo 2012' : 'Member since March 2012'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Sir Arthur Sterling
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600">
              Santo Domingo Country Club · {language === 'es' ? 'Cuenta Principal' : 'Primary Member Account'}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#E3EFE7] shadow-2xs shrink-0 text-xs flex items-center gap-3">
          <div className="space-y-0.5">
            <div className="text-[10px] uppercase font-bold text-neutral-400">{language === 'es' ? 'Estado de Cuotas' : 'Dues Status'}</div>
            <div className="font-extrabold text-xs text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Al Día · Sin Saldo Pendiente' : 'In Good Standing · $0 Balance'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Edit Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h2 className="text-base font-extrabold text-neutral-900">
              {language === 'es' ? 'Datos Personales y de Contacto' : 'Personal & Contact Information'}
            </h2>
            <span className="text-xs text-neutral-400 font-mono">ID: MEM_1029</span>
          </div>

          {savedSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {language === 'es'
                  ? '¡Perfil actualizado con éxito!'
                  : 'Profile details updated successfully!'}
              </span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Nombre Completo' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value="Sir Arthur Sterling"
                  disabled
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-500 font-medium outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Número de Socio' : 'Member Account Number'}
                </label>
                <input
                  type="text"
                  value="#1029 (Platinum Founding)"
                  disabled
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-500 font-medium outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Correo Electrónico' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-[#3B7A57] outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Teléfono Directo' : 'Phone Number'}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-[#3B7A57] outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {language === 'es' ? 'Dirección Postal / Residencia' : 'Residential Address'}
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-[#3B7A57] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Handicap de Golf Official USGA' : 'Official Golf Handicap Index'}
                </label>
                <input
                  type="text"
                  value={handicap}
                  onChange={(e) => setHandicap(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-[#3B7A57] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Tee Box Preferido' : 'Preferred Golf Tee Box'}
                </label>
                <select
                  defaultValue="Blue Championship Tees"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:border-[#3B7A57] outline-none cursor-pointer"
                >
                  <option value="Black Tour Tees">Black Tour Tees (7,120 Yards)</option>
                  <option value="Blue Championship Tees">Blue Championship Tees (6,700 Yards)</option>
                  <option value="White Member Tees">White Member Tees (6,250 Yards)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-full font-bold text-xs transition-colors cursor-pointer flex items-center gap-2 mt-4"
            >
              <Save className="w-4 h-4" />
              <span>{language === 'es' ? 'Guardar Cambios de Perfil' : 'Save Profile Changes'}</span>
            </button>
          </form>
        </div>

        {/* Sidebar: Family Dependents & Billing */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-neutral-900 border-b border-neutral-100 pb-2">
              <Users className="w-4 h-4 text-[#3B7A57]" />
              <span>{language === 'es' ? 'Grupo Familiar Vinculado' : 'Linked Household Members'}</span>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-neutral-900">Victoria Sterling</div>
                  <div className="text-[10px] text-neutral-500">Cónyuge · Socio Adicional #1029-A</div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Activo</span>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-neutral-900">Arthur Sterling Jr.</div>
                  <div className="text-[10px] text-neutral-500">Dependiente Juvenil · #1029-B</div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Activo</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-neutral-900 border-b border-neutral-100 pb-2">
              <CreditCard className="w-4 h-4 text-[#3B7A57]" />
              <span>{language === 'es' ? 'Resumen de Facturación' : 'Billing & Dues'}</span>
            </div>
            <div className="space-y-2 text-neutral-600">
              <div className="flex justify-between">
                <span>{language === 'es' ? 'Cuota Mensual Platino:' : 'Monthly Platinum Dues:'}</span>
                <span className="font-bold text-neutral-900">$450.00 / mes</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'es' ? 'Próximo Corte:' : 'Next Billing Date:'}</span>
                <span className="font-semibold">01 de Octubre, 2026</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'es' ? 'Pago Automático:' : 'Auto-Pay:'}</span>
                <span className="font-bold text-emerald-700">Activado (AmEx **** 8812)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
