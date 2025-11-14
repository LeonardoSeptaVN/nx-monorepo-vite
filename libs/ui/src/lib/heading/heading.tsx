import React from 'react';

export type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: HeadingSize;
  children: React.ReactNode;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  size = 'h3',
  children,
  className = '',
  ...props
}) => {
  const Tag = size;

  return (
    <Tag className={`font-bold text-gray-800 mb-3 ${className}`} {...props}>
      {children}
    </Tag>
  );
};
