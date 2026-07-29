import React from 'react';
import { Instagram, Heart } from 'lucide-react';

export const InstagramGallery = () => {
  const posts = [
    {
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      likes: '3.4k'
    },
    {
      img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80',
      likes: '4.8k'
    },
    {
      img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
      likes: '2.9k'
    },
    {
      img: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=600&q=80',
      likes: '5.2k'
    },
    {
      img: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80',
      likes: '3.8k'
    },
    {
      img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80',
      likes: '6.1k'
    }
  ];

  return (
    <section className="py-20 bg-[#0D0D0D] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 text-left">
          <div>
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-1 block">
              @vyorathreads2026
            </span>
            <h2 className="font-playfair font-normal text-3xl sm:text-4xl text-white tracking-wide uppercase">
              Follow Us On Instagram
            </h2>
          </div>
          <a
            href="https://www.instagram.com/vyorathreads2026/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white font-bold text-xs uppercase tracking-wider mt-3 sm:mt-0 transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>Join @vyorathreads2026</span>
          </a>
        </div>

        {/* 6 Men's Editorial Photography Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href="https://www.instagram.com/vyorathreads2026/"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border border-white/10"
            >
              <img
                src={post.img}
                alt="Men's fashion editorial photo"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white">
                <Instagram className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-xs font-bold flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
                  {post.likes}
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
