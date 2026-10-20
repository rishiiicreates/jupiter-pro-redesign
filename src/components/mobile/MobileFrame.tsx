import React from 'react';
import { 
  Wifi, 
  Battery, 
  Signal, 
  ArrowLeftRight, 
  TrendingUp, 
  Clock, 
  Settings, 
  Smartphone
} from 'lucide-react';
import { AppTab } from '../../types';

interface MobileFrameProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onExitMobile: () => void;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  activeTab,
  setActiveTab,
  onExitMobile,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 animate-fade-in">
      
      {/* Mobile Mode Header Info */}
      <div className="mb-4 flex items-center justify-between w-full max-w-[420px] px-2 text-xs">
        <div className="flex items-center space-x-2 text-slate-300 font-mono">
          <Smartphone className="h-4 w-4 text-[#00F59B]" />
          <span className="font-bold text-white">iPhone 15 Pro Simulation (393 × 852)</span>
        </div>
        <button
          onClick={onExitMobile}
          className="text-xs font-mono text-[#00F59B] hover:underline"
        >
          Exit to Desktop
        </button>
      </div>

      {/* Realistic Phone Bezel */}
      <div className="relative w-full max-w-[400px] h-[820px] rounded-[52px] border-[10px] border-[#202736] bg-[#060a10] shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,245,155,0.15)] flex flex-col overflow-hidden">
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 h-6 w-28 rounded-full bg-black flex items-center justify-center space-x-2 px-2 shadow-inner">
          <div className="h-2.5 w-2.5 rounded-full bg-[#111] border border-[#222]" />
          <div className="h-2 w-2 rounded-full bg-emerald-500/80 animate-pulse" />
        </div>

        {/* Mobile Status Bar */}
        <div className="relative z-40 flex items-center justify-between px-7 pt-3.5 pb-2 text-[12px] font-semibold text-slate-300 font-sans select-none">
          <span>9:41</span>
          <div className="flex items-center space-x-1.5 text-slate-300">
            <Signal className="h-3.5 w-3.5" />
            <Wifi className="h-3.5 w-3.5" />
            <Battery className="h-4 w-4" />
          </div>
        </div>

        {/* Mobile Mini App Header */}
        <div className="px-5 py-2.5 flex items-center justify-between border-b border-white/[0.06] bg-[#080d15]/80 backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <div className="h-7 w-7 rounded-lg bg-[#00F59B]/20 border border-[#00F59B]/40 flex items-center justify-center text-[#00F59B]">
              <span className="text-xs font-black">J</span>
            </div>
            <span className="font-extrabold text-sm text-white tracking-tight">JUPITER</span>
            <span className="text-[9px] font-mono text-[#00F59B] bg-[#00F59B]/10 px-1 rounded">v2</span>
          </div>

          <div className="flex items-center space-x-1 font-mono text-[10px] bg-slate-800/80 rounded-full px-2 py-0.5 text-emerald-400">
            <span>24.85 SOL</span>
          </div>
        </div>

        {/* Scrollable Screen Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {children}
        </div>

        {/* Mobile Ergonomic Bottom Tab Navigation */}
        <div className="relative z-40 border-t border-white/[0.08] bg-[#090f18]/95 backdrop-blur-xl px-6 py-2.5 flex items-center justify-around select-none">
          <button
            onClick={() => setActiveTab('swap')}
            className={`flex flex-col items-center space-y-1 transition-all ${
              activeTab === 'swap' ? 'text-[#00F59B]' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <ArrowLeftRight className="h-4 w-4" />
            <span className="text-[10px] font-bold">Swap</span>
          </button>

          <button
            onClick={() => setActiveTab('perps')}
            className={`flex flex-col items-center space-y-1 transition-all ${
              activeTab === 'perps' ? 'text-[#00F59B]' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span className="text-[10px] font-bold">Perps</span>
          </button>

          <button
            onClick={() => setActiveTab('bridge')}
            className={`flex flex-col items-center space-y-1 transition-all ${
              activeTab === 'bridge' ? 'text-[#00F59B]' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Clock className="h-4 w-4" />
            <span className="text-[10px] font-bold">Bridge</span>
          </button>

          <button
            onClick={() => alert('Settings drawer')}
            className="flex flex-col items-center space-y-1 text-slate-500 hover:text-slate-300 transition-all"
          >
            <Settings className="h-4 w-4" />
            <span className="text-[10px] font-bold">Settings</span>
          </button>
        </div>

        {/* Home Indicator Bar */}
        <div className="w-full flex justify-center pb-2 bg-[#090f18]">
          <div className="h-1 w-32 rounded-full bg-slate-600/60" />
        </div>

      </div>
    </div>
  );
};
