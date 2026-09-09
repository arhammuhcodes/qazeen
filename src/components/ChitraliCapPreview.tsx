/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";

interface ChitraliCapPreviewProps {
  color: string; // hex code
  featherType: string; // 'none' | 'peacock' | 'pheasant' | 'gold_crest'
  metalAccent: string; // 'none' | 'silver' | 'bronze' | 'gold'
  showTag?: boolean;
  className?: string;
  size?: string;
}

export const ChitraliCapPreview: React.FC<ChitraliCapPreviewProps> = ({
  color,
  featherType,
  metalAccent,
  showTag = false,
  className = "w-64 h-64",
  size = "M",
}) => {
  // Generate slightly darker wool shadows
  const getShadowColor = (hex: string) => {
    // Basic hex color darkener for shading
    const c = hex.replace("#", "");
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    
    const factor = 0.75; // 25% darker
    const nr = Math.floor(r * factor);
    const ng = Math.floor(g * factor);
    const nb = Math.floor(b * factor);
    
    return `rgb(${nr}, ${ng}, ${nb})`;
  };

  const getGradientColor = (hex: string) => {
    const c = hex.replace("#", "");
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    
    const factor = 1.15; // 15% lighter for highlight
    const nr = Math.min(255, Math.floor(r * factor));
    const ng = Math.min(255, Math.floor(g * factor));
    const nb = Math.min(255, Math.floor(b * factor));
    
    return `rgb(${nr}, ${ng}, ${nb})`;
  };

  const baseCol = color;
  const shadowCol = getShadowColor(color);
  const highlightCol = getGradientColor(color);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Background radial soft light glow */}
      <div className="absolute inset-0 bg-radial from-amber-50/40 via-transparent to-transparent rounded-full pointer-events-none blur-xl" />

      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          {/* Main Cap Shading Gradient */}
          <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={highlightCol} />
            <stop offset="60%" stopColor={baseCol} />
            <stop offset="100%" stopColor={shadowCol} />
          </linearGradient>

          {/* Roll Brim Gradient */}
          <linearGradient id="brimGrad" x1="0%" y1="30%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={highlightCol} />
            <stop offset="35%" stopColor={baseCol} />
            <stop offset="100%" stopColor={shadowCol} />
          </linearGradient>

          {/* Golden Crest Gradient */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="50%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#875F00" />
          </linearGradient>

          {/* Silver Pin Gradient */}
          <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#CFD8DC" />
            <stop offset="100%" stopColor="#546E7A" />
          </linearGradient>

          {/* Bronze Pin Gradient */}
          <linearGradient id="bronzeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D7CCC8" />
            <stop offset="50%" stopColor="#8D6E63" />
            <stop offset="100%" stopColor="#4E342E" />
          </linearGradient>

          {/* Woolen Texture Filter (adds realistic craft detail) */}
          <filter id="woolNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0" />
            <feBlend mode="multiply" in="SourceGraphic" in2="noise" />
          </filter>

          {/* Soft Shadow Filter */}
          <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="16" stdDeviation="12" floodOpacity="0.15" floodColor="#3E2723" />
          </filter>
        </defs>

        {/* 1. Ground Shadow */}
        <ellipse cx="200" cy="335" rx="100" ry="22" fill="#000" fillOpacity="0.12" filter="blur(6px)" />

        {/* 1.5 ACCENT FEATHERS (rendered behind the brim roll but in front of crown back) */}
        {featherType !== "none" && (
          <g filter="url(#softShadow)">
            {/* Elegant feather stem line */}
            <motion.line
              x1="220"
              y1="230"
              x2="245"
              y2="100"
              stroke="#BCAAA4"
              strokeWidth="2.5"
              initial={{ scaleY: 0, originX: "220px", originY: "230px" }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6 }}
            />

            {/* PEACOCK FEATHER DESIGN */}
            {featherType === "peacock" && (
              <motion.g
                initial={{ opacity: 0, scale: 0.6, y: 30, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                className="cursor-pointer"
              >
                {/* Main luxurious plume background */}
                <path
                  d="M210 220 C180 140, 210 90, 240 70 C270 90, 280 150, 230 220 Z"
                  fill="url(#peacockFeather)"
                  fillOpacity="0.85"
                />
                
                {/* Emerald Green / Blue glow eye */}
                <path
                  d="M215 155 C205 135, 220 115, 235 110 C250 115, 255 135, 235 155 Z"
                  fill="#004D40"
                />
                <path
                  d="M220 148 C212 135, 222 122, 232 118 C242 122, 246 135, 232 148 Z"
                  fill="#00B0FF"
                />
                <circle cx="228" cy="134" r="8" fill="#1A237E" />
                <circle cx="226" cy="132" r="4" fill="#00E5FF" />

                {/* Feather Barbule Lines */}
                <path d="M215 180 L200 178 M240 185 L255 183 M212 160 L195 155 M242 165 L260 160 M215 140 L198 132 M240 148 L258 140 M220 120 L205 110 M238 128 L255 118" stroke="#00796B" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                
                {/* Specific radial gradient for peacock feather backdrop */}
                <linearGradient id="peacockFeather" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#004D40" />
                  <stop offset="40%" stopColor="#00796B" />
                  <stop offset="70%" stopColor="#FFB300" />
                  <stop offset="100%" stopColor="#4E342E" />
                </linearGradient>
              </motion.g>
            )}

            {}
            {featherType === "pheasant" && (
              <motion.g
                initial={{ opacity: 0, scale: 0.6, y: 30, rotate: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
              >
                {/* Slender striped bird feather */}
                <path
                  d="M225 210 C205 140, 220 80, 238 50 C250 80, 255 140, 232 210 Z"
                  fill="#A1887F"
                />
                <path d="M225 210 C205 140, 220 80, 238 50 Z" fill="#4E342E" opacity="0.3" />
                {/* Stripes */}
                {[70, 90, 110, 130, 150, 170, 190].map((yHeight, idx) => (
                  <path
                    key={idx}
                    d={`M ${218 + idx} ${yHeight} L ${243 + idx} ${yHeight - 12}`}
                    stroke="#3E2723"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                ))}
                {/* White highlights */}
                {[80, 120, 160].map((yHeight, idx) => (
                  <path
                    key={idx}
                    d={`M ${220 + idx} ${yHeight} L ${238 + idx} ${yHeight - 8}`}
                    stroke="#FFFDF9"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                ))}
              </motion.g>
            )}

            {/* INTEGRATED GOLD CREST FEATHER (Ornamental metal plume) */}
            {featherType === "gold_crest" && (
              <motion.g
                initial={{ opacity: 0, scale: 0.5, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 140, damping: 12 }}
              >
                <path
                  d="M222 210 Q190 140, 235 60 Q245 130, 228 210 Z"
                  fill="url(#goldGrad)"
                />
                {/* Gold details */}
                <path d="M225 62 L221 205 M218 80 L233 90 M214 110 L230 118 M212 140 L226 145" stroke="#FFF59D" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="235" cy="60" r="5" fill="#D32F2F" /> {/* Red ruby jewel */}
              </motion.g>
            )}
          </g>
        )}

        {/* 2. MAIN CROWN (Top, slightly flat dome of the pakol) */}
        <g filter="url(#woolNoise)">
          {/* Main woolen dome of the cap */}
          <path
            d="M 120 220 C 120 180, 150 145, 200 145 C 250 145, 280 180, 280 220 C 280 230, 260 250, 200 250 C 140 250, 120 230, 120 220 Z"
            fill="url(#capGrad)"
            stroke={shadowCol}
            strokeWidth="0.5"
          />

          {/* Visual knit/folds texture lines on the crown dome */}
          <path
            d="M 150 180 Q 185 160, 200 152 Q 215 160, 250 180"
            stroke={highlightCol}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.3"
          />
          <path
            d="M 135 205 Q 180 185, 200 180 Q 220 185, 265 205"
            stroke={highlightCol}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.25"
          />
          <path
            d="M 170 160 C 185 155, 215 155, 230 160"
            stroke={shadowCol}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.2"
          />
        </g>

        {/* 3. THE ROLLED BRIM (Folded edge tube of the Pakol) */}
        {/* We build this in multiple layered rolls for realistic depth */}
        <g filter="url(#woolNoise)">
          {/* Underlayer brim back */}
          <path
            d="M 105 235 C 105 215, 295 215, 295 235 C 295 265, 260 300, 200 300 C 140 300, 105 265, 105 235 Z"
            fill="url(#brimGrad)"
            stroke={shadowCol}
            strokeWidth="1"
          />

          {/* Stitched fold segments on the rolled edge (symbolizes the tight rolling technique) */}
          <g opacity="0.6">
            <path d="M 130 250 Q 135 292, 142 291" stroke={shadowCol} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 160 255 Q 166 298, 172 297" stroke={shadowCol} strokeWidth="2" strokeLinecap="round" />
            <path d="M 200 256 Q 200 300, 200 299" stroke={shadowCol} strokeWidth="2" strokeLinecap="round" />
            <path d="M 240 255 Q 234 298, 228 297" stroke={shadowCol} strokeWidth="2" strokeLinecap="round" />
            <path d="M 270 250 Q 265 292, 258 291" stroke={shadowCol} strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Highlights along the upper edge of the roll */}
          <path
            d="M 112 240 C 130 226, 270 226, 288 240"
            stroke={highlightCol}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.45"
            filter="blur(1px)"
          />

          {/* Inner core rim edge details */}
          <path
            d="M 110 245 C 130 236, 270 236, 290 245"
            stroke={shadowCol}
            strokeWidth="1.5"
            opacity="0.3"
          />

          {/* Bottom curve absolute highlight */}
          <path
            d="M 130 286 C 160 295, 240 295, 270 286"
            stroke={highlightCol}
            strokeWidth="2"
            opacity="0.35"
            strokeLinecap="round"
          />
        </g>

        {/* 4. METAL BADGE / PIN ACCENT ON THE SIDE BRIM */}
        {metalAccent !== "none" && (
          <motion.g
            initial={{ scale: 0, opacity: 0, x: 215, y: 245 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
            className="cursor-pointer"
            filter="url(#softShadow)"
          >
            {/* Base pin background */}
            <circle
              cx="222"
              cy="252"
              r="14"
              fill={
                metalAccent === "gold"
                  ? "url(#goldGrad)"
                  : metalAccent === "silver"
                  ? "url(#silverGrad)"
                  : "url(#bronzeGrad)"
              }
              stroke={metalAccent === "gold" ? "#F57F17" : metalAccent === "silver" ? "#37474F" : "#3E2723"}
              strokeWidth="1.5"
            />

            {/* Embossed Logo (Mini Mountain silhouette representing Hindu Kush peaks of Chitral) */}
            <path
              d="M214 257 L220 246 L224 252 L228 244 L232 257 Z"
              fill={metalAccent === "gold" ? "#FF8F00" : metalAccent === "silver" ? "#78909C" : "#5D4037"}
              opacity="0.8"
            />
            {/* Center diamond ruby jewel detail in Pin */}
            <circle
              cx="222"
              cy="251"
              r="2.5"
              fill={metalAccent === "gold" ? "#E53935" : metalAccent === "silver" ? "#00E5FF" : "#8E24AA"}
            />
          </motion.g>
        )}

        {/* 5. BRAND EMBOSSED INNER TEXT INSIDE SVD (Optional/Subtle) */}
        <text
          x="200"
          y="385"
          fill="#8D6E63"
          fontSize="11"
          fontWeight="500"
          fontFamily="monospace"
          textAnchor="middle"
          letterSpacing="4"
          opacity="0.5"
        >
          QAZEEN - FINE CHITRALI PATTI
        </text>
      </svg>

      {/* Real-time size custom label absolute badge */}
      {showTag && (
        <motion.div
          key={size}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-16 right-4 bg-amber-900/95 border border-amber-500/20 text-amber-50 text-[10px] tracking-wider font-mono px-2 py-0.5 rounded shadow-lg uppercase"
        >
          SIZE: {size.split(" ")[0]}
        </motion.div>
      )}
    </div>
  );
};
