// libs/ui/src/lib/molecules/IndividualBillCard/IndividualBillCard.tsx
import React from 'react';
import { Heading } from '../../atoms/heading/heading';

export interface IndividualBillCardProps {
  name: string;
  items: string;
  orderPrice: number;
  additional: number;
  total: number;
  index: number;
  formatCurrency: (amount: number) => string;
}

export const IndividualBillCard: React.FC<IndividualBillCardProps> = ({
  name,
  items,
  orderPrice,
  additional,
  total,
  index,
  formatCurrency,
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <Heading size="h3" className="font-bold text-gray-800">
            {name || `Pesanan #${index + 1}`}
          </Heading>
          <p className="text-sm text-gray-600">{items}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(total)}
          </p>
        </div>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <div className="flex justify-between">
          <span>Harga pesanan:</span>
          <span>{formatCurrency(orderPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span>Biaya tambahan:</span>
          <span>{formatCurrency(additional)}</span>
        </div>
      </div>
    </div>
  );
};

export default IndividualBillCard;
