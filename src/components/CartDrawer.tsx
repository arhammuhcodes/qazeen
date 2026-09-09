/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Trash2, Plus, Minus, Tag, CreditCard, ShoppingBag, Truck, Gift, CheckCircle, Package } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem } from "../types";
import { ChitraliCapPreview } from "./ChitraliCapPreview";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  currency: string;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  currency,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0); // fraction (e.g., 0.15 for 15% off)
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const [checkoutStep, setCheckoutStep] = useState<"cart" | "shipping" | "payment" | "success">("cart");
  
  // Checkout Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    cardNum: "",
    cardExp: "",
    cardCvv: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Success Order details
  const [orderId, setOrderId] = useState("");
  const [trackingStatus, setTrackingStatus] = useState(0); // 0: placed, 1: weaving, 2: transit, 3: delivered

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

  const formatCartPrice = (item: CartItem) => {
    if (currency === "PKR" && item.product.category === "pakol") {
      const basePrice = 2000;
      const featherPrice = item.addFeather && !item.product.hasFeatherIncluded ? 500 : 0;
      return `Rs ${(basePrice + featherPrice).toLocaleString()}`;
    }
    const unitPrice = item.product.price + (item.addFeather && !item.product.hasFeatherIncluded ? item.featherPrice : 0);
    return formatPrice(unitPrice);
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => {
    const itemUnitPrice = item.product.price + (item.addFeather && !item.product.hasFeatherIncluded ? item.featherPrice : 0);
    return acc + (itemUnitPrice * item.quantity);
  }, 0);

  const discountAmount = subtotal * appliedDiscount;
  const shippingFee = subtotal > 100 || promoCode.toUpperCase() === "FREEFEDEX" ? 0 : 8;
  const total = subtotal - discountAmount + shippingFee;
  const displaySubtotal = cart.reduce((acc, item) => {
    const unitPrice = currency === "PKR" && item.product.category === "pakol"
      ? 2000 + (item.addFeather && !item.product.hasFeatherIncluded ? 500 : 0)
      : item.product.price + (item.addFeather && !item.product.hasFeatherIncluded ? item.featherPrice : 0);
    return acc + unitPrice * item.quantity;
  }, 0);
  const displayDiscountAmount = displaySubtotal * appliedDiscount;

  // Apply Coupon Logic
  const handleApplyPromo = () => {
    setPromoError("");
    setPromoSuccess("");
    const cleaned = promoCode.trim().toUpperCase();
    if (cleaned === "CHITRAL15") {
      setAppliedDiscount(0.15); // 15% off
      setPromoSuccess("Promo code 'CHITRAL15' applied! 15% off discount secured.");
    } else if (cleaned === "FREEFEDEX") {
      setAppliedDiscount(0);
      setPromoSuccess("Promo code 'FREEFEDEX' applied! Free Global shipping activated.");
    } else {
      setPromoError("Invalid coupon code. Try 'CHITRAL15' or 'FREEFEDEX'.");
    }
  };

  // Form Validations
  const handleValidateShipping = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Please enter your full name.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "Please specify a correct email.";
    if (!formData.address.trim()) errors.address = "Delivery address is required.";
    if (!formData.city.trim()) errors.city = "City is required.";
    if (!formData.phone.trim()) errors.phone = "Phone number is required.";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleValidatePayment = () => {
    const errors: Record<string, string> = {};
    if (!formData.cardNum.match(/^\d{16}$/)) errors.cardNum = "Must be a valid 16-digit card number.";
    if (!formData.cardExp.match(/^\d{2}\/\d{2}$/)) errors.cardExp = "Use MM/YY criteria.";
    if (!formData.cardCvv.match(/^\d{3}$/)) errors.cardCvv = "Provide 3-digit CVV.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!handleValidatePayment()) return;
    
    // Successful checkout compilation
    const generatedOrder = `QZN-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedOrder);
    setCheckoutStep("success");
    setTrackingStatus(1); // Set to "weaving" (hand-making your topi)
  };

  const resetAll = () => {
    onClearCart();
    setFormData({
      fullName: "",
      email: "",
      address: "",
      city: "",
      phone: "",
      cardNum: "",
      cardExp: "",
      cardCvv: "",
    });
    setCheckoutStep("cart");
    setAppliedDiscount(0);
    setPromoCode("");
    setPromoSuccess("");
    setPromoError("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black"
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#f7f5f2] border-l border-black/10 shadow-2xl flex flex-col justify-between"
          >
            {/* 1. HEADER */}
            <div className="p-5 border-b border-black/10 flex items-center justify-between bg-black/[0.02]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-900" />
                <h2 className="text-sm uppercase tracking-widest font-sans font-bold text-[#1a1a1a]">
                  {checkoutStep === "cart" && `Bag (${cart.length})`}
                  {checkoutStep === "shipping" && "Delivery Information"}
                  {checkoutStep === "payment" && "Payment Checkout"}
                  {checkoutStep === "success" && "Order Secured!"}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-black/40 hover:text-black hover:bg-black/5 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. BODY CONTENT */}
            <div className="flex-1 overflow-y-auto p-5">
              
              {/* CART ITEMS STEP */}
              {checkoutStep === "cart" && (
                <>
                  {cart.length === 0 ? (
                    <div className="h-64 flex flex-col items-center justify-center text-center space-y-3.5">
                      <div className="h-16 w-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <p className="text-stone-500 font-sans font-medium">Your shopping bag is completely empty.</p>
                      <button
                        onClick={onClose}
                        className="bg-amber-900/90 hover:bg-amber-900 text-stone-50 px-5 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Explore Caps Catalog
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => {
                        const unitPrice = item.product.price + (item.addFeather && !item.product.hasFeatherIncluded ? item.featherPrice : 0);
                        return (
                          <div
                            key={item.id}
                            className="flex items-start gap-3.5 pb-4 border-b border-stone-100 last:border-b-0"
                          >
                            {/* Dynamically styled thumbnail rendering the exact chosen wool cap */}
                            <div className="w-16 h-16 bg-stone-50 border border-stone-200 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                              <ChitraliCapPreview
                                color={item.selectedColor.hex}
                                featherType={item.addFeather ? (item.product.id === "royal-neelam-ivory" ? "peacock" : "pheasant") : "none"}
                                metalAccent="none"
                                className="w-14 h-14"
                              />
                            </div>

                            {/* Details */}
                            <div className="flex-1">
                              <h4 className="text-stone-900 text-sm font-semibold leading-tight">
                                {item.product.name}
                              </h4>
                              <p className="text-stone-500 text-[10.5px] font-mono mt-0.5 uppercase tracking-wider">
                                {item.selectedSize.split(" ")[0]} · {item.selectedColor.name.split(" ")[0]}
                              </p>
                              {item.addFeather && (
                                <p className="text-emerald-700 text-[10px] flex items-center gap-0.5 font-medium mt-0.5">
                                  <CheckCircle className="w-3 h-3" /> Peacock Plume Accent Attached
                                </p>
                              )}

                              {/* Quantity Adjustment Controls */}
                              <div className="flex items-center gap-2.5 mt-2">
                                <div className="flex items-center border border-stone-200.5 rounded-md overflow-hidden bg-white shadow-3xs">
                                  <button
                                    onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                                    className="p-1 hover:bg-stone-50 text-stone-500 hover:text-stone-900 focus:outline-none"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="px-2 text-xs font-mono font-bold text-stone-900">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                                    className="p-1 hover:bg-stone-50 text-stone-500 hover:text-stone-900 focus:outline-none"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                                  title="Delete Item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Pricing summary */}
                            <div className="text-right">
                              <span className="text-stone-900 font-bold font-mono text-xs">
                                {currency === "PKR" && item.product.category === "pakol"
                                  ? `Rs ${((item.addFeather && !item.product.hasFeatherIncluded ? 2500 : 2000) * item.quantity).toLocaleString()}`
                                  : formatPrice(unitPrice * item.quantity)}
                              </span>
                              {item.quantity > 1 && (
                                <p className="text-[9.5px] text-stone-400">
                                  {formatCartPrice(item)} each
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {/* SHIPPING INFORMATION STEP */}
              {checkoutStep === "shipping" && (
                <div className="space-y-4">
                  <div className="bg-stone-50 p-4 border border-stone-200 rounded-lg text-xs leading-relaxed text-stone-700">
                    <p className="font-bold text-stone-900 flex items-center gap-1.5 mb-1.5 font-mono">
                      <Truck className="w-4 h-4 text-amber-800" /> SAFE REGISTERED WORLDWIDE SHIPPING
                    </p>
                    Each order arrives individually hand-checked and packed securely in a classic wooden collector box from Chitral, guarding the woolen posture.
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-1">
                      Full Recipient Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Zarar Baig"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-800"
                    />
                    {formErrors.fullName && <p className="text-rose-600 text-xs mt-1">{formErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. zarar@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-800"
                    />
                    {formErrors.email && <p className="text-rose-600 text-xs mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-1">
                      Recipient Telephone *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. +92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-800"
                    />
                    {formErrors.phone && <p className="text-rose-600 text-xs mt-1">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-1">
                      Delivery Street Address *
                    </label>
                    <textarea
                      rows={2}
                      placeholder="House No, Block/Street, Area name..."
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-800"
                    />
                    {formErrors.address && <p className="text-rose-600 text-xs mt-1">{formErrors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-1">
                      City & Country *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Peshawar, Warsak Road"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-800"
                    />
                    {formErrors.city && <p className="text-rose-600 text-xs mt-1">{formErrors.city}</p>}
                  </div>
                </div>
              )}

              {/* SIMULATED CARD PAYMENT STEP */}
              {checkoutStep === "payment" && (
                <div className="space-y-4">
                  <div className="bg-amber-50/70 p-4 border border-amber-200 rounded-lg text-xs leading-relaxed text-amber-900">
                    <p className="font-bold flex items-center gap-1.5 mb-1.5">
                      <CreditCard className="w-4 h-4" /> SIMULATED CHECKOUT PREVIEW
                    </p>
                    To test the e-commerce purchase sequence, please use a simulated 16-digit card digit (e.g. 4000123456789012) and arbitrary metrics. No money is processed!
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-1">
                      Cardholder Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      disabled
                      className="w-full bg-stone-50 border border-stone-200 text-stone-500 rounded-lg px-3 py-2 text-sm focus:outline-none cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-1">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      maxLength={16}
                      placeholder="4000123456789012"
                      value={formData.cardNum}
                      onChange={(e) => setFormData({ ...formData, cardNum: e.target.value.replace(/\D/g, "") })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-800"
                    />
                    {formErrors.cardNum && <p className="text-rose-600 text-xs mt-1">{formErrors.cardNum}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-1">
                        Expiry (MM/YY) *
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="12/28"
                        value={formData.cardExp}
                        onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-800 text-center"
                      />
                      {formErrors.cardExp && <p className="text-rose-600 text-xs mt-1">{formErrors.cardExp}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-1">
                        Security CVV *
                      </label>
                      <input
                        type="password"
                        maxLength={3}
                        placeholder="123"
                        value={formData.cardCvv}
                        onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value.replace(/\D/g, "") })}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-800 text-center"
                      />
                      {formErrors.cardCvv && <p className="text-rose-600 text-xs mt-1">{formErrors.cardCvv}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* ORDER COMPILATION SUCCESS & TRACKING STEP */}
              {checkoutStep === "success" && (
                <div className="text-center py-6 space-y-6">
                  <div className="h-20 w-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-900 shadow-xs">
                    <CheckCircle className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="text-stone-900 text-lg font-bold font-serif">
                      Your Order is Placed!
                    </h3>
                    <p className="text-stone-500 text-xs mt-1.5">
                      Thank you for patronizing traditional Chitrali craftsmanship. We have sent a comprehensive receipt copy to <strong className="text-stone-700 font-medium">{formData.email}</strong>.
                    </p>
                  </div>

                  {/* Generated Order ID and Status Tracking tracker */}
                  <div className="bg-stone-50 p-4 border border-stone-200 rounded-lg text-stone-850 text-left space-y-4">
                    <div className="flex justify-between items-center text-xs border-b border-stone-200/50 pb-2">
                      <span className="font-mono text-stone-500">ORDER NO:</span>
                      <span className="font-bold font-mono text-amber-950 font-medium">{orderId}</span>
                    </div>

                    {/* Active wool stitching status timeline bar */}
                    <div>
                      <span className="text-[10px] font-mono text-stone-400 block mb-3 uppercase tracking-wider">
                        LIVE WEAVING & DELIVERING STATUS:
                      </span>
                      
                      <div className="relative">
                        {/* Horizontal timeline core line */}
                        <div className="absolute top-3 left-3 right-3 h-0.5 bg-stone-200" />
                        <div
                          className="absolute top-3 left-3 h-0.5 bg-amber-700 transition-all duration-1000"
                          style={{ width: `${(trackingStatus / 3) * 100}%` }}
                        />

                        {/* Nodes */}
                        <div className="flex justify-between items-center relative text-[10px]">
                          <div className="flex flex-col items-center">
                            <div className="h-6 w-6 rounded-full bg-amber-700 text-stone-100 flex items-center justify-center font-bold">
                              ✓
                            </div>
                            <span className="mt-1 font-medium text-[9px]">Confirmed</span>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center font-bold transition-colors ${
                              trackingStatus >= 1 ? "bg-amber-700 text-stone-100" : "bg-stone-100 text-stone-400"
                            }`}>
                              <Package className="w-3.5 h-3.5" />
                            </div>
                            <span className="mt-1 font-medium text-[9px] text-amber-900 font-bold">Weaving Wool</span>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center font-bold transition-colors ${
                              trackingStatus >= 2 ? "bg-amber-700 text-stone-100" : "bg-stone-100 text-stone-400"
                            }`}>
                              <Truck className="w-3.5 h-3.5" />
                            </div>
                            <span className="mt-1 font-medium text-[9px]">In Transit</span>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center font-bold ${
                              trackingStatus >= 3 ? "bg-amber-700 text-stone-100" : "bg-stone-100 text-stone-400"
                            }`}>
                              ✓
                            </div>
                            <span className="mt-1 font-medium text-[9px]">Delivered</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-2.5 rounded border border-stone-200 text-[11px] leading-relaxed text-stone-600 font-sans mt-3">
                      <strong>Current Step:</strong> Our weavers at Upper Chitral valley are spinning premium sheep-fleece wool yarn to mold your cap. Expected completion is within 4 days.
                    </div>
                  </div>

                  <button
                    onClick={resetAll}
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    Return to Craft Homepage
                  </button>
                </div>
              )}
            </div>

            {/* 3. FOOTER PRICING DETAILS */}
            {checkoutStep !== "success" && cart.length > 0 && (
              <div className="p-5 border-t border-stone-150 bg-stone-50 space-y-4">
                
                {/* Promo Code section (Cart state only) */}
                {checkoutStep === "cart" && (
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                          type="text"
                          placeholder="Promo code (CHITRAL15)"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-amber-800"
                        />
                      </div>
                      <button
                        onClick={handleApplyPromo}
                        className="bg-stone-900 hover:bg-stone-800 text-amber-50 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && <p className="text-rose-600 text-[10.5px] font-mono">{promoError}</p>}
                    {promoSuccess && <p className="text-emerald-700 text-[10.5px] font-sans font-bold">{promoSuccess}</p>}
                  </div>
                )}

                {/* Subtotals list */}
                <div className="space-y-1.5 text-xs font-sans text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-stone-900 font-bold">{currency === "PKR" ? `Rs ${displaySubtotal.toLocaleString()}` : formatPrice(subtotal)}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Promo Discount (-15%)</span>
                      <span className="font-mono font-bold">-{currency === "PKR" ? `Rs ${displayDiscountAmount.toLocaleString()}` : formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>International Insured Carriage</span>
                    <span className="font-mono text-stone-900 font-bold">
                      {shippingFee === 0 ? "FREE" : currency === "PKR" ? "Rs 2,224" : formatPrice(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-stone-900 font-bold border-t border-stone-200 pt-2 font-serif">
                    <span>Total Bill</span>
                      <span className="text-amber-950 font-bold font-mono text-base">{currency === "PKR" ? `Rs ${(displaySubtotal - displayDiscountAmount + (shippingFee === 0 ? 0 : 2224)).toLocaleString()}` : formatPrice(total)}</span>
                  </div>
                </div>

                {/* STEPS MAIN ACTION ACTIONS */}
                <div className="pt-2">
                  {checkoutStep === "cart" && (
                    <button
                      onClick={() => setCheckoutStep("shipping")}
                      className="w-full bg-amber-900/95 hover:bg-amber-900 text-amber-50 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow"
                    >
                      <span>Proceed to Shipping details</span>
                      <span>→</span>
                    </button>
                  )}

                  {checkoutStep === "shipping" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCheckoutStep("cart")}
                        className="flex-1 bg-white border border-stone-200 hover:bg-stone-100 text-stone-800 py-2.5 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Back to Bag
                      </button>
                      <button
                        onClick={() => {
                          if (handleValidateShipping()) setCheckoutStep("payment");
                        }}
                        className="flex-1 bg-amber-900 text-white py-2.5 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  )}

                  {checkoutStep === "payment" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCheckoutStep("shipping")}
                        className="flex-1 bg-white border border-stone-200 hover:bg-stone-100 text-stone-800 py-2.5 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Back to Delivery
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        className="flex-1 bg-amber-950 text-amber-50 py-2.5 rounded-lg text-xs font-semibold hover:bg-stone-900 transition-colors"
                      >
                        Simulate Purchase ({formatPrice(total)})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
