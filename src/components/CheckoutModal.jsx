import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Gift
} from 'lucide-react';

export default function CheckoutModal({ onClose }) {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    estimatedTax,
    cartTotal,
    formatPrice,
    clearCart,
    openModal,
    setLastOrder
  } = useShop();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Delivery & Options, 3: Payment
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace',
    city: 'Seattle',
    state: 'WA',
    zip: '98101',
    country: 'United States',
    shippingMethod: 'standard', // 'standard' | 'express' | 'priority'
    isGift: false,
    giftMessage: '',
    paymentMethod: 'card', // 'card' | 'paypal' | 'applepay'
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/26',
    cardCvc: '888',
    cardName: 'Eleanor Vance'
  });

  const handleAutofillDemo = () => {
    setFormData({
      firstName: 'Jane',
      lastName: 'Austen',
      email: 'jane.austen@literarydemo.com',
      phone: '+1 (415) 890-1234',
      address: '14 Pemberley Way',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
      country: 'United States',
      shippingMethod: 'standard',
      isGift: true,
      giftMessage: 'Happy reading! Enjoy this wonderful adventure.',
      paymentMethod: 'card',
      cardNumber: '•••• •••• •••• 8899',
      cardExp: '08/28',
      cardCvc: '742',
      cardName: 'Jane Austen'
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const shippingOptionPrices = {
    standard: shippingFee,
    express: 8.99,
    priority: 14.99
  };

  const currentShippingCost = shippingOptionPrices[formData.shippingMethod];
  const finalCalculatedTotal = Math.max(
    0,
    cartSubtotal - discountAmount + currentShippingCost + estimatedTax
  );

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = 'BK-' + Math.floor(100000 + Math.random() * 900000);
      const orderDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      const orderSummary = {
        orderId,
        orderDate,
        items: [...cart],
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        subtotal: cartSubtotal,
        discount: discountAmount,
        shipping: currentShippingCost,
        tax: estimatedTax,
        total: finalCalculatedTotal,
        paymentMethod: formData.paymentMethod,
        isGift: formData.isGift,
        giftMessage: formData.giftMessage
      };

      setLastOrder(orderSummary);
      clearCart();
      setIsSubmitting(false);
      onClose();
      openModal('orderSuccess', orderSummary);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 max-h-[94vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header with Steps */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Secure Express Checkout
              </h3>
              <p className="text-[10px] text-slate-400">256-Bit Encrypted Order</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAutofillDemo}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 transition flex items-center gap-1"
              title="Auto-fill sample data"
            >
              <Sparkles className="w-3 h-3 text-brand-600" />
              <span>Demo Fill</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-3 border-b border-slate-100 text-center text-xs font-semibold">
          {[
            { num: 1, label: '1. Shipping Address' },
            { num: 2, label: '2. Delivery & Options' },
            { num: 3, label: '3. Payment' },
          ].map((st) => (
            <div
              key={st.num}
              className={`py-2.5 border-b-2 transition ${
                step === st.num
                  ? 'border-brand-600 text-brand-700 bg-amber-50/30 font-bold'
                  : step > st.num
                  ? 'border-emerald-500 text-emerald-700'
                  : 'border-transparent text-slate-400'
              }`}
            >
              {st.label}
            </div>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: Shipping Address */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Contact & Delivery Details
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Email for Receipt & Tracking</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Street Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">State / Province</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="zip"
                    required
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-3 px-6 rounded-xl bg-slate-900 hover:bg-brand-600 text-white font-semibold text-xs shadow transition flex items-center gap-1.5"
                >
                  <span>Continue to Delivery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Delivery & Gift Options */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Select Delivery Speed
                </h4>
                <div className="space-y-2">
                  {[
                    { id: 'standard', title: 'Standard Courier (3-5 business days)', price: shippingFee === 0 ? 'FREE' : formatPrice(shippingFee) },
                    { id: 'express', title: 'Express Tracked (2 business days)', price: formatPrice(8.99) },
                    { id: 'priority', title: 'Next-Day Priority Air', price: formatPrice(14.99) },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition ${
                        formData.shippingMethod === option.id
                          ? 'border-brand-500 bg-brand-50/60 ring-1 ring-brand-500'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value={option.id}
                          checked={formData.shippingMethod === option.id}
                          onChange={handleInputChange}
                          className="accent-brand-500"
                        />
                        <span className="text-xs font-semibold text-slate-800">
                          {option.title}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        {option.price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gift message option */}
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isGift"
                    checked={formData.isGift}
                    onChange={handleInputChange}
                    className="rounded accent-brand-500"
                  />
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Gift className="w-3.5 h-3.5 text-brand-600" />
                    <span>This order is a gift (Includes decorative ribbon & card)</span>
                  </div>
                </label>

                {formData.isGift && (
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Personal Gift Note
                    </label>
                    <textarea
                      name="giftMessage"
                      value={formData.giftMessage}
                      onChange={handleInputChange}
                      placeholder="Write your custom greeting for the recipient..."
                      rows={2}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Address</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="py-3 px-6 rounded-xl bg-slate-900 hover:bg-brand-600 text-white font-semibold text-xs shadow transition flex items-center gap-1.5"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Method */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Payment Method
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'paypal', label: 'PayPal', icon: ShieldCheck },
                    { id: 'applepay', label: 'Apple Pay', icon: Lock },
                  ].map((pay) => {
                    const Icon = pay.icon;
                    return (
                      <button
                        key={pay.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: pay.id })}
                        className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${
                          formData.paymentMethod === pay.id
                            ? 'border-brand-500 bg-brand-50/70 text-brand-900 font-bold ring-1 ring-brand-500'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-brand-600" />
                        <span className="text-[11px] font-semibold">{pay.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      required
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-mono focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                      <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">Expiration</label>
                      <input
                        type="text"
                        name="cardExp"
                        required
                        value={formData.cardExp}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-mono focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        name="cardCvc"
                        maxLength={4}
                        required
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-mono focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order total summary before confirmation */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Shipping ({formData.shippingMethod})</span>
                  <span>{currentShippingCost === 0 ? 'FREE' : formatPrice(currentShippingCost)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Sales Tax</span>
                  <span>{formatPrice(estimatedTax)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-amber-200 font-display">
                  <span>Final Total</span>
                  <span className="text-base text-brand-700">{formatPrice(finalCalculatedTotal)}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-3 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3.5 px-8 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-lg hover:shadow-xl transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Place Order ({formatPrice(finalCalculatedTotal)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </form>

      </div>
    </div>
  );
}
