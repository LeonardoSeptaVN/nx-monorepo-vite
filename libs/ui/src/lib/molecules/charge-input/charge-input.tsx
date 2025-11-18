// libs/ui/src/lib/molecules/ChargeInput/ChargeInput.tsx
import React from 'react';
import { Select } from '../../atoms/select/select';
import { Input } from '../../atoms/input/input';
import { Label } from '../../atoms/label/label';

export interface ChargeInputProps {
  label: string;
  value: number;
  mode?: 'percent' | 'nominal';
  showModeSelector?: boolean;
  placeholder?: string;
  onValueChange: (value: number) => void;
  onModeChange?: (mode: 'percent' | 'nominal') => void;
}

export const ChargeInput: React.FC<ChargeInputProps> = ({
  label,
  value,
  mode = 'percent',
  showModeSelector = false,
  placeholder,
  onValueChange,
  onModeChange,
}) => {
  return (
    <div>
      <Label className="mb-1">{label}</Label>

      {showModeSelector ? (
        <div className="flex gap-2">
          <Select
            value={mode}
            onChange={(e) =>
              onModeChange?.(e.target.value as 'percent' | 'nominal')
            }
            className="w-20"
          >
            <option value="percent">%</option>
            <option value="nominal">Rp</option>
          </Select>

          <Input
            type="number"
            value={value}
            onChange={(val) => onValueChange(Number(val) || 0)}
            placeholder={placeholder || (mode === 'percent' ? '10' : '1000')}
          />
        </div>
      ) : (
        <Input
          type="number"
          value={value}
          onChange={(val) => onValueChange(Number(val) || 0)}
          placeholder={placeholder || '0'}
        />
      )}
    </div>
  );
};

export default ChargeInput;
