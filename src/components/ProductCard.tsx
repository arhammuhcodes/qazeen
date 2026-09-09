/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Star, ShieldAlert, Sparkles, ShoppingCart } from "lucide-react";
import { CapProduct, ColorOption } from "../types";
import { motion } from "motion/react";

interface ProductCardProps {
  product: CapProduct;
  onAddToCart: (product: CapProduct, color: ColorOption, size: string, addFeather: boolean) => void;
  currency: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, currency }) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "M (57-58cm)");
  const [addFeather, setAddFeather] = useState<boolean>(product.hasFeatherIncluded || false);
  const isAvailable = product.isAvailable !== false && (product.category === "pakol" || product.id === "pure-mountain-shilajit");

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

  // Currency Converter formula
  const formatPrice = (usdAmount: number) => {
    const factor = getConversionFactor(currency);
    const symbol = CURRENCY_SYMBOLS[currency] || "$";
    const finalPrice = Math.round(usdAmount * factor);
    return `${symbol} ${finalPrice.toLocaleString()}`;
  };

  const getFeatherAdditionalPrice = () => {
    if (product.hasFeatherIncluded) return 0;
    return 8; // $8 for a premium peacock feather
  };

  const currentPrice = product.price + (addFeather && !product.hasFeatherIncluded ? getFeatherAdditionalPrice() : 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`bg-white/60 border border-black/10 rounded-xl overflow-hidden shadow-2xs transition-all duration-300 flex flex-col justify-between ${isAvailable ? "hover:shadow-sm hover:border-black/25" : "opacity-75"}`}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-4/3 bg-black/[0.02] overflow-hidden group">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
          referrerPolicy="no-referrer"
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.isFeatured && (
            <span className="bg-[#1a1a1a] text-white text-[9px] uppercase font-bold tracking-[0.18em] px-2.5 py-1 rounded shadow-2xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" /> Best Seller
            </span>
          )}
          {product.hasFeatherIncluded && (
            <span className="bg-white/95 border border-black/15 text-[#1a1a1a] text-[9px] uppercase font-bold tracking-[0.18em] px-2.5 py-1 rounded shadow-2xs">
              Feather Included
            </span>
          )}
          {!isAvailable && (
            <span className="bg-red-950 text-white text-[9px] uppercase font-bold tracking-[0.18em] px-2.5 py-1 rounded shadow-2xs">
              Out of Stock
            </span>
          )}
        </div>

        {/* Rating overlay */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded text-stone-800 text-[11px] font-mono flex items-center gap-1 shadow-3xs border border-black/5">
          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
          <span>{product.rating}</span>
          <span className="text-stone-400">({product.reviewsCount})</span>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Main Titles */}
          <div className="flex flex-col mb-1.5">
            <h3 className="text-[#1a1a1a] font-serif font-bold italic text-lg leading-snug hover:text-amber-900 transition-all">
              {product.name}
            </h3>
            <span className="text-stone-900 font-mono font-bold text-sm mt-1">
              {formatPrice(currentPrice)}
            </span>
          </div>

          <p className="text-amber-950/70 text-xs font-serif italic mb-3 direction-rtl tracking-wide">
            {product.urduName}
          </p>

          <p className="text-[#1a1a1a]/70 text-xs leading-relaxed mb-4 font-sans">
            {product.description}
          </p>
        </div>

        {/* CUSTOMIZATION OPTIONS CONTROL */}
        <div className="space-y-4 pt-4 border-t border-black/10">
          
          {/* Color selectors */}
          <div>
            <div className="flex justify-between text-[9px] font-bold uppercase tracking-[0.18em] text-black/50 mb-1.5">
              <span>COLOR BLEND:</span>
              <span className="text-[#1a1a1a] font-bold">{selectedColor.name.split(" ")[0]}</span>
            </div>
            <div className="flex gap-2">
              {product.colors.map((color) => {
                const isActive = selectedColor.hex === color.hex;
                return (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    className={`h-6.5 w-6.5 rounded-full cursor-pointer flex items-center justify-center transition-all ${color.bgClass} ${
                      isActive ? "ring-2 ring-black ring-offset-2 scale-110 shadow-xs" : "border border-black/10 hover:scale-105"
                    }`}
                    title={color.name}
                  />
                );
              })}
            </div>
          </div>

          {/* Size Selectors */}
          <div>
            <div className="flex justify-between text-[9px] font-bold uppercase tracking-[0.18em] text-black/50 mb-1.5">
              <span>HEAD SIZE:</span>
              <span className="text-[#1a1a1a] font-bold">{selectedSize.split(" ")[0]}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((size) => {
                const isActive = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 text-[10px] font-bold rounded cursor-pointer transition-all uppercase tracking-wider ${
                      isActive
                        ? "bg-[#1a1a1a] text-white border border-[#1a1a1a] shadow-2xs"
                        : "bg-white text-black/60 border border-black/10 hover:border-black/30 hover:text-black"
                    }`}
                  >
                    {size.split(" ")[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FEATHER MOUNT TRIGGER */}
          <div className="flex items-center justify-between bg-black/[0.02] p-2.5 rounded-lg border border-black/10">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#1a1a1a] flex items-center gap-1 font-sans">
                Attach Peacock Feather
              </span>
              <span className="text-[10px] text-black/50">
                {product.hasFeatherIncluded ? "Included with premium design" : `Add ethically-sourced feather (+${formatPrice(8)})`}
              </span>
            </div>
            <input
              type="checkbox"
              checked={addFeather}
              disabled={product.hasFeatherIncluded}
              onChange={(e) => setAddFeather(e.target.checked)}
              className="h-4 w-4 bg-white border border-black/20 text-[#1a1a1a] rounded cursor-pointer disabled:opacity-50 accent-[#1a1a1a]"
            />
          </div>

          {/* ADD TO CART ACTION BUTTON */}
          <button
            disabled={!isAvailable}
            onClick={() => onAddToCart(product, selectedColor, selectedSize, addFeather)}
            className={`w-full py-3 rounded-lg font-sans font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-xs mt-1 border border-black/10 ${isAvailable ? "bg-[#1a1a1a] hover:bg-black text-white cursor-pointer" : "bg-stone-200 text-stone-500 cursor-not-allowed"}`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{isAvailable ? `Add to Cart — ${formatPrice(currentPrice)}` : "Out of Stock"}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
