import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/books';
import { 
  BookOpen, 
  Search, 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown, 
  SlidersHorizontal,
  Bookmark,
  ShieldCheck,
  Truck,
  Zap,
  Globe
} from 'lucide-react';

export default function Header() {
  const {
    cartItemCount,
    cartTotal,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    currency,
    setCurrency,
    currencies,
    formatPrice,
    openModal,
    setIsMobileFilterOpen,
    books
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  // Suggestions for auto-complete
  const searchSuggestions = searchQuery.trim().length > 1
    ? books.filter(b => 
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        b.author.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-900/10 shadow-sm transition-all">
      {/* Top micro-announcement bar */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-amber-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-medium text-amber-300">
              <Zap className="w-3.5 h-3.5" />
              <span>SPECIAL OFFER: Use code <strong className="underline underline-offset-2 tracking-wider">READ20</strong> for 20% off!</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <Truck className="w-3.5 h-3.5 text-amber-400" /> Free Shipping on Orders $35+
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 hover:text-white transition text-[11px] font-medium py-0.5 px-1.5 rounded"
              >
                <Globe className="w-3 h-3 text-amber-300" />
                <span>{currency} ({currencies[currency]?.symbol})</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 mt-1 w-28 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-100 py-1 z-50 text-xs">
                  {Object.keys(currencies).map((cur) => (
                    <button
                      key={cur}
                      onClick={() => {
                        setCurrency(cur);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-amber-50 flex items-center justify-between ${
                        currency === cur ? 'font-semibold text-brand-600 bg-amber-50/60' : ''
                      }`}
                    >
                      <span>{cur}</span>
                      <span className="text-slate-400">{currencies[cur].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="hidden sm:inline text-slate-500">|</span>
            <button
              onClick={() => openModal('quiz')}
              className="hidden sm:flex items-center gap-1 text-amber-300 hover:text-white transition font-medium"
            >
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
              <span>Book Finder AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-amber-800 flex items-center justify-center text-white shadow-md shadow-brand-600/20 group-hover:scale-105 transition-transform duration-200">
                <BookOpen className="w-5 h-5 text-amber-100" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold tracking-tight font-display text-slate-900 group-hover:text-brand-600 transition-colors">
                  Chapter <span className="text-brand-600">&</span> Co.
                </span>
                <span className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 -mt-1">
                  Curated Bookstore
                </span>
              </div>
            </button>
          </div>

          {/* Search bar with live suggestions */}
          <div className="hidden md:flex flex-1 max-w-lg relative" ref={searchRef}>
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search by title, author, topic, or keyword..."
                className="w-full pl-11 pr-10 py-2.5 rounded-full bg-slate-100/80 border border-slate-200 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 text-sm placeholder-slate-400 text-slate-800 transition outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Search Suggestions Dropdown */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                <div className="p-2 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3">
                  Matching Titles ({searchSuggestions.length})
                </div>
                <div className="divide-y divide-slate-50">
                  {searchSuggestions.map((book) => (
                    <button
                      key={book.id}
                      onClick={() => {
                        openModal('detail', book);
                        setIsSearchFocused(false);
                      }}
                      className="w-full text-left p-2.5 hover:bg-amber-50/60 flex items-center gap-3 transition"
                    >
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-9 h-12 object-cover rounded shadow-sm shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-slate-800 truncate">
                          {book.title}
                        </div>
                        <div className="text-xs text-slate-500 truncate">
                          by {book.author} • <span className="text-brand-600 font-medium">{formatPrice(book.discountedPrice)}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action buttons: Quiz, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Book Finder Quiz Button */}
            <button
              onClick={() => openModal('quiz')}
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 text-amber-900 text-xs font-semibold hover:border-amber-300 hover:shadow-sm transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Book Finder</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-slate-100 text-slate-700 transition"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-600'}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 bg-slate-900 hover:bg-brand-600 text-white px-4 py-2.5 rounded-full shadow-md hover:shadow-lg transition duration-200 group"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-amber-200 group-hover:scale-110 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-4 h-4 bg-brand-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold hidden sm:inline tracking-wide">
                {cartItemCount > 0 ? formatPrice(cartTotal) : 'Bag (0)'}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 transition"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input (Visible on small screens) */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, authors, topics..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-100 border border-slate-200 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="border-t border-slate-100 bg-slate-50/60 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto py-2 no-scrollbar gap-1 text-xs">
            <div className="flex items-center gap-1.5 flex-nowrap">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-medium transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 pl-4 border-l border-slate-200 shrink-0">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-xs hover:bg-slate-50"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-brand-600" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white shadow-2xl py-4 px-5 animate-in slide-in-from-top-4 duration-200">
          <div className="font-semibold text-xs uppercase tracking-wider text-slate-400 mb-2">
            Categories
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                openModal('quiz');
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold"
            >
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Find My Next Read (Recommendation Quiz)</span>
            </button>
            <div className="flex justify-between items-center text-xs text-slate-500 py-1 px-1">
              <span>Select Currency</span>
              <div className="flex gap-1.5">
                {Object.keys(currencies).map((cur) => (
                  <button
                    key={cur}
                    onClick={() => setCurrency(cur)}
                    className={`px-2 py-1 rounded border text-[11px] ${
                      currency === cur
                        ? 'bg-brand-600 text-white border-brand-600 font-bold'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
