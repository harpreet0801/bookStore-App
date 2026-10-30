import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import BookCard from './BookCard';
import { 
  LayoutGrid, 
  List, 
  ArrowUpDown, 
  Sparkles, 
  SearchX, 
  SlidersHorizontal,
  Flame,
  Award,
  Zap,
  Bookmark
} from 'lucide-react';

export default function BookGrid() {
  const {
    books,
    searchQuery,
    selectedCategory,
    priceRange,
    minRating,
    selectedFormat,
    inStockOnly,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    resetFilters,
    setIsMobileFilterOpen
  } = useShop();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'bestsellers' | 'staff' | 'new'

  // Filter and sort computation
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = book.title.toLowerCase().includes(q);
          const matchAuthor = book.author.toLowerCase().includes(q);
          const matchCategory = book.categoryName.toLowerCase().includes(q);
          const matchSynopsis = book.synopsis.toLowerCase().includes(q);
          if (!matchTitle && !matchAuthor && !matchCategory && !matchSynopsis) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'all' && book.category !== selectedCategory) {
          return false;
        }

        // Quick Tab filter
        if (activeTab === 'bestsellers' && !book.isBestseller) return false;
        if (activeTab === 'staff' && !book.isStaffPick) return false;
        if (activeTab === 'new' && !book.isNewRelease) return false;

        // Price range
        if (book.discountedPrice > priceRange[1] || book.discountedPrice < priceRange[0]) {
          return false;
        }

        // Rating
        if (minRating > 0 && book.rating < minRating) {
          return false;
        }

        // In Stock
        if (inStockOnly && book.stockCount <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return a.discountedPrice - b.discountedPrice;
        }
        if (sortBy === 'price-high') {
          return b.discountedPrice - a.discountedPrice;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'newest') {
          return new Date(b.publishDate) - new Date(a.publishDate);
        }
        // default: popular / rating count
        return b.ratingCount - a.ratingCount;
      });
  }, [
    books,
    searchQuery,
    selectedCategory,
    activeTab,
    priceRange,
    minRating,
    selectedFormat,
    inStockOnly,
    sortBy,
  ]);

  return (
    <div className="flex-1 min-w-0">
      {/* Top Controls Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 mb-6 shadow-xs">
        
        {/* Curated Quick Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'all', label: 'All Catalog', icon: null },
              { id: 'bestsellers', label: 'Bestsellers', icon: Flame },
              { id: 'staff', label: 'Staff Picks', icon: Award },
              { id: 'new', label: 'New Releases', icon: Zap },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    isActive
                      ? 'bg-amber-100/70 text-amber-900 border border-amber-300/80'
                      : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-brand-600" />
            <span>Filters</span>
          </button>
        </div>

        {/* Lower Toolbar: Results Count, Sort, Grid/List Switcher */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-3">
          <div className="text-xs text-slate-500">
            Showing <strong className="text-slate-900 font-semibold">{filteredBooks.length}</strong> {filteredBooks.length === 1 ? 'book' : 'books'}
            {searchQuery && (
              <span> for "<strong className="text-brand-600">{searchQuery}</strong>"</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl py-1.5 pl-3 pr-8 focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer appearance-none font-medium"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
                <ArrowUpDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Grid / List View Toggle */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Grid view"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'list'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="List view"
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Book Grid or Empty State */}
      {filteredBooks.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5'
              : 'space-y-4'
          }
        >
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} view={viewMode} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-display mb-1">
            No matching books found
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            We couldn't find any books matching your specific search or filter criteria. Try broadening your filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-brand-600 text-white text-xs font-semibold shadow transition"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
