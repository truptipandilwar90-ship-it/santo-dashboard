import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Search,
  Plus,
  ShieldCheck,
  DollarSign,
  Key,
  CheckCircle2,
  Lock,
  Clock,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole, StaffAccount } from '../../types';

export const StaffPermissionsScreen: React.FC = () => {
  const { staffList, currentRole, switchRole, language } = useApp();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const isEs = language === 'es';

  const filteredStaff = staffList.filter(s => {
    if (roleFilter !== 'all' && s.role !== roleFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.department.toLowerCase().includes(q);
    }
    return true;
  });

  const roleMatrix: {
    role: UserRole;
    label: string;
    description: string;
    permissions: string[];
  }[] = [
    {
      role: 'front_desk',
      label: isEs ? 'Conserjería / Recepción' : 'Front Desk Concierge',
      description: isEs ? 'Ver actividad del día, atender solicitudes de socios y registrar entradas de socios e invitados.' : 'View today’s activity, handle general member requests, check in members and guests.',
      permissions: isEs 
        ? ['Ver Horario Diario', 'Registro de Jugadores', 'Consultas Generales', 'Emitir Pases de Acceso']
        : ['View Daily Schedule', 'Player Check-In', 'General Member Inquiries', 'Issue Gate Passes']
    },
    {
      role: 'events_team',
      label: isEs ? 'Equipo de Eventos' : 'Events Team',
      description: isEs ? 'Gestionar solicitudes, salones de banquetes, propuestas, listas de verif. y depósitos.' : 'Manage inquiries, banquet venues, proposals, checklists, tasks, and event deposits.',
      permissions: isEs
        ? ['Bloqueo de Salones', 'Generador de Propuestas', 'Editor de Paquetes', 'Asignación de Tareas', 'Control de Depósitos']
        : ['Banquet Hall Holds', 'Proposal Generator', 'Menu Package Editor', 'Event Task Assignment', 'Deposit Tracking']
    },
    {
      role: 'golf_sports',
      label: isEs ? 'Personal de Golf y Deportes' : 'Golf & Sports Staff',
      description: isEs ? 'Gestionar hojas de salida de golf, canchas deportivas, carritos y clases.' : 'Manage respective tee sheets, court calendars, cart assignments, and coaching check-ins.',
      permissions: isEs
        ? ['Hojas de Salida 18/9 Hoyos', 'Control de Caddies y Carritos', 'Canchas de Tenis y Pádel', 'Registro de Ritmo de Juego']
        : ['18/9 Hole Tee Sheets', 'Caddy & Cart Roster', 'Tennis & Padel Courts', 'Pace-of-Play Logging']
    },
    {
      role: 'finance',
      label: isEs ? 'Especialista en Finanzas' : 'Finance Specialist',
      description: isEs ? 'Revisar transacciones, procesar reembolsos autorizados y conciliar pagos.' : 'View transactions, issue permitted member refunds, reconcile general ledger payments.',
      permissions: isEs
        ? ['Conciliación Contable', 'Verificación de Transferencias', 'Emitir Reembolsos', 'Auditoría POS']
        : ['General Ledger Reconciliation', 'ACH Wire Verification', 'Issue Permitted Refunds', 'POS Sync Audit']
    },
    {
      role: 'manager',
      label: isEs ? 'Gerente General' : 'Club Manager',
      description: isEs ? 'Acceso a todos los departamentos, aprobación de excepciones y reportes ejecutivos.' : 'View all departments, approve schedule hold exceptions, and analyze executive reports.',
      permissions: isEs
        ? ['Acceso Total a Deptos', 'Anulación de Conflictos', 'Reportes Ejecutivos', 'Aprobación de IA']
        : ['All Department Access', 'Schedule Conflict Override', 'Executive Reports', 'AI Sign-Off']
    },
    {
      role: 'sysadmin',
      label: isEs ? 'Administrador del Sistema' : 'System Administrator',
      description: isEs ? 'Gestión de cuentas del personal, reglas de IA, integraciones y configuración.' : 'Manage staff accounts, AI rules & guardrails, integrations health, and configuration.',
      permissions: isEs
        ? ['Gestión de Roles de Personal', 'Reglas y Guardarraíles de IA', 'Claves API de POS', 'Reglas de Curfew y Seguridad']
        : ['Staff Role Provisioning', 'AI Guardrails & Fallbacks', 'POS API Keys', 'Security Curfew Rules']
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            {isEs ? 'Directorio de Personal y Matriz de Permisos' : 'Staff Directory & Role Permissions Matrix'}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {isEs ? 'Límites de acceso departamental, topes de autorización y delegación de seguridad para operaciones del club.' : 'Department access boundaries, authorization caps, and security delegation for club operations.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert(isEs ? 'Invitación enviada al correo del personal.' : 'New staff account invitation sent to directory email.')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isEs ? 'Invitar Personal' : 'Invite Staff Member'}</span>
          </button>
        </div>
      </div>

      {/* Staff Accounts List */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden text-xs">
        <div className="p-4 bg-neutral-50/80 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-bold text-neutral-800">{isEs ? 'Directorio de Cuentas de Personal' : 'Staff Accounts Directory'}</span>
            <span className="font-mono text-neutral-500">({filteredStaff.length} {isEs ? 'Miembros' : 'Members'})</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-52">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isEs ? "Buscar personal..." : "Search staff name..."}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-neutral-300 text-xs outline-none"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white text-xs outline-none"
            >
              <option value="all">{isEs ? "Todos los Roles" : "All Roles"}</option>
              <option value="manager">{isEs ? "Gerente" : "Manager"}</option>
              <option value="events_team">{isEs ? "Eventos" : "Events Team"}</option>
              <option value="golf_sports">{isEs ? "Golf y Deportes" : "Golf & Sports"}</option>
              <option value="finance">{isEs ? "Finanzas" : "Finance"}</option>
              <option value="front_desk">{isEs ? "Recepción" : "Front Desk"}</option>
              <option value="sysadmin">{isEs ? "Admin Sistema" : "System Admin"}</option>
            </select>
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-neutral-50/50 border-b border-neutral-200 text-neutral-600 font-bold">
            <tr>
              <th className="p-3.5">{isEs ? 'Nombre y Correo' : 'Staff Name & Email'}</th>
              <th className="p-3.5">{isEs ? 'Departamento' : 'Department'}</th>
              <th className="p-3.5">{isEs ? 'Rol Asignado' : 'Assigned Role'}</th>
              <th className="p-3.5 font-mono text-right">{isEs ? 'Límite Aprobación' : 'Approval Limit'}</th>
              <th className="p-3.5 font-mono">{isEs ? 'Último Acceso' : 'Last Active'}</th>
              <th className="p-3.5 text-right">{isEs ? 'Simular Rol' : 'Switch As Active'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 font-mono">
            {filteredStaff.map((staff) => (
              <tr key={staff.id} className="hover:bg-neutral-50/70 transition-colors">
                <td className="p-3.5 font-sans">
                  <div className="font-bold text-neutral-900">{staff.name}</div>
                  <div className="text-[11px] text-neutral-500 font-mono">{staff.email}</div>
                </td>
                <td className="p-3.5 font-sans text-neutral-700">{staff.department}</td>
                <td className="p-3.5 font-sans">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {staff.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-3.5 text-right font-bold text-neutral-900">
                  ${staff.approvalLimit.toLocaleString()}
                </td>
                <td className="p-3.5 text-neutral-500">{staff.lastActive}</td>
                <td className="p-3.5 text-right font-sans">
                  <button
                    onClick={() => switchRole(staff.role)}
                    className="px-3.5 py-1.5 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white text-neutral-700 font-semibold text-[11px] transition-all cursor-pointer"
                  >
                    {isEs ? 'Simular Rol' : 'Simulate Role'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role Permission Matrix Cards */}
      <div className="space-y-4">
        <h2 className="font-bold text-sm text-neutral-900">{isEs ? 'Especificaciones de Permisos por Rol' : 'System Role Permission Specifications'}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {roleMatrix.map((r) => (
            <div
              key={r.role}
              className={`p-6 rounded-[28px] border transition-all space-y-3 ${
                currentRole === r.role
                  ? 'bg-[#F2F8F4] border-black shadow-sm ring-1 ring-black'
                  : 'bg-white border-[#E3EFE7] shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-neutral-900 text-sm">{r.label}</span>
                {currentRole === r.role && (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-mono">
                    {isEs ? 'Actualmente Activo' : 'Currently Active'}
                  </span>
                )}
              </div>

              <p className="text-neutral-500 text-[11px] leading-relaxed">
                {r.description}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-neutral-100">
                <span className="text-[10px] uppercase font-bold text-neutral-400">{isEs ? 'Permisos Otorgados' : 'Granted Scopes'}</span>
                {r.permissions.map((p, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-neutral-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
