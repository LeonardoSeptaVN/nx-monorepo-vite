import React from 'react';

export interface ButtonProps {
  /** Text label (optional if using children) */
  label?: string;
  /** Optional children for more flexible content */
  children?: React.ReactNode;
  /** Optional button type (default = "button") */
  type?: 'button' | 'submit' | 'reset';

  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  children,
  className,
  onClick,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
        className ?? ''
      }`}
      onClick={onClick}
    >
      {/* Prioritaskan children kalau ada, fallback ke label */}
      {children ?? label}
    </button>
  );
};
