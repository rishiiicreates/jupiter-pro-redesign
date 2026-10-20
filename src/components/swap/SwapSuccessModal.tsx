import React from 'react';
import { CheckCircle2, ExternalLink, Sparkles, ArrowRight, X, ShieldCheck, Share2 } from 'lucide-react';
import { Token, SwapRoute } from '../../types';
import { formatCurrency } from '../../utils/cn';

interface SwapSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  fromToken: Token;
  toToken: Token;
  fromAmount: number;
  toAmount: number;
  route: SwapRoute;
  txHash: string;
}

export const SwapSuccessModal: React.FC<SwapSuccessModalProps> = ({
  isOpen,
  onClose,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  route,
  txHash,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-md rounded-3xl border border-emerald-500/40 bg-[#0d1622] p-6 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-slate-400 hover:bg-white/[0.08] hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Success Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#00F59B] to-[#14F195] text-slate-950 shadow-[0_0_25px_rgba(0,245,155,0.5)]">
            <CheckCircle2 className="h-9 w-9 stroke-[2.5]" />
          </div>

          <h3 className="mt-4 text-xl font-extrabold text-white tracking-tight">Swap Confirmed!</h3>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Finalized on Solana Mainnet in {route.executionTimeMs}ms
          </p>

          {/* Savings Callout */}
          <div className="mt-3 inline-flex items-center space-x-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-bold text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>You saved {formatCurrency(route.savingsVsAmmUSD)} vs single DEX routes</span>
          </div>
        </div>

        {/* Transaction Flow Details */}
        <div className="mt-5 rounded-2xl bg-[#070d16] border border-white/[0.06] p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-xs text-slate-400 font-mono">Swapped</span>
            <div className="flex items-center space-x-2 font-mono font-bold text-white">
              <img src={fromToken.icon} alt={fromToken.symbol} className="h-4 w-4 rounded-full" />
              <span>{fromAmount} {fromToken.symbol}</span>
            </div>
          </div>

          <div className="flex items-center justify-center my-1 text-slate-500">
            <ArrowRight className="h-4 w-4 text-[#00F59B] rotate-90 sm:rotate-0" />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-xs text-slate-400 font-mono">Received</span>
            <div className="flex items-center space-x-2 font-mono font-bold text-emerald-400 text-base">
              <img src={toToken.icon} alt={toToken.symbol} className="h-4 w-4 rounded-full" />
              <span>{toAmount.toLocaleString(undefined, { maximumFractionDigits: 4 })} {toToken.symbol}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/[0.06] space-y-1.5 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Effective Rate</span>
              <span className="text-slate-200">1 {fromToken.symbol} ≈ {(toAmount / fromAmount).toFixed(4)} {toToken.symbol}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Network & Priority Fee</span>
              <span className="text-slate-200">{route.networkFeeUSD.toFixed(5)} SOL ($0.001)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>MEV Protection</span>
              <span className="text-emerald-400 flex items-center">
                <ShieldCheck className="h-3.5 w-3.5 mr-1 inline" /> Jito Shielded
              </span>
            </div>
          </div>
        </div>

        {/* Transaction Link */}
        <div className="mt-4 flex items-center justify-between text-xs px-1">
          <span className="text-slate-400 font-mono">Transaction ID:</span>
          <a
            href={`https://solscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 font-mono text-[#00F59B] hover:underline"
          >
            <span>{txHash.slice(0, 8)}...{txHash.slice(-8)}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Actions */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Jupiter Swap',
                  text: `Just swapped ${fromAmount} ${fromToken.symbol} for ${toAmount.toFixed(2)} ${toToken.symbol} on Jupiter v2!`,
                  url: 'https://jup.ag',
                });
              }
            }}
            className="flex items-center justify-center space-x-2 rounded-2xl border border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.1] text-white py-2.5 text-xs font-semibold transition-all"
          >
            <Share2 className="h-3.5 w-3.5 text-slate-300" />
            <span>Share Trade</span>
          </button>

          <button
            onClick={onClose}
            className="rounded-2xl bg-[#00F59B] hover:bg-[#00d787] text-slate-950 font-bold py-2.5 text-xs transition-all shadow-[0_0_15px_rgba(0,245,155,0.3)]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
