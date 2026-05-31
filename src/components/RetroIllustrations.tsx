/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// Hero illustration representing the exact retro Macintosh computer + sparkles + pen from the uploaded design!
export const MacHeroIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 500 450"
      className={`w-full max-w-[450px] h-auto ${className}`}
      fill="none"
      stroke="black"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Sparkles / Bubbles (retro aesthetic) */}
      <circle cx="270" cy="90" r="4" fill="white" strokeWidth="3" />
      <circle cx="290" cy="110" r="3.5" fill="black" />
      <circle cx="250" cy="130" r="2.5" fill="white" strokeWidth="2.5"/>
      <circle cx="220" cy="90" r="5" fill="white" strokeWidth="3"/>
      <circle cx="240" cy="60" r="3" fill="black" />

      {/* Styled Pen on the Left */}
      <g transform="translate(140, 90) rotate(-15)">
        {/* Pen Tip nib */}
        <path d="M 12 150 L 30 180 L 12 180 Z" fill="black" />
        <line x1="21" y1="165" x2="21" y2="180" stroke="white" strokeWidth="2" />
        {/* Pen body */}
        <rect x="12" y="50" width="18" height="100" fill="white" />
        {/* Pen grip rings */}
        <line x1="12" y1="120" x2="30" y2="120" />
        <line x1="12" y1="130" x2="30" y2="130" />
        <line x1="12" y1="140" x2="30" y2="140" />
        {/* Pen Cap Clip */}
        <path d="M 30 65 L 40 65 L 40 100 L 30 100" fill="white" />
        {/* Pen Top bead */}
        <circle cx="21" cy="45" r="5" fill="black" />
      </g>

      {/* RETRO MACINTOSH COMPUTER */}
      {/* Outer shell shadow / 3D block */}
      <path d="M 230 135 H 440 V 315 L 430 335 H 250 L 230 315 Z" fill="black" />
      
      {/* Computer Main Body */}
      <rect x="220" y="125" width="200" height="190" rx="10" fill="white" strokeWidth="3.5" />
      
      {/* The CRT Screen Bezel (Recessed) */}
      <rect x="238" y="140" width="164" height="130" rx="15" fill="white" strokeWidth="3" />
      
      {/* The CRT Screen Outer Boundary */}
      <rect x="248" y="150" width="144" height="110" rx="10" fill="black" strokeWidth="3" />
      {/* Screen CRT Color Fill (Retro light gray with code/face) */}
      <rect x="253" y="155" width="134" height="100" rx="6" fill="#F3F4F6" stroke="none" />
      
      {/* Screen Interface: Smiling face like the image */}
      <g transform="translate(260, 165)" stroke="black" strokeWidth="4.5" fill="none">
        {/* Left eye (big round circle) */}
        <circle cx="40" cy="30" r="14" fill="white" strokeWidth="4" />
        <circle cx="40" cy="30" r="4" fill="black" />
        {/* Right eye */}
        <circle cx="80" cy="30" r="14" fill="white" strokeWidth="4" />
        <circle cx="80" cy="30" r="4" fill="black" />
        
        {/* Smile curve */}
        <path d="M 46 60 Q 60 74 74 60" strokeWidth="4.5" strokeLinecap="round" />
        {/* Cute blush cheeks */}
        <line x1="20" y1="50" x2="30" y2="50" strokeWidth="2.5" />
        <line x1="90" y1="50" x2="100" y2="50" strokeWidth="2.5" />
      </g>

      {/* Floppy drive slot on Mac body below screen */}
      <rect x="250" y="285" width="100" height="8" rx="2" fill="black" />
      <rect x="360" y="285" width="12" height="8" rx="2" fill="white" strokeWidth="2.5" /> {/* Programmer key hole */}
      <circle cx="366" cy="289" r="1.5" fill="black" />

      {/* Mac vents detail */}
      <g strokeWidth="2">
        <line x1="225" y1="135" x2="235" y2="135" />
        <line x1="225" y1="140" x2="235" y2="140" />
        <line x1="225" y1="145" x2="235" y2="145" />
      </g>

      {/* Computer Stand / Base */}
      <path d="M 240 315 L 210 355 H 410 L 390 315 Z" fill="white" strokeWidth="3.5" />
      <line x1="210" y1="355" x2="410" y2="355" strokeWidth="4" />

      {/* Stylized keyboard cable curling around */}
      <path d="M 400 340 Q 450 350 435 385 T 380 410" stroke="black" strokeWidth="3" fill="none" />
    </svg>
  );
};

