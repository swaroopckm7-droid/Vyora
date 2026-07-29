import React from 'react';
import { Instagram, Twitter, Facebook, PinIcon as Pinterest, Mail, Phone, MapPin } from 'lucide-react';
import { VyoraLogo } from './VyoraLogo';

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-vyora-black border-t border-white/10 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 text-left">
            <div className="mb-4">
              <VyoraLogo className="h-14" />
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              VyoraThreads is a global luxury fashion house creating minimalist, sustainable, and confidence-inspiring streetwear and essential garments.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a 
                href="https://www.instagram.com/vyorathreads2026/" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-charcoal hover:bg-gold hover:text-black text-gray-300 flex items-center justify-center transition-colors"
                title="Instagram @vyorathreads2026"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-charcoal hover:bg-gold hover:text-black text-gray-300 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-charcoal hover:bg-gold hover:text-black text-gray-300 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-charcoal hover:bg-gold hover:text-black text-gray-300 flex items-center justify-center transition-colors">
                <Pinterest className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="text-left">
            <h4 className="font-poppins font-bold text-white uppercase text-xs tracking-widest mb-4">
              Shop Collections
            </h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => onNavigate('shop')} className="hover:text-gold transition-colors">Hoodies & Sweats</button></li>
              <li><button onClick={() => onNavigate('shop')} className="hover:text-gold transition-colors">Oversized Wear</button></li>
              <li><button onClick={() => onNavigate('shop')} className="hover:text-gold transition-colors">Supima T-Shirts</button></li>
              <li><button onClick={() => onNavigate('shop')} className="hover:text-gold transition-colors">Outerwear & Jackets</button></li>
              <li><button onClick={() => onNavigate('shop')} className="hover:text-gold transition-colors">Selvage Denim</button></li>
              <li><button onClick={() => onNavigate('shop')} className="hover:text-gold transition-colors">Italian Accessories</button></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="text-left">
            <h4 className="font-poppins font-bold text-white uppercase text-xs tracking-widest mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => onNavigate('about')} className="hover:text-gold transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-gold transition-colors">Contact Support</button></li>
              <li><button onClick={() => onNavigate('faq')} className="hover:text-gold transition-colors">FAQ</button></li>
              <li><button onClick={() => onNavigate('shipping')} className="hover:text-gold transition-colors">Shipping & Returns</button></li>
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-gold transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-gold transition-colors">Terms & Conditions</button></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="text-left">
            <h4 className="font-poppins font-bold text-white uppercase text-xs tracking-widest mb-4">
              CONTACT FLAGSHIP
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-xs">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Anna Nagar, Chennai, Tamil Nadu, India</span>
              </li>
              <li className="flex items-center gap-3 text-xs">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>+91 9894285362</span>
              </li>
              <li className="flex items-center gap-3 text-xs">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>swaroopckm7@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Security Badges */}
        <div className="pt-12 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} VyoraThreads Inc. All rights reserved. Built with MERN Full-Stack.</p>
          <div className="flex items-center gap-4 text-gray-500 font-medium">
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>AMEX</span>
            <span>APPLE PAY</span>
            <span>UPI</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
