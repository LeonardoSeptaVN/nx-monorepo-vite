// libs/ui/src/lib/organisms/ChargesSection/ChargesSection.tsx
import React from 'react';

import { Heading } from '../../atoms/heading/heading';
import { ChargeInput } from '../../molecules/charge-input/charge-input';

export interface ChargesSectionProps {
  tax: number;
  taxMode: 'percent' | 'nominal';
  deliveryFee: number;
  serviceCharge: number;
  serviceMode: 'percent' | 'nominal';
  onTaxChange: (value: number) => void;
  onTaxModeChange: (mode: 'percent' | 'nominal') => void;
  onDeliveryFeeChange: (value: number) => void;
  onServiceChargeChange: (value: number) => void;
  onServiceModeChange: (mode: 'percent' | 'nominal') => void;
}

export const ChargesSection: React.FC<ChargesSectionProps> = ({
  tax,
  taxMode,
  deliveryFee,
  serviceCharge,
  serviceMode,
  onTaxChange,
  onTaxModeChange,
  onDeliveryFeeChange,
  onServiceChargeChange,
  onServiceModeChange,
}) => {
  return (
    <div className="bg-amber-50 rounded-lg p-4 border-2 border-amber-200 mb-6">
      <Heading
        size="h2"
        className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2"
      >
        <span className="bg-amber-100 text-amber-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">
          2
        </span>
        Biaya Tambahan
      </Heading>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ChargeInput
          label="Pajak"
          value={tax}
          mode={taxMode}
          showModeSelector={true}
          onValueChange={onTaxChange}
          onModeChange={onTaxModeChange}
        />

        <ChargeInput
          label="Biaya Kirim (Rp)"
          value={deliveryFee}
          onValueChange={onDeliveryFeeChange}
        />

        <ChargeInput
          label="Service Charge"
          value={serviceCharge}
          mode={serviceMode}
          showModeSelector={true}
          onValueChange={onServiceChargeChange}
          onModeChange={onServiceModeChange}
        />
      </div>
    </div>
  );
};

export default ChargesSection;
