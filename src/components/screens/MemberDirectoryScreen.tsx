import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  UserCheck,
  CreditCard,
  Calendar,
  Phone,
  Mail,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MemberRecord } from '../../types';

export const MemberDirectoryScreen: React.FC = () => {
  const { members, selectedMemberId, navigateTo, language } = useApp();
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [activeMember, setActiveMember] = useState<MemberRecord>(
    members.find(m => m.id === selectedMemberId) || members[0]
  );

  const isEs = language === 'es';

  const filteredMembers = members.filter(m => {
    if (tierFilter !== 'all' && !m.tier.toLowerCase().includes(tierFilter.toLowerCase())) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.membershipNumber.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            {isEs ? 'Directorio de Socios y Perfiles Familiares' : 'Member Directory & Household Profiles'}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {isEs ? 'Busque en el padrón del club, revise dependientes, verifique consumos y límites de crédito.' : 'Search club roster, review family dependents, examine historical event spend, and verify credit limits.'}
          </p>
        </div>

        <div className="text-xs font-semibold text-neutral-500">
          {members.length} {isEs ? 'Hogares de Socios Registrados' : 'Registered Club Households'}
        </div>
      </div>

      {/* Main Grid: Directory on Left, Detailed Member Dossier on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (5 cols): Searchable Directory */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white p-4 sm:p-5 rounded-[28px] border border-[#E3EFE7] shadow-xs space-y-3 text-xs">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isEs ? "Buscar por nombre o # de socio..." : "Search by name or VH #..."}
                className="w-full pl-9 pr-4 py-2.5 rounded-full border border-neutral-300 text-xs outline-none focus:border-black focus:ring-1 focus:ring-black placeholder:text-neutral-400"
              />
            </div>

            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full border border-neutral-300 bg-white font-medium text-neutral-800 outline-none focus:border-black focus:ring-1 focus:ring-black cursor-pointer"
            >
              <option value="all">{isEs ? "Todas las Categorías de Membresía" : "All Membership Tiers"}</option>
              <option value="platinum">{isEs ? "Platino Fundador" : "Platinum Founding"}</option>
              <option value="golf">{isEs ? "Golf Completo y Atlético" : "Full Golf & Athletic"}</option>
              <option value="social">{isEs ? "Social Ejecutivo" : "Executive Social"}</option>
            </select>
          </div>

          <div className="bg-white rounded-[28px] border border-[#E3EFE7] shadow-xs overflow-hidden divide-y divide-neutral-100 text-xs">
            {filteredMembers.map((m) => {
              const isSelected = activeMember.id === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setActiveMember(m)}
                  className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#F2F8F4] border-l-4 border-l-black text-neutral-900 font-medium' : 'hover:bg-neutral-50'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="font-bold text-neutral-900 truncate">{m.name}</div>
                    <div className="text-[11px] font-mono text-neutral-500">{m.membershipNumber} · {m.tier}</div>
                    <div className="text-[10px] text-neutral-400">{isEs ? 'Ingresó el' : 'Joined'} {m.joinedDate}</div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-700' : 'text-neutral-400'}`} />
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column (7 cols): Full Member Profile Working Dossier */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-6 text-xs">
            
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white font-bold text-base flex items-center justify-center shadow-xs">
                  {activeMember.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-neutral-900">{activeMember.name}</h2>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {isEs ? (activeMember.status === 'Active' ? 'ACTIVO' : activeMember.status) : activeMember.status}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500 font-mono mt-0.5">
                    {activeMember.membershipNumber} · {activeMember.tier}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-neutral-400">{isEs ? 'Saldo de Cuenta' : 'Account Balance'}</div>
                <div className="text-lg font-bold font-mono text-neutral-900">
                  ${activeMember.accountBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] text-neutral-500">{isEs ? 'Límite de Crédito:' : 'Credit Limit:'} ${activeMember.creditLimit.toLocaleString()}</div>
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-400" />
                <span className="font-medium text-neutral-800 truncate">{activeMember.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-neutral-400" />
                <span className="font-mono text-neutral-800">{activeMember.phone}</span>
              </div>
            </div>

            {/* Household Family Dependents */}
            <div className="space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-neutral-500 block">
                {isEs ? 'Dependientes y Privilegios Familiares' : 'Household Dependents & Privileges'} ({activeMember.dependents.length})
              </span>
              <div className="space-y-1.5">
                {activeMember.dependents.length === 0 ? (
                  <div className="text-neutral-400 text-xs italic">{isEs ? 'No hay dependientes secundarios registrados.' : 'No secondary family dependents registered.'}</div>
                ) : (
                  activeMember.dependents.map((dep, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-800 flex items-center gap-2">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{dep}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Lifetime Activity Metrics */}
            <div className="grid grid-cols-3 gap-3 font-mono text-center">
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                <div className="text-[10px] uppercase font-sans text-neutral-500 font-bold">{isEs ? 'Gasto Histórico' : 'Lifetime Spend'}</div>
                <div className="text-base font-bold text-neutral-900 mt-1">${activeMember.lifetimeSpend.toLocaleString()}</div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                <div className="text-[10px] uppercase font-sans text-neutral-500 font-bold">{isEs ? 'Reservas' : 'Reservations'}</div>
                <div className="text-base font-bold text-neutral-900 mt-1">{activeMember.recentBookingsCount}</div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                <div className="text-[10px] uppercase font-sans text-neutral-500 font-bold">{isEs ? 'Hándicap' : 'Handicap Index'}</div>
                <div className="text-base font-bold text-emerald-700 mt-1">{activeMember.handicap ?? 'N/A'}</div>
              </div>
            </div>

            {/* Concierge Notes */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-1">
              <span className="font-bold text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>{isEs ? 'Preferencias de Conserjería y Gastronomía' : 'Concierge & Dining Preferences'}</span>
              </span>
              <p className="text-xs leading-relaxed text-amber-900">
                {activeMember.notes}
              </p>
            </div>

            {/* Member Action buttons */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => navigateTo('inbox')}
                className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs transition-colors"
              >
                {isEs ? 'Enviar Mensaje a Socio' : 'Send Member Message'}
              </button>
              <button
                onClick={() => navigateTo('payments_transactions')}
                className="px-4 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-800 font-semibold text-xs transition-colors"
              >
                {isEs ? 'Ver Estado de Cuenta' : 'View Account Ledger'}
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
