
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden group transition-all duration-300 bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};
