/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MacHeroIllustration } from './RetroIllustrations';
import { Product } from '../types';
import { RETRO_PRODUCTS } from '../productsData';
import { ProductIllustration } from './RetroIllustrations';
import { ArrowRight, ShoppingBag, Terminal, ExternalLink, Cpu, Sparkles, Send, CheckCircle, Code, Briefcase, BookOpen, Layers, Eye, Play, Pause, RotateCcw, Volume2, RotateCw, Sliders, LayoutGrid } from 'lucide-react';

// Image references for the portfolio showcase constructed via Vite-compatible URL objects
const ryanSpreadImg = new URL('../assets/images/ryan_reynolds_spread_1780231186285.png', import.meta.url).href;
const filmfareCoverImg = new URL('../assets/images/filmfare_cover_1780231211474.png', import.meta.url).href;
const artOfBhaktiImg = new URL('../assets/images/art_of_bhakti_1780231234711.png', import.meta.url).href;
const chipcharmCgiImg = new URL('../assets/images/chipcharm_cgi_1780231258471.png', import.meta.url).href;
const mopShortFilmImg = new URL('../assets/images/mop_short_film_1780233791614.png', import.meta.url).href;
const infographicsThumbnailImg = new URL('../assets/images/infographics_thumbnail_1780234570027.png', import.meta.url).href;

interface MacHeroProps {
  onNavigate: (tab: 'catalog' | 'auth' | 'checkout') => void;
  onAddToCart: (product: Product) => void;
}

