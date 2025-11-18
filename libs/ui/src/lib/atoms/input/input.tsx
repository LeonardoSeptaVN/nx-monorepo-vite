// Input.tsx
'use client';

import React from 'react';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number;
  onChange?: (value: string) => void;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className = '',
  type = 'text',
  placeholder,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none ${className}`}
      {...props}
    />
  );
};

export default Input;
