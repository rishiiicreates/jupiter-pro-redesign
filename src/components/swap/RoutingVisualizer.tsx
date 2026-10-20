import React, { useState } from 'react';
import { 
  GitBranch, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ChevronDown, 
  DollarSign, 
  ArrowRight 
} from 'lucide-react';
import { SwapRoute, Token } from '../../types';
import { formatCurrency } from '../../utils/cn';

interface RoutingVisualizerProps {
  route: SwapRoute;
  fromToken: Token;
  toToken: Token;
}

export const RoutingVisualizer: React.FC<RoutingVisualizerProps> = ({
  route,
  fromToken,
  toToken,
}) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0c1420]/90 p-3.5 backdrop-blur-md transition-all">
      {/* Top Summary Bar */}
      <div 
        className="flex items-center justify-between cursor-pointer group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center space-x-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00F59B]/15 border border-[#00F59B]/30 text-[#00F59B]">
            <GitBranch className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-white tracking-tight">Jupiter Intelligent Routing</span>
              <span className="rounded-md bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300 font-mono flex items-center">
                <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                SAVED {formatCurrency(route.savingsVsAmmUSD)}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              Split across 2 DEX pools for optimal price execution
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline flex items-center">
            <Clock className="h-3 w-3 mr-1 text-slate-500 inline" />
            ~{route.executionTimeMs}ms
          </span>
          <div className={`p-1 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`}>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Expanded Interactive Visualizer */}
      {expanded && (
        <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-3.5">
          {/* Visual Route Flow Diagram */}
          <div className="rounded-xl bg-[#070c14] border border-white/[0.05] p-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
              <span>INPUT ({fromToken.symbol})</span>
              <span>DYNAMIC LIQUIDITY SPLIT</span>
              <span>OUTPUT ({toToken.symbol})</span>
            </div>

            <div className="flex items-center justify-between gap-2">
              {/* Left: Input Token */}
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900 border border-slate-800 min-w-[70px]">
                <img src={fromToken.icon} alt={fromToken.symbol} className="h-6 w-6 rounded-full mb-1" />
                <span className="text-xs font-bold text-white">{fromToken.symbol}</span>
                <span className="text-[10px] text-slate-400 font-mono">100%</span>
              </div>

              {/* Middle: Split DEX Hops */}
              <div className="flex-1 flex flex-col gap-2 relative">
                {/* Connector lines visual */}
                <div className="relative space-y-2">
                  {route.routeHops.map((hop, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#00F59B]/40 px-3 py-1.5 transition-all"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-[#00F59B]" />
                        <span className="text-xs font-semibold text-slate-200">{hop.dexName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({hop.feeTier})</span>
                      </div>
                      <div className="flex items-center space-x-2 font-mono">
                        <span className="text-xs font-bold text-[#00F59B]">{hop.splitPercentage}%</span>
                        <ArrowRight className="h-3 w-3 text-slate-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Output Token */}
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/30 min-w-[70px]">
                <img src={toToken.icon} alt={toToken.symbol} className="h-6 w-6 rounded-full mb-1" />
                <span className="text-xs font-bold text-emerald-300">{toToken.symbol}</span>
                <span className="text-[10px] text-emerald-400 font-mono">Optimal</span>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-2.5">
              <div className="text-[10px] text-slate-400 font-mono">PRICE IMPACT</div>
              <div className="font-bold text-emerald-400 mt-0.5">
                {route.priceImpact < 0.01 ? '< 0.01%' : `${route.priceImpact}%`}
              </div>
              <div className="text-[9px] text-slate-400">Negligible slippage</div>
            </div>

            <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-2.5">
              <div className="text-[10px] text-slate-400 font-mono">MIN. RECEIVED</div>
              <div className="font-bold text-white mt-0.5 font-mono">
                {route.guaranteedMinimum.toFixed(4)} {toToken.symbol}
              </div>
              <div className="text-[9px] text-slate-400">Guaranteed fill</div>
            </div>

            <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-2.5">
              <div className="text-[10px] text-slate-400 font-mono">JUPITER FEE</div>
              <div className="font-bold text-emerald-400 mt-0.5">
                $0.00 (0%)
              </div>
              <div className="text-[9px] text-slate-400">100% Free routing</div>
            </div>

            <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-2.5">
              <div className="text-[10px] text-slate-400 font-mono">MEV PROTECTION</div>
              <div className="font-bold text-[#00F59B] mt-0.5 flex items-center">
                <ShieldCheck className="h-3 w-3 mr-1 inline" />
                Jito Bundle
              </div>
              <div className="text-[9px] text-slate-400">Anti-sandwich shielded</div>
            </div>
          </div>

          {/* Value Comparison Banner */}
          <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-emerald-950/40 via-teal-950/20 to-slate-900 border border-emerald-500/30 p-2.5 text-xs">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-emerald-500/20 p-1 text-emerald-400">
                <DollarSign className="h-3.5 w-3.5" />
              </div>
              <div>
                <span className="font-semibold text-emerald-300">Routing Advantage: </span>
                <span className="text-slate-300">Jupiter split routes beat Raydium AMM alone by </span>
                <span className="font-bold text-emerald-400">+{formatCurrency(route.savingsVsAmmUSD)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
