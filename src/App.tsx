/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { ProductCard } from "./components/ProductCard";
import { Customizer } from "./components/Customizer";
import { CraftHistory } from "./components/CraftHistory";
import { ReviewsAndFAQ } from "./components/ReviewsAndFAQ";
import { CartDrawer } from "./components/CartDrawer";

import { CapProduct, CartItem, ColorOption, CustomCapConfig, Review } from "./types";
import { PRODUCTS, REVIEWS } from "./data";

import { Sparkles, ShoppingBag, ArrowUpRight, ArrowLeft, ShieldCheck, MapPin, Heart, ChevronRight, MessageSquareQuote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Register all 5 generated premium high-resolution assets
const BANNERS = [
  "/src/assets/images/topi_banner.png",
  "/src/assets/images/shilajit_banner.png",
  "/src/assets/images/winter_sale_banner.png",
  "/src/assets/images/heritage_banner.png"
];

const BANNER_CAPTIONS = [
  {
    title: "Chitrali Pakol & Topi",
    subtitle: "Your crowning honor, handspun directly in the mountains.",
    action: "Explore Caps"
  },
  {
    title: "Pure Golden Shilajit",
    subtitle: "Organic, cold-refined mountain resin carrying 85+ vital trace elements.",
    action: "Discover Herbs"
  },
  {
    title: "Grand Autumn Winter Sale",
    subtitle: "Limited time 50% privilege on selected handspun wool lots.",
    action: "Secure Offer"
  },
  {
    title: "Our Heritage, Your Style",
    subtitle: "Every thread tells a centuries-old story of Himalayan artisans.",
    action: "Our Weavers"
  }
];

const craftsmanImg = "/src/assets/images/craftsman_making_topi.png";
const qazeenLogo = "/src/assets/images/qazeen_logo.png";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([
    // Preload a starter item so they can instantly check the cart drawer mechanics!
    {
      id: "royal-neelam-ivory-Royal Ivory White-L (59-60cm)-true",
      product: PRODUCTS[0],
      selectedColor: { name: "Royal Ivory White (سیفد)", hex: "#F3F4F1", bgClass: "bg-[#F3F4F1]" },
      selectedSize: "L (59-60cm)",
      addFeather: true,
      featherPrice: 0,
      quantity: 1
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [currency, setCurrency] = useState<string>("USD");
  
  // Tab routing states
  const [activeTab, setActiveTab] = useState<string>("home");

  // Mouse/Touch Drag-sliding states
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX === null) return;
    const diff = e.clientX - dragStartX;
    if (diff > 60) {
      setActiveBannerIdx((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
    } else if (diff < -60) {
      setActiveBannerIdx((prev) => (prev + 1) % BANNERS.length);
    }
    setDragStartX(null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 60) {
      setActiveBannerIdx((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
    } else if (diff < -60) {
      setActiveBannerIdx((prev) => (prev + 1) % BANNERS.length);
    }
    setTouchStartX(null);
  };

  // Adaptive slide state
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);
  
  // Dedicated page view for "New Arrivals" to keep build 100% robust and clean
  const [isNewArrivalsPageOpen, setIsNewArrivalsPageOpen] = useState(false);

  // References for scrolling
  const hatsSectionRef = useRef<HTMLDivElement>(null);
  const ingredientsSectionRef = useRef<HTMLDivElement>(null);
  const customizerSectionRef = useRef<HTMLDivElement>(null);
  const storySectionRef = useRef<HTMLDivElement>(null);

  // Auto sliding interval effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBannerIdx((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // E-commerce handlers
  const handleAddToCart = (product: CapProduct, color: ColorOption, size: string, addFeather: boolean) => {
    const itemId = `${product.id}-${color.name}-${size}-${addFeather}`;
    
    // Check if duplicate item exists
    const existsIdx = cart.findIndex((i) => i.id === itemId);
    if (existsIdx >= 0) {
      const updated = [...cart];
      updated[existsIdx].quantity += 1;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        id: itemId,
        product,
        selectedColor: color,
        selectedSize: size,
        addFeather,
        featherPrice: 8, // Standard feather add-on fee
        quantity: 1,
      };
      setCart([...cart, newItem]);
    }
    setIsCartOpen(true); // Automatically slide open cart drawer for beautiful visual feedback
  };

  // Customs Order Handler
  const handleAddCustomToCart = (config: CustomCapConfig, calculatedPriceUSD: number) => {
    const customProductFake: CapProduct = {
      id: `custom-design-${Date.now()}`,
      name: `Bespoke Custom Woolen Cap`,
      urduName: `چترالی شاہکار - باریش`,
      description: `Bespoke custom-made cap specifying metal ${config.metalAccent.toUpperCase()} pin, ${config.featherType.toUpperCase()} feather accent, and custom monogram lining: "${config.monogramText || "None"}"`,
      price: calculatedPriceUSD,
      rating: 5.0,
      reviewsCount: 1,
      colors: [config.baseColor],
      sizes: [config.selectedSize],
      imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop",
    };

    const itemId = `custom-cap-${Date.now()}`;
    const customCartItem: CartItem = {
      id: itemId,
      product: customProductFake,
      selectedColor: config.baseColor,
      selectedSize: config.selectedSize,
      addFeather: config.featherType !== "none",
      featherPrice: 0, // already compiled in base calculations
      quantity: 1,
    };

    setCart([...cart, customCartItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQty = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart(cart.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item)));
  };

  const handleRemoveItem = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const handleAddReview = (newRev: Review) => {
    setReviewsList([newRev, ...reviewsList]);
  };

  // Categorized catalogs Lists
  const pakolList = PRODUCTS.filter(p => p.category === "pakol" || !p.category);
  const chogaList = PRODUCTS.filter(p => p.category === "choga");
  const waistcoatList = PRODUCTS.filter(p => p.category === "waistcoat");
  const shawlList = PRODUCTS.filter(p => p.category === "shawl");
  const coatList = PRODUCTS.filter(p => p.category === "coat");
  const ingredientsList = PRODUCTS.filter(p => p.category === "ingredients");
  
  // Gather 4 items representing the newest arrivals from both catalogs
  const newArrivalsList = [
    PRODUCTS[4], // Ceremonial Crimson Heritage Cap
    PRODUCTS[5], // Pure Himalayan Shilajit
    PRODUCTS[6], // Valley Wild Thyme Honey
    PRODUCTS[9], // Royal Chitral Gold Saffron
  ];

  return (
    <div className="min-h-screen bg-[#f7f5f2] selection:bg-black/10 selection:text-black overflow-x-hidden antialiased">
      
      {/* 1. COMPLIMENTARY REGISTERED DISPATCH ROW */}
      <div className="bg-[#1a1a1a] text-stone-100 text-center py-2 px-4 border-b border-black/10 flex items-center justify-center gap-2 text-[8px] md:text-[9.5px] font-sans font-bold tracking-[0.25em] uppercase">
        <Sparkles className="w-3.5 h-3.5 text-[#5C56CD] animate-pulse" />
        <span>COMPLIMENTARY FedEx DISPATCH WORLDWIDE ON ORDERS EXCEEDING $100</span>
        <span className="hidden sm:inline">| USE CODE: FREEFEDEX</span>
      </div>

      {/* 2. HEADER NAVIGATION MODULE */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        currency={currency}
        setCurrency={setCurrency}
        products={PRODUCTS}
        onAddToCart={handleAddToCart}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onScrollToStory={() => {
          const el = document.getElementById("legacy-story");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />

      <AnimatePresence mode="wait">
        {activeTab === "home" && (
          <motion.div
            key="home-tab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 md:px-8 py-6 md:py-8 space-y-20 max-w-7xl mx-auto"
          >
            {/* A. HERO IMAGE CAROUSEL SECTION */}
            <section className="space-y-6">
              {/* Outer banner box - BORDERLESS and exquisite */}
              <div 
                className="relative rounded-2xl shadow-sm overflow-hidden bg-stone-100 selection:bg-transparent"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div className="relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing">
                  <img
                    src={BANNERS[activeBannerIdx]}
                    alt={BANNER_CAPTIONS[activeBannerIdx].title}
                    className="w-full h-auto block select-none pointer-events-none transition-all duration-1000 ease-in-out"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Dark Bottom Gradient Mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-end p-6 md:p-12 text-left animate-fade-in" />

                  {/* Caption Overlay */}
                  <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 max-w-lg space-y-2.5 z-10 text-white pointer-events-none">
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-amber-300 block">
                      Handcrafted Masterpieces
                    </span>
                    <h2 className="text-xl md:text-3.5xl font-serif italic font-bold tracking-tight">
                      {BANNER_CAPTIONS[activeBannerIdx].title}
                    </h2>
                    <p className="text-white/80 text-[11px] md:text-sm font-sans font-medium leading-relaxed">
                      {BANNER_CAPTIONS[activeBannerIdx].subtitle}
                    </p>
                    
                    <div className="pt-2 flex items-center gap-4 pointer-events-auto">
                      <button
                        onClick={() => {
                          if (activeBannerIdx === 0) {
                            setActiveTab("pakol");
                          } else if (activeBannerIdx === 1) {
                            setActiveTab("ingredients");
                          } else if (activeBannerIdx === 2) {
                            setActiveTab("choga");
                          } else {
                            setActiveTab("shawl");
                          }
                        }}
                        className="bg-white text-stone-900 border-none font-sans font-bold text-[9px] md:text-[10px] uppercase tracking-widest px-4 md:px-5 py-2.5 rounded-lg shadow-sm hover:bg-stone-100 cursor-pointer transition-colors"
                      >
                        {BANNER_CAPTIONS[activeBannerIdx].action}
                      </button>

                      <button
                        onClick={() => {
                          const el = document.getElementById("new-arrivals-section");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="text-white border-b-2 border-white/50 hover:border-white font-sans text-[9px] md:text-[10px] uppercase tracking-widest py-1 cursor-pointer transition-all"
                      >
                        Browse New Arrivals
                      </button>
                    </div>
                  </div>
                </div>

                {/* TRIANGULAR DOT INDICATORS */}
                <div className="absolute bottom-4 right-6 flex items-center gap-1.5 z-20">
                  {BANNERS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveBannerIdx(idx)}
                      className={`p-1 transition-all cursor-pointer ${
                        activeBannerIdx === idx ? "text-amber-400 scale-120 drop-shadow-md" : "text-white/50 hover:text-white"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2L2 22h20L12 2z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* BEAUTIFUL INFINITE ONGOING MARQUEE (Requested by user) */}
              <div className="relative w-full overflow-hidden bg-[#faf8f5] py-4 border-y border-black/5 mt-4">
                <div className="flex w-max relative">
                  <div className="animate-marquee flex items-center gap-12 text-[#1a1a1a]/85 font-sans text-[9px] md:text-[10.5px] font-bold uppercase tracking-[0.25em]">
                    <span>⭐ 100% Certified Pure Wool / بھیڑ کی اون</span>
                    <span className="text-black/15">|</span>
                    <span>🏷️ Unbeatable Heritage Pricing / مناسب قیمتیں</span>
                    <span className="text-black/15">|</span>
                    <span>🚀 Fast Insured Global Carrier Dispatch / تیز ترین ترسیل</span>
                    <span className="text-black/15">|</span>
                    <span>🤝 Directly Sourced from Mountain Artisans / براہ راست کاریگر</span>
                    <span className="text-black/15">|</span>
                    <span>🌟 Guaranteed Organic High-Altitude Shilajit / خالص شالاجیت</span>
                    <span className="text-black/15">|</span>
                    {/* Repeated segment for perfect continuous loop */}
                    <span>⭐ 100% Certified Pure Wool / بھیڑ کی اون</span>
                    <span className="text-black/15">|</span>
                    <span>🏷️ Unbeatable Heritage Pricing / مناسب قیمتیں</span>
                    <span className="text-black/15">|</span>
                    <span>🚀 Fast Insured Global Carrier Dispatch / تیز ترین ترسیل</span>
                    <span className="text-black/15">|</span>
                    <span>🤝 Directly Sourced from Mountain Artisans / براہ راست کاریگر</span>
                    <span className="text-black/15">|</span>
                    <span>🌟 Guaranteed Organic High-Altitude Shilajit / خالص شالاجیت</span>
                    <span className="text-black/15">|</span>
                  </div>
                </div>
              </div>
            </section>

            {/* B. BRAND STATEMENT SECTION */}
            <section className="max-w-4xl mx-auto text-center py-4 space-y-4">
              <h1 className="text-3xl md:text-5xl font-serif italic font-semibold text-[#1a1a1a] tracking-tight leading-none">
                Organic, Ancient, Meticulous.
              </h1>
              <p className="text-black/55 font-sans text-[9.5px] md:text-[10.5px] tracking-[0.25em] uppercase leading-relaxed max-w-xl mx-auto font-bold">
                Washed in Garam Chashma springs, spun on traditional wool-spinning spindles, and packed directly inside luxury cedar-wood cases.
              </p>
            </section>

            {/* C. NEW ARRIVALS CATALOG SECTION (Primary highlight on the homepage) */}
            <section id="new-arrivals-section" className="pt-4 space-y-8">
              <div className="space-y-1.5 border-b border-black/10 pb-4 text-center max-w-xl mx-auto">
                <span className="text-[9.5px] font-bold uppercase tracking-[0.35em] text-[#5C56CD]">
                  Curated Winter Newness
                </span>
                <h2 className="text-[#1a1a1a] font-serif italic text-3xl md:text-4xl font-bold">
                  New Arrivals Showcase
                </h2>
                <p className="text-[#1a1a1a]/65 text-xs inline-block leading-relaxed">
                  Discover our newest premium handspun wool hats, authentic Himalayan mountain ingredients, and ceremonial items recently dispatched from weavers.
                </p>
              </div>

              {/* Grid Layout of Featured Arrivals from the database */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.filter(p => p.isFeatured).slice(0, 6).map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    currency={currency}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </section>

            {/* D. OUR STORY (Legacy Story) */}
            <section id="legacy-story" className="border-t border-black/10 pt-16">
              <CraftHistory craftsmanImage={craftsmanImg} />
            </section>

            {/* E. USER EXPERIENCE SECTION */}
            <section id="user-experience-section" className="border-t border-black/10 pt-16">
              {/* Reviews Spotlight row */}
              <div className="max-w-4xl mx-auto space-y-8 mb-12">
                <div className="text-center space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/55 block">
                    Customer Experience
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif italic text-stone-900 font-bold">
                    Testimonials of Satisfied Customers
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/65 p-6 rounded-2xl border border-black/5 relative shadow-5xs">
                    <MessageSquareQuote className="absolute top-4 right-4 w-10 h-10 text-black/5 opacity-50" />
                    <p className="text-xs text-stone-750 font-serif italic leading-relaxed">
                      "Exquisite, soft craftsmanship! The pure white lamb's wool feels highly protective and commands unparalleled honor. Highly impressed by the fast registered delivery."
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="h-6.5 w-6.5 bg-[#5C56CD]/25 text-[#5C56CD] text-[9px] font-bold font-mono rounded-full flex items-center justify-center">
                        ZK
                      </div>
                      <span className="text-[10px] font-sans font-bold text-[#1a1a1a] uppercase tracking-wider">
                        Ziaudin Khan, Islamabad
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/65 p-6 rounded-2xl border border-black/5 relative shadow-5xs">
                    <MessageSquareQuote className="absolute top-4 right-4 w-10 h-10 text-black/5 opacity-50" />
                    <p className="text-xs text-stone-750 font-serif italic leading-relaxed">
                      "I bought the gold-purified Himalayan Shilajit resin along with a classic pakol cap. The Shilajit is extremely viscous and authentic with robust vitality benefits. Exceptional care guides."
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="h-6.5 w-6.5 bg-[#5C56CD]/25 text-[#5C56CD] text-[9px] font-bold font-mono rounded-full flex items-center justify-center">
                        MB
                      </div>
                      <span className="text-[10px] font-sans font-bold text-[#1a1a1a] uppercase tracking-wider">
                        Marc-André Belanger, Montreal
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* General reviews and FAQ accordion */}
              <ReviewsAndFAQ reviews={reviewsList} onAddReview={handleAddReview} />
            </section>
          </motion.div>
        )}

        {/* INGREDIENTS PAGE */}
        {activeTab === "ingredients" && (
          <motion.div
            key="ingredients-tab"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="px-4 md:px-8 py-10 max-w-7xl mx-auto space-y-12"
          >
            <div className="text-center max-w-2xl mx-auto space-y-3 pb-6 border-b border-black/10">
              <span className="text-amber-700 bg-amber-50 border border-amber-200 text-[9px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest font-mono inline-block">
                ORGANIC MOUNTAIN HARVEST
              </span>
              <h1 className="text-3xl md:text-5xl font-serif italic text-stone-900 font-bold leading-tight">
                Chitrali Valley Ingredients
              </h1>
              <p className="text-stone-500 font-sans text-xs md:text-sm leading-relaxed">
                Rich boutique superherbs harvested sustainably at glacier edges exceeding 4,000m altitudes. Sourced from the Hindu Kush wilderness and delivered worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ingredientsList.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  currency={currency}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* CHITRALI PAKOL PAGE */}
        {activeTab === "pakol" && (
          <motion.div
            key="pakol-tab"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="px-4 md:px-8 py-10 max-w-7xl mx-auto space-y-12"
          >
            <div className="text-center max-w-2xl mx-auto space-y-3 pb-6 border-b border-black/10">
              <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 text-[9px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest font-mono inline-block">
                CENTURIES-OLD LINEAGES
              </span>
              <h1 className="text-3xl md:text-5xl font-serif italic text-stone-900 font-bold leading-tight flex items-center justify-center gap-3">
                <span>Chitrali Hats &amp; Pakols</span>
                <span className="font-urdu text-xl md:text-2xl text-stone-400 font-normal">ٹوپی</span>
              </h1>
              <p className="text-stone-500 font-sans text-xs md:text-sm leading-relaxed">
                Hand-woven and meticulously molded caps made entirely of local Garam Chashma spring washed lamb's wool (Shu). Worn traditionally to command honor and represent heritage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pakolList.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  currency={currency}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* CHITRALI CHOGA PAGE */}
        {activeTab === "choga" && (
          <motion.div
            key="choga-tab"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="px-4 md:px-8 py-10 max-w-7xl mx-auto space-y-12"
          >
            <div className="text-center max-w-2xl mx-auto space-y-3 pb-6 border-b border-black/10">
              <span className="text-purple-700 bg-purple-50 border border-purple-200 text-[9px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest font-mono inline-block">
                THE SOVEREIGN ROBES
              </span>
              <h1 className="text-3xl md:text-5xl font-serif italic text-stone-900 font-bold leading-tight flex items-center justify-center gap-3">
                <span>Chitrali Choga (Chuha)</span>
                <span className="font-urdu text-xl md:text-2xl text-stone-400 font-normal">چغہ</span>
              </h1>
              <p className="text-stone-500 font-sans text-xs md:text-sm leading-relaxed">
                The legendary traditional woolen ceremonial robes. Historically worn by the royals and community elders of Chitral, handwoven for premium insulation and elegant comfort.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {chogaList.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  currency={currency}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
            
            {/* Wool facts */}
            <div className="bg-stone-100 p-8 rounded-2xl border border-black/5 text-stone-600 max-w-3xl mx-auto space-y-4">
              <h4 className="text-stone-900 font-serif italic font-bold text-lg">
                About the Chuha Long Coat (چوغہ)
              </h4>
              <p className="font-sans text-xs leading-relaxed">
                Each Chuha coat is tailored from thick, dense handspun lamb's wool, called <em className="italic">Shu</em>, which requires over forty days of dedicated handloom processing. Extremely resilient to sub-zero Himalayan winters, they feature classic leather toggle buttons or handstitched golden embroideries, offering a luxurious protective layer anciently favored by noble delegates of high altitudes.
              </p>
            </div>
          </motion.div>
        )}

        {/* WOOLEN WAISTCOAT PAGE */}
        {activeTab === "waistcoat" && (
          <motion.div
            key="waistcoat-tab"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="px-4 md:px-8 py-10 max-w-7xl mx-auto space-y-12"
          >
            <div className="text-center max-w-2xl mx-auto space-y-3 pb-6 border-b border-black/10">
              <span className="text-amber-700 bg-amber-50 border border-amber-200 text-[9px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest font-mono inline-block">
                COMMUNITY DECORUM
              </span>
              <h1 className="text-3xl md:text-5xl font-serif italic text-stone-900 font-bold leading-tight flex items-center justify-center gap-3">
                <span>Woolen Waistcoats</span>
                <span className="font-urdu text-xl md:text-2xl text-stone-400 font-normal">واسکوٹ</span>
              </h1>
              <p className="text-stone-500 font-sans text-xs md:text-sm leading-relaxed">
                Refined and elegant core waistcoats spun delicately from first-cut winter sheep wool. Designed to provide standard insulation and structured dignity over local dress or modern wear.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {waistcoatList.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  currency={currency}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* CHITRALI WOOLEN SHAWL PAGE */}
        {activeTab === "shawl" && (
          <motion.div
            key="shawl-tab"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="px-4 md:px-8 py-10 max-w-7xl mx-auto space-y-12"
          >
            <div className="text-center max-w-2xl mx-auto space-y-3 pb-6 border-b border-black/10">
              <span className="text-[#5C56CD] bg-[#5C56CD]/5 border border-[#5C56CD]/20 text-[9px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest font-mono inline-block">
                TRADITIONAL WRAPS
              </span>
              <h1 className="text-3xl md:text-5xl font-serif italic text-stone-900 font-bold leading-tight flex items-center justify-center gap-3">
                <span>Chitrali Woolen Shawl (Loi)</span>
                <span className="font-urdu text-xl md:text-2xl text-stone-400 font-normal">شال</span>
              </h1>
              <p className="text-stone-500 font-sans text-xs md:text-sm leading-relaxed">
                Majestic winter wraps sized generously. Hand-woven on native looms using softest spring wool, providing absolute security against chilly Himalayan winds and high altitude air drafts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {shawlList.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  currency={currency}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* CHITRALI WOOLEN COAT PAGE */}
        {activeTab === "coat" && (
          <motion.div
            key="coat-tab"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="px-4 md:px-8 py-10 max-w-7xl mx-auto space-y-12"
          >
            <div className="text-center max-w-2xl mx-auto space-y-3 pb-6 border-b border-black/10">
              <span className="text-stone-700 bg-stone-100 border border-stone-200 text-[9px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest font-mono inline-block">
                FINE TAILORED OUTERWEAR
              </span>
              <h1 className="text-3xl md:text-5xl font-serif italic text-stone-900 font-bold leading-tight flex items-center justify-center gap-3">
                <span>Chitrali Woolen Coats</span>
                <span className="font-urdu text-xl md:text-2xl text-stone-400 font-normal">کوٹ</span>
              </h1>
              <p className="text-stone-500 font-sans text-xs md:text-sm leading-relaxed">
                Premium modern jackets and long overcoats tailored from authentic Himalayan Shu sheep wool. Blends high-performance mountain insulation with contemporary structural fits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coatList.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  currency={currency}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. SHOPPING CART DRAWER MODULE */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        currency={currency}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
      />

      {/* 5. GORGEOUS STYLIZED FOOTER MODULE */}
      <footer className="bg-[#13110f] text-stone-300 pt-16 pb-10 border-t border-stone-900 mt-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-stone-800 pb-12">
          
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src={qazeenLogo}
                alt="Qazeen Brand Marks"
                className="h-9 w-auto object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
              <span className="text-stone-50 font-sans font-bold tracking-wider uppercase text-sm">
                QAZEEN — قازین
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed font-sans">
              We preserve regional high-altitude foot-loom weaving lineages of Chitral, supporting mountain communities through ethical direct handicraft partnerships.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-amber-500 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Certified Handspun Lamb Wool (Shu)</span>
            </div>
          </div>

          {/* Links: Locations */}
          <div className="space-y-3">
            <h4 className="text-stone-50 font-sans text-xs uppercase tracking-widest font-bold">
              CRAFT ATELIERS
            </h4>
            <ul className="text-stone-400 text-xs space-y-2 font-sans">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" /> Garam Chashma washing, Chitral
              </li>
              <li className="flex items-center gap-1.5 font-sans">
                <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" /> Ayun Footlooms Valley, Upper Chitral
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" /> Royal Wardrobes, Peshawar
              </li>
              <li className="flex items-center gap-1.5 font-sans">
                <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" /> Jinnah Road dispatch, Islamabad
              </li>
            </ul>
          </div>

          {/* Links: Care handbooks */}
          <div className="space-y-3">
            <h4 className="text-stone-50 font-sans text-xs uppercase tracking-widest font-bold">
              HANDBOOK PAGES
            </h4>
            <ul className="text-stone-400 text-xs space-y-2 font-sans">
              <li><button onClick={() => handleScrollToRef(storySectionRef)} className="hover:text-stone-50 text-left transition-colors cursor-pointer">How to Mold or Stretch your Pakol</button></li>
              <li><button onClick={() => handleScrollToRef(storySectionRef)} className="hover:text-stone-50 text-left transition-colors cursor-pointer">Shedding &amp; Pilling Care of Organic Wool</button></li>
              <li><button onClick={() => handleScrollToRef(storySectionRef)} className="hover:text-stone-50 text-left transition-colors cursor-pointer">History of the Shins &amp; Peacock Feather insignias</button></li>
              <li><button onClick={() => handleScrollToRef(storySectionRef)} className="hover:text-stone-50 text-left transition-colors cursor-pointer">Submit an Artisan Partnership Application</button></li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-3">
            <h4 className="text-stone-50 font-sans text-xs uppercase tracking-widest font-bold">
              GLOBAL CUSTOMS SUPPORT
            </h4>
            <p className="text-stone-400 text-xs leading-relaxed font-sans mt-1">
              Arrives wrapped inside tissue papers, cradled by solid Kashmiri wood sleeves. For private sizing commissions, reach our desk:
            </p>
            <p className="text-xs font-mono font-bold text-stone-100 hover:text-amber-300">
              support@qazeenhandicrafts.com
            </p>
          </div>

        </div>

        {/* Rights strip */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-[10.5px] text-stone-500 font-mono gap-4">
          <p>© 2026 Qazeen Crafts Ltd. All rights reserved. Registered heritage business under Pakistani Handicrafts Guild.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-stone-200">Terms of Origin</a>
            <span>·</span>
            <a href="#" className="hover:text-stone-200">Privacy Safeguards</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
