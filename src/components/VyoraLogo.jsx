import React from 'react';

export const VyoraLogo = ({ className = "h-12", alt = "VyoraThreads - Wear Your Story" }) => {
  return (
    <div className="inline-flex items-center gap-3 select-none">
      <img
        src="/vyora-logo.png"
        alt={alt}
        className={`${className} object-contain transition-transform duration-300 hover:scale-105 filter drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]`}
      />
    </div>
  );
};
