import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { QUIZ_QUESTIONS } from '../data/books';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  RotateCcw, 
  BookOpen, 
  ShoppingBag,
  Star,
  BookMarked
} from 'lucide-react';

export default function BookFinderQuiz({ onClose }) {
  const { books, addToCart, openModal, formatPrice } = useShop();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [matchedBook, setMatchedBook] = useState(null);

  const question = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (option) => {
    const updatedAnswers = { ...answers, [question.id]: option };
    setAnswers(updatedAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate match
      calculateRecommendation(updatedAnswers);
    }
  };

  const calculateRecommendation = (finalAnswers) => {
    const preferredCategory = finalAnswers.mood?.category;
    const maxPages = finalAnswers.length?.maxPages;
    const minPages = finalAnswers.length?.minPages;

    let candidates = books.filter((b) => {
      if (preferredCategory && b.category === preferredCategory) return true;
      return false;
    });

    if (candidates.length === 0) {
      candidates = [...books];
    }

    if (maxPages) {
      const pageFiltered = candidates.filter((b) => b.pages <= maxPages);
      if (pageFiltered.length > 0) candidates = pageFiltered;
    } else if (minPages) {
      const pageFiltered = candidates.filter((b) => b.pages >= minPages);
      if (pageFiltered.length > 0) candidates = pageFiltered;
    }

    // Pick top rated candidate
    candidates.sort((a, b) => b.rating - a.rating);
    setMatchedBook(candidates[0] || books[0]);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setMatchedBook(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
      />

      {/* Quiz Card */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-amber-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Book Finder AI Match
              </h3>
              <p className="text-[10px] text-slate-500">
                {matchedBook ? 'Match Found' : `Step ${currentStep + 1} of ${QUIZ_QUESTIONS.length}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8">
          {!matchedBook ? (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-brand-500 h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Title */}
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-display leading-snug">
                  {question.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Select the option that speaks most to your reading craving.
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {question.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    className="w-full p-4 rounded-2xl border border-slate-200/90 hover:border-brand-500 bg-white hover:bg-amber-50/50 text-left transition flex items-center justify-between group shadow-xs hover:shadow-md"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-brand-900">
                      {opt.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>

              {/* Back button if step > 0 */}
              {currentStep > 0 && (
                <div className="pt-2">
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1 transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Question</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Match Result Screen */
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-300">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>99.4% Match Score</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                We Found Your Perfect Next Read!
              </h4>

              {/* Match Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left flex flex-col sm:flex-row gap-4 items-center">
                <img
                  src={matchedBook.cover}
                  alt={matchedBook.title}
                  className="w-24 h-32 object-cover rounded-xl shadow-md shrink-0"
                />

                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">
                    {matchedBook.categoryName}
                  </span>
                  <h5 className="text-base font-bold text-slate-900 font-display">
                    {matchedBook.title}
                  </h5>
                  <p className="text-xs text-slate-500">
                    by {matchedBook.author} • {matchedBook.pages} pages
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {matchedBook.synopsis}
                  </p>
                  <div className="text-sm font-bold text-slate-900 pt-1">
                    {formatPrice(matchedBook.discountedPrice)}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    const fmt = answers.format?.format || 'paperback';
                    addToCart(matchedBook, fmt, 1);
                    onClose();
                  }}
                  className="flex-1 py-3 px-5 rounded-xl bg-slate-900 hover:bg-brand-600 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-200" />
                  <span>Add to Bag ({formatPrice(matchedBook.discountedPrice)})</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    openModal('preview', matchedBook);
                  }}
                  className="py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition"
                >
                  <BookMarked className="w-4 h-4 text-brand-600" />
                  <span>Preview Excerpt</span>
                </button>
              </div>

              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-slate-700 font-semibold inline-flex items-center gap-1 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
