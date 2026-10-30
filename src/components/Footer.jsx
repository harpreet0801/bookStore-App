import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  BookOpen, 
  Send, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles,
  CreditCard,
  Mail
} from 'lucide-react';

export default function Footer() {
  const { setSelectedCategory, addToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    addToast('Subscribed! Check your inbox for code WELCOME10 for 10% off.', 'success');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="relative rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border border-amber-900/40 p-8 sm:p-12 mb-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Literary Digest & Exclusive Offers</span>
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Join Our Global Reading Society
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Subscribe to receive weekly curated author interviews, rare release previews, and an instant <strong>10% off voucher</strong> on your next purchase.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                ✓ You're subscribed! Use promo code <span className="underline font-mono text-white">WELCOME10</span> at checkout.
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white/15"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900 text-xs">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow">
                <BookOpen className="w-5 h-5 text-amber-100" />
              </div>
              <span className="text-xl font-bold font-display text-white">
                Chapter <span className="text-brand-500">&</span> Co.
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-light">
              Chapter & Co. is a sanctuary for discerning readers, collectors, and thinkers. We curate timeless masterworks, signed first editions, and independent literary voices from around the world.
            </p>

            <div className="flex items-center gap-4 text-slate-400 pt-2 text-[11px]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-brand-500" /> Verified Publisher Genuine
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-brand-500" /> Carbon Neutral Shipping
              </span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Explore Genres
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button 
                  onClick={() => { setSelectedCategory('fiction'); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                  className="hover:text-brand-400 transition"
                >
                  Literary Fiction
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('scifi'); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                  className="hover:text-brand-400 transition"
                >
                  Sci-Fi & Fantasy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('mystery'); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                  className="hover:text-brand-400 transition"
                >
                  Mystery & Thrillers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('tech'); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                  className="hover:text-brand-400 transition"
                >
                  Technology & AI
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('self-help'); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                  className="hover:text-brand-400 transition"
                >
                  Personal Mastery
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Customer Service
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#shipping" onClick={(e) => { e.preventDefault(); addToast('Orders ship standard in 24 hours with real-time tracking.', 'info'); }} className="hover:text-brand-400 transition">Track Your Shipment</a></li>
              <li><a href="#returns" onClick={(e) => { e.preventDefault(); addToast('We offer 30-day hassle-free prepaid return labels.', 'info'); }} className="hover:text-brand-400 transition">30-Day Returns Policy</a></li>
              <li><a href="#formats" onClick={(e) => { e.preventDefault(); addToast('eBooks and Audiobooks are instantly deliverable to your reader app.', 'info'); }} className="hover:text-brand-400 transition">Digital eBook Formats</a></li>
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); addToast('Our 24/7 reader support is available via support@chapterco.demo', 'info'); }} className="hover:text-brand-400 transition">Frequently Asked Questions</a></li>
              <li><a href="#gift" onClick={(e) => { e.preventDefault(); addToast('Gift wrapping with wax seal available on all hardcover orders.', 'info'); }} className="hover:text-brand-400 transition">Gift Cards & Book Sets</a></li>
            </ul>
          </div>

          {/* Bookstore Branches */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Flagship Stores
            </h4>
            <div className="space-y-2 text-slate-400 text-[11px] leading-relaxed">
              <div>
                <strong className="text-white block font-medium">SoHo Gallery</strong>
                <span>482 Broome Street, New York, NY</span>
              </div>
              <div className="pt-1">
                <strong className="text-white block font-medium">Covent Garden Salon</strong>
                <span>12 Floral Street, London, WC2E</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Chapter & Co. Booksellers LLC. Handcrafted for book lovers everywhere.
          </div>

          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Settings</span>
            <span>Accessibility</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
