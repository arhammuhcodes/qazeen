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

const CRAFT_STEPS = [
  {
    step: "01",
    title: "Alpine Shearing",
    desc: "We exclusively gather thick early-spring wool fleece from pure-breed sheep grazing at heights over 10,000 feet in the Hindu Kush mountains, delivering organic warmth insulation."
  },
  {
    step: "02",
    title: "Mineral Water washing",
    desc: "The raw wool fleece is transported to the thermal springs of Garam Chashma, where minerals wash and soften the sheep oil, yielding pristine bounce without harsh chemical detergents."
  },
  {
    step: "03",
    title: "Hand-Carding & Shuttle Weaving",
    desc: "Elders hand-card the loose wool into fine clouds, then hand-spin it using domestic wooden spindles (charkhas). The thread is woven on wooden foot-looms into narrow 10-yard rolls called 'Patti' (Shu)."
  },
  {
    step: "04",
    title: "Continuous Hot-Trampling",
    desc: "To reach the compact windproof texture, the raw woven cloth is soaked in hot water, folded, and stamped continuously by feet for hours. This shrinks and locks the fibers into felt-like armor."
  },
  {
    step: "05",
    title: "Rim Rolling & Crown Molding",
    desc: "Master stitchers hand-measure and sew the flat crown. The woolen tube is rolled upwards step-by-step into a tight tubular rim that maintains its pristine geometric fold over a lifetime."
  }
];

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

      {/* SECTION: STEP-BY-STEP WOOL TIMELINE COMPONENT (The Craft Process) */}
      <div className="bg-black/[0.02] rounded-xl p-6 md:p-10 border border-black/10 relative overflow-hidden">
        
        {/* Background number watermark for Void aesthetic */}
        <div className="absolute -bottom-10 -right-10 text-[180px] font-serif italic text-black/[0.015] leading-none pointer-events-none select-none">
          04
        </div>

        <div className="space-y-3 mb-10 max-w-xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/50 block">
            CHRONICLED CHITRALI TIMELINE
          </span>
          <h3 className="text-stone-900 font-serif font-semibold text-2xl md:text-3xl">
            Tracing raw wool to insulated crown
          </h3>
          <div className="h-[1px] w-12 bg-black mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-10 relative">
          {CRAFT_STEPS.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-start space-y-3 group">
              
              {/* Artistic step numbering instead of fat bubbles */}
              <div className="flex items-end gap-1.5">
                <span className="font-serif italic text-3xl text-black/90 group-hover:text-amber-800 transition-colors">
                  {step.step}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-black/30 font-bold mb-1">/05</span>
              </div>

              <div className="h-[1px] w-8 bg-black/20 group-hover:w-16 transition-all duration-300" />

              <div className="space-y-1">
                <h5 className="font-sans font-bold text-black text-xs uppercase tracking-wider">
                  {step.title}
                </h5>
                <p className="text-black/60 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
