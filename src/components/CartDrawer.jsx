import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { FORMAT_DETAILS } from '../data/books';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  Tag, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    discountAmount,
    shippingFee,
    estimatedTax,
    cartTotal,
    freeShippingRemaining,
    FREE_SHIPPING_THRESHOLD,
    formatPrice,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    openModal
  } = useShop();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    if (applyPromoCode(promoInput)) {
      setPromoInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    openModal('checkout');
  };

  const progressPercent = Math.min(
    100,
    ((FREE_SHIPPING_THRESHOLD - freeShippingRemaining) / FREE_SHIPPING_THRESHOLD) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-600" />
            <h3 className="text-base font-bold text-slate-900 font-display">
              Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Goal Bar */}
        <div className="p-4 bg-amber-50/70 border-b border-amber-100/80">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="flex items-center gap-1.5 text-slate-800">
              <Truck className="w-4 h-4 text-brand-600" />
              {freeShippingRemaining > 0 ? (
                <span>
                  Add <strong className="text-brand-700">{formatPrice(freeShippingRemaining)}</strong> more for <strong>Free Shipping</strong>
                </span>
              ) : (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> You’ve unlocked FREE Standard Shipping!
                </span>
              )}
            </span>
            <span className="text-[11px] text-slate-500 font-semibold">{Math.round(progressPercent)}%</span>
          </div>

          <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                freeShippingRemaining === 0 ? 'bg-emerald-500' : 'bg-brand-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-brand-500 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-800 font-display">
                Your shopping bag is empty
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Discover our curated bestsellers, fiction marvels, and thought-provoking non-fiction.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-brand-600 transition"
              >
                Browse Books
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                className="flex gap-4 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/70 relative group"
              >
                <img
                  src={item.book.cover}
                  alt={item.book.title}
                  className="w-16 h-22 object-cover rounded-xl shadow-xs shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1 leading-snug">
                        {item.book.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-slate-400 hover:text-rose-600 p-0.5 transition"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-500 truncate">
                      by {item.book.author}
                    </p>

                    <span className="inline-block px-2 py-0.5 mt-1 rounded bg-slate-200/70 text-[10px] font-semibold text-slate-700 uppercase tracking-wider">
                      {FORMAT_DETAILS[item.format]?.label || item.format}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold text-slate-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>

                    {/* Stepper */}
                    <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="p-1 hover:bg-slate-100 text-slate-600 transition rounded-l"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="p-1 hover:bg-slate-100 text-slate-600 transition rounded-r"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Checkout & Summary Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-200 bg-slate-50/70 space-y-4 shrink-0">
            {/* Promo Code Input */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Promo: <strong>{appliedPromo.code}</strong> applied</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-rose-600 hover:text-rose-800 font-bold text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. READ20)"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-brand-600 transition"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Calculations breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">{formatPrice(cartSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : formatPrice(shippingFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span>{formatPrice(estimatedTax)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200 font-display">
                <span>Total</span>
                <span className="text-base text-brand-700">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-brand-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
