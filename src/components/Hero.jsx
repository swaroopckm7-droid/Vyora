import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Search, User, ShoppingBag, Menu } from 'lucide-react';

export const Hero = ({ onShopNow, onExploreCollection }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "BEST SELLER ITEMS",
      description: "Discover best seller items on VyoraThreads in last month. Find your best style for new season.",
      bgColor: "#B89376",
      textColor: "#FFFFFF",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
      nextSlideImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
      nextTitle: "NEW IN ITEMS"
    },
    {
      id: 2,
      title: "NEW IN ITEMS",
      description: "Casual line. Short design. 100% suede leather. Backstitched elbow patches and handcrafted luxury.",
      bgColor: "#8A9A9A",
      textColor: "#FFFFFF",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
      nextSlideImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
      nextTitle: "DISCOUNT 25% OFF"
    },
    {
      id: 3,
      title: "DISCOUNT 25% OFF",
      description: "Exclusive seasonal luxury eyewear and essential accessories crafted with 100% UV protection.",
      bgColor: "#D9D2C5",
      textColor: "#1A1A1A",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
      nextSlideImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      nextTitle: "BEST SELLER ITEMS"
    }
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden transition-colors duration-700" style={{ backgroundColor: slide.bgColor }}>
      
      {/* Outer Banner Wrapper */}
      <div className="max-w-[1500px] mx-auto min-h-[600px] sm:min-h-[720px] flex flex-col justify-between relative">
        
        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] sm:min-h-[720px]">
          
          {/* Left Hero Main Banner (Cols 1-9) */}
          <div className="lg:col-span-9 relative flex flex-col justify-between p-6 sm:p-12 lg:p-16">
            
            {/* Top Sub Header inside Hero */}
            <div className="flex items-center justify-between text-xs tracking-widest uppercase mb-8 z-20">
              <button 
                onClick={onExploreCollection}
                className="flex items-center gap-2 font-bold tracking-widest hover:opacity-75 transition-opacity"
                style={{ color: slide.textColor }}
              >
                <Menu className="w-4 h-4" />
                <span>MENU</span>
              </button>

              <h1 className="font-cormorant text-2xl font-bold tracking-widest uppercase" style={{ color: slide.textColor }}>
                DUROTAN × VYORA
              </h1>

              <div className="flex items-center gap-4" style={{ color: slide.textColor }}>
                <Search className="w-4 h-4 cursor-pointer hover:opacity-75" />
              </div>
            </div>

            {/* Vertical Pagination Dots on Far Left */}
            <div className="hidden sm:flex flex-col items-center gap-3 absolute left-6 top-1/2 -translate-y-1/2 z-20">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? 'w-3 h-3 ring-2 ring-white scale-125' : 'opacity-40 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: slide.textColor }}
                />
              ))}
            </div>

            {/* Hero Image Overlay Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 mix-blend-multiply">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center transition-all duration-700 scale-105"
              />
            </div>

            {/* Central Serif Headline & Buttons */}
            <div className="relative z-10 my-auto text-center max-w-2xl mx-auto py-12">
              <h2 className="font-cormorant text-5xl sm:text-7xl lg:text-8xl font-light tracking-wide uppercase leading-none mb-8" style={{ color: slide.textColor }}>
                {slide.title}
              </h2>

              {/* Mens & Womens Action Buttons */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <button
                  onClick={onShopNow}
                  className="px-8 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-md"
                >
                  MENS
                </button>
                <button
                  onClick={onShopNow}
                  className="px-8 py-3 border border-current font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                  style={{ color: slide.textColor, borderColor: slide.textColor }}
                >
                  WOMENS
                </button>
              </div>
            </div>

            {/* Bottom Row: Slide Counter (1/3), Description & Navigation Arrows */}
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-6 border-t border-white/20">
              
              {/* Slide Counter */}
              <div className="font-cormorant text-3xl font-light tracking-widest flex items-baseline gap-1" style={{ color: slide.textColor }}>
                <span>{slide.id}</span>
                <span className="text-sm opacity-50">/</span>
                <span className="text-lg opacity-50">{slides.length}</span>
              </div>

              {/* Description Paragraph */}
              <div className="max-w-md text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest block mb-1 opacity-75" style={{ color: slide.textColor }}>
                  DESCRIPTION
                </span>
                <p className="text-xs sm:text-sm font-normal leading-relaxed opacity-90" style={{ color: slide.textColor }}>
                  {slide.description}
                </p>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-6">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full hover:bg-white/20 transition-all cursor-pointer"
                  style={{ color: slide.textColor }}
                  aria-label="Previous Slide"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="p-2 rounded-full hover:bg-white/20 transition-all cursor-pointer"
                  style={{ color: slide.textColor }}
                  aria-label="Next Slide"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>

            </div>

          </div>

          {/* Right Column Side Preview (Cols 10-12) */}
          <div 
            onClick={handleNext}
            className="hidden lg:flex lg:col-span-3 relative overflow-hidden cursor-pointer group border-l border-white/10"
          >
            <img
              src={slide.nextSlideImage}
              alt={slide.nextTitle}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center p-6 text-white text-center">
              <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider">Next: {slide.nextTitle}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
