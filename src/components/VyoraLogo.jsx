import React from 'react';

export const VyoraLogo = ({ className = "h-9 sm:h-10", showText = true, alt = "VyoraThreads" }) => {
  return (
    <div className="inline-flex items-center gap-2.5 select-none cursor-pointer group shrink-0">
      <img
        src="/vyora-logo.png"
        alt={alt}
        className={`${className} object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_12px_rgba(212,175,55,0.4)] rounded-md`}
      />

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-playfair font-bold text-lg sm:text-xl text-white tracking-[0.18em] leading-none group-hover:text-[#D4AF37] transition-colors">
            VYORA<span className="text-[#D4AF37]">THREADS</span>
          </span>
          <span className="text-[8px] font-extrabold text-[#D4AF37] uppercase tracking-[0.25em] mt-0.5">
            Crafted for Confidence
          </span>
        </div>
      )}
    </div>
  );
};
