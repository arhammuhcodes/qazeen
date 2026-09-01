/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Star, ChevronDown, Check, HelpCircle, Search, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Review } from "../types";
import { FAQS, REVIEWS } from "../data";

interface ReviewsAndFAQProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export const ReviewsAndFAQ: React.FC<ReviewsAndFAQProps> = ({ reviews, onAddReview }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // New review form states
  const [authorName, setAuthorName] = useState("");
  const [rating, setRating] = useState(5);
  const [commentText, setCommentText] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Filter FAQs
  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      rating: rating,
      date: "Today",
      comment: commentText.trim(),
      verified: true,
    };

    onAddReview(newRev);
    setAuthorName("");
    setRating(5);
    setCommentText("");
    setShowReviewForm(false);
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
      
      {/* LEFT: REVIEWS (Lg span 6) */}
      <div className="lg:col-span-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/50 block">
              PATRONS VOICES
            </span>
            <h3 className="text-stone-900 font-serif font-semibold text-2.5xl">
              User Experiences
            </h3>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="border border-black/15 hover:border-black text-[#1a1a1a] font-bold uppercase tracking-[0.18em] px-4 py-2 rounded-lg text-[9px] transition-all cursor-pointer"
          >
            {showReviewForm ? "Cancel Review" : "Write a Review"}
          </button>
        </div>

        {/* Dynamic New Review Form */}
        <AnimatePresence>
          {showReviewForm && (
            <motion.form
              key="rev-form"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={handleReviewSubmit}
              className="bg-black/[0.02] border border-black/10 rounded-xl p-5 space-y-4 overflow-hidden shadow-3xs"
            >
              <h4 className="font-sans font-bold text-[#1a1a1a] text-[10px] uppercase tracking-wider">
                Publish your Experience
              </h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-black/50 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arham Khan"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-white border border-black/10 rounded-lg px-3 py-1.5 text-xs text-[#1a1a1a] focus:outline-none focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-black/50 mb-1">
                    Your Rating (Stars)
                  </label>
                  <div className="flex gap-1.5 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setRating(s)}
                        className="cursor-pointer focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            rating >= s ? "fill-amber-500 text-amber-500" : "text-stone-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-black/50 mb-1">
                  Detail your comment
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Share details of the wool texture, fit, feather aesthetics..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full bg-white border border-black/10 rounded-lg px-3 py-1.5 text-xs text-[#1a1a1a] focus:outline-none focus:border-amber-800"
                />
              </div>

              <button
                type="submit"
                className="bg-[#1a1a1a] hover:bg-black text-white px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer"
              >
                Submit Verified Review
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Success toast inside Reviews */}
        <AnimatePresence>
          {formSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-stone-900 border border-black/10 text-stone-50 p-3 rounded-lg text-xs flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-emerald-400" /> Thank you! Your review has been added to our live verified customer board.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white/60 p-4 border border-black/[0.08] rounded-xl space-y-2.5 shadow-3xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-stone-900 text-sm font-bold flex flex-wrap items-center gap-1.5">
                    {rev.author}
                    {rev.verified && (
                      <span className="bg-black/5 text-[#1a1a1a] text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-black/10">
                        <Check className="w-2.5 h-2.5 text-emerald-700" /> VERIFIED PATRON
                      </span>
                    )}
                  </h4>
                  <p className="text-black/40 text-[9px] uppercase font-mono tracking-wider">{rev.date}</p>
                </div>

                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        rev.rating >= s ? "fill-amber-500 text-amber-500" : "text-stone-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-black/70 text-xs leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: SEARCHABLE FAQS ACCORDION (Lg span 6) */}
      <div className="lg:col-span-6 space-y-6">
        <div className="space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/50 block">
              HAVE COMPREHENSIONS?
            </span>
            <h3 className="text-stone-900 font-serif font-semibold text-2.5xl">
              Frequently Asked Questions
            </h3>
          </div>

          {/* Interactive Search inside FAQs */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search head measurement, wool care guidelines, origins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/60 border border-black/10 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1a1a1a] placeholder:text-stone-400 focus:outline-none focus:border-amber-805"
            />
          </div>
        </div>

        {/* Accordion list */}
        <div className="space-y-2.5">
          {filteredFaqs.length === 0 ? (
            <p className="text-stone-500 text-xs font-mono py-12 text-center">
              No matching questions found in our wool craft handbook. Try searching &quot;wool&quot; or &quot;size&quot;.
            </p>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white/65 border border-black/[0.08] rounded-xl overflow-hidden transition-all duration-300 shadow-3xs hover:border-black/20"
                >
                  <button
                    onClick={() => handleToggleFaq(idx)}
                    className="w-full text-left px-4.5 py-3.5 flex justify-between items-center bg-black/[0.01] hover:bg-black/[0.03] transition-colors cursor-pointer"
                  >
                    <span className="text-black font-bold text-xs leading-relaxed flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-900 flex-shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-4.5 py-3 border-t border-black/[0.06] text-black/75 text-xs leading-relaxed space-y-1.5 bg-black/[0.015]">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
};
