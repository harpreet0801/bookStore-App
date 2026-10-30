import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES, FORMAT_DETAILS } from '../data/books';
import { 
  Filter, 
  RotateCcw, 
  Star, 
  Check, 
  X, 
  SlidersHorizontal,
  Sparkles,
  BookOpen
} from 'lucide-react';

export default function FilterSidebar({ isMobile = false, onClose = () => {} }) {
  const {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    selectedFormat,
    setSelectedFormat,
    inStockOnly,
    setInStockOnly,
    resetFilters,
    books,
    formatPrice
  } = useShop();

  // Compute category counts
  const getCategoryCount = (catId) => {
    if (catId === 'all') return books.length;
    return books.filter((b) => b.category === catId).length;
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    priceRange[1] < 50 ||
    priceRange[0] > 0 ||
    minRating > 0 ||
    selectedFormat !== 'all' ||
    inStockOnly;

  const content = (
    <div className="space-y-6">
      {/* Header with Clear Button */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-600" />
          <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
            Filter Books
          </h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 font-semibold transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          Genres & Categories
        </h4>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = getCategoryCount(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                  isSelected
                    ? 'bg-brand-500 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200/60 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Format Filter */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          Book Format
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setSelectedFormat('all')}
            className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition ${
              selectedFormat === 'all'
                ? 'border-brand-500 bg-brand-50 text-brand-700 font-semibold'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            All Formats
          </button>
          {Object.entries(FORMAT_DETAILS).map(([key, item]) => {
            const isSelected = selectedFormat === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedFormat(key)}
                className={`px-3 py-2 rounded-xl text-xs font-medium border text-left truncate transition ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50 text-brand-700 font-semibold'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
                title={item.label}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Slider */}
      <div className="pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Max Price
          </h4>
          <span className="text-xs font-bold text-brand-600">
            {formatPrice(priceRange[1])}
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="50"
          step="1"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-brand-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>{formatPrice(10)}</span>
          <span>{formatPrice(50)}</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          Customer Rating
        </h4>
        <div className="space-y-1.5">
          {[
            { value: 0, label: 'All Ratings' },
            { value: 4.8, label: '4.8 & Above' },
            { value: 4.5, label: '4.5 & Above' },
            { value: 4.0, label: '4.0 & Above' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setMinRating(option.value)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition ${
                minRating === option.value
                  ? 'bg-amber-50 text-brand-800 font-semibold border border-amber-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {option.value > 0 && (
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                )}
                <span>{option.label}</span>
              </div>
              {minRating === option.value && (
                <Check className="w-3.5 h-3.5 text-brand-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* In Stock Only Checkbox */}
      <div className="pt-4 border-t border-slate-200">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 accent-brand-500 cursor-pointer"
          />
          <span className="text-xs font-medium text-slate-700">
            In-Stock Titles Only
          </span>
        </label>
      </div>

      {/* Staff Guarantee Badge */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
        <div className="flex items-center gap-2 text-brand-700 text-xs font-bold mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Curator's Promise</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          Every edition in our collection is handpicked and inspected for binding quality and archival paper durability.
        </p>
      </div>
    </div>
  );

  // If Mobile Drawer Mode
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 flex">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        />

        {/* Slide-in sidebar */}
        <div className="relative ml-auto w-full max-w-xs h-full bg-white shadow-2xl flex flex-col p-6 overflow-y-auto z-10">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
            <h3 className="text-base font-bold text-slate-900 font-display">Filter Books</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1">
            {content}
          </div>

          <div className="pt-4 mt-6 border-t border-slate-200">
            <button
              onClick={onClose}
              className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-brand-600 transition"
            >
              Show Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Static Sidebar
  return (
    <aside className="w-64 shrink-0 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs h-fit sticky top-28">
      {content}
    </aside>
  );
}
