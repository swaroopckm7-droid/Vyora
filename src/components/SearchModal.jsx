import React, { useState } from 'react';
import { Search, X, Star, ArrowRight } from 'lucide-react';

export const SearchModal = ({ isOpen, onClose, products, onQuickView }) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filtered = query.trim() === '' ? [] : products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-vyora-card border border-gold/40 rounded-3xl overflow-hidden shadow-2xl z-10 text-left">
        
        {/* Search Input Field */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-gold shrink-0 ml-2" />
          <input
            type="text"
            placeholder="Search hoodies, oversized tees, trench jackets, denim..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white text-base outline-none placeholder-gray-500 font-medium"
            autoFocus
          />
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['Gold Hoodie', 'Oversized Tee', 'Trench Jacket', 'Raw Denim', 'Linen Shirt'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs font-medium text-gray-300 bg-charcoal hover:bg-gold hover:text-black px-3.5 py-1.5 rounded-full transition-colors border border-white/5"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gold mb-3">
                {filtered.length} products found
              </p>
              {filtered.map((item) => (
                <div
                  key={item._id || item.id}
                  onClick={() => {
                    onQuickView(item);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-3 rounded-xl bg-charcoal/40 hover:bg-gold/10 border border-transparent hover:border-gold/30 cursor-pointer transition-colors"
                >
                  <img
                    src={item.images ? item.images[0] : item.image}
                    alt={item.name}
                    className="w-12 h-14 object-cover rounded-lg border border-white/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-poppins font-bold text-sm text-white truncate">{item.name}</h4>
                    <span className="text-xs text-gold font-medium uppercase">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-poppins font-black text-sm text-white">${item.price}</span>
                    <ArrowRight className="w-4 h-4 text-gold ml-auto mt-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-sm py-8">
              No products found matching "{query}". Try another search term.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
