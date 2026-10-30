import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  BookOpen, 
  Sun, 
  Moon, 
  Coffee, 
  Type, 
  ShoppingBag, 
  ChevronRight, 
  ChevronLeft,
  Sparkles
} from 'lucide-react';

export default function SampleReaderModal({ book, onClose }) {
  const { addToCart, formatPrice } = useShop();

  const [readerTheme, setReaderTheme] = useState('sepia'); // 'light' | 'sepia' | 'dark'
  const [fontSize, setFontSize] = useState(18); // in px
  const [fontFamily, setFontFamily] = useState('serif'); // 'serif' | 'sans'

  if (!book || !book.sampleChapter) return null;

  const themeStyles = {
    light: 'bg-white text-slate-800 border-slate-200',
    sepia: 'bg-[#fbf0d9] text-[#433422] border-[#ebd4b4]',
    dark: 'bg-[#181a1b] text-[#e8e6e3] border-[#2f3437]'
  };

  const handleBuy = () => {
    addToCart(book, 'paperback', 1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
      />

      {/* Reader Container */}
      <div className={`relative w-full max-w-3xl rounded-3xl shadow-2xl border overflow-hidden z-10 flex flex-col max-h-[92vh] transition-colors duration-200 ${themeStyles[readerTheme]}`}>
        
        {/* Top Reader Controls Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-inherit/40 bg-black/5 shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 opacity-70" />
            <span className="text-xs font-bold uppercase tracking-wider opacity-80">
              Sample Chapter Preview
            </span>
          </div>

          {/* Theme & Typography Controls */}
          <div className="flex items-center gap-3">
            {/* Theme switcher */}
            <div className="flex items-center gap-1 bg-black/5 p-1 rounded-xl">
              <button
                onClick={() => setReaderTheme('light')}
                className={`p-1.5 rounded-lg transition ${
                  readerTheme === 'light' ? 'bg-white shadow text-slate-900' : 'opacity-60 hover:opacity-100'
                }`}
                title="Light paper"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setReaderTheme('sepia')}
                className={`p-1.5 rounded-lg transition ${
                  readerTheme === 'sepia' ? 'bg-[#ebd4b4] shadow text-[#433422]' : 'opacity-60 hover:opacity-100'
                }`}
                title="Sepia warm"
              >
                <Coffee className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setReaderTheme('dark')}
                className={`p-1.5 rounded-lg transition ${
                  readerTheme === 'dark' ? 'bg-[#2f3437] shadow text-white' : 'opacity-60 hover:opacity-100'
                }`}
                title="Night dark"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Font Size controls */}
            <div className="flex items-center gap-1 bg-black/5 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setFontSize((s) => Math.max(14, s - 2))}
                className="px-2 py-1 rounded hover:bg-black/10 transition"
                title="Decrease font"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize((s) => Math.min(26, s + 2))}
                className="px-2 py-1 rounded hover:bg-black/10 transition"
                title="Increase font"
              >
                A+
              </button>
            </div>

            {/* Font switch */}
            <button
              onClick={() => setFontFamily(f => f === 'serif' ? 'sans' : 'serif')}
              className="text-xs font-semibold px-2 py-1 rounded-xl bg-black/5 hover:bg-black/10 transition"
            >
              {fontFamily === 'serif' ? 'Serif' : 'Sans'}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-black/10 transition ml-2"
              aria-label="Close reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Book Content */}
        <div className="p-8 sm:p-14 overflow-y-auto flex-1 space-y-6">
          <div className="text-center pb-6 border-b border-inherit/20 max-w-md mx-auto">
            <span className="text-xs uppercase tracking-widest font-bold opacity-60">
              {book.sampleChapter.chapterNum}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display mt-1 mb-2">
              {book.sampleChapter.title}
            </h2>
            <p className="text-xs italic opacity-75">
              From <strong className="font-semibold">{book.title}</strong> by {book.author}
            </p>
          </div>

          <div 
            className={`space-y-6 max-w-xl mx-auto leading-relaxed ${
              fontFamily === 'serif' ? 'font-reading' : 'font-sans'
            }`}
            style={{ fontSize: `${fontSize}px` }}
          >
            {book.sampleChapter.content.map((para, i) => (
              <p key={i} className="text-justify indent-6">
                {para}
              </p>
            ))}
          </div>

          {/* End of Excerpt Notice */}
          <div className="pt-10 pb-4 text-center max-w-md mx-auto">
            <div className="p-5 rounded-2xl bg-black/5 border border-inherit/30 space-y-3">
              <Sparkles className="w-6 h-6 text-brand-500 mx-auto" />
              <h4 className="text-sm font-bold font-display">
                You’ve finished the free sample excerpt!
              </h4>
              <p className="text-xs opacity-75 leading-relaxed">
                Unlock all {book.pages} pages of this spellbinding story. Order the physical edition or download the instant digital copy.
              </p>
              <button
                onClick={handleBuy}
                className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-amber-200" />
                <span>Get Full Book for {formatPrice(book.discountedPrice)}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
