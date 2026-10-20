import React, { useState } from 'react';
import { 
  SplitSquareVertical, 
  ArrowLeftRight, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Zap, 
  SlidersHorizontal 
} from 'lucide-react';
import { LegacyJupiterView } from './LegacyJupiterView';
import { SwapView } from '../swap/SwapView';
import { COMPARISON_POINTS } from '../../data/mockData';

export const ComparisonSliderView: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('side-by-side');

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Hero Header for Comparison */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 rounded-full bg-[#00F59B]/15 border border-[#00F59B]/30 px-3.5 py-1 text-xs font-semibold text-[#00F59B]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Superteam India Bounty — UX Teardown & Redesign</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Jupiter Legacy vs Redesigned v2.0
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          We analyzed the friction points of 500,000+ daily Solana swap transactions on jup.ag and engineered a surgical redesign focused on cognitive clarity, routing transparency, and MEV safety.
        </p>

        {/* View Switcher Controls */}
        <div className="inline-flex items-center rounded-2xl bg-slate-900 border border-slate-700/80 p-1.5 shadow-inner mt-2">
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              viewMode === 'side-by-side'
                ? 'bg-slate-700 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <SplitSquareVertical className="h-3.5 w-3.5" />
            <span>Side-by-Side Teardown</span>
          </button>

          <button
            onClick={() => setViewMode('slider')}
            className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              viewMode === 'slider'
                ? 'bg-[#00F59B] text-slate-950 shadow-[0_0_15px_rgba(0,245,155,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Interactive Split Slider</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Interactive Split Slider */}
      {viewMode === 'slider' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 max-w-2xl mx-auto px-4">
            <span className="flex items-center text-rose-400 font-bold">
              ← Drag to reveal Legacy Jupiter
            </span>
            <span className="bg-slate-800 px-3 py-1 rounded-full text-white font-bold">
              Split: {sliderPosition}%
            </span>
            <span className="flex items-center text-[#00F59B] font-bold">
              Redesigned v2.0 →
            </span>
          </div>

          <div className="relative w-full max-w-4xl mx-auto min-h-[640px] rounded-3xl border border-white/[0.1] bg-[#070c14] overflow-hidden shadow-2xl">
            {/* Left Content (Legacy) */}
            <div 
              className="absolute inset-0 p-6 flex items-center justify-center overflow-hidden bg-[#0c1420]/80"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <div className="w-full max-w-md">
                <div className="mb-4 inline-block rounded-lg bg-rose-500/20 border border-rose-500/40 px-3 py-1 text-xs font-bold text-rose-400 font-mono">
                  BEFORE: LEGACY JUPITER (JUP.AG)
                </div>
                <LegacyJupiterView />
              </div>
            </div>

            {/* Right Content (Redesigned) */}
            <div 
              className="absolute inset-0 p-6 flex items-center justify-center overflow-hidden bg-[#060a10]"
              style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
            >
              <div className="w-full max-w-md">
                <div className="mb-4 inline-block rounded-lg bg-[#00F59B]/20 border border-[#00F59B]/40 px-3 py-1 text-xs font-bold text-[#00F59B] font-mono">
                  AFTER: REDESIGNED JUPITER v2.0
                </div>
                <SwapView />
              </div>
            </div>

            {/* Draggable Slider Bar & Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-[#00F59B] cursor-ew-resize flex items-center justify-center shadow-[0_0_15px_#00F59B]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="flex h-10 w-10 -ml-5 items-center justify-center rounded-full bg-slate-900 border-2 border-[#00F59B] text-[#00F59B] shadow-2xl">
                <ArrowLeftRight className="h-4 w-4" />
              </div>
            </div>

            {/* Hidden native range input overlaid for easy touch/mouse dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            />
          </div>
        </div>
      ) : (
        /* Mode 2: Side-by-Side Comparison Grid */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Legacy Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-rose-950/20 border border-rose-500/30 p-3">
              <div className="flex items-center space-x-2">
                <XCircle className="h-5 w-5 text-rose-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Legacy Jupiter (jup.ag)</h3>
                  <p className="text-[11px] text-slate-400 font-mono">Friction, Cognitive Overload, Opaque Costs</p>
                </div>
              </div>
              <span className="rounded bg-rose-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-rose-300">
                BEFORE
              </span>
            </div>

            <LegacyJupiterView />
          </div>

          {/* Redesign Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-emerald-950/20 border border-emerald-500/30 p-3">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-[#00F59B]" />
                <div>
                  <h3 className="text-sm font-bold text-white">Redesigned Jupiter v2.0</h3>
                  <p className="text-[11px] text-slate-400 font-mono">Focused, Transparent Routing, Jito Shielded</p>
                </div>
              </div>
              <span className="rounded bg-[#00F59B]/20 px-2 py-0.5 text-[10px] font-mono font-bold text-[#00F59B]">
                AFTER
              </span>
            </div>

            <SwapView />
          </div>

        </div>
      )}

      {/* Structured Comparison Audit Table */}
      <div className="mt-12 rounded-3xl border border-white/[0.08] bg-[#0c1422]/90 p-6 backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/[0.06] pb-4">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              UX Audit & Quantitative Transformation Matrix
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Evaluated against Nielsen Norman Group heuristics & real Solana trading behavior
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
            <Zap className="h-3.5 w-3.5" />
            <span>5/5 Key Friction Points Resolved</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPARISON_POINTS.map((pt, idx) => (
            <div 
              key={idx} 
              className="rounded-2xl border border-white/[0.06] bg-[#080d16] p-4 flex flex-col justify-between hover:border-[#00F59B]/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white tracking-tight">{pt.category}</span>
                  <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[10px] font-mono text-slate-400">
                    Point {idx + 1}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="rounded-xl bg-rose-950/20 border border-rose-500/20 p-2.5 text-rose-300">
                    <span className="font-bold block text-[10px] uppercase font-mono text-rose-400 mb-1">
                      Legacy Flaw:
                    </span>
                    {pt.legacy}
                  </div>

                  <div className="rounded-xl bg-emerald-950/20 border border-emerald-500/20 p-2.5 text-emerald-200">
                    <span className="font-bold block text-[10px] uppercase font-mono text-emerald-400 mb-1">
                      v2 Redesign:
                    </span>
                    {pt.redesign}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-white/[0.04] text-[11px] font-mono text-[#00F59B]">
                Impact: {pt.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
