import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  TrendingUp, 
  Layers, 
  Smartphone, 
  Monitor, 
  SplitSquareVertical, 
  Wallet, 
  CheckCircle2, 
  ChevronDown, 
  Copy, 
  LogOut,
  Sparkles,
  Zap
} from 'lucide-react';
import { AppTab, ViewportMode } from '../types';
import { cn } from '../utils/cn';

interface HeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;
  onOpenDesignDecisions: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  viewportMode,
  setViewportMode,
  onOpenDesignDecisions,
}) => {
  const [walletConnected, setWalletConnected] = useState(true);
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText('7xK9mPzY34sVw8bNeX6R112F8Lop43aQ1');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#070b12]/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Left: Brand & Main Navigation */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('swap')}>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#00F59B]/20 via-[#102a24] to-[#0d1c24] border border-[#00F59B]/40 shadow-[0_0_15px_rgba(0,245,155,0.2)] group-hover:border-[#00F59B] transition-all">
              <svg className="h-6 w-6 text-[#00F59B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M7 12c2.5-4 7.5-4 10 0" />
                <path d="M7 12c2.5 4 7.5 4 10 0" />
                <circle cx="12" cy="12" r="2.5" fill="#00F59B" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F59B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F59B]"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold tracking-tight text-white text-lg">JUPITER</span>
                <span className="rounded-md bg-[#00F59B]/15 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-[#00F59B] border border-[#00F59B]/30">
                  v2.0
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono hidden sm:block">SOLANA AGGREGATOR & PERPS</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 rounded-xl bg-white/[0.04] p-1 border border-white/[0.06]">
            <button
              onClick={() => setActiveTab('swap')}
              className={cn(
                'flex items-center space-x-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-200',
                activeTab === 'swap'
                  ? 'bg-gradient-to-r from-[#00F59B]/20 to-[#00c97d]/10 text-[#00F59B] border border-[#00F59B]/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              )}
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              <span>Swap</span>
            </button>

            <button
              onClick={() => setActiveTab('perps')}
              className={cn(
                'flex items-center space-x-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-200',
                activeTab === 'perps'
                  ? 'bg-gradient-to-r from-[#00F59B]/20 to-[#00c97d]/10 text-[#00F59B] border border-[#00F59B]/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              )}
            >
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              <span>Perps</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                100x
              </span>
            </button>

            <button
              onClick={() => setActiveTab('bridge')}
              className={cn(
                'flex items-center space-x-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-200',
                activeTab === 'bridge'
                  ? 'bg-gradient-to-r from-[#00F59B]/20 to-[#00c97d]/10 text-[#00F59B] border border-[#00F59B]/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              )}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Bridge & DCA</span>
            </button>
          </nav>
        </div>

        {/* Center: Viewport Mode Controller (Desktop / Mobile / Split Comparison) */}
        <div className="flex items-center rounded-xl bg-slate-900/90 border border-slate-700/60 p-1 shadow-inner">
          <button
            onClick={() => setViewportMode('desktop')}
            title="Desktop Terminal View"
            className={cn(
              'flex items-center space-x-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all',
              viewportMode === 'desktop'
                ? 'bg-slate-700/80 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            onClick={() => setViewportMode('mobile')}
            title="Mobile Viewport Simulation"
            className={cn(
              'flex items-center space-x-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all',
              viewportMode === 'mobile'
                ? 'bg-slate-700/80 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Mobile Frame</span>
          </button>

          <button
            onClick={() => setViewportMode('comparison')}
            title="Compare Before vs After"
            className={cn(
              'flex items-center space-x-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all',
              viewportMode === 'comparison'
                ? 'bg-[#00F59B] text-slate-950 shadow-[0_0_12px_rgba(0,245,155,0.4)]'
                : 'text-[#00F59B] hover:bg-[#00F59B]/10'
            )}
          >
            <SplitSquareVertical className="h-3.5 w-3.5" />
            <span className="inline">Before vs After</span>
            <span className="rounded-full bg-slate-900/40 px-1 py-0.2 text-[9px] font-mono">PRO</span>
          </button>
        </div>

        {/* Right: Network Status, Design Decisions Drawer Trigger, Wallet */}
        <div className="flex items-center space-x-3">
          
          {/* Design Decisions & Bounty Doc Trigger */}
          <button
            onClick={onOpenDesignDecisions}
            className="hidden lg:flex items-center space-x-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Design Rationale</span>
          </button>

          {/* Live Solana Status */}
          <div className="hidden xl:flex items-center space-x-2 rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 text-[11px] text-slate-400 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>2,481 TPS</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 flex items-center">
              <Zap className="h-3 w-3 mr-0.5 inline" />
              0.000005 SOL
            </span>
          </div>

          {/* Wallet State */}
          {walletConnected ? (
            <div className="relative">
              <button
                onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
                className="flex items-center space-x-2 rounded-xl border border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.08] hover:border-white/[0.2] px-3 py-1.5 text-xs font-medium text-slate-200 transition-all shadow-sm"
              >
                <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-[#9945FF] to-[#14F195] p-0.5 flex items-center justify-center">
                  <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center text-[9px] font-bold text-white">
                    7x
                  </div>
                </div>
                <div className="text-left font-mono">
                  <span className="text-white font-semibold">24.85 SOL</span>
                  <span className="text-slate-400 text-[10px] ml-1.5 hidden sm:inline">7xK9...3aQ1</span>
                </div>
                <ChevronDown className={cn("h-3.5 w-3.5 text-slate-400 transition-transform", walletDropdownOpen && "rotate-180")} />
              </button>

              {walletDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-700/80 bg-[#0e1622] p-2 shadow-2xl backdrop-blur-xl z-50 animate-slide-up">
                  <div className="px-3 py-2 border-b border-white/[0.06]">
                    <div className="text-[11px] text-slate-400 font-mono">CONNECTED WALLET</div>
                    <div className="text-sm font-bold text-white mt-0.5">Phantom (Mainnet-Beta)</div>
                    <div className="text-xs font-mono text-emerald-400 mt-1 flex items-center">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      $4,591.03 USD Total
                    </div>
                  </div>
                  
                  <div className="p-1 space-y-1">
                    <button
                      onClick={copyAddress}
                      className="w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                    >
                      <span className="flex items-center space-x-2">
                        <Copy className="h-3.5 w-3.5 text-slate-400" />
                        <span>Copy Address</span>
                      </span>
                      {copied && <span className="text-[10px] text-emerald-400 font-mono">Copied!</span>}
                    </button>

                    <button
                      onClick={() => {
                        setWalletConnected(false);
                        setWalletDropdownOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 rounded-lg px-2.5 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Disconnect</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setWalletConnected(true)}
              className="flex items-center space-x-2 rounded-xl bg-[#00F59B] hover:bg-[#00d787] text-slate-950 font-bold px-3.5 py-1.5 text-xs transition-all shadow-[0_0_15px_rgba(0,245,155,0.3)]"
            >
              <Wallet className="h-3.5 w-3.5" />
              <span>Connect Wallet</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
