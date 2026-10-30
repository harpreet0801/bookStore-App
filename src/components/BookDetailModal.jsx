import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { FORMAT_DETAILS } from '../data/books';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  BookMarked, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Sparkles,
  Plus,
  Minus,
  Check,
  Share2,
  Calendar,
  Layers,
  BookOpen,
  MessageSquare
} from 'lucide-react';

export default function BookDetailModal({ book, onClose }) {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    openModal,
    formatPrice,
    calculateFormatPrice,
    addToast
  } = useShop();

  const [selectedFormat, setSelectedFormat] = useState('paperback');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'specs' | 'reviews'

  if (!book) return null;

  const isFavorited = isInWishlist(book.id);
  const currentPrice = calculateFormatPrice(book.discountedPrice, selectedFormat);
  const originalPrice = calculateFormatPrice(book.basePrice, selectedFormat);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Book link copied to clipboard!', 'info');
  };

  const handleAddToCart = () => {
    addToCart(book, selectedFormat, quantity);
  };

  const handleBuyNow = () => {
    addToCart(book, selectedFormat, quantity);
    onClose();
    openModal('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* Top Header Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-700 uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-brand-600" />
            <span>{book.categoryName}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 transition"
              title="Share Book"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleWishlist(book)}
              className="p-2 rounded-full hover:bg-slate-200/70 text-slate-500 hover:text-rose-500 transition"
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'text-rose-500 fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200/70 text-slate-500 hover:text-slate-900 transition ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Book Image & Quick Previews */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[260px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-slate-100 border border-slate-200/80 mb-4">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />

                {book.isBestseller && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500 text-white shadow-md">
                    #1 Bestseller
                  </span>
                )}
              </div>

              {/* Look Inside Excerpt Button */}
              <button
                onClick={() => openModal('preview', book)}
                className="w-full max-w-[260px] py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/80 text-amber-900 text-xs font-bold flex items-center justify-center gap-2 transition shadow-xs"
              >
                <BookMarked className="w-4 h-4 text-brand-600" />
                <span>Read Sample (Look Inside)</span>
              </button>

              {/* Guarantees Box */}
              <div className="w-full max-w-[260px] mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-[11px] text-slate-500 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Truck className="w-3.5 h-3.5 text-brand-600" />
                  <span>Ships in 24 hours</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <RotateCcw className="w-3.5 h-3.5 text-brand-600" />
                  <span>30-Day Hassle-Free Returns</span>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Format selection, Pricing, Cart Actions */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display leading-tight">
                  {book.title}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  By <strong className="text-slate-800 font-semibold">{book.author}</strong> • Published by {book.publisher}
                </p>

                {/* Rating summary */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(book.rating)
                            ? 'fill-amber-400'
                            : 'fill-slate-200 text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-800">{book.rating}</span>
                  <span className="text-xs text-slate-400">({book.ratingCount} reviews)</span>
                </div>
              </div>

              {/* Format Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Choose Format
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {Object.entries(FORMAT_DETAILS).map(([key, item]) => {
                    const price = calculateFormatPrice(book.discountedPrice, key);
                    const isSelected = selectedFormat === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedFormat(key)}
                        className={`p-3 rounded-2xl border text-left transition relative ${
                          isSelected
                            ? 'border-brand-500 bg-brand-50/70 ring-2 ring-brand-500/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 capitalize">
                            {item.label}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-brand-600" />}
                        </div>
                        <div className="text-sm font-bold text-brand-700 mt-0.5">
                          {formatPrice(price)}
                        </div>
                        <span className="text-[10px] text-slate-400 block">
                          {item.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price & Quantity & Actions */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-slate-900 font-display">
                    {formatPrice(currentPrice)}
                  </span>
                  {originalPrice > currentPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                  {book.discount > 0 && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Save {book.discount}%
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-1.5 rounded-lg hover:bg-white text-slate-600 transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-1.5 rounded-lg hover:bg-white text-slate-600 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-5 rounded-xl bg-slate-900 hover:bg-brand-600 text-white font-semibold text-xs shadow-md transition flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-200" />
                    <span>Add to Shopping Bag</span>
                  </button>

                  {/* Buy Now button */}
                  <button
                    onClick={handleBuyNow}
                    className="py-3 px-5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs shadow-md transition"
                  >
                    Instant Checkout
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Tabs for Description, Specifications, and Reviews */}
          <div className="pt-6 border-t border-slate-100">
            <div className="flex border-b border-slate-200 gap-6">
              {[
                { id: 'description', label: 'Synopsis & Description' },
                { id: 'specs', label: 'Details & Specifications' },
                { id: 'reviews', label: `Customer Reviews (${book.reviews.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-xs font-bold uppercase tracking-wider transition border-b-2 -mb-px ${
                    activeTab === tab.id
                      ? 'border-brand-600 text-brand-600'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="py-5">
              {activeTab === 'description' && (
                <div className="space-y-4 text-sm text-slate-600 leading-relaxed font-light">
                  <p>{book.description}</p>
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                      About the Author
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {book.authorBio}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Print Length</span>
                    <strong className="text-slate-800 text-sm">{book.pages} pages</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Language</span>
                    <strong className="text-slate-800 text-sm">{book.language}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Publisher</span>
                    <strong className="text-slate-800 text-sm truncate block">{book.publisher}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">ISBN-13</span>
                    <strong className="text-slate-800 text-sm font-mono">{book.isbn}</strong>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Verified Reader Reviews
                    </h4>
                    <button
                      onClick={() => openModal('review', book)}
                      className="text-xs text-brand-600 hover:text-brand-700 font-bold underline"
                    >
                      Write a Review
                    </button>
                  </div>

                  <div className="space-y-3">
                    {book.reviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                            <span className="text-[10px] text-slate-400">• {rev.date}</span>
                          </div>
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < rev.rating ? 'fill-amber-400' : 'fill-slate-200 text-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <h5 className="text-xs font-bold text-slate-800 mb-1">{rev.title}</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
