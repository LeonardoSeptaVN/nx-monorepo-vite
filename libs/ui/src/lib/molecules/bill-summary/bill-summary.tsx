// libs/ui/src/lib/molecules/BillSummary/BillSummary.tsx
import React from 'react';

export interface BillSummaryProps {
  subtotal: number;
  taxAmount: number;
  serviceAmount: number;
  deliveryFee: number;
  totalBill: number;
  formatCurrency: (amount: number) => string;
}

export const BillSummary: React.FC<BillSummaryProps> = ({
  subtotal,
  taxAmount,
  serviceAmount,
  deliveryFee,
  totalBill,
  formatCurrency,
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h3 className="font-bold text-gray-800 mb-3">Ringkasan</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Pajak:</span>
          <span className="font-medium">{formatCurrency(taxAmount)}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Charge:</span>
          <span className="font-medium">{formatCurrency(serviceAmount)}</span>
        </div>
        <div className="flex justify-between">
          <span>Biaya Kirim:</span>
          <span className="font-medium">{formatCurrency(deliveryFee)}</span>
        </div>
        <div className="border-t-2 border-gray-300 pt-2 mt-2">
          <div className="flex justify-between text-lg font-bold">
            <span>TOTAL:</span>
            <span className="text-green-600">{formatCurrency(totalBill)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillSummary;
