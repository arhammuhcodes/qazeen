/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, ShoppingCart, HelpCircle, ShieldAlert, BadgeCheck, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ColorOption, CustomCapConfig, CapProduct } from "../types";
import { ChitraliCapPreview } from "./ChitraliCapPreview";
import { COLOR_OPTIONS } from "../data";

interface CustomizerProps {
  onAddCustomToCart: (customConfig: CustomCapConfig, calculatedPrice: number) => void;
  currency: string;
}

const FEATHER_ACCENTS = [
  { id: "none", name: "No Feather Accent (Minimal)", price: 0, desc: "Clean everyday woolen elegance without additives." },
  { id: "peacock", name: "Royal Peacock Feather", price: 10, desc: "An authentic, ethically-sourced iridescent emerald plume." },
  { id: "pheasant", name: "Traditional Pheasant Plume", price: 8, desc: "A classic striped rustic brown and cream hunting feather." },
  { id: "gold_crest", name: "Imperial Golden Plume", price: 15, desc: "Hand-molded golden filigree feather with simulated ruby." },
];

const METAL_PINS = [
  { id: "none", name: "No Emblem Pin (Bare Fold)", price: 0, desc: "Keep the woolen brim folds organic and unadorned." },
  { id: "silver", name: "Mountain Silver Crest Pin", price: 5, desc: "Etched solid silver-colored crest tracing the Hindu Kush towers." },
  { id: "bronze", name: "Bronze Antiquity Seal Piece", price: 4, desc: "A warm dark-burnished seal replicating ancient regional coins." },
  { id: "gold", name: "Royal Golden Crest Pin", price: 8, desc: "Brilliant polished gold-plated crown seal holding central gem." },
];

const CAP_SIZES = [
  { id: "S", label: "Small (S)", range: "55-56 cm", note: "Best for smaller head frames or youth fits." },
  { id: "M", label: "Medium (M)", range: "57-58 cm", note: "Standard adult size fitting ~70% of individuals." },
  { id: "L", label: "Large (L)", range: "59-60 cm", note: "Accommodating wider head size layouts." },
  { id: "XL", label: "Extra Large (XL)", range: "61-62 cm", note: "Specially rolled with loose fit criteria." },
];

