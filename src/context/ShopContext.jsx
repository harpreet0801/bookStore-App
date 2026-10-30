import React, { createContext, useContext, useState, useEffect } from 'react';
import { BOOKS, PROMO_CODES, FORMAT_DETAILS } from '../data/books';

const ShopContext = createContext(null);

const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
  CAD: { code: 'CAD', symbol: 'CA$', rate: 1.35 },
};

const FREE_SHIPPING_THRESHOLD = 35.0;

export function ShopProvider({ children }) {
  // Cart state persisted in localStorage for great demo UX
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('bookstore_cart');
      return saved ? JSON.parse(saved) : [
        {
          cartItemId: 'book-1-paperback',
          bookId: 'book-1',
          book: BOOKS[0],
          format: 'paperback',
          price: BOOKS[0].discountedPrice,
          quantity: 1,
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('bookstore_wishlist');
      return saved ? JSON.parse(saved) : ['book-1', 'book-3'];
    } catch {
      return ['book-1', 'book-3'];
    }
  });

  // User reviews state
  const [booksState, setBooksState] = useState(BOOKS);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [minRating, setMinRating] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Modals and Drawers
  const [activeModal, setActiveModal] = useState(null); // { type, data }
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Currency & Promo
  const [currency, setCurrency] = useState('USD');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('bookstore_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('bookstore_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openModal = (type, data = null) => {
    setActiveModal({ type, data });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const calculateFormatPrice = (baseDiscountedPrice, format) => {
    const mult = FORMAT_DETAILS[format]?.multiplier || 1.0;
    return Number((baseDiscountedPrice * mult).toFixed(2));
  };

  const addToCart = (book, format = 'paperback', quantity = 1) => {
    const unitPrice = calculateFormatPrice(book.discountedPrice, format);
    const cartItemId = `${book.id}-${format}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            bookId: book.id,
            book,
            format,
            price: unitPrice,
            quantity,
          },
        ];
      }
    });

    addToast(`"${book.title}" (${FORMAT_DETAILS[format]?.label || format}) added to cart!`, 'success');
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    addToast('Item removed from cart', 'info');
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (book) => {
    const exists = wishlist.includes(book.id);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== book.id));
      addToast(`Removed "${book.title}" from your wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, book.id]);
      addToast(`Saved "${book.title}" to wishlist!`, 'success');
    }
  };

  const isInWishlist = (bookId) => {
    return wishlist.includes(bookId);
  };

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (PROMO_CODES[cleanCode]) {
      const promo = PROMO_CODES[cleanCode];
      if (promo.minOrder && cartSubtotal < promo.minOrder) {
        addToast(`Code ${cleanCode} requires a minimum order of $${promo.minOrder}`, 'error');
        return false;
      }
      setAppliedPromo({ code: cleanCode, ...promo });
      addToast(`Promo code "${cleanCode}" applied! ${promo.description}`, 'success');
      return true;
    } else {
      addToast('Invalid promo code. Try "READ20" or "BOOKWORM"', 'error');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    addToast('Promo code removed', 'info');
  };

  const addReview = (bookId, newReview) => {
    setBooksState((prev) =>
      prev.map((b) => {
        if (b.id === bookId) {
          const updatedReviews = [
            {
              id: 'rev-' + Date.now(),
              date: 'Just now',
              ...newReview,
            },
            ...b.reviews,
          ];
          const newAvg = Number(
            (
              updatedReviews.reduce((acc, r) => acc + r.rating, 0) /
              updatedReviews.length
            ).toFixed(1)
          );
          return {
            ...b,
            rating: newAvg,
            ratingCount: b.ratingCount + 1,
            reviews: updatedReviews,
          };
        }
        return b;
      })
    );
    addToast('Thank you for reviewing! Your feedback was published.', 'success');
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 50]);
    setMinRating(0);
    setSelectedFormat('all');
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('popular');
  };

  // Calculations
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent) {
      discountAmount = (cartSubtotal * appliedPromo.discountPercent) / 100;
    } else if (appliedPromo.discountFixed) {
      discountAmount = Math.min(appliedPromo.discountFixed, cartSubtotal);
    }
  }

  const isFreeShipping =
    appliedPromo?.freeShipping || cartSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = cart.length === 0 || isFreeShipping ? 0 : 4.99;
  const estimatedTax = (cartSubtotal - discountAmount) * 0.08; // 8% sales tax mock
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee + (cart.length > 0 ? estimatedTax : 0));
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const formatPrice = (amountInUSD) => {
    const cur = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = amountInUSD * cur.rate;
    return `${cur.symbol}${converted.toFixed(2)}`;
  };

  return (
    <ShopContext.Provider
      value={{
        books: booksState,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        searchQuery,
        setSearchQuery,
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
        sortBy,
        setSortBy,
        viewMode,
        setViewMode,
        resetFilters,
        activeModal,
        openModal,
        closeModal,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isMobileFilterOpen,
        setIsMobileFilterOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        currency,
        setCurrency,
        currencies: CURRENCIES,
        formatPrice,
        calculateFormatPrice,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        cartItemCount,
        cartSubtotal,
        discountAmount,
        shippingFee,
        estimatedTax,
        cartTotal,
        freeShippingRemaining,
        FREE_SHIPPING_THRESHOLD,
        lastOrder,
        setLastOrder,
        addReview,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
