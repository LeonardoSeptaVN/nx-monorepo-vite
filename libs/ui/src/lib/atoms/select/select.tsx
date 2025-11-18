// libs/ui/src/lib/atoms/Select/Select.tsx
import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
}

export const Select: React.FC<SelectProps> = ({
  options = [],
  className = '',
  children,
  ...props
}) => {
  return (
    <select
      className={`border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none ${className}`}
      {...props}
    >
      {children ||
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
};

export default Select;