export const MacHero: React.FC<MacHeroProps> = ({ onNavigate, onAddToCart }) => {
  const [activeDate, setActiveDate] = useState<string>('');
  const [activeTime, setActiveTime] = useState<string>('');
  const [selectedSkillCat, setSelectedSkillCat] = useState<'languages' | 'frameworks' | 'specialized'>('languages');
  
  // Work Together Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: 'collab',
    message: ''
  });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionProgress, setTransmissionProgress] = useState(0);
  const [transmissionSteps, setTransmissionSteps] = useState<string[]>([]);
  const [isTransmitted, setIsTransmitted] = useState(false);

  // State managers for high-fidelity interactive designer portfolio projects (Ryan Reynolds spreads, Filmfare, Bhakti, and ChipCharm package designs)
  const [p1ViewMode, setP1ViewMode] = useState<'design' | 'interactive'>('design');
  const [p2ViewMode, setP2ViewMode] = useState<'design' | 'interactive'>('design');
  const [p3ViewMode, setP3ViewMode] = useState<'design' | 'interactive'>('design');
  const [p4ViewMode, setP4ViewMode] = useState<'design' | 'interactive' | 'video'>('design');
  const [p5ViewMode, setP5ViewMode] = useState<'design' | 'interactive' | 'video'>('design');
  const [p6ViewMode, setP6ViewMode] = useState<'design' | 'video' | 'simulator' | 'interactive'>('video');
  const [infoHiringGoal, setInfoHiringGoal] = useState<number>(190);
  const [infoEmployeesOnboarded, setInfoEmployeesOnboarded] = useState<number>(74);
  const [infoRetentionRate, setInfoRetentionRate] = useState<number>(80);
  const [infoPlayingAnim, setInfoPlayingAnim] = useState<boolean>(true);

  const [cinematicLut, setCinematicLut] = useState<'warm' | 'noir' | 'teal' | 'mono'>('warm');
  const [letterboxActive, setLetterboxActive] = useState<boolean>(true);
  const [foleyLevel, setFoleyLevel] = useState<number>(75);
  const [isFoleyGenerating, setIsFoleyGenerating] = useState<boolean>(false);

  const [editorialFontSize, setEditorialFontSize] = useState<number>(13);
  const [isDualColumn, setIsDualColumn] = useState<boolean>(true);
  const [showEditorialGuidelines, setShowEditorialGuidelines] = useState<boolean>(false);

  // Filmfare Frontcover states
  const [coverTaglineIndex, setCoverTaglineIndex] = useState<number>(0);
  const [showCoverGrids, setShowCoverGrids] = useState<boolean>(false);
  const [avatarPositionX, setAvatarPositionX] = useState<number>(0);

  // The Art of Bhakti states
  const [bhaktiColor, setBhaktiColor] = useState<'gold' | 'teal' | 'orange' | 'marigold'>('gold');
  const [isLotusActive, setIsLotusActive] = useState<boolean>(true);

  // ChipCharm Package CGI states
  const [chipRenderPass, setChipRenderPass] = useState<'beauty' | 'wireframe' | 'particles'>('beauty');
  const [isSimulatingCgiSpeed, setIsSimulatingCgiSpeed] = useState<boolean>(false);
  const [cgiParticleSpeed, setCgiParticleSpeed] = useState<'normal' | 'render'>('normal');

  // Trigger smooth synth notes to emulate the spiritual Indian flute music for Bhakti theme matches
  const triggerBhaktiFluteTone = (frequency: number) => {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;
      const ctx = new AudioCtxClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine'; // Pure smooth waveform representing traditional Indian flute
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      // Vibrato frequency modulation
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      vibrato.frequency.value = 6; // 6Hz vibrato oscillation
      vibratoGain.gain.value = 5; // offset pitch vibrato swing
      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0.0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
      
      vibrato.start();
      osc.start();
      
      vibrato.stop(ctx.currentTime + 0.95);
      osc.stop(ctx.currentTime + 0.95);
    } catch (e) {
      console.warn('Web Audio check: user interaction required or context blocked.', e);
    }
  };

  const triggerRetroSound = (frequency: number) => {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;
      const ctx = new AudioCtxClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setActiveDate(now.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }));
      setActiveTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-16 py-4">
      {/* SECTION 1: HERO CONTAINER (Hello. I'm Mac.) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
        {/* Left Side Texts */}
        <div className="col-span-1 md:col-span-12 space-y-6">
          <div className="space-y-2">
            <h1 className="font-sans font-black text-6xl md:text-7xl lg:text-8xl tracking-tight text-white/5 shadow-neutral-900 leading-[0.9]">
              <span className="text-black block animate-fadeIn">Hello.</span>
              <span className="text-black block animate-fadeIn">I'm Kanishk Chaudhary.</span>
            </h1>
          </div>

          <div className="space-y-4 font-mono text-xs sm:text-sm">
            <p className="text-zinc-600 font-bold max-w-xl leading-relaxed">
              I'm a Graphic Designer and VFX Artist. I design dithered posters, compose immersive 3D scene simulations, and craft premium retro-futuristic digital overlay assets with pixel-level precision.
            </p>
            <p className="text-zinc-500 font-medium">
              Equipped with elite design asset packages, vintage halftone brush engines, and cinematic anamorphic overlays.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('catalog')}
              className="border-4 border-black bg-white hover:bg-black hover:text-white text-black font-mono font-bold uppercase tracking-wider py-3.5 px-8 text-xs rounded-sm transition-all duration-150 transform active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[5px_5px_0px_0px_#000] flex items-center space-x-2"
            >
              <span>Explore Design Assets Store</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => onNavigate('auth')}
              className="border-4 border-black bg-black text-white hover:bg-white hover:text-black font-mono font-bold uppercase tracking-wider py-3.5 px-8 text-xs rounded-sm transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 shadow-[4px_4px_0px_0px_rgba(110,110,110,1)] flex items-center space-x-2"
            >
              <Terminal className="h-4 w-4" />
              <span>Join Designer Registry</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: QUICK LINKS GRID (Exactly from Mockup style!) */}
      <div className="space-y-4">
        <h3 className="font-sans font-black text-xl text-left tracking-tight border-b-4 border-black pb-2 uppercase">
          Quick links
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 font-mono text-sm border-2 border-black divide-y-2 md:divide-y-0 md:divide-x-2 divide-black">
          <button
            onClick={() => onNavigate('catalog')}
            className="bg-white hover:bg-black hover:text-white text-black p-4 text-left font-black flex items-center justify-between group transition-all"
          >
            <span>Product Catalog</span>
            <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </button>
          <button
            onClick={() => onNavigate('auth')}
            className="bg-white hover:bg-black hover:text-white text-black p-4 text-left font-black flex items-center justify-between group transition-all"
          >
            <span>Member Registry</span>
            <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </button>
          <button
            onClick={() => onNavigate('checkout')}
            className="bg-white hover:bg-black hover:text-white text-black p-4 text-left font-black flex items-center justify-between group transition-all"
          >
            <span>Secure Checkout</span>
            <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </button>
          <a
            href="https://ai.studio/build"
            target="_blank"
            rel="noreferrer"
            className="bg-white hover:bg-black hover:text-white text-black p-4 text-left font-black flex items-center justify-between group transition-all"
          >
            <span>AI Studio Builder</span>
            <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </a>
        </div>
      </div>

      {/* SECTION 3: SIGNATURE DESIGN & VFX PROJECTS (INTERACTIVE PORTFOLIO PLAYGROUND) */}
      <div id="projects-section-container" className="space-y-8 text-left">
        <div id="projects-header-wrapper" className="flex justify-between items-baseline border-b-4 border-black pb-2">
          <h3 id="projects-heading-title" className="font-sans font-black text-3xl tracking-tight uppercase">
            Featured Projects
          </h3>
          <span id="projects-meta-stamp" className="font-mono text-zinc-500 font-extrabold text-xs hidden sm:inline">
            STUDIO_PORTFOLIO_ENGINE // REALTIME_V5
          </span>
        </div>

        <p className="font-mono text-xs text-zinc-600 max-w-2xl leading-relaxed">
          Interactive viewports representing high-fidelity graphic design, print layout pagination, cultural digital collages, and 3D product CGI assets composed by Kanishk Chaudhary. Use the physical console switches to inspect layout gridlines, color palettes, and CGI render passes.
        </p>

        {/* 2x2 Bento Grid Layout for the 4 creative projects */}
        <div id="projects-interactive-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* PROJECT 1: RYAN REYNOLDS EDITORIAL SPREAD */}
          <div
            id="portfolio-project-1"
            className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden flex flex-col justify-between"
          >
            {/* Folder Header */}
            <div className="bg-amber-100/80 border-b-2 border-black p-2 px-3 xs:px-4 flex flex-col sm:flex-row gap-2 sm:items-center justify-between font-mono text-[10px] font-black uppercase text-zinc-600 select-none">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 border border-black"></span>
                <span>EDITORIAL_TYPESETTING.INDD</span>
              </span>
              
              {/* High fidelity View Mode Toggles */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setP1ViewMode('design')}
                  className={`px-2 py-0.5 border border-black rounded-xs font-black transition-colors ${p1ViewMode === 'design' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-amber-200'}`}
                >
                  🖼️ VIEW DESIGN
                </button>
                <button
                  onClick={() => setP1ViewMode('interactive')}
                  className={`px-2 py-0.5 border border-black rounded-xs font-black transition-colors ${p1ViewMode === 'interactive' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-amber-200'}`}
                >
                  ⚙️ SIMULATOR
                </button>
              </div>
            </div>

            {/* Interactive Design Viewport */}
            <div className="bg-stone-100 border-b-2 border-black p-4 xs:p-6 min-h-[330px] flex flex-col justify-center relative overflow-hidden">
              
              {p1ViewMode === 'design' ? (
                /* High-fidelity generated print graphic design spread */
                <div className="w-full h-full flex flex-col items-center justify-center space-y-2">
                  <div className="relative border-4 border-black bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden w-full max-w-lg">
                    <img 
                      src={ryanSpreadImg} 
                      alt="Ryan Reynolds Magazine Editorial Spread Graphic Artwork"
                      className="w-full h-auto object-cover block"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-xs p-2 text-[8px] font-mono text-amber-200 flex justify-between">
                      <span>PROJECT PREVIEW // RYAN REYNOLDS EDITORIAL</span>
                      <span>HIGH-FIDELITY RENDER</span>
                    </div>
                  </div>
                  <p className="font-mono text-[9px] text-zinc-500 text-center uppercase tracking-wider">
                    Designed using Adobe InDesign & Photometric Retouch techniques
                  </p>
                </div>
              ) : (
                /* Original live retro mockup simulation */
                <>
                  {/* Optional editorial alignment grid blueprint */}
                  {showEditorialGuidelines && (
                    <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 pointer-events-none opacity-20 border-b border-r border-red-500 divide-x divide-y divide-red-200">
                      {Array.from({ length: 72 }).map((_, i) => (
                        <div key={i} className="border border-red-500/10" />
                      ))}
                    </div>
                  )}

                  {/* The Dual Spread Magazine Pages Mock */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F9F7E8] p-4 md:p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] rounded-sm relative text-black">
                    {/* Book fold binding shade */}
                    <div className="absolute inset-y-0 left-1/2 -ml-[1px] w-[2px] bg-black/10 hidden sm:block pointer-events-none z-10" />
                    
                    {/* Left Spread Page */}
                    <div className="space-y-3 pr-1 sm:pr-2">
                      <div className="border-b border-black pb-1">
                        <span className="font-mono text-[8px] font-extrabold uppercase text-amber-800">
                          THE HOLLYWOOD SUPERSTAR // PAGE 1
                        </span>
                        <h5 className="font-sans font-black text-lg md:text-xl leading-none text-zinc-900 tracking-tight">
                          RYAN REYNOLDS
                        </h5>
                      </div>
                      
                      <p className="font-mono text-zinc-500 text-[8px] leading-tight select-none">
                        Ryan Reynolds is a Hollywood A-lister, Blockbusters like Deadpool have made him a household name, but it is his quick wit and self-deprecating humor.
                      </p>

                      <div className="border-l-2 border-amber-600 pl-2 py-0.5 bg-amber-50">
                        <p className="font-sans italic font-extrabold text-[9px] md:text-[10px] text-zinc-800 leading-tight">
                          "I love making people laugh. It's one of the best feelings in the world..."
                        </p>
                      </div>

                      {/* Body text wrapper with state-driven font-size */}
                      <p 
                        className="font-serif leading-snug text-zinc-700"
                        style={{ fontSize: `${editorialFontSize}px`, columnCount: isDualColumn ? 2 : 1 }}
                      >
                        Sharp, charming and always irreverent, he knows how to turn a funny quip that feels spontaneous.
                      </p>
                    </div>

                    {/* Right Spread Page */}
                    <div className="space-y-3 pl-1 sm:pl-2 flex flex-col justify-between">
                      <div className="border-b border-black pb-1 flex justify-between items-center">
                        <span className="font-mono text-[8px] text-zinc-500">SECRETS BEHIND DEADPOOL 3</span>
                        <span className="font-mono font-black text-[9px]">P.2</span>
                      </div>

                      {/* Comic/VFX Photo Grid Representation */}
                      <div className="border-2 border-black bg-stone-300 h-24 overflow-hidden relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-neutral-900 flex flex-col justify-end p-2 text-white">
                          <span className="font-mono text-[7px] text-red-400 font-extrabold block">LAYER // MASK_REYNOLDS</span>
                          <h6 className="font-sans font-black text-[10px] tracking-tight leading-none">WARM PHOTOMETRIC RETOUCH</h6>
                        </div>
                        {/* Retro lines symbolizing layout asset placeholder */}
                        <div className="absolute top-1 right-2 w-6 h-6 border border-zinc-500 rounded-full flex items-center justify-center font-mono text-[7px] text-zinc-500">
                          CMYK
                        </div>
                      </div>

                      {/* Case details text */}
                      <div className="space-y-1">
                        <p className="font-mono text-[8px] font-black uppercase text-amber-900">
                          3 Secrets Revealed:
                        </p>
                        <ol className="font-sans text-[8px] text-zinc-600 space-y-0.5 list-decimal pl-3 leading-snug">
                          <li><strong>New Twists:</strong> Redefined meta storytelling overlays.</li>
                          <li><strong>Action-Packed:</strong> Multi-layer VFX choreography.</li>
                          <li><strong>Cameos Expected:</strong> High-impact character renders.</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* Status grid marker overlay tag */}
                  {showEditorialGuidelines && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 border border-black z-20">
                      GRID LOCK // ACTIVE_LINES
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Custom Interactive Control Pad */}
            <div className="p-4 bg-zinc-50 border-t border-zinc-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
                {/* Description and Title */}
                <div className="space-y-1">
                  <h4 className="font-sans font-extrabold text-sm text-black">Editorial Typesetting System</h4>
                  <p className="text-[10px] text-zinc-500">Dual-spread layout of "Ryan Reynolds" magazine showcase.</p>
                </div>

                {/* Adjustments */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center space-x-1.5 border border-black bg-white p-1 rounded-sm">
                    <span className="text-[9px] font-bold">FONT:</span>
                    <button 
                      onClick={() => setEditorialFontSize(11)}
                      className={`px-1.5 py-0.5 text-[9px] font-black rounded-xs ${editorialFontSize === 11 ? 'bg-black text-white' : 'hover:bg-zinc-100'}`}
                    >
                      S
                    </button>
                    <button 
                      onClick={() => setEditorialFontSize(13)}
                      className={`px-1.5 py-0.5 text-[9px] font-black rounded-xs ${editorialFontSize === 13 ? 'bg-black text-white' : 'hover:bg-zinc-100'}`}
                    >
                      M
                    </button>
                    <button 
                      onClick={() => setEditorialFontSize(15)}
                      className={`px-1.5 py-0.5 text-[9px] font-black rounded-xs ${editorialFontSize === 15 ? 'bg-black text-white' : 'hover:bg-zinc-100'}`}
                    >
                      L
                    </button>
                  </div>

                  <button
                    onClick={() => setIsDualColumn(!isDualColumn)}
                    className="border border-black bg-white hover:bg-zinc-100 px-2 py-1 text-[9px] font-extrabold uppercase rounded-sm"
                  >
                    Columns: {isDualColumn ? '2' : '1'}
                  </button>

                  <button
                    onClick={() => {
                      setShowEditorialGuidelines(!showEditorialGuidelines);
                      try {
                        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                        const osc = ctx.createOscillator();
                        osc.frequency.value = 880;
                        osc.connect(ctx.destination);
                        osc.start();
                        osc.stop(ctx.currentTime + 0.05);
                      } catch(e){}
                    }}
                    className={`border border-black px-2 py-1 text-[9px] font-extrabold uppercase rounded-sm flex items-center space-x-1 ${
                      showEditorialGuidelines ? 'bg-red-100 text-red-900 border-red-500' : 'bg-white hover:bg-zinc-100'
                    }`}
                  >
                    <Sliders className="h-2.5 w-2.5" />
                    <span>Grid Lines</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PROJECT 2: FILMFARE MAGAZINE COVER */}
          <div
            id="portfolio-project-2"
            className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden flex flex-col justify-between"
          >
            {/* Folder Header */}
            <div className="bg-rose-100/80 border-b-2 border-black p-2 px-3 xs:px-4 flex flex-col sm:flex-row gap-2 sm:items-center justify-between font-mono text-[10px] font-black uppercase text-zinc-600 select-none">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 border border-black"></span>
                <span>FILMWARE_COVER_COMP.PSD</span>
              </span>
              
              {/* Toggles */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setP2ViewMode('design')}
                  className={`px-2 py-0.5 border border-black rounded-xs font-black transition-colors ${p2ViewMode === 'design' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-rose-200'}`}
                >
                  🖼️ VIEW DESIGN
                </button>
                <button
                  onClick={() => setP2ViewMode('interactive')}
                  className={`px-2 py-0.5 border border-black rounded-xs font-black transition-colors ${p2ViewMode === 'interactive' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-rose-200'}`}
                >
                  ⚙️ SIMULATOR
                </button>
              </div>
            </div>

            {/* Interactive Design Viewport */}
            <div className="bg-stone-100 border-b-2 border-black p-4 xs:p-6 min-h-[330px] flex flex-col items-center justify-center relative overflow-hidden">
              
              {p2ViewMode === 'design' ? (
                /* High fidelity generated magazine frontcover */
                <div className="w-full h-full flex flex-col items-center justify-center space-y-2">
                  <div className="relative border-4 border-black bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden w-full max-w-[210px]">
                    <img 
                      src={filmfareCoverImg} 
                      alt="Ryan Reynolds Filmware Magazine Cover Graphic Artwork"
                      className="w-full h-auto object-cover block"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-xs p-1.5 text-[8px] font-mono text-rose-200 flex justify-between">
                      <span>COVER // COMPLETED V5</span>
                      <span>HIGH-FIDELITY</span>
                    </div>
                  </div>
                  <p className="font-mono text-[9px] text-zinc-500 text-center uppercase tracking-wider">
                    Official graphic layout cover featuring Ryan Reynolds
                  </p>
                </div>
              ) : (
                /* Original live retro mockup simulation */
                <div className="w-[180px] xs:w-[220px] h-[270px] bg-stone-900 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.85)] relative overflow-hidden flex flex-col justify-between text-white select-none">
                  
                  {/* Print Safe Bleed Marker */}
                  {showCoverGrids && (
                    <div className="absolute inset-1.5 border border-dashed border-cyan-400 pointer-events-none z-30 flex items-start justify-end p-0.5">
                      <span className="font-mono text-[6px] text-cyan-300 font-bold bg-neutral-900 px-0.5">Bleed boundary (0.125")</span>
                    </div>
                  )}

                  {/* Filmfare Title Header */}
                  <div className="p-3 text-center z-10 space-y-0.5 relative pt-4">
                    <h4 className="font-serif font-black text-2xl xs:text-3xl tracking-widest leading-none text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.9)] transition-all">
                      FILMWARE
                    </h4>
                    <div className="h-[2px] bg-red-600 w-full" />
                  </div>

                  {/* Subtitle / Side texts inside the mockup */}
                  <div className="p-3 space-y-3 z-10 text-left relative font-mono">
                    <div className="space-y-0.5">
                      <span className="text-[6px] font-black bg-yellow-400 text-black p-0.5 rounded-xs uppercase">
                        exclusive
                      </span>
                      <p className="font-black text-[9px] xs:text-[10px] leading-none text-white drop-shadow-md">
                        HOLLYWOOD'S FUNNIEST A-LISTER
                      </p>
                    </div>

                    <div className="space-y-0.5">
                      <p className="font-extrabold text-[12px] xs:text-[14px] leading-none text-yellow-300 uppercase drop-shadow-[1.5px_1.5px_0px_rgba(0,0,0,0.8)]">
                        RYAN REYNOLDS
                      </p>
                      <p className="text-[6px] text-zinc-300 font-bold">THE REAL DEAL & BULLSEYE ARTIST</p>
                    </div>
                  </div>

                  {/* Backdrop graphic simulation representing Ryan's photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-800 to-black/40 z-0 flex items-center justify-center pt-10">
                    <div 
                      className="w-24 h-32 bg-stone-700/80 rounded-t-full border-2 border-dashed border-zinc-500 flex flex-col items-center justify-center text-zinc-400 text-[9px] transition-transform duration-200"
                      style={{ transform: `translateX(${avatarPositionX}px)` }}
                    >
                      <span>PHOTO MOCK</span>
                      <span className="font-mono text-[7px] text-zinc-500 text-center px-2 mt-1">Ryan Reynolds Avatar Retouch Layer</span>
                    </div>
                  </div>

                  {/* Dynamic user selected tagline footer bar */}
                  <div className="bg-red-700 p-2 z-15 border-t border-black font-mono text-[7px] font-extrabold flex justify-between uppercase">
                    <span>
                      {coverTaglineIndex === 0 && "🏷️ SPECIAL SECRETS COVER"}
                      {coverTaglineIndex === 1 && "🎞️ THE MOVIE BUZZ EDITION"}
                      {coverTaglineIndex === 2 && "🎬 THE VFX INTEGRITY REVEAL"}
                    </span>
                    <span>MAR 2026 // $4.99</span>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Interactive Control Pad */}
            <div className="p-4 bg-zinc-50 border-t border-zinc-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
                {/* Description */}
                <div className="space-y-1">
                  <h4 className="font-sans font-extrabold text-sm text-black">Cover Retouch Composer</h4>
                  <p className="text-[10px] text-zinc-500">Filmfare celebrity cover design composition.</p>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setCoverTaglineIndex(prev => (prev + 1) % 3)}
                    className="border border-black bg-white hover:bg-zinc-100 px-2 py-1 text-[9px] font-extrabold uppercase rounded-sm flex items-center space-x-1"
                  >
                    <RotateCw className="h-2.5 w-2.5 animate-spin-slow" />
                    <span>Swap Tagline</span>
                  </button>

                  <div className="flex items-center space-x-1 border border-black bg-white p-1 rounded-sm text-[9px]">
                    <span className="font-bold">OFFSET:</span>
                    <button 
                      onClick={() => setAvatarPositionX(prev => Math.max(prev - 8, -24))}
                      className="px-1.5 py-0.5 rounded-xs hover:bg-zinc-200 border border-zinc-300"
                    >
                      ◀
                    </button>
                    <button 
                      onClick={() => setAvatarPositionX(0)}
                      className="px-1.5 py-0.5 rounded-xs hover:bg-zinc-200 font-bold"
                    >
                      Reset
                    </button>
                    <button 
                      onClick={() => setAvatarPositionX(prev => Math.min(prev + 8, 24))}
                      className="px-1.5 py-0.5 rounded-xs hover:bg-zinc-200 border border-zinc-300"
                    >
                      ▶
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setShowCoverGrids(!showCoverGrids);
                      try {
                        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                        const osc = ctx.createOscillator();
                        osc.frequency.value = 440;
                        osc.connect(ctx.destination);
                        osc.start();
                        osc.stop(ctx.currentTime + 0.05);
                      } catch(e){}
                    }}
                    className={`border border-black px-2 py-1 text-[9px] font-extrabold uppercase rounded-sm flex items-center space-x-1 ${
                      showCoverGrids ? 'bg-cyan-100 text-cyan-900 border-cyan-500' : 'bg-white hover:bg-zinc-100'
                    }`}
                  >
                    <Eye className="h-2.5 w-2.5" />
                    <span>Bleed Safe</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PROJECT 3: THE ART OF BHAKTI - TRADITIONAL COLLAGE */}
          <div
            id="portfolio-project-3"
            className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden flex flex-col justify-between"
          >
            {/* Folder Header */}
            <div className="bg-amber-50/80 border-b-2 border-black p-2 px-3 xs:px-4 flex flex-col sm:flex-row gap-2 sm:items-center justify-between font-mono text-[10px] font-black uppercase text-zinc-600 select-none">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-black"></span>
                <span>BHAKTI_TRAD_COLLAGE.AI</span>
              </span>
              
              {/* View mode buttons */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setP3ViewMode('design')}
                  className={`px-2 py-0.5 border border-black rounded-xs font-black transition-colors ${p3ViewMode === 'design' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-amber-100'}`}
                >
                  🖼️ VIEW DESIGN
                </button>
                <button
                  onClick={() => setP3ViewMode('interactive')}
                  className={`px-2 py-0.5 border border-black rounded-xs font-black transition-colors ${p3ViewMode === 'interactive' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-amber-100'}`}
                >
                  ⚙️ SIMULATOR
                </button>
              </div>
            </div>

            {/* Interactive Design Viewport */}
            <div 
              className="border-b-2 border-black p-4 xs:p-6 min-h-[330px] flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300 text-black"
              style={{
                backgroundColor: 
                  p3ViewMode === 'design' ? '#FAFAF6' :
                  bhaktiColor === 'gold' ? '#FFFBE6' : 
                  bhaktiColor === 'teal' ? '#E6F4F4' : 
                  bhaktiColor === 'orange' ? '#FFF5EC' : '#FDF0F0'
              }}
            >
              {p3ViewMode === 'design' ? (
                /* High-fidelity traditional divine art illustration collage */
                <div className="w-full h-full flex flex-col items-center justify-center space-y-2">
                  <div className="relative border-4 border-black bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden w-full max-w-[210px]">
                    <img 
                      src={artOfBhaktiImg} 
                      alt="The Art of Bhakti Traditional Illustration Poster Artwork"
                      className="w-full h-auto object-cover block"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-xs p-1.5 text-[8px] font-mono text-yellow-300 flex justify-between">
                      <span>THE ART OF BHAKTI</span>
                      <span>FINE ARTWORK v5</span>
                    </div>
                  </div>
                  <p className="font-mono text-[9px] text-zinc-500 text-center uppercase tracking-wider">
                    Vedic painting composition & digital watercolor layout
                  </p>
                </div>
              ) : (
                /* Original live retro mockup simulation */
                <>
                  {/* Art Canvas Display card representing Bhakti moodboard */}
                  <div className="w-[200px] xs:w-[240px] bg-[#FAF8F5] border-2 border-black p-4 rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] relative space-y-4">
                    
                    {/* Visual Traditional Collage Grid */}
                    <div className="grid grid-cols-2 gap-2 h-28">
                      {/* Item 1 representing divine illustration card */}
                      <div className="border border-black bg-amber-100 rounded-xs flex flex-col items-center justify-center relative overflow-hidden p-1">
                        <span className="text-[14px]">🦚</span>
                        <span className="font-serif text-[6px] font-extrabold uppercase text-amber-900 leading-none">Radha-Krishna</span>
                        <span className="text-[5px] text-zinc-500 font-mono mt-0.5">Lotus Swirl</span>
                      </div>

                      {/* Item 2 representing temple vignette */}
                      <div className="border border-black bg-teal-50 rounded-xs flex flex-col justify-between p-1">
                        <div className="flex justify-between items-center text-[5px] font-mono text-teal-800">
                          <span>Vrindavan</span>
                          <span>1600AD</span>
                        </div>
                        <div className="text-center font-serif text-[10px] italic">Flute Symphony</div>
                        <div className="h-1 bg-teal-600 w-1/2 rounded-full" />
                      </div>
                    </div>

                    {/* Centered Typography Title strictly following the print reference */}
                    <div className="text-center space-y-1">
                      <h5 className="font-serif text-[14px] xs:text-[16px] font-extrabold tracking-tight text-neutral-800 leading-none">
                        The Art of Bhakti
                      </h5>
                      <p className="font-mono text-[6px] text-zinc-500 tracking-wider uppercase">
                        Vedic Illustration & Digital Watercolor Portfolio
                      </p>
                    </div>

                    {/* Traditional lotus or floral decoration elements toggled by state */}
                    {isLotusActive && (
                      <div className="absolute inset-x-0 bottom-1 flex justify-around pointer-events-none select-none">
                        <span className="text-[11px] animate-bounce">🌸</span>
                        <span className="text-[11px] animate-pulse">🪷</span>
                        <span className="text-[11px] animate-bounce delay-150">🌸</span>
                      </div>
                    )}
                  </div>

                  {/* Native color palette swatches displayed exactly on the card */}
                  <div className="mt-4 flex space-x-1.5 font-mono text-[7px] text-zinc-600">
                    <span className="font-bold self-center uppercase">COLOUR GRID:</span>
                    <span className="w-3 h-3 border border-black bg-[#FDB813]" title="Indian Gold" />
                    <span className="w-3 h-3 border border-black bg-[#0D6B6A]" title="Krishna Teal" />
                    <span className="w-3 h-3 border border-black bg-[#E65C00]" title="Marigold Orange" />
                    <span className="w-3 h-3 border border-black bg-[#B23B3B]" title="Deep Terracotta" />
                  </div>
                </>
              )}
            </div>

            {/* Custom Interactive Control Pad */}
            <div className="p-4 bg-zinc-50 border-t border-zinc-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
                {/* Description */}
                <div className="space-y-1">
                  <h4 className="font-sans font-extrabold text-sm text-black">Traditional Collage System</h4>
                  <p className="text-[10px] text-zinc-500">Fine-art moodboard curation & palette synthesis.</p>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex bg-white border border-black p-1 rounded-sm space-x-1">
                    <button
                      onClick={() => {
                        setBhaktiColor('gold');
                        triggerBhaktiFluteTone(512); // B5 note
                      }}
                      className={`w-4 h-4 rounded-xs border border-zinc-400 bg-[#FDB813] transition-transform ${bhaktiColor === 'gold' ? 'scale-125 border-black border-2' : 'hover:scale-105'}`}
                      title="Indian Gold (C5)"
                    />
                    <button
                      onClick={() => {
                        setBhaktiColor('teal');
                        triggerBhaktiFluteTone(576); // D6 note approximation
                      }}
                      className={`w-4 h-4 rounded-xs border border-zinc-400 bg-[#0D6B6A] transition-transform ${bhaktiColor === 'teal' ? 'scale-125 border-black border-2' : 'hover:scale-105'}`}
                      title="Krishna Teal (D6)"
                    />
                    <button
                      onClick={() => {
                        setBhaktiColor('orange');
                        triggerBhaktiFluteTone(640); // E6 note approximation
                      }}
                      className={`w-4 h-4 rounded-xs border border-zinc-400 bg-[#E65C00] transition-transform ${bhaktiColor === 'orange' ? 'scale-125 border-black border-2' : 'hover:scale-105'}`}
                      title="Marigold Orange (E6)"
                    />
                    <button
                      onClick={() => {
                        setBhaktiColor('marigold');
                        triggerBhaktiFluteTone(768); // G6 note approximation
                      }}
                      className={`w-4 h-4 rounded-xs border border-zinc-400 bg-[#B23B3B] transition-transform ${bhaktiColor === 'marigold' ? 'scale-125 border-black border-2' : 'hover:scale-105'}`}
                      title="Terracotta Crimson (G6)"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setIsLotusActive(!isLotusActive);
                      triggerBhaktiFluteTone(384); // Low flute chime
                    }}
                    className={`border border-black bg-white hover:bg-zinc-100 px-2 py-1 text-[9px] font-extrabold uppercase rounded-sm flex items-center space-x-1 ${
                      isLotusActive && 'bg-amber-100'
                    }`}
                  >
                    <Volume2 className="h-2.5 w-2.5" />
                    <span>Flute Lotus Pulse</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PROJECT 4: CHIPCHARM CGI PACKAGING RENDER */}
          <div
            id="portfolio-project-4"
            className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden flex flex-col justify-between"
          >
            {/* Folder Header */}
            <div className="bg-emerald-50/80 border-b-2 border-black p-2 px-3 xs:px-4 flex flex-col sm:flex-row gap-2 sm:items-center justify-between font-mono text-[10px] font-black uppercase text-zinc-600 select-none">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black"></span>
                <span>CHIPCHARM_CGI_VOLUMETRICS.AE</span>
              </span>
              
              {/* View options */}
              <div className="flex items-center space-x-1 flex-wrap gap-1">
                <button
                  onClick={() => setP4ViewMode('design')}
                  className={`px-2 py-0.5 border border-black rounded-xs font-black transition-colors ${p4ViewMode === 'design' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-emerald-100'}`}
                >
                  🖼️ VIEW DESIGN
                </button>
                <button
                  onClick={() => setP4ViewMode('interactive')}
                  className={`px-2 py-0.5 border border-black rounded-xs font-black transition-colors ${p4ViewMode === 'interactive' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-emerald-100'}`}
                >
                  ⚙️ SIMULATOR
                </button>
                <button
                  onClick={() => setP4ViewMode('video')}
                  className={`px-2 py-0.5 border border-black rounded-xs font-black transition-colors ${p4ViewMode === 'video' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-emerald-100'}`}
                >
                  🎥 WATCH VIDEO
                </button>
              </div>
            </div>

            {/* Interactive Design Viewport */}
            <div className="bg-neutral-900 border-b-2 border-black p-4 xs:p-6 min-h-[330px] flex flex-col items-center justify-center relative overflow-hidden text-white font-mono">
              
              {p4ViewMode === 'design' ? (
                /* High-fidelity 3D CGI product render */
                <div className="w-full h-full flex flex-col items-center justify-center space-y-2">
                  <div className="relative border-4 border-black bg-neutral-955 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden w-full max-w-[190px]">
                    <img 
                      src={chipcharmCgiImg} 
                      alt="ChipCharm CGI Product Packaging Artwork"
                      className="w-full h-auto object-cover block"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 text-[8px] font-mono text-emerald-300 flex justify-between">
                      <span>CHIPCHARM // CGI RENDER</span>
                      <span>100% COMPLETE</span>
                    </div>
                  </div>
                  <p className="font-mono text-[9px] text-zinc-400 text-center uppercase tracking-wider">
                    3D Volumetric fluid & packaging beauty pass
                  </p>
                </div>
              ) : p4ViewMode === 'video' ? (
                /* Embedded high-fidelity YouTube video player client-side interface */
                <div className="w-full h-full flex flex-col items-center justify-center space-y-3 p-1 animate-fadeIn">
                  <div className="relative border-4 border-black bg-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden w-full aspect-video min-h-[220px]">
                    <iframe
                      src="https://www.youtube.com/embed/DuslCEy1yhY?autoplay=1&mute=0&rel=0"
                      title="ChipCharm Packaging & CGI Video Presentation"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full absolute inset-0 border-0"
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="font-mono text-[10px] text-emerald-300 uppercase tracking-widest animate-pulse font-extrabold">
                      🔴 NOW PLAYING // DIGITAL STREAM ACTIVE
                    </p>
                    <p className="font-sans text-[11px] text-zinc-400">
                      ChipCharm Sour Cream Volumetric Fluid & 3D Packaging Design
                    </p>
                  </div>
                </div>
              ) : (
                /* Original live retro mockup simulation */
                <>
                  {/* Virtual Render Frame Overlay */}
                  <div className="absolute top-2 left-2 z-20 text-[7px] text-zinc-400 border border-zinc-700 bg-neutral-950 p-1 rounded-xs uppercase tracking-widest text-left select-none space-y-0.5">
                    <p>🟢 RENDER STATE: COMMITTED</p>
                    <p>⏱️ LATENCY: 12.4ms // 60 FPS</p>
                    <p>📟 BUFF_TYPE: {chipRenderPass.toUpperCase()}_PASS</p>
                  </div>

                  {/* Dynamic Simulated Physical Pack */}
                  <div className="w-[170px] xs:w-[200px] h-[220px] rounded-lg border-2 border-black relative overflow-hidden flex flex-col justify-between p-3 transition-all duration-300 select-none shadow-2xl bg-gradient-to-b from-[#A3E4D7] to-[#48C9B0] text-black">
                    
                    {/* Glossy packaging specular highlights depending on render pass */}
                    {chipRenderPass === 'beauty' && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 pointer-events-none mix-blend-overlay" />
                    )}

                    {/* Dither pattern grid or standard topology lines */}
                    {chipRenderPass === 'wireframe' && (
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[size:8px_8px] pointer-events-none" />
                    )}

                    {/* Packaging Header */}
                    <div className="z-10 text-center space-y-0.5">
                      <div className="text-[6px] font-black tracking-widest text-emerald-950 uppercase">Infinity Snacks Co</div>
                      <h5 className="font-serif italic font-black text-[15px] leading-none text-red-700 drop-shadow-[1px_1px_0px_white]">
                        ChipCharm
                      </h5>
                      <div className="text-[6px] font-mono uppercase bg-yellow-300 text-black px-1 py-0.5 inline-block font-extrabold rotate-1.5 text-center">
                        Sour Cream Flavour
                      </div>
                    </div>

                    {/* Vector graphics of chips & onion components */}
                    <div className="h-16 flex items-center justify-center relative">
                      
                      {/* Beauty render graphics */}
                      {chipRenderPass === 'beauty' && (
                        <>
                          <span className="text-3xl animate-bounce">🥔</span>
                          <span className="text-xl animate-pulse block absolute -right-2 top-2">🧅</span>
                        </>
                      )}

                      {/* Wireframe topology simulation */}
                      {chipRenderPass === 'wireframe' && (
                        <div className="border border-black bg-stone-50/10 p-2 w-16 h-10 font-mono text-[6px] text-center text-emerald-950 font-black flex items-center justify-center uppercase">
                          MESH // 2.4K POLYGONS
                        </div>
                      )}

                      {/* Fluid onion splash dispersion simulation particle dots */}
                      {chipRenderPass === 'particles' && (
                        <div className="w-20 h-20 border border-dashed border-red-500 rounded-full flex items-center justify-center relative">
                          <span className="text-[6px] bg-red-600 text-white font-bold p-0.5 uppercase">EMITTER</span>
                          <div className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <div className="absolute bottom-2 right-1 w-2 h-2 rounded-full bg-yellow-400 animate-ping delay-75" />
                        </div>
                      )}
                    </div>

                    {/* Footer text of packaging */}
                    <div className="z-10 flex justify-between items-center border-t border-black/20 pt-1 font-mono text-[6px]">
                      <span>ORIGINAL FLAVOUR</span>
                      <span>NET WT. 4.2 OZ (120g)</span>
                    </div>
                  </div>

                  {/* Render dynamic rotating physics particles on click */}
                  {isSimulatingCgiSpeed && (
                    <div className="absolute inset-x-0 bottom-4 flex justify-around pointer-events-none text-3xl font-bold animate-ping">
                      <span>🟢</span>
                      <span>✨</span>
                      <span>🧅</span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Custom Interactive Control Pad */}
            <div className="p-4 bg-zinc-50 border-t border-zinc-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
                {/* Description */}
                <div className="space-y-1">
                  <h4 className="font-sans font-extrabold text-sm text-black">Packaging & CGI Fluid System</h4>
                  <p className="text-[10px] text-zinc-500">Volumetric particle sweep render of "ChipCharm" tube bags.</p>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center space-x-1 border border-black bg-white p-1 rounded-sm text-[9px]">
                    <span className="font-bold">PASS:</span>
                    <button 
                      onClick={() => setChipRenderPass('beauty')}
                      className={`px-1.5 py-0.5 rounded-xs font-black ${chipRenderPass === 'beauty' ? 'bg-black text-white' : 'hover:bg-zinc-100'}`}
                    >
                      Beauty
                    </button>
                    <button 
                      onClick={() => setChipRenderPass('wireframe')}
                      className={`px-1.5 py-0.5 rounded-xs font-black ${chipRenderPass === 'wireframe' ? 'bg-black text-white' : 'hover:bg-zinc-100'}`}
                    >
                      Wire
                    </button>
                    <button 
                      onClick={() => setChipRenderPass('particles')}
                      className={`px-1.5 py-0.5 rounded-xs font-black ${chipRenderPass === 'particles' ? 'bg-black text-white' : 'hover:bg-zinc-100'}`}
                    >
                      Sim
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setIsSimulatingCgiSpeed(true);
                      setTimeout(() => setIsSimulatingCgiSpeed(false), 800);
                      try {
                        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                        const osc = ctx.createOscillator();
                        osc.type = 'sawtooth';
                        osc.frequency.setValueAtTime(150, ctx.currentTime);
                        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.35);
                        
                        const gain = ctx.createGain();
                        gain.gain.setValueAtTime(0.08, ctx.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
                        
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.start();
                        osc.stop(ctx.currentTime + 0.4);
                      } catch (e) {}
                    }}
                    className="border border-black bg-white hover:bg-zinc-100 px-2 py-1 text-[9px] font-extrabold uppercase rounded-sm flex items-center space-x-1"
                  >
                    <Play className="h-2.5 w-2.5" />
                    <span>Simulate Physics</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PROJECT 5: ( MOP SHORT FILM ) - CINEMATIC THUMBNAIL & VIDEO INTERFACE */}
          <div
            id="portfolio-project-5"
            className="col-span-1 lg:col-span-2 border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden flex flex-col justify-between"
          >
            {/* Folder Header */}
            <div className="bg-amber-50 border-b-2 border-black p-2 px-3 xs:px-4 flex flex-col sm:flex-row gap-2 sm:items-center justify-between font-mono text-[10px] font-black uppercase text-zinc-600 select-none">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-black animate-pulse"></span>
                <span>MOP_SHORT_FILM_DIRECTORS_CUT.PRPROJ</span>
              </span>
              
              {/* View mode buttons */}
              <div className="flex items-center space-x-1 flex-wrap gap-1">
                <button
                  onClick={() => setP5ViewMode('design')}
                  className={`px-2 py-0.5 border border-black rounded-xs font-black transition-colors ${p5ViewMode === 'design' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-amber-100'}`}
                >
                  🖼️ VIEW THUMBNAIL
                </button>
                <button
                  onClick={() => setP5ViewMode('video')}
                  className={`px-2 py-0.5 border border-black rounded-xs font-black transition-colors ${p5ViewMode === 'video' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-amber-100'}`}
                >
                  🎥 WATCH FILM
                </button>
                <button
                  onClick={() => setP5ViewMode('interactive')}
                  className={`px-2 py-0.5 border border-black rounded-xs font-black transition-colors ${p5ViewMode === 'interactive' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-amber-100'}`}
                >
                  ⚙️ DIRECTOR'S BOX
                </button>
              </div>
            </div>

            {/* Interactive Design Viewport */}
            <div 
              className={`border-b-2 border-black p-4 xs:p-8 min-h-[380px] flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 font-mono text-white`}
              style={{
                backgroundColor: '#0a0a0a',
                filter: 
                  cinematicLut === 'noir' ? 'contrast(1.35) saturate(0.65)' :
                  cinematicLut === 'teal' ? 'hue-rotate(30deg) saturate(1.1)' :
                  cinematicLut === 'mono' ? 'grayscale(1)' : 'none'
              }}
            >
              {p5ViewMode === 'design' ? (
                /* High-fidelity generated movie poster 16:9 cinematic shot */
                <div className="w-full h-full flex flex-col items-center justify-center space-y-3 relative max-w-2xl">
                  {/* Aspect crop / cinema boundary simulated layout */}
                  <div className="relative border-4 border-black bg-neutral-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden w-full aspect-video">
                    
                    {/* Top cinematic letterbox black bar */}
                    <div className={`absolute top-0 inset-x-0 bg-neutral-950 z-10 transition-all duration-300 ${letterboxActive ? 'h-7 sm:h-10' : 'h-0'}`} />
                    
                    {/* Main Image */}
                    <img 
                      src={mopShortFilmImg} 
                      alt="The MOP - A Short Film"
                      className="w-full h-full object-cover block"
                      referrerPolicy="no-referrer"
                    />

                    {/* Bottom cinematic letterbox black bar */}
                    <div className={`absolute bottom-0 inset-x-0 bg-neutral-950 z-10 transition-all duration-300 ${letterboxActive ? 'h-7 sm:h-10' : 'h-0'}`} />
                    
                    {/* Metadata Overlay Badge */}
                    <div className="absolute inset-x-0 bottom-12 px-3 py-1 bg-black/75 backdrop-blur-xs text-[7px] sm:text-[9px] text-zinc-300 flex justify-between z-20 font-bold select-none">
                      <span className="flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                        <span>MOP_SHORT_FILM_MASTER // ATOMOS ProRes LOG-C</span>
                      </span>
                      <span>24 FPS // ASPECT 2.39:1</span>
                    </div>

                    {/* Grid Guide Overlays */}
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20 border border-white/20">
                      <div className="border-r border-b border-dashed border-white"></div>
                      <div className="border-r border-b border-dashed border-white"></div>
                      <div className="border-b border-dashed border-white"></div>
                      <div className="border-r border-b border-dashed border-white"></div>
                      <div className="border-r border-b border-dashed border-white"></div>
                      <div className="border-b border-dashed border-white"></div>
                    </div>
                  </div>

                  <p className="font-mono text-[9px] sm:text-[10px] text-zinc-400 text-center uppercase tracking-widest leading-relaxed">
                    Official landscape poster layout for <span className="text-yellow-400 font-extrabold">( MOP SHORT FILM )</span>
                  </p>
                </div>
              ) : p5ViewMode === 'video' ? (
                /* High-fidelity play mode streaming YouTube video interface */
                <div className="w-full h-full flex flex-col items-center justify-center space-y-4 max-w-2xl p-1 animate-fadeIn">
                  <div className="relative border-4 border-black bg-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden w-full aspect-video min-h-[220px] sm:min-h-[300px]">
                    <iframe
                      src="https://www.youtube.com/embed/wgZ90mlPTnQ?autoplay=1&mute=0&rel=0"
                      title="THE MOP - Official Short Film Presentation"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full absolute inset-0 border-0"
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="font-mono text-[10px] text-red-500 uppercase tracking-widest animate-pulse font-extrabold flex items-center justify-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-red-600 block" />
                      <span>STREAMING ACTIVE // DIRECT LIVE CONSOLE</span>
                    </p>
                    <p className="font-sans text-xs text-zinc-300 font-medium">
                      THE MOP - Official Short Film Presentation // Directed by Kanishk Chaudhary
                    </p>
                  </div>
                </div>
              ) : (
                /* Interactive Storyboard Console / Director's Box */
                <div className="w-full max-w-2xl bg-neutral-950 border-2 border-zinc-700 shadow-2xl p-4 sm:p-6 rounded-sm space-y-4 animate-fadeIn text-left text-zinc-300">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-800 pb-3 gap-2">
                    <div>
                      <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider block">PRODUCTION TOOLS</span>
                      <h4 className="font-sans font-black text-white text-base">Directorial Control System</h4>
                    </div>
                    <span className="font-mono text-[8px] bg-red-950 text-red-400 px-2 py-0.5 rounded-xs border border-red-900 font-black">
                      VFX_ENGINE // COMMITTED_STATE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    {/* Column 1: Color Grade / LUT Settings */}
                    <div className="space-y-3 bg-neutral-900 border border-zinc-800 p-3 rounded-xs">
                      <div>
                        <span className="text-[9px] text-zinc-500 font-bold block mb-1 uppercase">Cinematic Color Grade (LUT):</span>
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            onClick={() => {
                              setCinematicLut('warm');
                              try {
                                const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                                const osc = ctx.createOscillator();
                                osc.frequency.setValueAtTime(261.63, ctx.currentTime); // C4
                                const gain = ctx.createGain();
                                gain.gain.setValueAtTime(0.05, ctx.currentTime);
                                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
                                osc.connect(gain); gain.connect(ctx.destination);
                                osc.start(); osc.stop(ctx.currentTime + 0.15);
                              } catch(e){}
                            }}
                            className={`px-2 py-1.5 border rounded-xs font-bold text-[9px] uppercase transition-colors text-center ${cinematicLut === 'warm' ? 'bg-yellow-400 text-black border-yellow-400 font-black' : 'bg-neutral-950 hover:bg-neutral-800 border-zinc-700'}`}
                          >
                            ☀️ Warm Amber
                          </button>
                          <button
                            onClick={() => {
                              setCinematicLut('noir');
                              try {
                                const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                                const osc = ctx.createOscillator();
                                osc.frequency.setValueAtTime(196.00, ctx.currentTime); // G3
                                const gain = ctx.createGain();
                                gain.gain.setValueAtTime(0.05, ctx.currentTime);
                                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
                                osc.connect(gain); gain.connect(ctx.destination);
                                osc.start(); osc.stop(ctx.currentTime + 0.15);
                              } catch(e){}
                            }}
                            className={`px-2 py-1.5 border rounded-xs font-bold text-[9px] uppercase transition-colors text-center ${cinematicLut === 'noir' ? 'bg-cyan-500 text-black border-cyan-500 font-black' : 'bg-neutral-950 hover:bg-neutral-800 border-zinc-700'}`}
                          >
                            🌌 Neo-Noir
                          </button>
                          <button
                            onClick={() => {
                              setCinematicLut('teal');
                              try {
                                const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                                const osc = ctx.createOscillator();
                                osc.frequency.setValueAtTime(329.63, ctx.currentTime); // E4
                                const gain = ctx.createGain();
                                gain.gain.setValueAtTime(0.05, ctx.currentTime);
                                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
                                osc.connect(gain); gain.connect(ctx.destination);
                                osc.start(); osc.stop(ctx.currentTime + 0.15);
                              } catch(e){}
                            }}
                            className={`px-2 py-1.5 border rounded-xs font-bold text-[9px] uppercase transition-colors text-center ${cinematicLut === 'teal' ? 'bg-emerald-400 text-black border-emerald-400 font-black' : 'bg-neutral-950 hover:bg-neutral-800 border-zinc-700'}`}
                          >
                            🌲 Cool Teal
                          </button>
                          <button
                            onClick={() => {
                              setCinematicLut('mono');
                              try {
                                const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                                const osc = ctx.createOscillator();
                                osc.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
                                const gain = ctx.createGain();
                                gain.gain.setValueAtTime(0.05, ctx.currentTime);
                                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
                                osc.connect(gain); gain.connect(ctx.destination);
                                osc.start(); osc.stop(ctx.currentTime + 0.15);
                              } catch(e){}
                            }}
                            className={`px-2 py-1.5 border rounded-xs font-bold text-[9px] uppercase transition-colors text-center ${cinematicLut === 'mono' ? 'bg-zinc-400 text-black border-zinc-400 font-black' : 'bg-neutral-950 hover:bg-neutral-800 border-zinc-700'}`}
                          >
                            🏁 Monochrome
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                        <span className="text-[10px] text-zinc-400 font-bold uppercase">Enable 2.39:1 Crop Bars:</span>
                        <button
                          onClick={() => setLetterboxActive(!letterboxActive)}
                          className={`px-2 py-0.5 border text-[9px] rounded-xs font-mono uppercase transition-colors font-extrabold ${letterboxActive ? 'bg-red-500 text-white border-red-500' : 'bg-neutral-950 border-zinc-700 text-zinc-400 hover:bg-neutral-800'}`}
                        >
                          {letterboxActive ? 'ON' : 'OFF'}
                        </button>
                      </div>
                    </div>

                    {/* Column 2: Cinematic Audio Foley System */}
                    <div className="space-y-3 bg-neutral-900 border border-zinc-800 p-3 rounded-xs flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[9px] text-zinc-500 font-bold block uppercase">Synth Foley Hum:</span>
                        <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400">
                          <span>Volume Limit:</span>
                          <span className="text-white font-extrabold text-[11px] bg-neutral-950 px-1 border border-zinc-800 rounded-xs">{foleyLevel}%</span>
                        </div>
                        <input 
                          type="range"
                          min="0"
                          max="100"
                          value={foleyLevel}
                          onChange={(e) => setFoleyLevel(Number(e.target.value))}
                          className="w-full accent-red-500 h-1 bg-neutral-950 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <button
                        onClick={() => {
                          setIsFoleyGenerating(true);
                          setTimeout(() => setIsFoleyGenerating(false), 2000);
                          try {
                            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                            
                            // Base oscillator (Low hum)
                            const osc = ctx.createOscillator();
                            osc.type = 'sawtooth';
                            osc.frequency.setValueAtTime(65.41, ctx.currentTime); // C2 low pitch
                            
                            // Modulating filter sweeps for wind/cinema feel
                            const filter = ctx.createBiquadFilter();
                            filter.type = 'lowpass';
                            filter.Q.setValueAtTime(3.0, ctx.currentTime);
                            filter.frequency.setValueAtTime(100, ctx.currentTime);
                            filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 1.0);
                            filter.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 2.0);

                            const gain = ctx.createGain();
                            const finalVolume = (foleyLevel / 100) * 0.12;
                            gain.gain.setValueAtTime(finalVolume, ctx.currentTime);
                            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);
                            
                            osc.connect(filter);
                            filter.connect(gain);
                            gain.connect(ctx.destination);
                            osc.start();
                            osc.stop(ctx.currentTime + 2.0);
                          } catch (e) {}
                        }}
                        disabled={isFoleyGenerating}
                        className={`w-full py-2 border border-black uppercase text-[10px] font-black rounded-xs flex items-center justify-center space-x-1.5 transition-all text-black ${isFoleyGenerating ? 'bg-amber-300 animate-pulse' : 'bg-white hover:bg-zinc-100'}`}
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                        <span>{isFoleyGenerating ? '🔊 Humming Foley Sweeps...' : '🔊 Synthesize Cinematic Hum'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Scene metadata strip */}
                  <div className="bg-neutral-900 border border-zinc-800 p-2.5 rounded-xs flex flex-wrap justify-between gap-2 font-mono text-[8px] sm:text-[9px] text-zinc-500">
                    <p>🎭 FILM: <span className="text-zinc-300">THE MOP [A SHORT FILM]</span></p>
                    <p>🎬 DIRECTED BY: <span className="text-zinc-300 font-bold">KANISHK CHAUDHARY</span></p>
                    <p>💾 SOURCE: <span className="text-zinc-300">RAW_CAPTURE_LOG.MXF</span></p>
                  </div>
                </div>
              )}
            </div>

            {/* Title & Stats Meta Footer */}
            <div className="p-4 bg-zinc-50 border-t border-zinc-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs text-left">
                <div className="space-y-1">
                  <h4 className="font-sans font-extrabold text-sm text-black uppercase tracking-wider">( MOP SHORT FILM )</h4>
                  <p className="text-[10px] text-zinc-500">
                    Award-winning local cinematic narration depicting discipline, struggle, and silent labor. Produced with full high-contrast digital grading.
                  </p>
                </div>
                <div className="flex items-center space-x-3 text-[10px] text-zinc-600 font-extrabold">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>PREMIERE PRO</span>
                  </span>
                  <span className="bg-zinc-200 text-zinc-800 px-1.5 py-0.5 rounded-xs">
                    RUNTIME: 13M 42S
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* PROJECT 6: INFOGRAPHICS - DYNAMIC STATS & MOTION GRAPHICS INTERACTIVE VIDEO SIMULATOR */}
          <div
            id="portfolio-project-6"
            className="col-span-1 lg:col-span-2 border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden flex flex-col justify-between"
          >
            {/* Folder Header */}
            <div className="bg-emerald-50 border-b-2 border-black p-2 px-3 xs:px-4 flex flex-col sm:flex-row gap-2 sm:items-center justify-between font-mono text-[10px] font-black uppercase text-zinc-600 select-none">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black animate-pulse"></span>
                <span>INFOGRAPHICS_MOTION_GRADES.AE</span>
              </span>
              
              {/* View mode buttons */}
              <div className="flex items-center space-x-1 flex-wrap gap-1">
                <button
                  onClick={() => setP6ViewMode('video')}
                  className={`px-2 py-0.5 border border-black rounded-xs font-black transition-colors ${p6ViewMode === 'video' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-emerald-100'}`}
                >
                  🎥 WATCH VIDEO
                </button>
                <button
                  onClick={() => setP6ViewMode('design')}
                  className={`px-2 py-0.5 border border-black rounded-xs font-black transition-colors ${p6ViewMode === 'design' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-emerald-100'}`}
                >
                  🖼️ VIEW THUMBNAIL
                </button>
                <button
                  onClick={() => setP6ViewMode('simulator')}
                  className={`px-2 py-0.5 border border-black rounded-xs font-black transition-colors ${p6ViewMode === 'simulator' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-emerald-100'}`}
                >
                  ⚙️ PLAY SIMULATOR
                </button>
                <button
                  onClick={() => setP6ViewMode('interactive')}
                  className={`px-2 py-0.5 border border-black rounded-xs font-black transition-colors ${p6ViewMode === 'interactive' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-emerald-100'}`}
                >
                  📊 CUSTOM CONSOLE
                </button>
              </div>
            </div>

            {/* Viewport Frame */}
            <div className="border-b-2 border-black bg-neutral-900 p-4 xs:p-8 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden font-mono text-white">
              
              {p6ViewMode === 'design' ? (
                /* High-fidelity generated infographic poster */
                <div className="w-full h-full flex flex-col items-center justify-center space-y-3 relative max-w-2xl animate-fadeIn">
                  <div className="relative border-4 border-black bg-neutral-950 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden w-full aspect-video font-sans">
                    <img 
                      src={infographicsThumbnailImg} 
                      alt="Team Milestones Infographics Video Poster"
                      className="w-full h-full object-cover block font-sans"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Badge Overlay */}
                    <div className="absolute inset-x-0 bottom-4 px-3 py-1.5 bg-black/85 backdrop-blur-xs text-[8px] sm:text-[10px] text-emerald-300 flex justify-between z-10 font-bold border-t border-zinc-800 font-mono">
                      <span>PROJECT: INFOGRAPHICS // CO-DESIGN</span>
                      <span>ACTIVE VIEWPORT</span>
                    </div>
                  </div>
                  <p className="font-mono text-[9px] sm:text-[10px] text-zinc-400 text-center uppercase tracking-widest leading-relaxed">
                    Corporate Motion Design Cover <span className="text-emerald-400 font-extrabold">( TEAM MILESTONES 2025 )</span>
                  </p>
                </div>
              ) : p6ViewMode === 'video' ? (
                /* High-fidelity playback of official YouTube infographic video */
                <div className="w-full h-full flex flex-col items-center justify-center space-y-4 max-w-2xl p-1 animate-fadeIn">
                  <div className="relative border-4 border-black bg-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden w-full aspect-video min-h-[220px] sm:min-h-[300px]">
                    <iframe
                      src="https://www.youtube.com/embed/lslWqrajRw4?autoplay=1&mute=0&rel=0"
                      title="INFOGRAPHICS - Official Video Presentation"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full absolute inset-0 border-0"
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest animate-pulse font-extrabold flex items-center justify-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 block" />
                      <span>STREAMING ACTIVE // DIGITAL CONSOLE</span>
                    </p>
                    <p className="font-sans text-xs text-zinc-300 font-medium">
                      TEAM MILESTONES 2025 - Official Infographics Video // Created by Kanishk Chaudhary
                    </p>
                  </div>
                </div>
              ) : p6ViewMode === 'simulator' ? (
                /* Interactive HTML5 Motion Graphics Infographics Video Player Simulator */
                <VideoPlayerSimulator 
                  hiringGoal={infoHiringGoal}
                  employeesOnboarded={infoEmployeesOnboarded}
                  retentionRate={infoRetentionRate}
                  thumbnail={infographicsThumbnailImg}
                />
              ) : (
                /* Interactive Infographics Console Editor */
                <div className="w-full max-w-2xl bg-neutral-950 border-2 border-zinc-700 shadow-2xl p-4 sm:p-6 rounded-sm space-y-4 animate-fadeIn text-left text-zinc-300">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-800 pb-3 gap-2">
                    <div>
                      <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block">INTERACTIVE ENGINE</span>
                      <h4 className="font-sans font-black text-white text-base">Infographics Data Customizer</h4>
                    </div>
                    <span className="font-mono text-[8px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-xs border border-emerald-900 font-black">
                      AE_RENDER // INSTANT_SYNC
                    </span>
                  </div>

                  <p className="text-[10px] text-zinc-400 leading-normal">
                    Adjust the milestone analytics parameters below. The inline HTML5 motion graphics video simulation render engine will update its keyframes and bar charts live inside the PLAY SIMULATOR viewport.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                    {/* Control 1: Hiring Goal */}
                    <div className="bg-neutral-900 border border-zinc-800 p-3 rounded-xs space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-zinc-400 font-bold uppercase">Hiring Goal Progress:</span>
                        <span className="text-emerald-300 font-black">{infoHiringGoal}%</span>
                      </div>
                      <input 
                        type="range"
                        min="50"
                        max="300"
                        step="5"
                        value={infoHiringGoal}
                        onChange={(e) => {
                          setInfoHiringGoal(Number(e.target.value));
                          triggerRetroSound(440); // Sound feedback
                        }}
                        className="w-full accent-emerald-400 h-1 bg-neutral-950 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-[8px] text-zinc-500 block leading-tight">Controls the percentage wheel on slide 3 of the video.</span>
                    </div>

                    {/* Control 2: Onboarded Count */}
                    <div className="bg-neutral-900 border border-zinc-800 p-3 rounded-xs space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-zinc-400 font-bold uppercase">Onboarded Crew:</span>
                        <span className="text-emerald-300 font-black">{infoEmployeesOnboarded} New</span>
                      </div>
                      <input 
                        type="range"
                        min="10"
                        max="200"
                        step="1"
                        value={infoEmployeesOnboarded}
                        onChange={(e) => {
                          setInfoEmployeesOnboarded(Number(e.target.value));
                          triggerRetroSound(523);
                        }}
                        className="w-full accent-emerald-400 h-1 bg-neutral-950 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-[8px] text-zinc-500 block leading-tight">Controls total headcount on slide 2 of the presentation.</span>
                    </div>

                    {/* Control 3: Retention Rate */}
                    <div className="bg-neutral-900 border border-zinc-800 p-3 rounded-xs space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-zinc-400 font-bold uppercase">Retention Rate:</span>
                        <span className="text-emerald-300 font-black">{infoRetentionRate}%</span>
                      </div>
                      <input 
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={infoRetentionRate}
                        onChange={(e) => {
                          setInfoRetentionRate(Number(e.target.value));
                          triggerRetroSound(659);
                        }}
                        className="w-full accent-emerald-400 h-1 bg-neutral-950 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-[8px] text-zinc-500 block leading-tight">Controls the highlight count in the final team ratio matrix.</span>
                    </div>
                  </div>

                  {/* Preset Quick Loader Buttons */}
                  <div className="bg-neutral-900 border border-zinc-800 p-3 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[10px]">
                    <span className="text-zinc-400 uppercase font-bold">Apply Pre-configured Presets:</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setInfoHiringGoal(190);
                          setInfoEmployeesOnboarded(74);
                          setInfoRetentionRate(80);
                          triggerRetroSound(880);
                        }}
                        className="px-2 py-1 bg-emerald-500 text-black rounded-xs font-black border border-emerald-400 hover:bg-emerald-400 uppercase"
                      >
                        🌟 Original Screenshot Stats
                      </button>
                      <button
                        onClick={() => {
                          setInfoHiringGoal(250);
                          setInfoEmployeesOnboarded(140);
                          setInfoRetentionRate(95);
                          triggerRetroSound(1046);
                        }}
                        className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xs font-bold border border-zinc-700 uppercase"
                      >
                        🚀 Hyper-Growth Mode
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Title & Stats Meta Footer */}
            <div className="p-4 bg-zinc-50 border-t border-zinc-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs text-left">
                <div className="space-y-1">
                  <h4 className="font-sans font-extrabold text-sm text-black uppercase tracking-wider">INFOGRAPHICS: TEAM MILESTONES 2025</h4>
                  <p className="text-[10px] text-zinc-500">
                    High-end corporate vector infographic and motion layout assets rendered in real-time. Features interactive keyframe playback, vector layouts, and synth soundtracks.
                  </p>
                </div>
                <div className="flex items-center space-x-3 text-[10px] text-zinc-600 font-extrabold">
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>AFTER EFFECTS / HTML5</span>
                  </span>
                  <span className="bg-zinc-200 text-zinc-800 px-1.5 py-0.5 rounded-xs">
                    RENDER: LIVE-DYNAMIC
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 5: TECHNICAL SKILLS INVENTORY */}
      <div id="skills-section-container" className="space-y-6 text-left">
        <div id="skills-header-wrapper" className="flex justify-between items-baseline border-b-4 border-black pb-2">
          <h3 id="skills-heading-title" className="font-sans font-black text-3xl tracking-tight uppercase">
            Skills
          </h3>
          <span id="skills-meta-stamp" className="font-mono text-zinc-500 font-extrabold text-xs hidden sm:inline">
            CREATIVE_INTEGRITY_CHECKPOINT // SYSTEM_04
          </span>
        </div>

        <div id="skills-grid-layout" className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 text-black">
          {/* Left selectors */}
          <div id="skills-left-selector-pane" className="col-span-1 md:col-span-4 p-5 bg-neutral-100 md:border-r-4 border-black flex flex-col justify-start space-y-3">
            <span id="label-registry-type" className="font-mono text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest block mb-1">
              Select Registry Domain:
            </span>
            <button
              id="skill-cat-languages-btn"
              onClick={() => setSelectedSkillCat('languages')}
              className={`border-2 border-black p-3 text-left font-mono text-xs uppercase font-extrabold flex items-center justify-between rounded-sm cursor-pointer transition-all ${
                selectedSkillCat === 'languages'
                  ? 'bg-black text-white'
                  : 'bg-white hover:bg-zinc-200'
              }`}
            >
              <span>1. Graphic Design Tools</span>
              <Code className="h-4 w-4" />
            </button>
            <button
              id="skill-cat-frameworks-btn"
              onClick={() => setSelectedSkillCat('frameworks')}
              className={`border-2 border-black p-3 text-left font-mono text-xs uppercase font-extrabold flex items-center justify-between rounded-sm cursor-pointer transition-all ${
                selectedSkillCat === 'frameworks'
                  ? 'bg-black text-white'
                  : 'bg-white hover:bg-zinc-200'
              }`}
            >
              <span>2. VFX & Compositing</span>
              <Cpu className="h-4 w-4" />
            </button>
            <button
              id="skill-cat-specialized-btn"
              onClick={() => setSelectedSkillCat('specialized')}
              className={`border-2 border-black p-3 text-left font-mono text-xs uppercase font-extrabold flex items-center justify-between rounded-sm cursor-pointer transition-all ${
                selectedSkillCat === 'specialized'
                  ? 'bg-black text-white'
                  : 'bg-white hover:bg-zinc-200'
              }`}
            >
              <span>3. Style & Art Direction</span>
              <Briefcase className="h-4 w-4" />
            </button>
          </div>

          {/* Right live directory details console */}
          <div id="skills-right-console-pane" className="col-span-1 md:col-span-8 p-6 md:p-8 flex flex-col justify-between">
            <div id="skills-console" className="space-y-6">
              <div id="skills-console-header" className="flex items-center justify-between border-b-2 border-neutral-100 pb-2">
                <span id="skills-console-title" className="font-mono font-bold text-xs uppercase text-zinc-500">
                  SYSTEM_INTEGRITY_CHECKPOINT // {selectedSkillCat.toUpperCase()}
                </span>
                <span id="skills-console-indicator" className="font-mono text-[10px] text-zinc-400">
                  REF: 0x90A1A // ONLINE
                </span>
              </div>

              {selectedSkillCat === 'languages' && (
                <div id="skills-languages-list" className="space-y-4 font-mono text-xs">
                  <div id="part-ts" className="space-y-1">
                    <div id="label-ts" className="flex justify-between font-bold text-zinc-700">
                      <span>Adobe Photoshop</span>
                      <span>100% (High-resolution Compositions)</span>
                    </div>
                    <div id="bar-ts" className="bg-zinc-100 text-zinc-800 p-1 px-3 border border-zinc-300 rounded-sm font-black text-[11px]">
                      [██████████] PREMIUM_OPERATOR // CORES_OK
                    </div>
                  </div>
                  <div id="part-js" className="space-y-1">
                    <div id="label-js" className="flex justify-between font-bold text-zinc-700">
                      <span>Adobe Illustrator</span>
                      <span>95% (Infinite Scalable Vector Curves)</span>
                    </div>
                    <div id="bar-js" className="bg-zinc-100 text-zinc-800 p-1 px-3 border border-zinc-300 rounded-sm font-black text-[11px]">
                      [█████████░] VECTOR_ENGINE_STABLE
                    </div>
                  </div>
                  <div id="part-rust" className="space-y-1">
                    <div id="label-rust" className="flex justify-between font-bold text-zinc-700">
                      <span>Figma Layout Design</span>
                      <span>90% (Pixel-Perfect Framing Layouts)</span>
                    </div>
                    <div id="bar-rust" className="bg-zinc-100 text-zinc-800 p-1 px-3 border border-zinc-300 rounded-sm font-black text-[11px]">
                      [█████████░] INTERFACE_OK // PROTOTYPE_STABLE
                    </div>
                  </div>
                  <div id="part-htmlcss" className="space-y-1">
                    <div id="label-htmlcss" className="flex justify-between font-bold text-zinc-700">
                      <span>Adobe InDesign</span>
                      <span>85% (Geometric Grid Alignment Layouts)</span>
                    </div>
                    <div id="bar-htmlcss" className="bg-zinc-100 text-zinc-800 p-1 px-3 border border-zinc-300 rounded-sm font-black text-[11px]">
                      [████████░░] PRINT_GRID_ALIGN_OK // COMPRESSED
                    </div>
                  </div>
                </div>
              )}

              {selectedSkillCat === 'frameworks' && (
                <div id="skills-frameworks-list" className="space-y-4 font-mono text-xs">
                  <div id="part-react" className="space-y-1">
                    <div id="label-react" className="flex justify-between font-bold text-zinc-700">
                      <span>Adobe After Effects</span>
                      <span>100% (Keyframe Motion Graphic Composing)</span>
                    </div>
                    <div id="bar-react" className="bg-zinc-100 text-zinc-800 p-1 px-3 border border-zinc-300 rounded-sm font-black text-[11px]">
                      [██████████] MOTION_GRAPHICS_OK // COMPOSITE_STABLE
                    </div>
                  </div>
                  <div id="part-next" className="space-y-1">
                    <div id="label-next" className="flex justify-between font-bold text-zinc-700">
                      <span>Maxon Cinema 4D</span>
                      <span>90% (3D Low-poly & Volumetric Rendering)</span>
                    </div>
                    <div id="bar-next" className="bg-zinc-100 text-zinc-800 p-1 px-3 border border-zinc-300 rounded-sm font-black text-[11px]">
                      [█████████░] 3D_MODEL_OK // REDSHIFT_VERIFIED
                    </div>
                  </div>
                  <div id="part-tail" className="space-y-1">
                    <div id="label-tail" className="flex justify-between font-bold text-zinc-700">
                      <span>TurbulenceFD & Redshift</span>
                      <span>85% (Fluid Dust & Spark Physics Emitters)</span>
                    </div>
                    <div id="bar-tail" className="bg-zinc-100 text-zinc-800 p-1 px-3 border border-zinc-300 rounded-sm font-black text-[11px]">
                      [████████░░] PARTICLE_SIM_GEN // LIGHTS_READY
                    </div>
                  </div>
                  <div id="part-express" className="space-y-1">
                    <div id="label-express" className="flex justify-between font-bold text-zinc-700">
                      <span>Premiere Pro Grading</span>
                      <span>95% (Anamorphic LUT Mapping)</span>
                    </div>
                    <div id="bar-express" className="bg-zinc-100 text-zinc-800 p-1 px-3 border border-zinc-300 rounded-sm font-black text-[11px]">
                      [█████████░] COLOR_GRADE_ENGINE_STABLE
                    </div>
                  </div>
                </div>
              )}

              {selectedSkillCat === 'specialized' && (
                <div id="skills-specialized-list" className="space-y-4 font-mono text-xs">
                  <div id="part-wasm-spec" className="space-y-1">
                    <div id="label-wasm-spec" className="flex justify-between font-bold text-zinc-700">
                      <span>Neobrutalist UI/UX Design</span>
                      <span>100% (Solid Black Outlines & Stark Shadows)</span>
                    </div>
                    <div id="bar-wasm-spec" className="bg-zinc-100 text-zinc-800 p-1 px-3 border border-zinc-300 rounded-sm font-black text-[11px]">
                      [██████████] BOLD_STARK_COMPLIANT // WEBFLOW_NEO
                    </div>
                  </div>
                  <div id="part-audiocontext" className="space-y-1">
                    <div id="label-audiocontext" className="flex justify-between font-bold text-zinc-700">
                      <span>Analog CRT Phosphor Emulation</span>
                      <span>95% (Rasterized Scanline Glare Layers)</span>
                    </div>
                    <div id="bar-audiocontext" className="bg-zinc-100 text-zinc-800 p-1 px-3 border border-zinc-300 rounded-sm font-black text-[11px]">
                      [█████████░] CRT_PHOSPHOR_SIMULATOR_V2
                    </div>
                  </div>
                  <div id="part-idb" className="space-y-1">
                    <div id="label-idb" className="flex justify-between font-bold text-zinc-700">
                      <span>3D Matte Environmental Paintings</span>
                      <span>85% (Digital Landscape Parallax Composites)</span>
                    </div>
                    <div id="bar-idb" className="bg-zinc-100 text-zinc-800 p-1 px-3 border border-zinc-300 rounded-sm font-black text-[11px]">
                      [████████░░] DEPTH_MATTE_INTEGRATION_OK
                    </div>
                  </div>
                  <div id="part-docker" className="space-y-1">
                    <div id="label-docker" className="flex justify-between font-bold text-zinc-700">
                      <span>Halftone Offset Screenprint Art</span>
                      <span>90% (Moire Pattern Overlays)</span>
                    </div>
                    <div id="bar-docker" className="bg-zinc-100 text-zinc-800 p-1 px-3 border border-zinc-300 rounded-sm font-black text-[11px]">
                      [█████████░] MOIRE_PATTERN_VERIFIED // OUTPUT_GMR
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div id="diagnostic-console-test-wrapper" className="pt-6 border-t-2 border-dashed border-zinc-200">
              <button
                id="diagnostic-btn"
                onClick={() => {
                  alert(`[COMPILER_CHECK] Registry verification successful. Zero lint anomalies detected in the ${selectedSkillCat.toUpperCase()} category.`);
                }}
                className="border-2 border-black bg-stone-100 hover:bg-black hover:text-white font-mono text-[10px] font-black uppercase px-3 py-1.5 rounded-sm transition-all shadow-[1.5px_1.5px_0px_0px_#000]"
              >
                Run Hardware Integrity Diagnostics
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 6: WORK TOGETHER HARMONIC TRANSMITTER */}
      <div id="work-together-section-container" className="space-y-6 text-left">
        <div id="wt-header-wrapper" className="flex justify-between items-baseline border-b-4 border-black pb-2">
          <h3 id="wt-heading-title" className="font-sans font-black text-3xl tracking-tight uppercase">
            Work Together
          </h3>
          <span id="wt-meta-stamp" className="font-mono text-zinc-500 font-extrabold text-xs hidden sm:inline">
            STUDIO_TELEMETRY // CONN_REF
          </span>
        </div>

        <div id="wt-grid-layout" className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 text-black">
          {/* Left info box */}
          <div id="wt-info-col" className="col-span-1 md:col-span-5 p-6 md:p-8 bg-zinc-50 md:border-r-4 border-black flex flex-col justify-between">
            <div id="wt-info-body" className="space-y-4">
              <span id="wt-badge" className="font-mono text-[10px] font-bold border-2 border-black bg-black text-white px-2 py-0.5 uppercase tracking-wide inline-block">
                STUDIO_INBOX // RADAR
              </span>
              <h4 id="wt-info-title" className="font-sans font-black text-2xl md:text-3xl text-black">
                Collaborate & Design
              </h4>
              <p id="wt-info-desc" className="font-mono text-xs text-zinc-600 leading-relaxed">
                Looking to craft high-impact cinematic assets, compile dithered posters, direct next-generation VFX music videos, or consult on professional color grading grids?
              </p>
              <div id="wt-spec-box" className="border-2 border-dashed border-black p-3.5 bg-yellow-50/50 font-mono text-[11px] leading-relaxed">
                <p id="wt-spec-header" className="font-extrabold uppercase text-[10px] text-zinc-700 mb-1">📟 DIRECT CHANNELS</p>
                Email Registry: <span className="font-bold underline">choudharykanishk882@gmail.com</span><br />
                Sub-Sector Location: Asia-East Infrastructure
              </div>
            </div>

            <div id="wt-file-stamp-wrapper" className="border-t border-zinc-200 pt-4 mt-6 font-mono text-[10px] text-zinc-400">
              <p id="stamp-author">DESIGNER: KANISHK CHAUDHARY</p>
              <p id="stamp-v">VESSEL KINETIC VISUALS EXPERT</p>
            </div>
          </div>

          {/* Right interactive form core */}
          <form
            id="wt-form-element"
            onSubmit={(e) => {
              e.preventDefault();
              if (!formData.name || !formData.email || !formData.message) {
                alert("[SYSTEM_WARNING] Please enter name, email, and proposal packet message!");
                return;
              }
              setIsTransmitting(true);
              setTransmissionProgress(15);
              setTransmissionSteps(["[INIT] Establishing graphic telemetry node link..."]);

              setTimeout(() => {
                setTransmissionProgress(45);
                setTransmissionSteps(prev => [...prev, "[OK] Handshake signed by Kanishk's portfolio stream"]);
              }, 700);

              setTimeout(() => {
                setTransmissionProgress(80);
                setTransmissionSteps(prev => [...prev, "[DATA] Packetizing custom artwork proposal..."]);
              }, 1400);

              setTimeout(() => {
                setTransmissionProgress(100);
                setTransmissionSteps(prev => [...prev, "[SUCCESS] Transmission beamed to choudharykanishk882@gmail.com!"]);
                setIsTransmitting(false);
                setIsTransmitted(true);
              }, 2100);
            }}
            className="col-span-1 md:col-span-7 p-6 md:p-8 space-y-4"
          >
            {isTransmitted ? (
              <div id="success-screen-wrapper" className="space-y-6 py-6 text-center flex flex-col items-center justify-center">
                <div id="success-ring" className="w-16 h-16 rounded-full border-4 border-black bg-lime-100 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-black" />
                </div>
                <div id="success-text-info" className="space-y-2">
                  <h4 id="success-heading" className="font-sans font-black text-2xl">Transmission Beam Received!</h4>
                  <p id="success-body" className="font-mono text-xs text-zinc-600 max-w-sm mx-auto leading-relaxed">
                    Client communication packets successfully signed and dispatched to Kanishk's design registry. You will receive an asynchronous feedback response soon.
                  </p>
                </div>
                <button
                  id="reset-form-btn"
                  type="button"
                  onClick={() => {
                    setIsTransmitted(false);
                    setFormData({ name: '', email: '', purpose: 'collab', message: '' });
                    setTransmissionSteps([]);
                  }}
                  className="border-2 border-black bg-white hover:bg-black hover:text-white px-4 py-2 font-mono text-xs font-black uppercase rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  Send another transmission
                </button>
              </div>
            ) : (
              <div id="form-fields-wrapper" className="space-y-4 font-mono text-xs">
                <div id="form-group-name" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div id="label-group-name" className="space-y-1">
                    <label id="lbl-name" htmlFor="operator-name-field" className="block font-bold text-zinc-700 uppercase tracking-wide">
                      Your Identity / Name:
                    </label>
                    <input
                      id="operator-name-field"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={isTransmitting}
                      placeholder="e.g. Art Director Sarah"
                      className="w-full border-2 border-black p-2.5 rounded-sm bg-white focus:bg-stone-50 text-black font-semibold outline-none"
                    />
                  </div>
                  <div id="label-group-email" className="space-y-1">
                    <label id="lbl-email" htmlFor="operator-email-field" className="block font-bold text-zinc-700 uppercase tracking-wide">
                      Frequency / Email Address:
                    </label>
                    <input
                      id="operator-email-field"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={isTransmitting}
                      placeholder="address@domain.com"
                      className="w-full border-2 border-black p-2.5 rounded-sm bg-white focus:bg-stone-50 text-black font-semibold outline-none"
                    />
                  </div>
                </div>

                <div id="form-group-purpose" className="space-y-1">
                  <label id="lbl-purpose" htmlFor="proposal-purpose-select" className="block font-bold text-zinc-700 uppercase tracking-wide">
                    Relay Objective:
                  </label>
                  <select
                    id="proposal-purpose-select"
                    value={formData.purpose}
                    onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                    disabled={isTransmitting}
                    className="w-full border-2 border-black p-2.5 rounded-sm bg-white focus:bg-stone-50 text-black font-semibold uppercase tracking-wide outline-none"
                  >
                    <option id="opt-collab" value="collab">Hire Kanishk for Commercial Design / VFX Work</option>
                    <option id="opt-retro" value="retro">Book Art Direction & VFX Consultation</option>
                    <option id="opt-other" value="other">General Proposal / Collaboration Request</option>
                  </select>
                </div>

                <div id="form-group-message" className="space-y-1">
                  <label id="lbl-message" htmlFor="proposal-message-area" className="block font-bold text-zinc-700 uppercase tracking-wide">
                    Transmission Carrier Message:
                  </label>
                  <textarea
                    id="proposal-message-area"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    disabled={isTransmitting}
                    placeholder="Enter your system proposal specs..."
                    className="w-full border-2 border-black p-2.5 rounded-sm bg-white focus:bg-stone-50 text-black font-semibold outline-none resize-none"
                  />
                </div>

                {isTransmitting && (
                  <div id="transmission-telemetry-box" className="border-2 border-black p-3 bg-neutral-900 text-neutral-300 font-mono text-[10px] space-y-2">
                    <div id="progress-indicator-line" className="flex justify-between font-bold text-white uppercase text-[9px]">
                      <span>TRANSMITTING PACKET WAVE</span>
                      <span>{transmissionProgress}%</span>
                    </div>
                    {/* Retro physical progress bar */}
                    <div id="tel-bar-container" className="h-2 w-full border border-neutral-700 bg-neutral-950 overflow-hidden relative">
                      <div id="tel-bar-fill" className="bg-white h-full transition-all duration-300" style={{ width: `${transmissionProgress}%` }}></div>
                    </div>
                    <div id="tel-steps-log" className="space-y-1 border-t border-neutral-800 pt-2 text-left">
                      {transmissionSteps.map((step, idx) => (
                        <p id={`tel-step-${idx}`} key={idx} className="font-bold">{step}</p>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  id="transmission-submit-btn"
                  type="submit"
                  disabled={isTransmitting}
                  className="w-full border-2 border-black bg-black hover:bg-white text-white hover:text-black font-mono font-black uppercase text-xs py-3 px-4 rounded-sm transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Transmit Digital Proposal</span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// HIGH-FIDELITY INFOGRAPHICS VIDEO PLAYER SIMULATOR
// Plays, loops, synthesizes audio & syncs with customization
// ==========================================
interface VideoPlayerProps {
  hiringGoal: number;
  employeesOnboarded: number;
  retentionRate: number;
  thumbnail: string;
}

const VideoPlayerSimulator: React.FC<VideoPlayerProps> = ({
  hiringGoal,
  employeesOnboarded,
  retentionRate,
  thumbnail,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [audioActive, setAudioActive] = useState<boolean>(false);
  const audioIntervalRef = React.useRef<any>(null);

  const duration = 20; // 20s total duration

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.1;
          if (next >= duration) {
            return 0;
          }
          return next;
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  useEffect(() => {
    // 4 slides, each takes 5 seconds
    const slideIdx = Math.min(3, Math.floor(currentTime / 5));
    setActiveSlide(slideIdx);
  }, [currentTime]);

  // Web Audio tech lo-fi synth foley track loop
  useEffect(() => {
    if (isPlaying && audioActive) {
      let stepCount = 0;
      audioIntervalRef.current = setInterval(() => {
        try {
          const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
          if (!AudioCtxClass) return;
          const ctx = new AudioCtxClass();
          
          // Muted high-hat / snare tick
          if (stepCount % 4 === 0) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(110 + (activeSlide * 40), ctx.currentTime); // Chord progression
            osc.connect(gain);
            gain.connect(ctx.destination);
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
            osc.start(); osc.stop(ctx.currentTime + 0.15);
          } else {
            // Soft chord pulse
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            const frequencies = [261.63, 293.66, 329.63, 392.00]; // Harmony notes
            osc.frequency.setValueAtTime(frequencies[activeSlide], ctx.currentTime);
            osc.connect(gain);
            gain.connect(ctx.destination);
            gain.gain.setValueAtTime(0.03, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
            osc.start(); osc.stop(ctx.currentTime + 0.25);
          }
          stepCount = (stepCount + 1) % 8;
        } catch (e) {}
      }, 500); // Soft tech rhythm
    } else {
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
        audioIntervalRef.current = null;
      }
    }
    return () => {
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
      }
    };
  }, [isPlaying, audioActive, activeSlide]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const handleScatteredJump = (index: number) => {
    setCurrentTime(index * 5);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4 max-w-2xl animate-fadeIn">
      {/* 16:9 Screen Container */}
      <div className="relative border-4 border-black bg-neutral-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden w-full aspect-video select-none">
        
        {/* Render actual simulated motion design frames! */}
        <div className="absolute inset-0 w-full h-full text-black">
          
          {/* SLIDE 0: (TEAM MILESTONES START SCREEN) */}
          {activeSlide === 0 && (
            <div className="absolute inset-0 bg-[#4285F4]/10 bg-gradient-to-tr from-[#9afbeb]/30 via-[#51e2ff]/20 to-[#9e76fc]/10 flex items-center justify-between p-6 xs:p-8 animate-fadeIn text-left">
              <div className="w-[50%] space-y-3 z-10">
                {/* Simulated Desk Lineart */}
                <div className="border-2 border-black bg-white rounded-md p-3.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-start relative overflow-hidden">
                  <div className="flex space-x-1 mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-400 border border-black" />
                    <span className="w-2 h-2 rounded-full bg-yellow-400 border border-black" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 border border-black" />
                  </div>
                  {/* Small person vector mockup representation */}
                  <div className="flex items-center space-x-3 mt-1">
                    <div className="w-10 h-10 rounded-full border-2 border-black bg-amber-100 flex items-center justify-center font-bold text-xs">
                      👨‍💻
                    </div>
                    <div className="space-y-1">
                      <p className="font-sans font-black text-[10px] text-black">Kanishk Chaudhary</p>
                      <p className="font-mono text-[8px] text-zinc-500">CREATIVE DIRECTOR</p>
                    </div>
                  </div>
                  <div className="mt-3 w-full h-1 border border-black bg-zinc-100 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[85%]" />
                  </div>
                  {/* Cat Emoji Absolute */}
                  <span className="absolute bottom-1 right-2 text-base animate-bounce">🐱</span>
                </div>
              </div>

              {/* Right titles exactly from screenshot */}
              <div className="w-[45%] text-right space-y-2 flex flex-col items-end justify-center z-10">
                <span className="font-mono text-[9px] bg-white border border-black text-blue-600 px-2 py-0.5 rounded-full font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] animate-bounce">
                  2025
                </span>
                <h3 className="font-sans font-black text-3xl sm:text-4xl text-neutral-900 tracking-tight leading-none text-right">
                  Team <br />
                  <span className="text-blue-600 underline decoration-solid decoration-3">Milestones</span>
                </h3>
                <p className="font-mono text-[9px] text-zinc-600 font-extrabold uppercase bg-neutral-100/90 border border-black px-1.5 py-0.5 rounded-xs">
                  | kanishk co.
                </p>
              </div>

              {/* Ambient graphic curves */}
              <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-[#1de9b6]/25 -z-10" />
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#9b51e0]/10 -z-10" />
            </div>
          )}

          {/* SLIDE 1: (KUDOS TO THE HR DEPARTMENT) */}
          {activeSlide === 1 && (
            <div className="absolute inset-0 bg-[#e8f5e9] bg-gradient-to-br from-[#c8e6c9]/40 to-[#e8f5e9] flex flex-col justify-between p-6 animate-fadeIn text-left">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 font-sans font-black text-xs text-white bg-emerald-500 border-2 border-black rounded-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-pulse">
                  Kudos
                </span>
                <span className="font-mono text-[8px] text-zinc-500 font-bold">SECTION 02 // CREW_ONBOARDING</span>
              </div>

              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-7 space-y-2">
                  <p className="font-sans font-medium text-xs text-zinc-700 leading-relaxed uppercase">
                    to the HR department for hiring and onboarding
                  </p>
                  <p className="font-sans font-black text-4xl text-emerald-600 tracking-tight leading-none">
                    {employeesOnboarded} <span className="text-black text-lg font-bold">New Employees</span>
                  </p>
                  <p className="font-sans font-medium text-xs text-zinc-700 leading-relaxed">
                    onboarded this fiscal year! With significant growth in resource capacity.
                  </p>
                </div>
                
                {/* Gears representation */}
                <div className="col-span-5 flex justify-center space-x-2">
                  <div className="relative w-16 h-16 flex items-center justify-center animate-spin">
                    ⚙️
                  </div>
                  <div className="border-2 border-black bg-white rounded-md p-2.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 flex flex-col space-y-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <div className="h-6 w-1 rounded-full bg-emerald-500 mx-auto" style={{ height: `${(employeesOnboarded/200)*24}px` }} />
                    <span className="font-mono text-[8px] font-black">{employeesOnboarded}</span>
                  </div>
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex space-x-1.5 justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
              </div>
            </div>
          )}

          {/* SLIDE 2: (190% OF THE HIRING GOAL REACHED) */}
          {activeSlide === 2 && (
            <div className="absolute inset-0 bg-[#e3f2fd] bg-gradient-to-tr from-[#90caf9]/20 to-[#e3f2fd] flex flex-col justify-between p-6 xs:p-8 animate-fadeIn text-left">
              <span className="font-mono text-[8px] text-zinc-500 font-bold">SECTION 03 // PERFORMANCE_TARGET</span>

              <div className="flex items-center justify-between gap-4">
                <div className="space-y-3 max-w-md">
                  <p className="font-sans text-xs font-bold text-zinc-600 block uppercase tracking-wider">
                    Target Accomplished!
                  </p>
                  <h4 className="font-sans font-black text-2xl sm:text-3xl text-neutral-900 leading-snug">
                    With that, we reached <span className="text-blue-500 underline decoration-wavy underline-offset-4">{hiringGoal}%</span> of our hiring goal
                  </h4>
                  <p className="font-sans text-[10px] text-zinc-500">
                    Exceeded original benchmark threshold for critical expansion sectors inside Core Engineering & Art.
                  </p>
                </div>

                {/* Progress Wheel */}
                <div className="relative border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 rounded-md flex flex-col items-center justify-center font-mono">
                  <div className="w-14 h-14 rounded-full border-4 border-dashed border-emerald-500 flex items-center justify-center font-black text-sm text-neutral-800 animate-spin">
                    🌀
                  </div>
                  <span className="text-[10px] font-extrabold mt-1 text-emerald-600">{hiringGoal}%</span>
                </div>
              </div>

              {/* Bottom footer bar matching AE */}
              <div className="border-t border-black/10 pt-2 flex justify-between font-mono text-[7px] text-zinc-500">
                <span>RATING: EXCELLENT</span>
                <span>STATUS: STABLE</span>
              </div>
            </div>
          )}

          {/* SLIDE 3: (EMPLOYEE RETENTION RATE MATRIC) */}
          {activeSlide === 3 && (
            <div className="absolute inset-0 bg-[#fffde7] bg-gradient-to-br from-[#ffd54f]/10 to-[#ffd180]/10 flex flex-col justify-between p-6 animate-fadeIn text-left">
              <div className="flex justify-between items-center pb-2 border-b border-black/10">
                <span className="font-mono text-[8px] text-zinc-500 font-extrabold">SECTION 04 // RETENTION_INDEX</span>
                <span className="px-2 py-0.5 bg-yellow-400 text-black border border-black font-mono text-[8px] rounded-xs font-black">
                  RETENTION: {retentionRate}%
                </span>
              </div>

              <div className="grid grid-cols-12 gap-3 items-center">
                <div className="col-span-7 space-y-2">
                  <p className="font-sans font-black text-xl text-neutral-900 tracking-tight leading-none">
                    We also saw an increase in our employee retention rate:
                  </p>
                  <p className="font-mono text-[10px] font-black text-yellow-700 bg-yellow-100/90 border border-black px-2 py-1 rounded-xs inline-block">
                    🏁 HIGHER RETENTION RATE FOR 2025 COMPARED TO LAST YEAR AT 70%
                  </p>
                </div>

                {/* Simulated Stick Figure Grid from screenshot */}
                <div className="col-span-5 border-2 border-black bg-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-md flex flex-col items-center">
                  <span className="font-mono text-[7px] text-zinc-400 block mb-1">TEAM MATRIX</span>
                  <div className="grid grid-cols-5 gap-1">
                    {[...Array(10)].map((_, i) => {
                      const isActive = i < Math.round((retentionRate / 100) * 10);
                      return (
                        <div 
                          key={i} 
                          className={`w-4 h-4 rounded-full border border-black flex items-center justify-center text-[10px] transition-colors ${isActive ? 'bg-[#c8e6c9] text-emerald-700' : 'bg-neutral-150 text-zinc-300'}`}
                        >
                          👥
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <p className="font-sans text-[10px] text-zinc-500 text-center leading-tighter">
                Our workforce stability reflects our creative and production alignment values.
              </p>
            </div>
          )}

        </div>

        {/* Cinematic Watermark overlay badge */}
        <div className="absolute top-2 left-2 pointer-events-none z-10 text-[7px] font-mono bg-black/85 border border-zinc-700 px-1.5 py-0.5 rounded-xs tracking-wider uppercase text-left">
          <p>🟢 AE_STREAM // ACTIVE</p>
          <p>⏱️ TIMECODE: 00:00:{(currentTime % 60).toFixed(1).padStart(4, '0')}</p>
        </div>

        {/* Progress bar overlay on bottom of video */}
        <div className="absolute bottom-0 inset-x-0 h-1.5 bg-neutral-950 flex">
          <div 
            className="bg-emerald-400 h-full transition-all duration-100 ease-linear" 
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
      </div>

      {/* Video Control Bar Interface */}
      <div className="w-full flex items-center justify-between bg-neutral-950 rounded-sm border-2 border-zinc-700 p-3 font-mono text-xs text-white shadow-lg">
        {/* Play/Pause Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlayback}
            className="p-1.5 border border-zinc-700 bg-neutral-900 rounded-sm hover:bg-neutral-800 text-white flex items-center justify-center transition-colors shadow-xs"
            title={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          
          <button
            onClick={() => setCurrentTime(0)}
            className="p-1.5 border border-zinc-700 bg-neutral-900 rounded-sm hover:bg-neutral-800 text-white flex items-center justify-center transition-colors shadow-xs"
            title="Restart Video"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {/* Slide navigation scrubbing */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 font-mono text-[9px] sm:text-[10px]">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              onClick={() => handleScatteredJump(index)}
              className={`px-2 py-1 border rounded-xs font-black uppercase transition-all tracking-wider ${activeSlide === index ? 'bg-emerald-500 text-black border-emerald-400 font-extrabold' : 'bg-neutral-900 hover:bg-neutral-800 border-zinc-700 text-zinc-400'}`}
            >
              CH {index + 1}
            </button>
          ))}
        </div>

        {/* Tech LoFi Synth Foley Audio Engine */}
        <button
          onClick={() => setAudioActive(!audioActive)}
          className={`px-2.5 py-1.5 border text-[9px] sm:text-[10px] rounded-xs font-mono uppercase transition-colors font-extrabold flex items-center space-x-1 ${audioActive ? 'bg-emerald-500 text-black border-emerald-400' : 'bg-neutral-900 border-zinc-700 text-zinc-400 hover:bg-neutral-800'}`}
        >
          <Volume2 className="h-3.5 w-3.5 animate-pulse" />
          <span className="hidden sm:inline">{audioActive ? 'AUDIO SYNC ON' : 'SYNTH FOLEY OFF'}</span>
        </button>
      </div>
    </div>
  );
};
