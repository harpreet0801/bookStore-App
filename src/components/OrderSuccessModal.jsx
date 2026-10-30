import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  MapPin, 
  Calendar, 
  X, 
  Printer, 
  ArrowRight,
  BookOpen,
  Sparkles
} from 'lucide-react';

export default function OrderSuccessModal({ order, onClose }) {
  const { formatPrice } = useShop();

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 max-h-[94vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-br from-brand-600 via-amber-800 to-slate-900 text-white text-center relative overflow-hidden shrink-0">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8 text-amber-300" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display">
            Thank You for Your Order!
          </h3>
          <p className="text-xs text-amber-200/90 mt-1">
            Order Reference: <strong className="font-mono text-white tracking-wider">{order.orderId}</strong>
          </p>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Receipt Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800 text-xs">
          
          {/* Tracking Status Tracker */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              Fulfillment Status
            </h4>
            <div className="flex items-center justify-between relative">
              <div className="absolute top-3 left-4 right-4 h-0.5 bg-slate-200 -z-0" />
              <div className="flex flex-col items-center gap-1 z-10">
                <div className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-[10px] font-bold">
                  ✓
                </div>
                <span className="text-[10px] font-semibold text-slate-700">Confirmed</span>
              </div>
              <div className="flex flex-col items-center gap-1 z-10">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold animate-pulse">
                  2
                </div>
                <span className="text-[10px] font-semibold text-brand-600">Packing</span>
              </div>
              <div className="flex flex-col items-center gap-1 z-10">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-bold">
                  3
                </div>
                <span className="text-[10px] text-slate-400">Shipped</span>
              </div>
              <div className="flex flex-col items-center gap-1 z-10">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-bold">
                  4
                </div>
                <span className="text-[10px] text-slate-400">Delivered</span>
              </div>
            </div>
          </div>

          {/* Customer & Address Details */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-amber-50/40 border border-amber-100">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Recipient</span>
              <strong className="text-slate-900 block">{order.customerName}</strong>
              <span className="text-slate-500">{order.customerEmail}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Shipping Destination</span>
              <span className="text-slate-700 block">{order.shippingAddress}</span>
            </div>
          </div>

          {/* Purchased Items List */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
              Items in this Shipment ({order.items.length})
            </h4>
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.book.cover}
                      alt={item.book.title}
                      className="w-8 h-11 object-cover rounded shadow-xs shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">{item.book.title}</div>
                      <div className="text-slate-500 text-[11px]">
                        Qty: {item.quantity} • <span className="capitalize">{item.format}</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-slate-900 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Breakdown */}
          <div className="space-y-1.5 pt-2 border-t border-slate-200">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Promotional Discount</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Estimated Tax</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200 font-display">
              <span>Total Paid</span>
              <span className="text-base text-brand-700">{formatPrice(order.total)}</span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-brand-600 text-white font-semibold text-xs shadow transition flex items-center gap-1.5"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
