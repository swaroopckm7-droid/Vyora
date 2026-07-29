import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to Vyora Concierge!', 'success');
  };

  return (
    <section className="py-20 bg-vyora-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold text-xs font-bold tracking-widest uppercase mb-2 block">
            VIP Concierge
          </span>
          <h1 className="font-poppins font-black text-4xl text-white mb-3">
            Contact VyoraThreads
          </h1>
          <p className="text-gray-400 text-sm">
            Have questions regarding sizing, custom tailoring, or wholesale inquiries? Our styling team is at your service 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Contact Details Cards */}
          <div className="space-y-6">
            <div className="bg-vyora-card border border-white/10 p-6 rounded-2xl flex items-start gap-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0 border border-gold/30">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-white text-sm mb-1">Flagship Atelier</h4>
                <p className="text-gray-400 text-xs leading-relaxed">Anna Nagar, Chennai, Tamil Nadu, India</p>
              </div>
            </div>

            <div className="bg-vyora-card border border-white/10 p-6 rounded-2xl flex items-start gap-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0 border border-gold/30">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-white text-sm mb-1">VIP Phone Line</h4>
                <p className="text-gray-400 text-xs">+91 9894285362</p>
                <span className="text-[10px] text-gold font-bold">Mon-Sun 24 Hours</span>
              </div>
            </div>

            <div className="bg-vyora-card border border-white/10 p-6 rounded-2xl flex items-start gap-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0 border border-gold/30">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-white text-sm mb-1">Email Inquiry</h4>
                <p className="text-gray-400 text-xs">swaroopckm7@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-2 bg-vyora-card border border-gold/30 p-8 rounded-3xl shadow-2xl">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto border border-gold">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="font-poppins font-bold text-2xl text-white">Message Received!</h3>
                <p className="text-gray-300 text-sm max-w-md mx-auto">
                  Thank you for contacting VyoraThreads Concierge. A personal stylist will respond to your inquiry within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-gold text-black font-extrabold text-xs px-6 py-3 rounded-full uppercase shadow-gold-glow"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <h3 className="font-poppins font-bold text-xl text-white mb-6">Send Us a Direct Message</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Marcus Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-charcoal border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-gold outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Your Email *</label>
                    <input
                      type="email"
                      placeholder="e.g. swaroopckm7@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-charcoal border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-gold outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Sizing Advice / Order Tracking / Custom Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Message *</label>
                  <textarea
                    rows={5}
                    placeholder="How can we assist your wardrobe today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-gold outline-none resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold via-amber-400 to-gold-dark text-black font-extrabold text-sm py-4 rounded-full shadow-gold-glow hover:scale-[1.02] transition-transform uppercase tracking-wider"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
