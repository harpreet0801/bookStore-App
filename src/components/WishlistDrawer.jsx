import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Trash2, 
  Star, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

export default function WishlistDrawer() {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    books,
    toggleWishlist,
    addToCart,
    openModal,
    formatPrice
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistBooks = books.filter((b) => wishlist.includes(b.id));

  const handleMoveAllToCart = () => {
    wishlistBooks.forEach((book) => {
      addToCart(book, 'paperback', 1);
    });
    setIsWishlistOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="text-base font-bold text-slate-900 font-display">
              Saved Wishlist ({wishlistBooks.length})
            </h3>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistBooks.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-800 font-display">
                Your wishlist is empty
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Tap the heart icon on any title you love to save it for later or track sales.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-brand-600 transition"
              >
                Explore Books
              </button>
            </div>
          ) : (
            wishlistBooks.map((book) => (
              <div
                key={book.id}
                className="flex gap-4 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 relative group"
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-16 h-22 object-cover rounded-xl shadow-xs shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4
                        onClick={() => {
                          setIsWishlistOpen(false);
                          openModal('detail', book);
                        }}
                        className="text-xs font-bold text-slate-900 line-clamp-1 hover:text-brand-600 cursor-pointer"
                      >
                        {book.title}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(book)}
                        className="text-slate-400 hover:text-rose-600 p-0.5 transition"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-500 truncate">
                      by {book.author}
                    </p>

                    <div className="flex items-center gap-1 text-[11px] text-amber-500 mt-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-700">{book.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold text-slate-900">
                      {formatPrice(book.discountedPrice)}
                    </span>

                    <button
                      onClick={() => {
                        addToCart(book, 'paperback', 1);
                        toggleWishlist(book);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-brand-600 text-white text-[11px] font-semibold transition flex items-center gap-1.5 shadow-xs"
                    >
                      <ShoppingBag className="w-3 h-3 text-amber-200" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {wishlistBooks.length > 0 && (
          <div className="p-6 border-t border-slate-200 bg-slate-50/70 space-y-3 shrink-0">
            <button
              onClick={handleMoveAllToCart}
              className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-brand-600 text-white font-semibold text-xs shadow-md transition flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-amber-200" />
              <span>Move All to Shopping Bag</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
