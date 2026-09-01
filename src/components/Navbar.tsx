/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Search, User, ShoppingBag, X, Check, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem, CapProduct } from "../types";

const qazeenLogo = "/src/assets/images/qazeen_logo.png";

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  PKR: "Rs",
  CAD: "C$",
  EUR: "€",
  GBP: "£",
  AED: "DH",
  SAR: "SR",
  AUD: "A$"
};

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onScrollToStory: () => void;
  currency: string;
  setCurrency: (curr: string) => void;
  products: CapProduct[];
  onAddToCart: (product: CapProduct, color: any, size: string, addFeather: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  activeTab,
  setActiveTab,
  onScrollToStory,
  currency,
  setCurrency,
  products,
  onAddToCart,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Auto focus search input when overlay opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    if (isSearchOpen) {
      document.body.style.overflow = "hidden"; // Lock page scroll
    } else {
      document.body.style.overflow = "";
    }
  }, [isSearchOpen]);

  // Click outside listener for currency dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCurrencyDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [isWearsDropdownOpen, setIsWearsDropdownOpen] = useState(false);

  const getConversionFactor = (c: string) => {
    switch (c) {
      case "PKR": return 278.0;
      case "CAD": return 1.37;
      case "GBP": return 0.78;
      case "EUR": return 0.92;
      case "AED": return 3.67;
      case "SAR": return 3.75;
      case "AUD": return 1.50;
      default: return 1.0;
    }
  };

  const formatPrice = (usdPrice: number) => {
    const factor = getConversionFactor(currency);
    const symbol = CURRENCY_SYMBOLS[currency] || "$";
    const finalPrice = Math.round(usdPrice * factor);
    return `${symbol} ${finalPrice.toLocaleString()}`;
  };

  // Real-time filtering for Search Overlay
  const filteredSearchProducts = products.filter(p => {
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || 
           p.urduName.includes(q) || 
           p.description.toLowerCase().includes(q) ||
           (p.category && p.category.toLowerCase().includes(q));
  });

  const handlePopularSearchClick = (term: string) => {
    setSearchQuery(term);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleProductSearchClick = (p: CapProduct) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    if (p.category) {
      setActiveTab(p.category);
    } else {
      setActiveTab("pakol");
    }
  };

  return (
    <>
      <nav id="app-nav" className="sticky top-0 z-40 bg-[#f7f5f2]/95 backdrop-blur-md border-b border-black/10 px-4 md:px-8 py-2 md:py-2.5 shadow-5xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* LEFT: Nav Category Anchors directly exposed for immediate interaction */}
          <div className="flex items-center gap-4 lg:gap-6 text-[10px] uppercase tracking-[0.25em] font-bold text-stone-600/80">
            {/* HOME HERO */}
            <button
              onClick={() => setActiveTab("home")}
              className={`hover:text-black cursor-pointer transition-all hidden sm:block font-sans py-1 ${activeTab === "home" ? "text-black border-b-2 border-black font-extrabold pb-0.5" : ""}`}
            >
              Home
            </button>

            {/* INGREDIENTS */}
            <button
              onClick={() => setActiveTab("ingredients")}
              className={`hover:text-black cursor-pointer transition-all hidden sm:block font-sans py-1 ${activeTab === "ingredients" ? "text-black border-b-2 border-black font-extrabold pb-0.5" : ""}`}
            >
              Ingredients
            </button>

            {/* CHITRALI WEARS DROPDOWN WITH ABSOLUTE NO GAP HOVER COUPLING */}
            <div 
              className="relative py-1 cursor-pointer"
              onMouseEnter={() => setIsWearsDropdownOpen(true)}
              onMouseLeave={() => setIsWearsDropdownOpen(false)}
            >
              <button
                className={`hover:text-black cursor-pointer transition-colors hidden sm:flex items-center gap-1 font-sans py-1 ${["pakol", "choga", "waistcoat", "shawl", "coat"].includes(activeTab) ? "text-black border-b-2 border-black font-extrabold pb-0.5" : ""}`}
              >
                <span>Chitrali Wears</span>
                <ChevronDown className="w-3 h-3 text-black/45 transition-transform duration-300" style={{ transform: isWearsDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
              </button>
              
              <AnimatePresence>
                {isWearsDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full pt-1.5 w-52 z-55"
                  >
                    <div className="bg-[#f7f5f2] border border-black/10 rounded-xl shadow-lg py-2">
                      <button
                        onClick={() => { setActiveTab("pakol"); setIsWearsDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-1.5 text-[9px] uppercase tracking-widest hover:bg-black/5 hover:text-black transition-colors font-sans font-bold flex items-center justify-between ${activeTab === "pakol" ? "text-black bg-black/5" : "text-[#1a1a1a]/80"}`}
                      >
                        <span>Chitrali Pakol</span>
                        <span className="text-[9.5px] font-semibold text-stone-400 capitalize">ٹوپی</span>
                      </button>
                      <div className="h-px bg-black/5 my-1" />
                      
                      <button
                        onClick={() => { setActiveTab("choga"); setIsWearsDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-1.5 text-[9px] uppercase tracking-widest hover:bg-black/5 hover:text-black transition-colors font-sans font-bold flex items-center justify-between ${activeTab === "choga" ? "text-black bg-black/5" : "text-[#1a1a1a]/80"}`}
                      >
                        <span>Chitrali Choga</span>
                        <span className="text-[9.5px] font-semibold text-stone-400 capitalize">چغہ</span>
                      </button>
                      <div className="h-px bg-black/5 my-1" />

                      <button
                        onClick={() => { setActiveTab("waistcoat"); setIsWearsDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-1.5 text-[9px] uppercase tracking-widest hover:bg-black/5 hover:text-black transition-colors font-sans font-bold flex items-center justify-between ${activeTab === "waistcoat" ? "text-black bg-black/5" : "text-[#1a1a1a]/80"}`}
                      >
                        <span>Woolen Waistcoat</span>
                        <span className="text-[9.5px] font-semibold text-stone-400 capitalize">واسکوٹ</span>
                      </button>
                      <div className="h-px bg-black/5 my-1" />

                      <button
                        onClick={() => { setActiveTab("shawl"); setIsWearsDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-1.5 text-[9px] uppercase tracking-widest hover:bg-black/5 hover:text-black transition-colors font-sans font-bold flex items-center justify-between ${activeTab === "shawl" ? "text-black bg-black/5" : "text-[#1a1a1a]/80"}`}
                      >
                        <span>Chitrali Woolen Shawl</span>
                        <span className="text-[9.5px] font-semibold text-stone-400 capitalize">شال</span>
                      </button>
                      <div className="h-px bg-black/5 my-1" />

                      <button
                        onClick={() => { setActiveTab("coat"); setIsWearsDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-1.5 text-[9px] uppercase tracking-widest hover:bg-black/5 hover:text-black transition-colors font-sans font-bold flex items-center justify-between ${activeTab === "coat" ? "text-black bg-black/5" : "text-[#1a1a1a]/80"}`}
                      >
                        <span>Chitrali Woolen Coat</span>
                        <span className="text-[9.5px] font-semibold text-stone-400 capitalize">کوٹ</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* OUR STORY */}
            <button
              onClick={() => {
                setActiveTab("home");
                setTimeout(() => {
                  onScrollToStory();
                }, 150);
              }}
              className="hover:text-black cursor-pointer transition-colors hidden sm:block font-sans py-1"
            >
              Our Story
            </button>
          </div>

          {/* CENTER: Clean Brand Mark / Logo Setup with English & Urdu Fine Typography pairing */}
          <div className="text-center flex flex-col items-center flex-1 sm:flex-none">
            <button
              onClick={() => {
                setActiveTab("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
                setSearchQuery("");
              }}
              className="group flex flex-col items-center focus:outline-none cursor-pointer"
            >
              {/* Premium Mountain Calligraphy Logo Image with mix-blend-multiply to completely remove white background */}
              <img
                src={qazeenLogo}
                alt="Qazeen Logo"
                className="h-10 md:h-12 w-auto object-contain transition-all duration-300 group-hover:scale-102 mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
              {/* English + Urdu brand typography pairing - requested by user */}
              <div className="text-[9px] md:text-[10px] font-serif font-bold tracking-[0.25em] text-[#1a1a1a] mt-0.5 uppercase flex items-center gap-1.5">
                <span>QAZEEN</span>
                <span className="text-stone-300 font-sans font-normal">|</span>
                <span className="font-semibold text-[10.5px] tracking-normal pt-0.5">قازین</span>
              </div>
            </button>
          </div>

          {/* RIGHT: Currency, Search, Cart icon actions */}
          <div className="flex items-center gap-1.5 md:gap-3.5">
            
            {/* 1. CURRENCY SELECTOR DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="currency-dropdown-btn"
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1.5 bg-black/[0.04] border border-black/10 hover:bg-black/[0.08] px-2.5 py-1.5 rounded-lg text-black/80 text-[10px] font-mono tracking-wider transition-colors cursor-pointer"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-black/45" />
              </button>

              <AnimatePresence>
                {isCurrencyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-36 bg-white border border-black/10 rounded-xl shadow-lg py-1.5 z-50 overflow-hidden"
                  >
                    <div className="px-2.5 py-1 border-b border-black/5 text-[8px] font-sans font-semibold tracking-widest uppercase text-black/40">
                      Select Currency
                    </div>
                    {Object.keys(CURRENCY_SYMBOLS).map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          setCurrency(curr);
                          setIsCurrencyDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-black/70 hover:bg-black/5 hover:text-black flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <span className="font-mono">{curr} ({CURRENCY_SYMBOLS[curr]})</span>
                        {currency === curr && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. SEARCH BUTTON */}
            <button
              id="search-overlay-trigger"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-black/5 rounded-full transition-colors cursor-pointer text-[#1a1a1a]"
              aria-label="Toggle Search Overlay"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* 3. CART TOGGLE BUTTON */}
            <button
              id="cart-drawer-trigger"
              onClick={onOpenCart}
              className="p-2 hover:bg-black/5 rounded-full transition-colors cursor-pointer text-[#1a1a1a] relative"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {totalCartItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-[#5C56CD] text-white text-[9px] font-sans font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white shadow-2xs"
                  >
                    {totalCartItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Dynamic Mobile Secondary Categories bar */}
        <div className="flex sm:hidden overflow-x-auto whitespace-nowrap py-2 border-t border-black/5 mt-2.5 px-2 gap-3.5 text-[8.5px] uppercase tracking-[0.2em] font-bold text-[#1a1a1a]/55 scrollbar-none">
          <button onClick={() => setActiveTab("home")} className={`hover:text-black flex-shrink-0 ${activeTab === "home" ? "text-black font-extrabold" : ""}`}>Home</button>
          <span className="text-black/10 flex-shrink-0">|</span>
          <button onClick={() => setActiveTab("ingredients")} className={`hover:text-black flex-shrink-0 ${activeTab === "ingredients" ? "text-black font-extrabold" : ""}`}>Ingredients</button>
          <span className="text-black/10 flex-shrink-0">|</span>
          <button onClick={() => setActiveTab("pakol")} className={`hover:text-black flex-shrink-0 ${activeTab === "pakol" ? "text-black font-extrabold" : ""}`}>Pakol</button>
          <span className="text-black/10 flex-shrink-0">|</span>
          <button onClick={() => setActiveTab("choga")} className={`hover:text-black flex-shrink-0 ${activeTab === "choga" ? "text-black font-extrabold" : ""}`}>Choga</button>
          <span className="text-black/10 flex-shrink-0">|</span>
          <button onClick={() => setActiveTab("waistcoat")} className={`hover:text-black flex-shrink-0 ${activeTab === "waistcoat" ? "text-black font-extrabold" : ""}`}>Waistcoat</button>
          <span className="text-black/10 flex-shrink-0">|</span>
          <button onClick={() => setActiveTab("shawl")} className={`hover:text-black flex-shrink-0 ${activeTab === "shawl" ? "text-black font-extrabold" : ""}`}>Shawl</button>
          <span className="text-black/10 flex-shrink-0">|</span>
          <button onClick={() => setActiveTab("coat")} className={`hover:text-black flex-shrink-0 ${activeTab === "coat" ? "text-black font-extrabold" : ""}`}>Coat</button>
        </div>
      </nav>

      {/* HIGH-FOCUS SEARCH OVERLAY (Inspired by eveen.pk screenshot guidelines) */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md overflow-y-auto flex flex-col justify-start"
          >
            {/* Search Header Container - Boutique, Narrow & Centered */}
            <div className="w-full max-w-xl mx-auto px-6 pt-16 md:pt-24 pb-4">
              <div className="flex flex-col items-center gap-4 text-center">
                <span className="text-[10px] text-amber-500 font-mono uppercase tracking-[0.3em] font-bold">
                  Boutique Heritage Search
                </span>
                <div className="w-full relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search neelam white, pure shilajit, saffron..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#181615] text-stone-200 font-sans placeholder-stone-500 rounded-xl pl-11 pr-11 py-3 text-xs md:text-sm border border-stone-800 focus:border-amber-500/50 shadow-2xl focus:outline-none focus:ring-1 focus:ring-amber-500/30 transition-all font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full text-stone-400 focus:outline-none transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="text-stone-400 hover:text-stone-200 font-mono text-[9.5px] uppercase tracking-wider py-1 cursor-pointer transition-colors"
                >
                  [ Return to Boutique ]
                </button>
              </div>
            </div>

            {/* Inner Dashboard Layout */}
            <div className="w-full max-w-4xl mx-auto px-4 md:px-8 py-4 flex-1 flex flex-col md:flex-row gap-8">
              
              {/* LEFT SIDEBAR: Popular Searches */}
              <div className="w-full md:w-1/4 space-y-4">
                <h3 className="text-white/40 text-[9px] uppercase tracking-[0.25em] font-bold">
                  Popular Searches
                </h3>
                <div className="flex flex-wrap md:flex-col gap-2.5">
                  {["Shilajit", "Neelam White", "Walnut Pakol", "Wild Honey", "Saffron", "Royal Crimson"].map((term) => (
                    <button
                      key={term}
                      onClick={() => handlePopularSearchClick(term)}
                      className="text-left text-xs bg-white/5 border border-white/10 hover:bg-[#5C56CD]/25 text-white/80 hover:text-white px-3.5 py-2 rounded-lg cursor-pointer transition-all tracking-wide"
                    >
                      {term}
                    </button>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-white/5 hidden md:block">
                  <div className="flex items-center gap-2 text-[10px] text-amber-500 font-bold tracking-widest uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Free Global FedEx</span>
                  </div>
                  <p className="text-[10px] text-white/50 font-sans mt-1 leading-relaxed">
                    On overall design orders above $100. Fast customs clearance.
                  </p>
                </div>
              </div>

              {/* RIGHT CONTENT: Matching Search Results Grid */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40 text-[9px] uppercase tracking-[0.25em] font-bold">
                    {searchQuery ? "Search Results" : "Featured Products Pick"}
                  </span>
                  <span className="text-[10px] font-sans text-[#5C56CD] font-bold uppercase tracking-wider">
                    {filteredSearchProducts.length} Match{filteredSearchProducts.length !== 1 && "es"}
                  </span>
                </div>

                {filteredSearchProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[55vh] overflow-y-auto pr-1">
                    {filteredSearchProducts.map((p) => (
                      <div
                        key={p.id}
                        className="bg-white/5 border border-white/10 rounded-xl p-3 flex gap-4 hover:border-white/20 transition-all group"
                      >
                        {/* Aspect Wrapper */}
                        <div
                          onClick={() => handleProductSearchClick(p)}
                          className="w-16 h-16 rounded-lg overflow-hidden bg-black/25 flex-shrink-0 cursor-pointer"
                        >
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Product Meta */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div
                            onClick={() => handleProductSearchClick(p)}
                            className="cursor-pointer"
                          >
                            <h4 className="text-white font-serif italic text-sm truncate group-hover:text-amber-300 transition-colors">
                              {p.name}
                            </h4>
                            <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold mt-0.5 truncate">
                              {p.urduName}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[11px] font-mono text-emerald-400 font-bold">
                              {formatPrice(p.price)}
                            </span>
                            
                            {/* Instantly buy / add to bag */}
                            <button
                              onClick={() => {
                                onAddToCart(p, p.colors[0], p.sizes[0], false);
                                setIsSearchOpen(false);
                                setSearchQuery("");
                              }}
                              className="bg-white/10 text-white hover:bg-[#5C56CD] text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer"
                            >
                              Add to Bag
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 space-y-3">
                    <p className="text-white/50 font-sans text-sm">
                      No matching products found for "{searchQuery}".
                    </p>
                    <p className="text-[#5C56CD] font-bold text-xs uppercase tracking-wider">
                      Try searching "shilajit" or "topi" for curated sets
                    </p>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
