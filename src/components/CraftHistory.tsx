/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Trees, Compass, Hammer, Award, Sparkles, MapPin, Feather } from "lucide-react";
import { motion } from "motion/react";

interface CraftHistoryProps {
  craftsmanImage: string;
}

export const CraftHistory: React.FC<CraftHistoryProps> = ({ craftsmanImage }) => {
  return (
    <div className="space-y-16 relative">
      
      {/* BACKGROUND WATERMARK (The Art of Void Signature Style) */}
      <div className="absolute top-10 right-10 text-[240px] md:text-[325px] font-serif italic text-black/[0.02] leading-none pointer-events-none select-none">
        02
      </div>

      {/* SECTION: MAIN STORY GRID (Directly corresponds to the user reference screenshot layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center max-w-7xl mx-auto relative z-10">
        
        {/* Left Side: Story text Details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/50 block">
              OUR HISTORICAL STUDY
            </span>
            <h2 className="text-stone-900 font-serif font-semibold text-3xl md:text-4xl leading-tight">
              Aesthetica of high-altitude resilience & woven silence
            </h2>
          </div>

          <p className="text-black/60 text-sm md:text-base leading-relaxed">
            The Chitrali Topi (traditionally known as the <strong className="text-black">Pakol</strong>) represents far more than visual style—it is a timeless insignia of dignity, patience, and high-altitude insulation. Nested beneath the snow-crowned peak of Tirich Mir, our master artisans carry forward a 400-year-old weaving lineage.
          </p>

          <p className="text-black/60 text-sm leading-relaxed">
            Unlike modern commercial knitwear, every authentic Qazeen cap is born from raw local sheep fleece, handspun on wooden spools, and double-molded. The distinct rolled-up rim offers insulating cushions against deep frozen winds of the Hindu Kush, while the baggy hollow crown acts as a ventilation chamber.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-black/10">
            <div className="flex flex-col gap-2">
              <span className="text-[9px] uppercase tracking-widest font-bold text-black/40">Atelier Coordinates</span>
              <span className="text-xs font-mono text-black/80">35.8511° N, 71.7864° E</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[9px] uppercase tracking-widest font-bold text-black/40">Heritage Classification</span>
              <span className="text-xs font-serif italic text-black/80">Premium Pure "Shu" Weave</span>
            </div>
          </div>
        </div>

        {/* Right Side: Generated Artisan image frame */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-white/40 p-3 rounded-xl border border-black/10 shadow-3xs"
          >
            {/* Visual background framing decor */}
            <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-br from-amber-200/5 to-transparent blur-md pointer-events-none" />

            <div className="aspect-4/3 overflow-hidden rounded-lg border border-black/10 bg-stone-200 relative group">
              <img
                src={craftsmanImage}
                alt="Chitrali craftsman hand-making a topi"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              
              {/* Overlay quote */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#f7f5f2]/95 backdrop-blur-xs p-3.5 rounded-lg border border-black/10 shadow-xs">
                <p className="text-black/90 italic text-xs leading-relaxed">
                  &quot;The loom requires your heart&apos;s peace. If you weave with hurry or heavy thoughts, the wool curls tight and misses the soft grace.&quot;
                </p>
                <p className="text-[10px] uppercase font-mono tracking-widest font-bold text-amber-900 mt-2">
                  — Baba Shafi, 3rd Generation Qazeen Weaver
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

    </div>
  );
};
