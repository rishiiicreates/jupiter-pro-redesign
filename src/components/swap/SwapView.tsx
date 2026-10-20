import React, { useState, useEffect } from 'react';
import { 
  ArrowUpDown, 
  Settings2, 
  RefreshCw, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Wallet, 
  Check, 
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Token, SwapRoute } from '../../types';
import { MOCK_TOKENS } from '../../data/mockData';
import { TokenSelectorModal } from './TokenSelectorModal';
import { SwapSettingsModal } from './SwapSettingsModal';
import { RoutingVisualizer } from './RoutingVisualizer';
import { SwapSuccessModal } from './SwapSuccessModal';
import { formatCurrency } from '../../utils/cn';

export const SwapView: React.FC = () => {
  const [fromToken, setFromToken] = useState<Token>(MOCK_TOKENS[0]); // SOL
  const [toToken, setToToken] = useState<Token>(MOCK_TOKENS[1]); // USDC
  const [fromAmount, setFromAmount] = useState<string>('5.0');
  
  // Modals state
  const [selectorTarget, setSelectorTarget] = useState<'from' | 'to' | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  
  // Settings
  const [slippage, setSlippage] = useState<number>(0.3);
  const [isAutoSlippage, setIsAutoSlippage] = useState<boolean>(true);
  const [mevShieldEnabled, setMevShieldEnabled] = useState<boolean>(true);
  const [priorityFeeLevel, setPriorityFeeLevel] = useState<'fast' | 'turbo' | 'ultra'>('turbo');
  
  // Execution status
  const [executionState, setExecutionState] = useState<'idle' | 'routing' | 'bundling' | 'success'>('idle');
  const [lastTxHash, setLastTxHash] = useState<string>('');
  
  // Refresh timer simulation
  const [refreshCountdown, setRefreshCountdown] = useState<number>(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshCountdown((prev) => (prev <= 1 ? 5 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const parsedFromAmount = parseFloat(fromAmount) || 0;
  const rate = (fromToken.price / toToken.price);
  const toAmount = parsedFromAmount * rate;

  // Realistic dynamic route calculation
  const mockRoute: SwapRoute = {
    inAmount: parsedFromAmount,
    outAmount: toAmount,
    rate: rate,
    priceImpact: parsedFromAmount > 100 ? 0.08 : 0.005,
    slippageTolerance: slippage,
    guaranteedMinimum: toAmount * (1 - (slippage / 100)),
    networkFeeUSD: 0.00005,
    jupiterFeeUSD: 0,
    savingsVsAmmUSD: (parsedFromAmount * 2.84),
    executionTimeMs: 418,
    mevProtected: mevShieldEnabled,
    jitoTipSOL: 0.0001,
    routeHops: [
      {
        dexName: 'Orca Whirlpools',
        label: `${fromToken.symbol} / ${toToken.symbol} CLMM`,
        splitPercentage: 42,
        inputSymbol: fromToken.symbol,
        outputSymbol: toToken.symbol,
        liquidityPool: 'Whirlpool v2',
        feeTier: '0.04%',
      },
      {
        dexName: 'Raydium CLMM',
        label: `${fromToken.symbol} / ${toToken.symbol} Concentrated`,
        splitPercentage: 58,
        inputSymbol: fromToken.symbol,
        outputSymbol: toToken.symbol,
        liquidityPool: 'Raydium v3',
        feeTier: '0.05%',
      },
    ],
  };

  const handleInvertTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const handleSetPercentage = (percent: number) => {
    const calculated = (fromToken.balance * (percent / 100)).toFixed(4);
    setFromAmount(calculated);
  };

  const handleExecuteSwap = async () => {
    if (parsedFromAmount <= 0) return;

    setExecutionState('routing');
    await new Promise((res) => setTimeout(res, 600));

    setExecutionState('bundling');
    await new Promise((res) => setTimeout(res, 700));

    // Complete
    const mockHash = '5Gv' + Array.from({ length: 44 }, () => Math.floor(Math.random() * 36).toString(36)).join('') + 'wX9z';
    setLastTxHash(mockHash);
    setExecutionState('success');

    // Confetti
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00F59B', '#14F195', '#9945FF', '#38bdf8'],
    });

    setTimeout(() => {
      setSuccessModalOpen(true);
      setExecutionState('idle');
    }, 400);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* Swap Card Outer Shell */}
      <div className="relative rounded-3xl border border-white/[0.1] bg-[#0c1320]/95 p-5 sm:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-extrabold text-white tracking-tight">Instant Swap</h2>
            <span className="flex items-center space-x-1 rounded-full bg-[#00F59B]/15 border border-[#00F59B]/30 px-2 py-0.5 text-[11px] font-mono text-[#00F59B]">
              <Sparkles className="h-3 w-3" />
              <span>Best Route Guaranteed</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Countdown Auto-refresh indicator */}
            <button 
              onClick={() => setRefreshCountdown(5)}
              title="Price quote auto-refreshes every 5s"
              className="flex items-center space-x-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] px-2.5 py-1 text-[11px] font-mono text-slate-400 hover:text-white transition-all"
            >
              <RefreshCw className={`h-3 w-3 text-emerald-400 ${refreshCountdown === 1 ? 'animate-spin' : ''}`} />
              <span>{refreshCountdown}s</span>
            </button>

            {/* Slippage & Safety Settings Gear */}
            <button
              onClick={() => setSettingsOpen(true)}
              className="flex items-center space-x-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] p-1.5 text-slate-300 hover:text-white transition-all"
              title="Execution & MEV Settings"
            >
              <Settings2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Input Token Container */}
        <div className="mt-4 rounded-2xl border border-white/[0.08] bg-[#080d16] p-4 transition-all focus-within:border-[#00F59B]/60">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-semibold text-slate-300">You Pay</span>
            <div className="flex items-center space-x-1 font-mono text-[11px]">
              <Wallet className="h-3 w-3 text-slate-500" />
              <span>Balance: {fromToken.balance.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.0"
              className="w-full bg-transparent text-2xl sm:text-3xl font-bold font-mono text-white placeholder-slate-600 focus:outline-none"
            />

            {/* Token Selector Trigger */}
            <button
              onClick={() => setSelectorTarget('from')}
              className="flex items-center space-x-2 rounded-2xl border border-white/[0.12] bg-white/[0.06] hover:bg-white/[0.12] px-3.5 py-2 text-sm font-bold text-white transition-all shadow-sm shrink-0"
            >
              <img src={fromToken.icon} alt={fromToken.symbol} className="h-5 w-5 rounded-full object-cover" />
              <span>{fromToken.symbol}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </div>

          {/* Amount Sub-info and Quick Percentage Chips */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.04] text-xs">
            <span className="text-[11px] font-mono text-slate-500">
              ≈ {formatCurrency(parsedFromAmount * fromToken.price)}
            </span>

            <div className="flex items-center space-x-1.5 font-mono text-[10px]">
              {[25, 50, 75, 100].map((percent) => (
                <button
                  key={percent}
                  onClick={() => handleSetPercentage(percent)}
                  className="rounded-lg bg-white/[0.05] hover:bg-white/[0.12] hover:text-[#00F59B] px-2 py-0.5 text-slate-300 transition-colors"
                >
                  {percent === 100 ? 'MAX' : `${percent}%`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Invert Arrow Button */}
        <div className="relative my-[-10px] flex justify-center z-10">
          <button
            onClick={handleInvertTokens}
            className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-700/80 bg-[#0c1422] text-[#00F59B] hover:scale-110 hover:border-[#00F59B] shadow-lg transition-all"
            title="Invert tokens"
          >
            <ArrowUpDown className="h-4 w-4" />
          </button>
        </div>

        {/* Output Token Container */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] p-4 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-semibold text-slate-300">You Receive (Estimated)</span>
            <div className="flex items-center space-x-1 font-mono text-[11px]">
              <Wallet className="h-3 w-3 text-slate-500" />
              <span>Balance: {toToken.balance.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
              {toAmount > 0 ? toAmount.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '0.00'}
            </div>

            {/* Token Selector Trigger */}
            <button
              onClick={() => setSelectorTarget('to')}
              className="flex items-center space-x-2 rounded-2xl border border-white/[0.12] bg-white/[0.06] hover:bg-white/[0.12] px-3.5 py-2 text-sm font-bold text-white transition-all shadow-sm shrink-0"
            >
              <img src={toToken.icon} alt={toToken.symbol} className="h-5 w-5 rounded-full object-cover" />
              <span>{toToken.symbol}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </div>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.04] text-xs font-mono">
            <span className="text-[11px] text-slate-500">
              ≈ {formatCurrency(toAmount * toToken.price)}
            </span>
            <span className="text-[11px] text-emerald-400">
              1 {fromToken.symbol} ≈ {rate.toFixed(4)} {toToken.symbol}
            </span>
          </div>
        </div>

        {/* MEV & Security Shield Banner */}
        <div className="mt-4 flex items-center justify-between rounded-xl bg-emerald-950/20 border border-emerald-500/25 px-3 py-2 text-xs">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-[#00F59B]" />
            <span className="text-slate-300 font-medium">
              Jito MEV Shield Active
            </span>
            <span className="text-[10px] text-emerald-400 font-mono hidden sm:inline">
              (0% Sandwich Bot Risk)
            </span>
          </div>
          <button
            onClick={() => setSettingsOpen(true)}
            className="text-[11px] text-slate-400 hover:text-white font-mono underline"
          >
            {isAutoSlippage ? 'Dynamic Slippage' : `${slippage}% Slippage`}
          </button>
        </div>

        {/* Intelligent Routing Graph */}
        <div className="mt-4">
          <RoutingVisualizer
            route={mockRoute}
            fromToken={fromToken}
            toToken={toToken}
          />
        </div>

        {/* Primary Action Button */}
        <div className="mt-5">
          <button
            disabled={parsedFromAmount <= 0 || executionState !== 'idle'}
            onClick={handleExecuteSwap}
            className={`w-full rounded-2xl py-3.5 px-4 font-bold text-base transition-all duration-200 shadow-xl flex items-center justify-center space-x-2 ${
              parsedFromAmount <= 0
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : executionState === 'routing'
                ? 'bg-amber-500 text-slate-950 animate-pulse'
                : executionState === 'bundling'
                ? 'bg-teal-400 text-slate-950 animate-pulse'
                : 'bg-gradient-to-r from-[#00F59B] via-[#14F195] to-[#28DB97] text-slate-950 hover:opacity-95 hover:shadow-[0_0_25px_rgba(0,245,155,0.4)] active:scale-[0.99]'
            }`}
          >
            {executionState === 'routing' && (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Optimizing Split Routes ({mockRoute.executionTimeMs}ms)...</span>
              </>
            )}

            {executionState === 'bundling' && (
              <>
                <ShieldCheck className="h-4 w-4 animate-bounce" />
                <span>Submitting Jito MEV Bundle...</span>
              </>
            )}

            {executionState === 'idle' && (
              <>
                <span>
                  {parsedFromAmount <= 0 ? 'Enter An Amount' : `Swap ${fromToken.symbol} for ${toToken.symbol}`}
                </span>
                {parsedFromAmount > 0 && (
                  <span className="ml-2 rounded-md bg-slate-950/20 px-2 py-0.5 text-xs font-mono font-extrabold text-slate-900">
                    Save {formatCurrency(mockRoute.savingsVsAmmUSD)}
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Token Selector Modal */}
      <TokenSelectorModal
        isOpen={selectorTarget !== null}
        onClose={() => setSelectorTarget(null)}
        onSelectToken={(t) => {
          if (selectorTarget === 'from') setFromToken(t);
          if (selectorTarget === 'to') setToToken(t);
        }}
        selectedToken={selectorTarget === 'from' ? fromToken : toToken}
        title={selectorTarget === 'from' ? 'Pay With Token' : 'Receive Token'}
      />

      {/* Swap Settings Modal */}
      <SwapSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        slippage={slippage}
        setSlippage={setSlippage}
        isAutoSlippage={isAutoSlippage}
        setIsAutoSlippage={setIsAutoSlippage}
        mevShieldEnabled={mevShieldEnabled}
        setMevShieldEnabled={setMevShieldEnabled}
        priorityFeeLevel={priorityFeeLevel}
        setPriorityFeeLevel={setPriorityFeeLevel}
      />

      {/* Success Modal */}
      <SwapSuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        fromToken={fromToken}
        toToken={toToken}
        fromAmount={parsedFromAmount}
        toAmount={toAmount}
        route={mockRoute}
        txHash={lastTxHash}
      />
    </div>
  );
};
