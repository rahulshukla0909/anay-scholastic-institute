import React from 'react';

export const InstituteLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`relative flex items-center justify-center rounded-full bg-brand-orange overflow-hidden border-2 border-brand-orange ${className}`}>
      <span className="text-brand-navy font-bold text-2xl select-none" style={{ fontFamily: 'sans-serif', transform: 'translateY(2px)' }}>A</span>
      <div className="absolute bottom-0 w-full h-1/3 bg-brand-navy origin-bottom scale-y-[0.1]" />
    </div>
  );
};
