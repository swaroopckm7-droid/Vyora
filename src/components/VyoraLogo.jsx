import React from 'react';

export const VyoraLogo = ({ className = "h-10 sm:h-12", showTagline = true, alt = "VyoraThreads" }) => {
  return (
    <div className="inline-flex items-center gap-3.5 select-none cursor-pointer group">
      <img
        src="/vyora-logo.png"
        alt={alt}
        className={`${className} object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] rounded-lg`}
      />

      <div className="flex flex-col text-left">
        <span className="font-playfair font-bold text-xl sm:text-2xl text-white tracking-widest leading-none group-hover:text-[#D4AF37] transition-colors">
          VYORATHREADS
        </span>
        {showTagline && (
          <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-[0.3em] mt-1">
            Crafted for Confidence
          </span>
        )}
      </div>
    </div>
  );
};
