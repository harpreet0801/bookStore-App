import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { FORMAT_DETAILS } from '../data/books';
import { 
  Heart, 
  ShoppingBag, 
  Eye, 
  Star, 
  BookOpen, 
  Sparkles, 
  Flame, 
  Check, 
  BookMarked
} from 'lucide-react';

export default function BookCard({ book, view = 'grid' }) {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    openModal,
    formatPrice,
    calculateFormatPrice
  } = useShop();

  const [selectedFormat, setSelectedFormat] = useState('paperback');
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isInWishlist(book.id);
  const currentPrice = calculateFormatPrice(book.discountedPrice, selectedFormat);
  const originalPrice = calculateFormatPrice(book.basePrice, selectedFormat);

  // List View layout
  if (view === 'list') {
    return (
      <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-brand-300 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 shadow-xs hover:shadow-lg transition-all duration-300">
        {/* Cover with 3D spine */}
        <div className="relative shrink-0 w-full sm:w-36 aspect-[3/4] rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition duration-300 bg-slate-100">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {book.isBestseller && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-white shadow-xs">
                Bestseller
              </span>
            )}
            {book.isStaffPick && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-brand-600 text-white shadow-xs">
                Staff Pick
              </span>
            )}
          </div>

          <button
            onClick={() => toggleWishlist(book)}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-sm backdrop-blur transition hover:scale-110"
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'text-rose-500 fill-rose-500' : 'text-slate-600'}`} />
          </button>
        </div>

        {/* Info & Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[11px] font-semibold text-brand-600 uppercase tracking-wider">
                {book.categoryName}
              </span>
              <div className="flex items-center gap-1 text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-800">{book.rating}</span>
                <span className="text-slate-400">({book.ratingCount})</span>
              </div>
            </div>

            <h3 
              onClick={() => openModal('detail', book)}
              className="text-lg font-bold text-slate-900 font-display hover:text-brand-600 transition cursor-pointer leading-snug line-clamp-1"
            >
              {book.title}
            </h3>
            
            <p className="text-xs text-slate-500 mt-0.5">
              by <span className="font-medium text-slate-700">{book.author}</span>
            </p>

            <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
              {book.synopsis}
            </p>

            {/* Formats Selection */}
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              {Object.keys(FORMAT_DETAILS).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition capitalize font-medium ${
                    selectedFormat === fmt
                      ? 'border-brand-500 bg-brand-50 text-brand-800 font-semibold'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900 font-display">
                {formatPrice(currentPrice)}
              </span>
              {originalPrice > currentPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
              {book.discount > 0 && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {book.discount}% OFF
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openModal('preview', book)}
                className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition"
              >
                <BookMarked className="w-3.5 h-3.5 text-brand-600" />
                <span>Look Inside</span>
              </button>

              <button
                onClick={() => openModal('detail', book)}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition"
              >
                Quick View
              </button>

              <button
                onClick={() => addToCart(book, selectedFormat, 1)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-brand-600 text-white text-xs font-semibold shadow-sm hover:shadow transition flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View layout (Default card)
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-brand-300 p-3.5 sm:p-4 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300"
    >
      {/* Top Cover Image Area */}
      <div>
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md group-hover:shadow-2xl transition duration-300 bg-slate-100 mb-3.5">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {book.isBestseller && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-white shadow-xs">
                Bestseller
              </span>
            )}
            {book.isStaffPick && !book.isBestseller && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-brand-600 text-white shadow-xs">
                Staff Pick
              </span>
            )}
            {book.isNewRelease && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-600 text-white shadow-xs">
                New
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(book)}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-sm backdrop-blur transition hover:scale-110 z-10"
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'text-rose-500 fill-rose-500' : 'text-slate-600'}`} />
          </button>

          {/* Quick Hover Overlay with "Look Inside" and "Quick View" */}
          <div className={`absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex flex-col items-center justify-center gap-2 p-3 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <button
              onClick={() => openModal('preview', book)}
              className="w-full max-w-[160px] py-2 px-3 rounded-lg bg-white/90 hover:bg-white text-slate-900 text-xs font-semibold flex items-center justify-center gap-1.5 shadow transition transform hover:-translate-y-0.5"
            >
              <BookMarked className="w-3.5 h-3.5 text-brand-600" />
              <span>Look Inside</span>
            </button>
            <button
              onClick={() => openModal('detail', book)}
              className="w-full max-w-[160px] py-2 px-3 rounded-lg bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow transition transform hover:-translate-y-0.5"
            >
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Metadata */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-brand-600 uppercase tracking-wider truncate max-w-[140px]">
              {book.categoryName}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-800">{book.rating}</span>
              <span className="text-slate-400">({book.ratingCount})</span>
            </div>
          </div>

          <h3 
            onClick={() => openModal('detail', book)}
            className="text-sm font-bold text-slate-900 font-display hover:text-brand-600 transition cursor-pointer leading-snug line-clamp-1"
            title={book.title}
          >
            {book.title}
          </h3>

          <p className="text-xs text-slate-500 truncate">
            by {book.author}
          </p>
        </div>

        {/* Format Selector Pills */}
        <div className="grid grid-cols-4 gap-1 mt-3">
          {Object.keys(FORMAT_DETAILS).map((fmt) => (
            <button
              key={fmt}
              onClick={() => setSelectedFormat(fmt)}
              className={`text-[10px] py-1 rounded border text-center transition capitalize font-medium ${
                selectedFormat === fmt
                  ? 'border-brand-500 bg-brand-50 text-brand-800 font-bold'
                  : 'border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              {fmt === 'audiobook' ? 'Audio' : fmt === 'hardcover' ? 'Hard' : fmt === 'paperback' ? 'Paper' : 'eBook'}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Pricing & Add to Cart */}
      <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-slate-900 font-display">
              {formatPrice(currentPrice)}
            </span>
            {originalPrice > currentPrice && (
              <span className="text-[11px] text-slate-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => addToCart(book, selectedFormat, 1)}
          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900 hover:bg-brand-600 text-white text-xs font-semibold shadow-xs hover:shadow transition flex items-center gap-1.5"
          title="Add to Shopping Bag"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-amber-200" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
    </div>
  );
}
