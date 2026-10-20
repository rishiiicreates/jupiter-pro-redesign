import React from 'react';
import { X, ShieldCheck, Zap, AlertCircle, Sliders, Check } from 'lucide-react';

interface SwapSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  slippage: number;
  setSlippage: (slippage: number) => void;
  isAutoSlippage: boolean;
  setIsAutoSlippage: (auto: boolean) => void;
  mevShieldEnabled: boolean;
  setMevShieldEnabled: (enabled: boolean) => void;
  priorityFeeLevel: 'fast' | 'turbo' | 'ultra';
  setPriorityFeeLevel: (level: 'fast' | 'turbo' | 'ultra') => void;
}

export const SwapSettingsModal: React.FC<SwapSettingsModalProps> = ({
  isOpen,
  onClose,
  slippage,
  setSlippage,
  isAutoSlippage,
  setIsAutoSlippage,
  mevShieldEnabled,
  setMevShieldEnabled,
  priorityFeeLevel,
  setPriorityFeeLevel,
}) => {
  if (!isOpen) return null;

  const slippagePresets = [0.1, 0.3, 0.5, 1.0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-md rounded-3xl border border-slate-700/80 bg-[#0d1522] p-5 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center space-x-2">
            <Sliders className="h-4 w-4 text-[#00F59B]" />
            <h3 className="text-base font-bold text-white tracking-tight">Swap & Execution Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-white/[0.08] hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {/* Slippage Settings */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-200">Slippage Tolerance</span>
              <button
                onClick={() => setIsAutoSlippage(!isAutoSlippage)}
                className={`text-[11px] font-mono px-2 py-0.5 rounded-full border transition-all ${
                  isAutoSlippage
                    ? 'border-[#00F59B]/50 bg-[#00F59B]/15 text-[#00F59B] font-bold'
                    : 'border-white/[0.1] text-slate-400 hover:text-white'
                }`}
              >
                {isAutoSlippage ? 'Auto-Optimized (Dynamic)' : 'Manual Mode'}
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {slippagePresets.map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    setIsAutoSlippage(false);
                    setSlippage(val);
                  }}
                  className={`rounded-xl py-2 text-xs font-semibold font-mono border transition-all ${
                    !isAutoSlippage && slippage === val
                      ? 'border-[#00F59B] bg-[#00F59B]/20 text-[#00F59B] shadow-sm'
                      : 'border-white/[0.08] bg-white/[0.03] text-slate-300 hover:border-white/[0.2]'
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>

            {isAutoSlippage && (
              <p className="text-[11px] text-slate-400 mt-2 font-mono flex items-center">
                <Check className="h-3 w-3 mr-1 text-[#00F59B] inline" />
                Dynamic slippage adjusts automatically to token liquidity and market depth.
              </p>
            )}
          </div>

          {/* MEV & Frontrunning Safety Shield */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="rounded-lg bg-emerald-500/20 p-1.5 text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center">
                    Jito MEV Safety Shield
                    <span className="ml-2 rounded bg-emerald-500/30 px-1 py-0.2 text-[9px] font-mono text-emerald-300">
                      SECURE
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Routes transactions via private Jito block-engine bundles
                  </div>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={mevShieldEnabled}
                  onChange={(e) => setMevShieldEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00F59B]"></div>
              </label>
            </div>
            
            <p className="text-[10px] text-slate-300 mt-2 leading-relaxed">
              Guarantees 0% sandwich attack risk and protects your order from predatory bot frontrunning during high-volume swaps.
            </p>
          </div>

          {/* Solana Priority Fees */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-200 flex items-center">
                <Zap className="h-3.5 w-3.5 text-amber-400 mr-1" />
                Solana Priority Speed
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Guarantees block inclusion</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'fast', label: 'Fast', fee: '0.0001 SOL', time: '< 1.2s' },
                { id: 'turbo', label: 'Turbo (Rec.)', fee: '0.0005 SOL', time: '< 600ms' },
                { id: 'ultra', label: 'Ultra', fee: '0.0015 SOL', time: '< 350ms' },
              ].map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setPriorityFeeLevel(tier.id as any)}
                  className={`rounded-xl p-2 text-left border transition-all ${
                    priorityFeeLevel === tier.id
                      ? 'border-[#00F59B] bg-[#00F59B]/15 text-white'
                      : 'border-white/[0.08] bg-white/[0.03] text-slate-400 hover:border-white/[0.2]'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{tier.label}</div>
                  <div className="text-[10px] font-mono text-emerald-400 mt-0.5">{tier.fee}</div>
                  <div className="text-[9px] text-slate-500 font-mono">{tier.time}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer save */}
        <div className="mt-5 pt-3 border-t border-white/[0.08]">
          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-[#00F59B] hover:bg-[#00d787] text-slate-950 font-bold py-2.5 text-sm transition-all shadow-[0_0_15px_rgba(0,245,155,0.3)]"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};
