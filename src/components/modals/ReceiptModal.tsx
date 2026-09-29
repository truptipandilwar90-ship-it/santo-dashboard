import React from 'react';
import { X, Printer, CheckCircle, Download, CreditCard } from 'lucide-react';
import { PaymentTransaction } from '../../types';
import { SantoDomingoLogo } from '../common/SantoDomingoLogo';
import { useApp } from '../../context/AppContext';

export const ReceiptModal: React.FC<{
  transaction: PaymentTransaction | null;
  onClose: () => void;
}> = ({ transaction, onClose }) => {
  const { language, t } = useApp();
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-[32px] shadow-2xl border border-neutral-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Receipt Header with Santo Domingo Logo */}
        <div className="p-6 bg-white border-b border-neutral-100 flex items-center justify-between">
          <SantoDomingoLogo variant="horizontal" size="sm" showEst={true} />
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-900 p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs text-neutral-700">
          <div className="text-center py-2 border-b border-dashed border-neutral-200">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#F2F8F4] border border-[#E3EFE7] text-[#3B7A57] flex items-center justify-center mb-2">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="text-2xl font-extrabold text-neutral-900 font-mono">
              ${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-neutral-500 mt-0.5">
              {language === 'es' ? 'Estado' : 'Status'}: <span className="font-bold text-[#3B7A57] uppercase">{transaction.status === 'Completed' ? (language === 'es' ? 'Completado' : 'Completed') : transaction.status}</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between py-1 border-b border-neutral-100">
              <span className="text-neutral-500">{language === 'es' ? 'ID de Transacción' : 'Transaction ID'}</span>
              <span className="font-mono font-medium text-neutral-900">{transaction.transactionNumber}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-100">
              <span className="text-neutral-500">{t.common.date}</span>
              <span className="font-mono text-neutral-800">{transaction.date}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-100">
              <span className="text-neutral-500">{language === 'es' ? 'Socio / Cuenta' : 'Member Account'}</span>
              <span className="font-medium text-neutral-900">{transaction.memberName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-100">
              <span className="text-neutral-500">{language === 'es' ? 'Categoría de Servicio' : 'Service Category'}</span>
              <span className="font-medium text-neutral-900">{transaction.serviceCategory}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-100">
              <span className="text-neutral-500">{language === 'es' ? 'Método de Pago' : 'Payment Instrument'}</span>
              <span className="font-medium text-neutral-900 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-neutral-400" />
                {transaction.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-500">{language === 'es' ? 'Conciliación Contable' : 'General Ledger Reconciliation'}</span>
              <span className={`font-semibold ${transaction.reconciled ? 'text-emerald-700' : 'text-amber-600'}`}>
                {transaction.reconciled ? (language === 'es' ? 'Conciliado' : 'Reconciled') : (language === 'es' ? 'Pendiente' : 'Pending Verification')}
              </span>
            </div>
          </div>

          <div className="bg-neutral-50 p-3 rounded-2xl text-[11px] text-neutral-500 text-center">
            {language === 'es' ? 'Gracias por su preferencia en Santo Domingo Country Club. Para consultas de facturación, contáctenos en accounting@santodomingocc.com.' : 'Thank you for being a valued member of Santo Domingo Country Club. For billing inquiries, contact accounting@santodomingocc.com.'}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-neutral-50/80 border-t border-neutral-100 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-300 text-neutral-700 hover:border-black hover:bg-neutral-100 font-semibold text-xs transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Imprimir Recibo' : 'Print Receipt'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold text-xs transition-all cursor-pointer shadow-xs"
          >
            {t.common.close}
          </button>
        </div>

      </div>
    </div>
  );
};