// Map of different item illustrations rendered natively via CSS and standard high contrast SVG
export const ProductIllustration: React.FC<{ iconType: string; className?: string }> = ({ iconType, className = '' }) => {
  const commonAttrs = {
    className: `w-full h-full max-h-[160px] ${className}`,
    viewBox: "0 0 160 120",
    fill: "none",
    stroke: "black",
    strokeWidth: "3",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (iconType) {
    case 'mac-computer':
      return (
        <svg {...commonAttrs}>
          {/* Main Monitor Outer shell */}
          <rect x="40" y="10" width="80" height="80" rx="6" fill="white" />
          {/* Inner bezel */}
          <rect x="48" y="18" width="64" height="48" rx="4" fill="white" />
          {/* Screen area */}
          <rect x="52" y="22" width="56" height="40" rx="2" fill="#E5E7EB" />
          {/* Little glowing cursor on screen */}
          <polygon points="60,30 65,35 62,35 64,39 62,40 60,36 58,37" fill="black" stroke="none" />
          {/* Floppy disk drive slot */}
          <rect x="50" y="74" width="45" height="4" rx="1" fill="black" />
          {/* Micro indicator */}
          <circle cx="102" cy="76" r="1.5" fill="black" />
          {/* Base Stand */}
          <path d="M 50 90 L 45 105 H 115 L 110 90 Z" fill="white" />
          <line x1="30" y1="105" x2="130" y2="105" strokeWidth="4" />
        </svg>
      );

    case 'extended-keyboard':
      return (
        <svg {...commonAttrs}>
          {/* Keyboard frame */}
          <rect x="15" y="45" width="130" height="40" rx="3" fill="white" strokeWidth="3.5" />
          {/* Coiled cable illustration */}
          <path d="M 80 45 C 80 30, 95 25, 90 15 S 105 15, 100 25" stroke="black" strokeWidth="2" fill="none" />
          
          {/* Key layout rows */}
          <rect x="22" y="52" width="12" height="8" rx="1" fill="black" />
          <rect x="38" y="52" width="12" height="8" rx="1" fill="white" />
          <rect x="54" y="52" width="12" height="8" rx="1" fill="white" />
          <rect x="70" y="52" width="12" height="8" rx="1" fill="white" />
          <rect x="86" y="52" width="12" height="8" rx="1" fill="white" />
          <rect x="102" y="52" width="12" height="8" rx="1" fill="white" />
          <rect x="118" y="52" width="20" height="8" rx="1" fill="black" />

          {/* Row 2 */}
          <rect x="22" y="64" width="16" height="8" rx="1" fill="white" />
          <rect x="42" y="64" width="12" height="8" rx="1" fill="white" />
          <rect x="58" y="64" width="44" height="8" rx="1" fill="white" /> {/* Spacebar-ish */}
          <rect x="106" y="64" width="12" height="8" rx="1" fill="white" />
          <rect x="122" y="64" width="16" height="8" rx="1" fill="white" />
          
          {/* Feet */}
          <line x1="25" y1="85" x2="25" y2="92" strokeWidth="3" />
          <line x1="135" y1="85" x2="135" y2="92" strokeWidth="3" />
        </svg>
      );

    case 'boxy-mouse':
      return (
        <svg {...commonAttrs}>
          {/* Mouse body */}
          <rect x="45" y="20" width="70" height="80" rx="10" fill="white" strokeWidth="3.5" />
          {/* Cable hole */}
          <line x1="80" y1="20" x2="80" y2="5" strokeWidth="2.5" />
          {/* Large Retro Button */}
          <rect x="45" y="20" width="70" height="30" rx="10" fill="none" />
          <line x1="45" y1="50" x2="115" y2="50" />
          
          {/* Active single button scroll highlight line */}
          <path d="M 80 50 L 80 85" strokeDasharray="3,3" />
          
          {/* Subtle logo/branding lines */}
          <line x1="60" y1="90" x2="80" y2="90" strokeWidth="1.5" />
          <circle cx="100" cy="85" r="4" fill="black" />
        </svg>
      );

    case 'floppy-disk':
      return (
        <svg {...commonAttrs}>
          {/* Main Floppy Case */}
          <path d="M 35 15 H 110 L 125 30 V 105 H 35 Z" fill="white" strokeWidth="3.5" />
          {/* Sliding Metal Shutter */}
          <rect x="55" y="15" width="40" height="30" fill="black" />
          <line x1="75" y1="15" x2="75" y2="45" stroke="white" strokeWidth="2.5" />
          {/* Write Protect Tab Slot */}
          <rect x="110" y="88" width="10" height="12" fill="black" />
          
          {/* Label area */}
          <rect x="45" y="55" width="70" height="42" rx="2" fill="white" />
          {/* Label text placeholders */}
          <line x1="53" y1="65" x2="107" y2="65" strokeWidth="2" />
          <line x1="53" y1="75" x2="107" y2="75" strokeWidth="2" />
          <line x1="53" y1="85" x2="90" y2="85" strokeWidth="2" />
        </svg>
      );

    case 'scsi-storage':
      return (
        <svg {...commonAttrs}>
          {/* Outer enclosure box / PCB */}
          <rect x="25" y="25" width="110" height="70" rx="4" fill="white" strokeWidth="3.5" />
          {/* SD Card slot representation */}
          <rect x="65" y="25" width="30" height="15" fill="black" />
          {/* Capacitor line art */}
          <circle cx="45" cy="45" r="8" fill="white" />
          <line x1="45" y1="37" x2="45" y2="53" />
          <line x1="37" y1="45" x2="53" y2="45" />

          {/* Chips */}
          <rect x="40" y="65" width="24" height="20" fill="black" />
          <rect x="75" y="55" width="45" height="30" rx="2" fill="white" />
          <text x="80" y="74" fill="black" stroke="none" fontFamily="monospace" fontSize="8" fontWeight="bold">SCSI-II</text>
          
          {/* Dynamic LED dots */}
          <circle cx="115" cy="40" r="3" fill="black" />
          <circle cx="125" cy="40" r="3.5" fill="white" strokeWidth="2" />
        </svg>
      );

    case 'crt-hood':
      return (
        <svg {...commonAttrs}>
          {/* Computer head profile outline */}
          <rect x="45" y="20" width="70" height="70" rx="10" fill="white" />
          {/* Screen curve */}
          <rect x="52" y="28" width="56" height="42" rx="4" fill="#F3F4F6 animate-pulse" />
          {/* Anti-glare Hood Frame around the monitor */}
          <path d="M 38 10 H 122 L 115 85 H 45 Z" fill="none" strokeWidth="4" />
          <path d="M 38 10 L 45 85" strokeWidth="4" />
          <path d="M 122 10 L 115 85" strokeWidth="4" strokeLinecap="round" />
          {/* Light projection lines showing screen glare filter blocking */}
          <line x1="20" y1="35" x2="38" y2="35" strokeDasharray="3,3" />
          <line x1="20" y1="55" x2="38" y2="55" strokeDasharray="3,3" />
          {/* Badge */}
          <rect x="65" y="100" width="30" height="12" fill="black" />
          <line x1="75" y1="106" x2="85" y2="106" stroke="white" strokeWidth="2" />
        </svg>
      );

    case 'software-box':
      return (
        <svg {...commonAttrs}>
          {/* 3D-styled Software Retail Box */}
          <polygon points="35,30 105,15 130,25 130,95 60,110 35,95" fill="white" />
          {/* Front box divider edge */}
          <line x1="105" y1="15" x2="105" y2="85" />
          <line x1="60" y1="110" x2="105" y2="85" />
          <line x1="105" y1="85" x2="130" y2="95" />
          
          {/* Decorative design curves */}
          <circle cx="70" cy="55" r="14" fill="black" />
          <path d="M 35 60 Q 70 85 105 60" strokeWidth="2.5" />
          {/* Software Title lines */}
          <line x1="45" y1="30" x2="90" y2="22" strokeWidth="2.5" />
          <line x1="45" y1="38" x2="75" y2="32" strokeWidth="2" />
        </svg>
      );

    case 'floppy-drive':
      return (
        <svg {...commonAttrs}>
          {/* External disk enclosure box */}
          <rect x="30" y="30" width="100" height="55" rx="3" fill="white" strokeWidth="3.5" />
          {/* Main Floppy Slot entry */}
          <rect x="42" y="45" width="76" height="7" rx="1.5" fill="black" />
          {/* Eject button */}
          <rect x="98" y="60" width="16" height="10" rx="1" fill="white" />
          <circle cx="106" cy="65" r="2.5" fill="black" />
          {/* LED light */}
          <circle cx="48" cy="65" r="3" fill="black" />
          {/* Line details */}
          <line x1="30" y1="75" x2="130" y2="75" />
          {/* Cable connector tail */}
          <path d="M 130 58 Q 145 58 140 75" fill="none" strokeWidth="2" />
        </svg>
      );

    default:
      return (
        <svg {...commonAttrs}>
          <circle cx="80" cy="60" r="40" fill="white" />
          <path d="M 60 60 L 100 60 L 80 40 L 80 80 Z" fill="black" />
        </svg>
      );
  }
};