export const Customizer: React.FC<CustomizerProps> = ({ onAddCustomToCart, currency }) => {
  const [activeColor, setActiveColor] = useState<ColorOption>(COLOR_OPTIONS.IVORY);
  const [activeSize, setActiveSize] = useState("M");
  const [activeFeather, setActiveFeather] = useState("peacock");
  const [activePin, setActivePin] = useState("silver");
  const [monogram, setMonogram] = useState("");
  
  const [successNotice, setSuccessNotice] = useState(false);

  // Prices
  const baseCapPrice = 55; // Custom custom base starts at $55
  const featherChoice = FEATHER_ACCENTS.find((f) => f.id === activeFeather);
  const pinChoice = METAL_PINS.find((p) => p.id === activePin);
  const monogramPrice = monogram.trim() ? 12 : 0;
  
  const basePriceUSD = baseCapPrice + (featherChoice?.price || 0) + (pinChoice?.price || 0) + monogramPrice;

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

  const CURRENCY_SYMBOLS: Record<string, string> = {
    USD: "$",
    PKR: "Rs",
    CAD: "C$",
    EUR: "€",
    GBP: "£",
    AED: "DH",
    SAR: "SR",
    AUD: "A$"
  };

  const formatPrice = (usd: number) => {
    const factor = getConversionFactor(currency);
    const symbol = CURRENCY_SYMBOLS[currency] || "$";
    const finalPrice = Math.round(usd * factor);
    return `${symbol} ${finalPrice.toLocaleString()}`;
  };

  const handleOrderCustom = () => {
    const config: CustomCapConfig = {
      baseColor: activeColor,
      selectedSize: CAP_SIZES.find((s) => s.id === activeSize)?.label || "M (57-58 cm)",
      featherType: activeFeather,
      metalAccent: activePin,
      monogramText: monogram.trim(),
    };

    onAddCustomToCart(config, basePriceUSD);
    setSuccessNotice(true);
    setTimeout(() => {
      setSuccessNotice(false);
    }, 4000);
  };

  return (
    <div className="bg-white border border-stone-200/60 rounded-2xl shadow-xs overflow-hidden max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT QUADRANT: Live rendering stage */}
        <div className="lg:col-span-5 bg-stone-50 border-b lg:border-b-0 lg:border-r border-stone-200/50 p-6 md:p-8 flex flex-col justify-between items-center relative">
          <div className="absolute top-4 left-4 bg-amber-900 text-amber-50 text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded shadow-xs flex items-center gap-1 z-10">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Studio
          </div>

          <div className="text-center mt-4">
            <h3 className="text-stone-900 font-sans font-bold text-xl tracking-wide uppercase">
              Your Custom Masterpiece
            </h3>
            <p className="text-stone-500 text-xs mt-1">
              Refined by hand: {activeColor.name.split(" ")[0]} · {activeSize} fits
            </p>
          </div>

          {/* Dynamic SVG Drawing component previewing configuration */}
          <div className="my-6 md:my-10 w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
            <ChitraliCapPreview
              color={activeColor.hex}
              featherType={activeFeather}
              metalAccent={activePin}
              size={activeSize}
              showTag
              className="w-full h-full"
            />
          </div>

          {/* Masterpiece billing breakdown details */}
          <div className="w-full bg-white border border-stone-200 rounded-xl p-4.5 space-y-2 mt-4 shadow-3xs">
            <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider border-b border-stone-100 pb-1.5 flex justify-between">
              <span>DESIGN RECIPE SPECS</span>
              <span className="text-stone-800 font-bold">LIVE ESTIMATION</span>
            </div>
            
            <div className="text-xs flex justify-between text-stone-600">
              <span>Shu-grade Woolen Base:</span>
              <span className="font-mono font-bold text-stone-900">{formatPrice(baseCapPrice)}</span>
            </div>

            {featherChoice && featherChoice.price > 0 && (
              <div className="text-xs flex justify-between text-stone-600">
                <span>{featherChoice.name.split(" ")[1]} Accent:</span>
                <span className="font-mono font-bold text-stone-900">+{formatPrice(featherChoice.price)}</span>
              </div>
            )}

            {pinChoice && pinChoice.price > 0 && (
              <div className="text-xs flex justify-between text-stone-600">
                <span>{pinChoice.name.split(" ")[0]} Badge:</span>
                <span className="font-mono font-bold text-stone-900">+{formatPrice(pinChoice.price)}</span>
              </div>
            )}

            {monogram.trim() && (
              <div className="text-xs flex justify-between text-stone-600">
                <span>Custom Needle Initials (&quot;{monogram.substring(0, 8)}&quot;):</span>
                <span className="font-mono font-bold text-stone-900">+{formatPrice(12)}</span>
              </div>
            )}

            <div className="border-t border-stone-200 pt-2 flex justify-between items-baseline font-serif">
              <span className="font-bold text-stone-900 text-sm">Aggregated Value:</span>
              <span className="font-mono text-amber-950 font-bold text-lg">{formatPrice(basePriceUSD)}</span>
            </div>
          </div>
        </div>

        {/* RIGHT QUADRANT: Choices selectors */}
        <div className="lg:col-span-7 p-6 md:p-8 space-y-6">
          
          {/* Section 1: Wool selection */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-5 w-5 rounded-full bg-stone-900 text-white text-[11px] font-mono flex items-center justify-center font-bold">1</span>
              <h4 className="text-stone-900 font-sans font-bold text-sm uppercase tracking-wide">
                Select Mountain Wool Dye Color
              </h4>
            </div>
            <p className="text-xs text-stone-500 mb-3">
              We card and spin high-altitude sheep wool. Choose the organic texture background you prefer:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
              {Object.entries(COLOR_OPTIONS).map(([key, col]) => {
                const isSelected = activeColor.hex === col.hex;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveColor(col)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer ${
                      isSelected
                        ? "bg-stone-50 border-amber-800 ring-1 ring-amber-800"
                        : "bg-white border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    <div className={`h-8 w-8 rounded-full ${col.bgClass} shadow-3xs flex items-center justify-center border border-stone-400/20`}>
                      {isSelected && <Check className="w-4 h-4 text-amber-900 mix-blend-difference" />}
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-stone-800 leading-tight">
                      {col.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Size Selections */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-5 w-5 rounded-full bg-stone-900 text-white text-[11px] font-mono flex items-center justify-center font-bold">2</span>
              <h4 className="text-stone-900 font-sans font-bold text-sm uppercase tracking-wide">
                Determine Perfect Head Fit
              </h4>
            </div>
            <p className="text-xs text-stone-500 mb-3">
              Measure your skull circumference mid-forehead for sizing accuracy:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              {CAP_SIZES.map((size) => {
                const isSelected = activeSize === size.id;
                return (
                  <button
                    key={size.id}
                    onClick={() => setActiveSize(size.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-20 cursor-pointer ${
                      isSelected
                        ? "bg-stone-900 text-amber-50 border-stone-900 shadow-sm"
                        : "bg-white text-stone-700 border-stone-200 hover:border-stone-350"
                    }`}
                  >
                    <div className="flex justify-between items-baseline w-full">
                      <span className="text-xs font-bold font-sans">{size.label}</span>
                      <span className={`text-[10px] font-mono ${isSelected ? "text-amber-300" : "text-stone-500"}`}>{size.range}</span>
                    </div>
                    <span className={`text-[9px] leading-tight ${isSelected ? "text-stone-300" : "text-stone-400"}`}>
                      {size.note}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Plume placement */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-5 w-5 rounded-full bg-stone-900 text-white text-[11px] font-mono flex items-center justify-center font-bold">3</span>
              <h4 className="text-stone-900 font-sans font-bold text-sm uppercase tracking-wide">
                Fit Organic Feather Accents
              </h4>
            </div>
            <p className="text-xs text-stone-500 mb-3">
              Tuck an authentic wild avian accent directly inside the side folds:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FEATHER_ACCENTS.map((f) => {
                const isSelected = activeFeather === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFeather(f.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all h-20 flex justify-between items-start cursor-pointer ${
                      isSelected
                        ? "bg-stone-50 border-amber-800 ring-1 ring-amber-800"
                        : "bg-white border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-stone-950 flex items-center gap-1">
                        {f.name}
                      </p>
                      <p className="text-[10px] text-stone-500 leading-snug">{f.desc}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-900 whitespace-nowrap ml-2">
                      {f.price === 0 ? "FREE" : `+${formatPrice(f.price)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Crest Pin Selection */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-5 w-5 rounded-full bg-stone-900 text-white text-[11px] font-mono flex items-center justify-center font-bold">4</span>
              <h4 className="text-stone-900 font-sans font-bold text-sm uppercase tracking-wide">
                Apply Decorative Emblem Badge
              </h4>
            </div>
            <p className="text-xs text-stone-500 mb-3">
              Historically worn by regional rulers, pins are mounted tight on the front rim:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {METAL_PINS.map((p) => {
                const isSelected = activePin === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePin(p.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all h-20 flex justify-between items-start cursor-pointer ${
                      isSelected
                        ? "bg-stone-50 border-amber-800 ring-1 ring-amber-800"
                        : "bg-white border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-stone-950 flex items-center gap-1">
                        {p.name}
                      </p>
                      <p className="text-[10px] text-stone-500 leading-snug">{p.desc}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-900 whitespace-nowrap ml-2">
                      {p.price === 0 ? "FREE" : `+${formatPrice(p.price)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: Custom Initials / Monogram */}
          <div className="pt-2 border-t border-stone-200/50">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-5 w-5 rounded-full bg-stone-900 text-white text-[11px] font-mono flex items-center justify-center font-bold">5</span>
              <h4 className="text-stone-900 font-sans font-bold text-sm uppercase tracking-wide">
                Hand Needlework Monogram Initials
              </h4>
            </div>
            <p className="text-xs text-stone-500 mb-2.5">
              Specify 1 to 8 capital initials to be intricately embroidered inside the wool lining:
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="e.g. ARHAM"
                maxLength={8}
                value={monogram}
                onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                className="bg-white border border-gray-200 rounded-lg px-4.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-800 flex-1 uppercase font-mono tracking-widest text-center"
              />
              <div className="bg-stone-100/70 border border-stone-200 text-stone-600 text-[10.5px] px-4 rounded-lg flex items-center font-mono leading-tight">
                Gold thread styling (+{formatPrice(12)})
              </div>
            </div>
          </div>

          {/* Master trigger buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleOrderCustom}
              className="w-full sm:w-auto flex-1 bg-amber-900 hover:bg-stone-900 text-white font-sans font-semibold text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] cursor-pointer shadow-md"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>ORDER CUSTOM MADE MASTERPIECE — {formatPrice(basePriceUSD)}</span>
            </button>
          </div>

          {/* Real-time Order success absolute toast notification */}
          <AnimatePresence>
            {successNotice && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-emerald-800 text-stone-50 px-5 py-3.5 rounded-xl border border-emerald-600 shadow-lg text-xs flex items-center gap-3"
              >
                <div className="h-6 w-6 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold text-xs">
                  ✓
                </div>
                <div>
                  <p className="font-bold flex items-center gap-1.5 uppercase tracking-wide">
                    Custom Design Captured!
                  </p>
                  <p className="text-[11px] text-stone-200 mt-0.5">
                    Your bespoke wool cap recipe was successfully configured and added to your Shopping Bag. Open your bag to complete checkout.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
};
