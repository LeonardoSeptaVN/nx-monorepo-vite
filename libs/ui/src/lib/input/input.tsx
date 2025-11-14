// Input.tsx
'use client';

import React from 'react';

export type InputProps = {
  type?: React.HTMLInputTypeAttribute;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
}) => {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={
        className ||
        'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
      }
    />
  );
};
