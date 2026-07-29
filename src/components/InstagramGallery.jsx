import React from 'react';
import { Instagram, Heart } from 'lucide-react';

export const InstagramGallery = () => {
  const posts = [
    {
      img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
      likes: '2.4k'
    },
    {
      img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
      likes: '1.9k'
    },
    {
      img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80',
      likes: '3.1k'
    },
    {
      img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80',
      likes: '4.2k'
    },
    {
      img: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80',
      likes: '2.8k'
    },
    {
      img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80',
      likes: '5.0k'
    }
  ];

  return (
    <section className="py-20 bg-vyora-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 text-left">
          <div>
            <span className="text-gold text-xs font-bold tracking-widest uppercase mb-1 block">
              @vyorathreads2026
            </span>
            <h2 className="font-poppins font-black text-3xl text-white">
              Follow Us On Instagram
            </h2>
          </div>
          <a
            href="https://www.instagram.com/vyorathreads2026/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:text-white font-bold text-xs uppercase tracking-wider mt-3 sm:mt-0 transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>Join @vyorathreads2026</span>
          </a>
        </div>

        {/* Gallery Grid */}
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
                alt="Instagram fashion editorial photo"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white">
                <Instagram className="w-5 h-5 text-gold" />
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
