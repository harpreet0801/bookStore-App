import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Sparkles, 
  ArrowRight, 
  BookMarked, 
  ShieldCheck, 
  Truck, 
  Headphones, 
  Flame, 
  Star,
  Eye,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const HERO_SLIDES = [
  {
    tag: 'Spotlight of the Month',
    title: 'Stories That Reshape the Human Spirit',
    subtitle: 'Immerse yourself in our critically acclaimed fiction, groundbreaking non-fiction, and captivating new literary releases.',
    badge: '★ #1 New York Times Bestseller',
    featuredBookId: 'book-1',
    accentColor: 'from-amber-900/90 via-slate-900/95 to-slate-950',
    coverBg: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80',
    quote: '"A breathtaking achievement in contemporary storytelling."'
  },
  {
    tag: 'Frontiers of Sci-Fi',
    title: 'Journey to the Edge of the Known Galaxy',
    subtitle: 'From hard astrophysics to grand space epics. Discover Hugo and Nebula award finalists ready to transport your imagination.',
    badge: '★ Best Sci-Fi of 2024',
    featuredBookId: 'book-2',
    accentColor: 'from-indigo-950/95 via-slate-900/95 to-slate-950',
    coverBg: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80',
    quote: '"Masterpiece of cosmic speculation and wonder."'
  },
  {
    tag: 'Mastery & Growth',
    title: 'Unlock Your Next Level of Creative Genius',
    subtitle: 'Distilled insights from leading neuroscientists, entrepreneurs, and artists. Build frictionless habits that transform your output.',
    badge: '★ Over 500,000 Readers',
    featuredBookId: 'book-5',
    accentColor: 'from-emerald-950/95 via-slate-900/95 to-slate-950',
    coverBg: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=700&q=80',
    quote: '"Actionable, scientific, and profoundly empowering."'
  }
];

export default function HeroBanner() {
  const { openModal, books, addToCart, formatPrice } = useShop();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slide = HERO_SLIDES[currentSlideIndex];
  const featuredBook = books.find(b => b.id === slide.featuredBookId) || books[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="relative mb-8">
      {/* Hero Card Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${slide.accentColor} text-white shadow-2xl transition-all duration-700 min-h-[460px] flex items-center`}>
          
          {/* Subtle background decorative aura */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Slide navigation arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur border border-white/20 text-white flex items-center justify-center transition opacity-70 hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur border border-white/20 text-white flex items-center justify-center transition opacity-70 hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Content Grid */}
          <div className="relative z-10 w-full px-8 sm:px-14 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Copy & CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  {slide.tag}
                </span>
                <span className="inline-block text-xs font-medium text-slate-300">
                  {slide.badge}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display leading-[1.15]">
                {slide.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-200/90 max-w-xl leading-relaxed font-light">
                {slide.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => openModal('detail', featuredBook)}
                  className="px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm shadow-lg shadow-brand-900/40 hover:shadow-brand-500/30 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span>Explore Featured Book</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => openModal('quiz')}
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur border border-white/20 transition flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Book Finder Quiz</span>
                </button>
              </div>

              {/* Slide indicators */}
              <div className="flex items-center gap-2 pt-4">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlideIndex === idx
                        ? 'w-8 bg-amber-400'
                        : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: 3D Book Spotlight */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group max-w-[280px] sm:max-w-[320px]">
                
                {/* Book Card Highlight Box */}
                <div className="relative rounded-2xl bg-white/10 backdrop-blur-md p-4 sm:p-5 border border-white/15 shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
                  
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-2xl mb-4">
                    <img
                      src={featuredBook.cover}
                      alt={featuredBook.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                      <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
                        {featuredBook.categoryName}
                      </span>
                      <h3 className="text-base font-bold text-white leading-snug line-clamp-1">
                        {featuredBook.title}
                      </h3>
                      <p className="text-xs text-slate-300">by {featuredBook.author}</p>
                    </div>
                  </div>

                  {/* Pricing and Action row */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-xs text-slate-300 line-through mr-2">
                        {formatPrice(featuredBook.basePrice)}
                      </span>
                      <span className="text-lg font-bold text-amber-300">
                        {formatPrice(featuredBook.discountedPrice)}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal('preview', featuredBook)}
                        className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-medium text-white flex items-center gap-1.5 transition"
                        title="Read sample chapter"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-200" />
                        <span>Preview</span>
                      </button>

                      <button
                        onClick={() => addToCart(featuredBook, 'paperback', 1)}
                        className="px-3 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-xs font-semibold text-white shadow transition"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Value Proposition Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-4">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-brand-600 flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Free Fast Delivery</h4>
              <p className="text-[11px] text-slate-500">Orders over $35 ship free</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <BookMarked className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Sample Look Inside</h4>
              <p className="text-[11px] text-slate-500">Read Chapter 1 for free</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Multi-Format Ready</h4>
              <p className="text-[11px] text-slate-500">Paper, Audio, & eBook</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Authentic & Verified</h4>
              <p className="text-[11px] text-slate-500">100% publisher original</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
