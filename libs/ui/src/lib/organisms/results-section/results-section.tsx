// libs/ui/src/lib/organisms/ResultsSection/ResultsSection.tsx
import React from 'react';

import { Button } from '../../atoms/button/button';
import { Heading } from '../../atoms/heading/heading';
import { IndividualBillCard } from '../../molecules/individual-bill-card/individual-bill-card';
import { BillSummary } from '../../molecules/bill-summary/bill-summary';

export interface Calculation {
  id: number;
  name: string;
  items: string;
  orderPrice: number;
  additional: number;
  total: number;
}

export interface ResultsSectionProps {
  calculations: Calculation[];
  subtotal: number;
  taxAmount: number;
  serviceAmount: number;
  deliveryFee: number;
  totalBill: number;
  formatCurrency: (amount: number) => string;
  onReset: () => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  calculations,
  subtotal,
  taxAmount,
  serviceAmount,
  deliveryFee,
  totalBill,
  formatCurrency,
  onReset,
}) => {
  return (
    <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
      <Heading size="h2" className="text-2xl font-bold text-gray-800 mb-4">
        Hasil Perhitungan
      </Heading>

      {/* Individual Bills */}
      <div className="space-y-3 mb-6">
        {calculations.map((calc, index) => (
          <IndividualBillCard
            key={calc.id}
            name={calc.name}
            items={calc.items}
            orderPrice={calc.orderPrice}
            additional={calc.additional}
            total={calc.total}
            index={index}
            formatCurrency={formatCurrency}
          />
        ))}
      </div>

      {/* Summary */}
      <BillSummary
        subtotal={subtotal}
        taxAmount={taxAmount}
        serviceAmount={serviceAmount}
        deliveryFee={deliveryFee}
        totalBill={totalBill}
        formatCurrency={formatCurrency}
      />

      <Button
        onClick={onReset}
        variant="secondary"
        className="w-full mt-4 py-3"
      >
        Hitung Ulang
      </Button>
    </div>
  );
};

export default ResultsSection;
