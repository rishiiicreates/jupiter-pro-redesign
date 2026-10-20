import React from 'react';
import { AlertCircle, Settings, ArrowDown } from 'lucide-react';

export const LegacyJupiterView: React.FC = () => {
  return (
    <div className="w-full max-w-xl mx-auto space-y-4 font-sans select-none opacity-90">
      
      {/* Legacy Clutter Warning Banner */}
      <div className="rounded-xl border border-rose-500/30 bg-rose-950/30 p-3 text-xs text-rose-300 flex items-start space-x-2">
        <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
        <div>
          <span className="font-bold">Legacy Jupiter UX Friction Points (jup.ag):</span>
          <p className="text-[11px] text-slate-300 mt-0.5">
            Heavy cognitive overload, dense unprioritized typography, obscure routing breakdown, and hidden slippage settings that caused high slippage loss.
          </p>
        </div>
      </div>

      {/* Legacy Card */}
      <div className="rounded-2xl border border-slate-700 bg-[#131b26] p-5 shadow-lg relative overflow-hidden">
        
        {/* Pain Point Annotation Tag 1 */}
        <div className="absolute top-2 right-2 rounded bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-[9px] font-mono text-amber-300">
          UX Friction #1: 30+ tiny icon controls
        </div>

        {/* Legacy Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex space-x-3 text-xs font-semibold text-slate-300">
            <span className="text-[#c8f944] border-b border-[#c8f944] pb-1">Swap</span>
            <span className="text-slate-500 hover:text-slate-300">Limit Order</span>
            <span className="text-slate-500 hover:text-slate-300">DCA</span>
            <span className="text-slate-500 hover:text-slate-300">VA</span>
            <span className="text-slate-500 hover:text-slate-300">Bridge</span>
          </div>

          <div className="flex items-center space-x-1 text-slate-400 text-xs">
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">0.5%</span>
            <Settings className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Legacy Input Container */}
        <div className="mt-4 rounded-xl border border-slate-800 bg-[#1c2736] p-3">
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Selling</span>
            <span>Bal: 24.85 SOL</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="text-2xl font-bold text-slate-200">5.0</div>
            <div className="flex items-center space-x-1.5 rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-white">
              <div className="h-4 w-4 rounded-full bg-purple-500" />
              <span>SOL</span>
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>~$923.75</span>
            <div className="space-x-1">
              <span className="text-[9px] bg-slate-800 px-1 rounded">Half</span>
              <span className="text-[9px] bg-slate-800 px-1 rounded">Max</span>
            </div>
          </div>
        </div>

        {/* Legacy Invert Arrow */}
        <div className="flex justify-center my-2">
          <div className="h-6 w-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
            <ArrowDown className="h-3 w-3" />
          </div>
        </div>

        {/* Legacy Output Container */}
        <div className="rounded-xl border border-slate-800 bg-[#1c2736] p-3 relative">
          {/* Pain Point Annotation Tag 2 */}
          <div className="absolute -top-3 right-2 rounded bg-rose-500/20 border border-rose-500/40 px-2 py-0.5 text-[9px] font-mono text-rose-300">
            UX Friction #2: Ambiguous dollar savings
          </div>

          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Buying</span>
            <span>Bal: 3,450.20 USDC</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="text-2xl font-bold text-slate-200">923.75</div>
            <div className="flex items-center space-x-1.5 rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-white">
              <div className="h-4 w-4 rounded-full bg-blue-500" />
              <span>USDC</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            ~$923.75
          </div>
        </div>

        {/* Legacy Obscure Routing Box */}
        <div className="mt-3 rounded-lg border border-slate-800/80 bg-slate-900/60 p-2.5 text-[10px] text-slate-400 font-mono space-y-1">
          <div className="flex justify-between">
            <span>Route</span>
            <span className="text-slate-300">SOL &gt; Orca (42%) &gt; Raydium (58%) &gt; USDC</span>
          </div>
          <div className="flex justify-between">
            <span>Price Impact</span>
            <span className="text-slate-400">&lt; 0.1%</span>
          </div>
          <div className="flex justify-between">
            <span>Minimum Received</span>
            <span className="text-slate-400">919.13 USDC</span>
          </div>
          <div className="flex justify-between">
            <span>Fee</span>
            <span className="text-slate-400">Unknown pool fee structure</span>
          </div>
        </div>

        {/* Legacy Big Button */}
        <button
          disabled
          className="mt-4 w-full rounded-xl bg-slate-700 py-3 text-center text-sm font-bold text-slate-400 cursor-not-allowed"
        >
          Swap (Legacy Interface)
        </button>

      </div>
    </div>
  );
};
