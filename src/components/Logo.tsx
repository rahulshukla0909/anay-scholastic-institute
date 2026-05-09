import React from 'react';

export const InstituteLogo: React.FC<{ className?: string, useImage?: boolean }> = ({ className = "w-10 h-10", useImage = false }) => {
  return (
    <div className={`relative flex items-center justify-center rounded-full overflow-hidden ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="#F59B1E" />
        <path 
          d="M50 18L24 78H38L42 66C44 60 47 58 50 58C53 58 56 60 58 66L62 78H76L50 18Z" 
          fill="#002D42" 
        />
      </svg>
    </div>
  );
};
