import React, { useState } from 'react';
import {
  CreditCard,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  FileText,
  DollarSign,
  Download,
  Calendar,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PaymentTransaction } from '../../types';
import { ReceiptModal } from '../modals/ReceiptModal';

export const PaymentsTransactionsScreen: React.FC = () => {
  const { payments, reconcilePayment, issueRefund, currentRole, language } = useApp();
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentTransaction | null>(null);
  const [serviceFilter, setServiceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const isEs = language === 'es';

  const filteredPayments = payments.filter(p => {
    if (serviceFilter !== 'all' && p.serviceCategory !== serviceFilter) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.memberName.toLowerCase().includes(q) ||
        p.transactionNumber.toLowerCase().includes(q) ||
        p.paymentMethod.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalCollected = payments
    .filter(p => p.status === 'Completed')
    .reduce((acc, p) => acc + p.amount, 0);

  const pendingReconciliationCount = payments.filter(p => !p.reconciled).length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            {isEs ? 'Pagos, Depósitos y Conciliación' : 'Payments, Deposits & Reconciliation'}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {isEs ? 'Transacciones del libro mayor entre depósitos de banquetes, green fees de golf, reservas de canchas y cuotas de socios.' : 'General ledger transactions across event catering deposits, golf tee fees, athletic court bookings, and member account dues.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert(isEs ? 'Transacciones exportadas en formato CSV.' : 'General Ledger transactions exported as CSV.')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-300 bg-white hover:border-black hover:bg-neutral-50 text-neutral-800 text-xs font-semibold transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isEs ? 'Exportar CSV' : 'Export CSV'}</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
        <div className="bg-white p-6 rounded-[28px] border border-[#E3EFE7] shadow-xs space-y-1">
          <span className="font-sans text-neutral-500 font-bold uppercase text-[10px]">{isEs ? 'Total Ingresos Liquidados' : 'Total Settled Revenue'}</span>
          <div className="text-2xl font-extrabold text-neutral-900 tracking-tight">
            ${totalCollected.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="font-sans text-[11px] text-[#3B7A57] font-semibold">{isEs ? 'Todos los servicios ciclo actual' : 'All services current cycle'}</div>
        </div>

        <div className="bg-white p-6 rounded-[28px] border border-[#E3EFE7] shadow-xs space-y-1">
          <span className="font-sans text-neutral-500 font-bold uppercase text-[10px]">{isEs ? 'Estado de Conciliación' : 'Ledger Reconciliation Status'}</span>
          <div className="text-2xl font-extrabold text-neutral-900 tracking-tight">
            {pendingReconciliationCount === 0 ? (isEs ? '100% Sincronizado' : '100% Synced') : `${pendingReconciliationCount} ${isEs ? 'Pendientes' : 'Pending'}`}
          </div>
          <div className="font-sans text-[11px] text-neutral-500">{isEs ? 'Auditoría automatizada de POS' : 'Nightly POS audit automated'}</div>
        </div>

        <div className="bg-white p-6 rounded-[28px] border border-[#E3EFE7] shadow-xs space-y-1">
          <span className="font-sans text-neutral-500 font-bold uppercase text-[10px]">{isEs ? 'Mayor Depósito de Evento' : 'Largest Event Deposit'}</span>
          <div className="text-2xl font-extrabold text-[#3B7A57] tracking-tight">$20,000.00</div>
          <div className="font-sans text-[11px] text-neutral-500">Sir Arthur Sterling Gala</div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-[28px] border border-[#E3EFE7] shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isEs ? "Buscar socio, # de txn o tarjeta..." : "Search member, txn # or card..."}
              className="w-full pl-9 pr-4 py-2 rounded-full border border-neutral-300 text-xs text-neutral-800 outline-none focus:border-black focus:ring-1 focus:ring-black placeholder:text-neutral-400"
            />
          </div>

          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-4 py-2 rounded-full border border-neutral-300 bg-white font-medium text-neutral-800 outline-none focus:border-black focus:ring-1 focus:ring-black cursor-pointer"
          >
            <option value="all">{isEs ? "Todas las Categorías de Servicio" : "All Service Categories"}</option>
            <option value="Event Deposit">{isEs ? "Depósitos de Eventos" : "Event Deposits"}</option>
            <option value="Golf Green Fee">{isEs ? "Green Fees de Golf" : "Golf Green Fees"}</option>
            <option value="Court Booking">{isEs ? "Canchas Deportivas" : "Athletic Courts"}</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-full border border-neutral-300 bg-white font-medium text-neutral-800 outline-none focus:border-black focus:ring-1 focus:ring-black cursor-pointer"
          >
            <option value="all">{isEs ? "Todos los Estados" : "All Statuses"}</option>
            <option value="Completed">{isEs ? "Completado" : "Completed"}</option>
            <option value="Pending">{isEs ? "Pendiente" : "Pending"}</option>
            <option value="Refunded">{isEs ? "Reembolsado" : "Refunded"}</option>
          </select>
        </div>

        <div className="text-neutral-500 font-semibold text-xs">
          {isEs ? `Mostrando ${filteredPayments.length} de ${payments.length} transacciones` : `Showing ${filteredPayments.length} of ${payments.length} transactions`}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-50 border-b border-neutral-200 font-bold text-neutral-700">
            <tr>
              <th className="p-3.5 font-mono">{isEs ? 'Txn #' : 'Txn #'}</th>
              <th className="p-3.5 font-mono">{isEs ? 'Fecha' : 'Date'}</th>
              <th className="p-3.5">{isEs ? 'Cuenta de Socio' : 'Member Account'}</th>
              <th className="p-3.5">{isEs ? 'Categoría de Servicio' : 'Service Category'}</th>
              <th className="p-3.5 font-mono text-right">{isEs ? 'Monto' : 'Amount'}</th>
              <th className="p-3.5">{isEs ? 'Método de Pago' : 'Payment Method'}</th>
              <th className="p-3.5 text-center">{isEs ? 'Estado' : 'Status'}</th>
              <th className="p-3.5 text-right">{isEs ? 'Acciones' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 font-mono">
            {filteredPayments.map((p) => (
              <tr key={p.id} className="hover:bg-neutral-50/70 transition-colors">
                <td className="p-3.5 font-bold text-neutral-900">{p.transactionNumber}</td>
                <td className="p-3.5 text-neutral-600">{p.date}</td>
                <td className="p-3.5 font-sans font-semibold text-neutral-800">{p.memberName}</td>
                <td className="p-3.5 font-sans font-medium text-neutral-700">{p.serviceCategory}</td>
                <td className="p-3.5 font-bold text-right text-neutral-900 font-mono">
                  ${p.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="p-3.5 font-sans text-neutral-600 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{p.paymentMethod}</span>
                </td>
                <td className="p-3.5 text-center font-sans">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-mono ${
                    p.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : p.status === 'Pending'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {isEs ? (p.status === 'Completed' ? 'Completado' : p.status === 'Pending' ? 'Pendiente' : 'Reembolsado') : p.status}
                  </span>
                </td>
                <td className="p-3.5 text-right font-sans space-x-1.5">
                  <button
                    onClick={() => setSelectedReceipt(p)}
                    className="px-2.5 py-1 rounded-lg border border-neutral-300 hover:bg-neutral-100 text-neutral-800 font-semibold text-[11px] transition-colors"
                  >
                    {isEs ? 'Recibo' : 'Receipt'}
                  </button>

                  {!p.reconciled && (
                    <button
                      onClick={() => reconcilePayment(p.id)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-[11px] transition-colors"
                    >
                      {isEs ? 'Conciliar' : 'Reconcile'}
                    </button>
                  )}

                  {p.status === 'Completed' && (currentRole === 'finance' || currentRole === 'manager') && (
                    <button
                      onClick={() => {
                        if (confirm(isEs ? `¿Autorizar reembolso de $${p.amount} a ${p.memberName}?` : `Authorize refund of $${p.amount} to ${p.memberName}?`)) {
                          issueRefund(p.id);
                        }
                      }}
                      className="px-2.5 py-1 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 font-semibold text-[11px] transition-colors"
                    >
                      {isEs ? 'Reembolsar' : 'Refund'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Official Receipt Modal */}
      <ReceiptModal
        transaction={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
      />

    </div>
  );
};
