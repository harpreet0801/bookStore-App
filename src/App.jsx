import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import FilterSidebar from './components/FilterSidebar';
import BookGrid from './components/BookGrid';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import BookDetailModal from './components/BookDetailModal';
import SampleReaderModal from './components/SampleReaderModal';
import BookFinderQuiz from './components/BookFinderQuiz';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import ReviewsModal from './components/ReviewsModal';
import ToastContainer from './components/ToastContainer';
import Footer from './components/Footer';

function BookstoreApp() {
  const {
    activeModal,
    closeModal,
    isMobileFilterOpen,
    setIsMobileFilterOpen
  } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfaf7] text-slate-800">
      {/* Top Header */}
      <Header />

      {/* Hero Showcase & Promotional Slides */}
      <HeroBanner />

      {/* Main Catalog View with Sidebar & Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full pb-12">
        <div className="flex gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Book Catalog Grid */}
          <BookGrid />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-out Drawers */}
      <CartDrawer />
      <WishlistDrawer />

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <FilterSidebar
          isMobile={true}
          onClose={() => setIsMobileFilterOpen(false)}
        />
      )}

      {/* Modals Manager */}
      {activeModal?.type === 'detail' && (
        <BookDetailModal
          book={activeModal.data}
          onClose={closeModal}
        />
      )}

      {activeModal?.type === 'preview' && (
        <SampleReaderModal
          book={activeModal.data}
          onClose={closeModal}
        />
      )}

      {activeModal?.type === 'quiz' && (
        <BookFinderQuiz onClose={closeModal} />
      )}

      {activeModal?.type === 'checkout' && (
        <CheckoutModal onClose={closeModal} />
      )}

      {activeModal?.type === 'orderSuccess' && (
        <OrderSuccessModal
          order={activeModal.data}
          onClose={closeModal}
        />
      )}

      {activeModal?.type === 'review' && (
        <ReviewsModal
          book={activeModal.data}
          onClose={closeModal}
        />
      )}

      {/* Toast Notification Stack */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <BookstoreApp />
    </ShopProvider>
  );
}
