// libs/ui/src/lib/atoms/Heading/Heading.tsx
import React from 'react';

export interface HeadingProps {
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  size = 'h1',
  children,
  className = '',
}) => {
  const Tag = size;

  const sizeStyles = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-semibold',
    h5: 'text-lg font-medium',
    h6: 'text-base font-medium',
  };

  return <Tag className={`${sizeStyles[size]} ${className}`}>{children}</Tag>;
};

export default Heading;
