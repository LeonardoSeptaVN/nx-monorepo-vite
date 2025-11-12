import React from 'react';

export interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-blue-600 text-red rounded-lg hover:bg-blue-700 transition-colors"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
