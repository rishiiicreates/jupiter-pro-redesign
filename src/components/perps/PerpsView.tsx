import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  Sliders, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PerpMarket, PerpPosition } from '../../types';
import { MOCK_PERP_MARKETS, INITIAL_POSITIONS } from '../../data/mockData';
import { formatCurrency } from '../../utils/cn';

export const PerpsView: React.FC = () => {
  const [selectedMarket, setSelectedMarket] = useState<PerpMarket>(MOCK_PERP_MARKETS[0]);
  const [side, setSide] = useState<'long' | 'short'>('long');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [collateralAmount, setCollateralAmount] = useState<string>('500');
  const [leverage, setLeverage] = useState<number>(15);
  
  // Positions state
  const [positions, setPositions] = useState<PerpPosition[]>(INITIAL_POSITIONS);
  const [orderSuccessNotice, setOrderSuccessNotice] = useState<string | null>(null);

  // Target price simulator
  const [simulatedExitPrice, setSimulatedExitPrice] = useState<number>(selectedMarket.price * 1.1);

  const parsedCollateral = parseFloat(collateralAmount) || 0;
  const positionSizeUSD = parsedCollateral * leverage;
  const tokenSize = positionSizeUSD / selectedMarket.price;

  // Liquidation calculation
  // For Long: Liq = Entry * (1 - (1/leverage) + maintenanceMargin(0.01))
  // For Short: Liq = Entry * (1 + (1/leverage) - maintenanceMargin(0.01))
  const maintenanceMargin = 0.012; // 1.2%
  const liqDistancePercent = Math.max(0.5, ((1 / leverage) - maintenanceMargin) * 100);
  
  const estimatedLiqPrice = side === 'long'
    ? selectedMarket.price * (1 - (liqDistancePercent / 100))
    : selectedMarket.price * (1 + (liqDistancePercent / 100));

  // Risk Zone categorization
  const getRiskLevel = (lev: number) => {
    if (lev <= 10) return { label: 'Conservative Safe', color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30' };
    if (lev <= 25) return { label: 'Moderate Risk', color: 'text-teal-300', bg: 'bg-teal-500/15', border: 'border-teal-500/30' };
    if (lev <= 50) return { label: 'High Volatility Risk', color: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30' };
    return { label: 'CRITICAL DANGER ZONE', color: 'text-rose-400', bg: 'bg-rose-500/20', border: 'border-rose-500/50' };
  };

  const risk = getRiskLevel(leverage);

  // Simulated PnL
  const priceDiff = side === 'long'
    ? (simulatedExitPrice - selectedMarket.price)
    : (selectedMarket.price - simulatedExitPrice);
  const simulatedPnlUSD = (priceDiff / selectedMarket.price) * positionSizeUSD;
  const simulatedRoiPercent = parsedCollateral > 0 ? (simulatedPnlUSD / parsedCollateral) * 100 : 0;

  const handlePlaceOrder = () => {
    if (parsedCollateral <= 0) return;

    const newPosition: PerpPosition = {
      id: `pos-${Date.now()}`,
      market: selectedMarket.symbol,
      side: side,
      entryPrice: selectedMarket.price,
      markPrice: selectedMarket.price,
      sizeUSD: positionSizeUSD,
      leverage: leverage,
      collateralUSD: parsedCollateral,
      liquidationPrice: estimatedLiqPrice,
      unrealizedPnlUSD: 0,
      unrealizedPnlPercent: 0,
      borrowFeeUSD: 0.12,
      timestamp: 'Just now',
    };

    setPositions([newPosition, ...positions]);
    setOrderSuccessNotice(`Opened ${leverage}x ${side.toUpperCase()} on ${selectedMarket.symbol} for ${formatCurrency(positionSizeUSD)}`);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: side === 'long' ? ['#00F59B', '#14F195'] : ['#f43f5e', '#fb7185'],
    });

    setTimeout(() => {
      setOrderSuccessNotice(null);
    }, 4000);
  };

  const handleClosePosition = (id: string) => {
    setPositions(positions.filter(p => p.id !== id));
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* Market Ticker Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/[0.08] bg-[#0c1422]/90 p-4 backdrop-blur-xl">
        <div className="flex items-center space-x-4">
          {/* Market Selectors */}
          <div className="flex items-center space-x-1.5 rounded-2xl bg-white/[0.04] p-1 border border-white/[0.06]">
            {MOCK_PERP_MARKETS.map((market) => (
              <button
                key={market.symbol}
                onClick={() => {
                  setSelectedMarket(market);
                  setSimulatedExitPrice(market.price * (side === 'long' ? 1.1 : 0.9));
                }}
                className={`flex items-center space-x-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  selectedMarket.symbol === market.symbol
                    ? 'bg-slate-800 text-white shadow-sm border border-white/[0.1]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{market.symbol}</span>
                <span className={`text-[10px] font-mono ${market.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {market.change24h >= 0 ? '+' : ''}{market.change24h}%
                </span>
              </button>
            ))}
          </div>

          {/* Current Live Price Display */}
          <div className="hidden sm:block border-l border-white/[0.08] pl-4">
            <div className="text-xl font-extrabold text-white font-mono flex items-center space-x-2">
              <span>{formatCurrency(selectedMarket.price)}</span>
              <span className={`text-xs px-2 py-0.5 rounded-md font-mono ${
                selectedMarket.change24h >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}>
                {selectedMarket.change24h >= 0 ? '+' : ''}{selectedMarket.change24h}%
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">Pyth Oracle Live Mark Price</div>
          </div>
        </div>

        {/* 24h Stats */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div>
            <div className="text-[10px] text-slate-500">24H HIGH / LOW</div>
            <div className="text-slate-200 mt-0.5">
              ${selectedMarket.high24h} / ${selectedMarket.low24h}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="text-[10px] text-slate-500">24H VOLUME</div>
            <div className="text-slate-200 mt-0.5">${(selectedMarket.volume24hUSD / 1e6).toFixed(1)}M</div>
          </div>

          <div className="hidden lg:block">
            <div className="text-[10px] text-slate-500">OPEN INTEREST</div>
            <div className="text-emerald-400 mt-0.5">${(selectedMarket.openInterestUSD / 1e6).toFixed(1)}M</div>
          </div>

          <div>
            <div className="text-[10px] text-slate-500">1H FUNDING</div>
            <div className="text-teal-400 mt-0.5">{(selectedMarket.fundingRateLong * 100).toFixed(4)}%</div>
          </div>
        </div>
      </div>

      {/* Main Perps Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Mini Chart & PnL Simulator (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Chart Card */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0c1422]/90 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white text-sm">{selectedMarket.symbol} Price Action</span>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                  REAL-TIME CANDLES
                </span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-slate-400 font-mono">
                {['15m', '1h', '4h', '1D'].map((tf, i) => (
                  <button key={tf} className={`px-2 py-0.5 rounded ${i === 1 ? 'bg-slate-700 text-white' : 'hover:text-white'}`}>
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Synthetic Canvas / SVG Chart Graphic */}
            <div className="mt-4 h-64 w-full relative flex flex-col justify-between">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00F59B" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#00F59B" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                <line x1="0" y1="50" x2="500" y2="50" stroke="#ffffff" strokeOpacity="0.04" strokeDasharray="3 3" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#ffffff" strokeOpacity="0.04" strokeDasharray="3 3" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="#ffffff" strokeOpacity="0.04" strokeDasharray="3 3" />

                {/* Area Fill */}
                <path
                  d="M 0 160 Q 60 130 120 145 T 240 100 T 360 80 T 450 40 L 500 50 L 500 200 L 0 200 Z"
                  fill="url(#chartGradient)"
                />
                {/* Trend line */}
                <path
                  d="M 0 160 Q 60 130 120 145 T 240 100 T 360 80 T 450 40 L 500 50"
                  fill="none"
                  stroke="#00F59B"
                  strokeWidth="2.5"
                />

                {/* Current Price Marker */}
                <circle cx="500" cy="50" r="5" fill="#00F59B" className="animate-ping" opacity="0.6" />
                <circle cx="500" cy="50" r="4" fill="#00F59B" />
              </svg>

              {/* Liquidation Line Overlay on chart */}
              <div 
                className="absolute w-full border-t-2 border-dashed border-rose-500/80 flex items-center justify-between px-2 text-[10px] font-mono text-rose-400"
                style={{ bottom: `${Math.min(90, Math.max(10, (1 - (estimatedLiqPrice / (selectedMarket.price * 1.2))) * 100))}%` }}
              >
                <span className="bg-rose-950/90 px-1.5 py-0.5 rounded border border-rose-500/40">
                  Est. Liq Price: ${estimatedLiqPrice.toFixed(2)} ({side.toUpperCase()})
                </span>
                <span className="bg-rose-950/90 px-1.5 py-0.5 rounded border border-rose-500/40">
                  {liqDistancePercent.toFixed(1)}% buffer
                </span>
              </div>
            </div>
          </div>

          {/* Transparent PnL Simulator */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0c1422]/90 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">Interactive PnL Simulator</h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Drag to forecast outcome
              </span>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Target Exit Price:</span>
                  <span className="text-white font-bold text-sm">
                    {formatCurrency(simulatedExitPrice)} ({((simulatedExitPrice - selectedMarket.price) / selectedMarket.price * 100).toFixed(2)}%)
                  </span>
                </div>
                <input
                  type="range"
                  min={selectedMarket.price * 0.7}
                  max={selectedMarket.price * 1.4}
                  step={selectedMarket.price * 0.005}
                  value={simulatedExitPrice}
                  onChange={(e) => setSimulatedExitPrice(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>-30% ({formatCurrency(selectedMarket.price * 0.7)})</span>
                  <span>Entry ({formatCurrency(selectedMarket.price)})</span>
                  <span>+40% ({formatCurrency(selectedMarket.price * 1.4)})</span>
                </div>
              </div>

              {/* Simulation Result Box */}
              <div className={`rounded-2xl p-4 border transition-all ${
                simulatedPnlUSD >= 0 
                  ? 'bg-emerald-950/25 border-emerald-500/30' 
                  : 'bg-rose-950/25 border-rose-500/30'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">PROJECTED RETURN</div>
                    <div className={`text-2xl font-black font-mono mt-0.5 ${simulatedPnlUSD >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {simulatedPnlUSD >= 0 ? '+' : ''}{formatCurrency(simulatedPnlUSD)}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[11px] font-mono text-slate-400">RETURN ON EQUITY (ROE)</div>
                    <div className={`text-xl font-black font-mono mt-0.5 ${simulatedRoiPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {simulatedRoiPercent >= 0 ? '+' : ''}{simulatedRoiPercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Order Entry Panel & Risk Meter (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="rounded-3xl border border-white/[0.1] bg-[#0d1624]/95 p-5 shadow-2xl backdrop-blur-2xl">
            
            {/* Long / Short Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[#080d15] border border-white/[0.06]">
              <button
                onClick={() => setSide('long')}
                className={`flex items-center justify-center space-x-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                  side === 'long'
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <TrendingUp className="h-4 w-4" />
                <span>LONG (BUY)</span>
              </button>

              <button
                onClick={() => setSide('short')}
                className={`flex items-center justify-center space-x-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                  side === 'short'
                    ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <TrendingDown className="h-4 w-4" />
                <span>SHORT (SELL)</span>
              </button>
            </div>

            {/* Order Type (Market / Limit) */}
            <div className="mt-4 flex space-x-4 border-b border-white/[0.06] pb-2 text-xs font-semibold">
              <button
                onClick={() => setOrderType('market')}
                className={`pb-1 transition-all ${
                  orderType === 'market'
                    ? 'text-[#00F59B] border-b-2 border-[#00F59B]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Market Order
              </button>
              <button
                onClick={() => setOrderType('limit')}
                className={`pb-1 transition-all ${
                  orderType === 'limit'
                    ? 'text-[#00F59B] border-b-2 border-[#00F59B]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Limit Order
              </button>
            </div>

            {/* Collateral Input */}
            <div className="mt-4 rounded-2xl border border-white/[0.08] bg-[#080d16] p-3.5 focus-within:border-[#00F59B]/60">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Collateral (Margin)</span>
                <span className="font-mono text-[11px]">Bal: 3,450.20 USDC</span>
              </div>
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  value={collateralAmount}
                  onChange={(e) => setCollateralAmount(e.target.value)}
                  placeholder="0.0"
                  className="w-full bg-transparent text-xl font-bold font-mono text-white focus:outline-none"
                />
                <span className="rounded-lg bg-white/[0.06] px-2.5 py-1 text-xs font-bold text-white font-mono">
                  USDC
                </span>
              </div>
            </div>

            {/* Intuitive Leverage Slider (1x to 100x) */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300 flex items-center">
                  <Sliders className="h-3.5 w-3.5 mr-1 text-[#00F59B]" />
                  Leverage Multiplier
                </span>
                <span className="font-mono font-black text-base text-[#00F59B]">
                  {leverage}x
                </span>
              </div>

              {/* Slider Track */}
              <input
                type="range"
                min="1"
                max="100"
                value={leverage}
                onChange={(e) => setLeverage(parseInt(e.target.value))}
                className="w-full"
              />

              {/* Quick Leverage Marks */}
              <div className="grid grid-cols-5 gap-1 pt-1">
                {[5, 10, 25, 50, 100].map((mark) => (
                  <button
                    key={mark}
                    onClick={() => setLeverage(mark)}
                    className={`rounded-lg py-1 text-[11px] font-mono font-bold border transition-all ${
                      leverage === mark
                        ? 'border-[#00F59B] bg-[#00F59B]/20 text-[#00F59B]'
                        : 'border-white/[0.06] bg-white/[0.02] text-slate-400 hover:border-white/[0.2]'
                    }`}
                  >
                    {mark}x
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Liquidation Price Danger Zone Meter */}
            <div className={`mt-5 rounded-2xl p-4 border transition-all ${risk.bg} ${risk.border}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {leverage > 50 ? (
                    <ShieldAlert className={`h-5 w-5 ${risk.color}`} />
                  ) : (
                    <ShieldCheck className={`h-5 w-5 ${risk.color}`} />
                  )}
                  <div>
                    <span className={`text-xs font-extrabold uppercase tracking-wide ${risk.color}`}>
                      {risk.label}
                    </span>
                    <p className="text-[10px] text-slate-300 font-mono">
                      Distance to Liq: {liqDistancePercent.toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-[10px] text-slate-400">EST. LIQUIDATION</div>
                  <div className={`text-sm font-bold ${risk.color}`}>
                    ${estimatedLiqPrice.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Danger Zone Progress Bar */}
              <div className="mt-3 w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    leverage <= 15 ? 'bg-emerald-400' : leverage <= 50 ? 'bg-amber-400' : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, leverage)}%` }}
                />
              </div>

              {leverage >= 50 && (
                <div className="mt-2.5 flex items-start space-x-1.5 text-[10px] text-rose-300 leading-tight">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-400" />
                  <span>
                    Warning: Extreme leverage. A {liqDistancePercent.toFixed(1)}% market wick against your position will trigger liquidation.
                  </span>
                </div>
              )}
            </div>

            {/* Transparent Cost & PnL Breakdown */}
            <div className="mt-5 rounded-2xl bg-[#080d16] border border-white/[0.06] p-3.5 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Position Size:</span>
                <span className="font-bold text-white">
                  {formatCurrency(positionSizeUSD)} ({tokenSize.toFixed(3)} {selectedMarket.baseAsset})
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Entry Price:</span>
                <span className="text-slate-200">{formatCurrency(selectedMarket.price)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Est. Execution Fee:</span>
                <span className="text-emerald-400">$0.00 (0% Maker / 0.06% Taker)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Borrow Rate:</span>
                <span className="text-slate-300">0.0012% / hr</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={parsedCollateral <= 0}
              className={`mt-5 w-full rounded-2xl py-3.5 text-sm font-bold transition-all shadow-xl flex items-center justify-center space-x-2 ${
                parsedCollateral <= 0
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : side === 'long'
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                  : 'bg-rose-500 hover:bg-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]'
              }`}
            >
              <span>
                {parsedCollateral <= 0
                  ? 'Enter Collateral'
                  : `${side === 'long' ? 'Open Long' : 'Open Short'} ${selectedMarket.symbol}`}
              </span>
              {parsedCollateral > 0 && (
                <span className="text-xs font-mono opacity-80">
                  ({leverage}x • {formatCurrency(positionSizeUSD)})
                </span>
              )}
            </button>

            {orderSuccessNotice && (
              <div className="mt-3 flex items-center space-x-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 p-2.5 text-xs text-emerald-300 animate-slide-up">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>{orderSuccessNotice}</span>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Live Open Positions Table */}
      <div className="rounded-3xl border border-white/[0.08] bg-[#0c1422]/90 p-5 backdrop-blur-xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-bold text-white tracking-tight">Active Positions</h3>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs font-mono text-slate-300">
              {positions.length} Open
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Auto-margin safety enabled
          </div>
        </div>

        {positions.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-500">
            No open perpetual positions. Open a long or short above to test!
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/[0.06] text-slate-400 text-[11px]">
                  <th className="pb-3 font-semibold">MARKET / SIDE</th>
                  <th className="pb-3 font-semibold">SIZE</th>
                  <th className="pb-3 font-semibold">ENTRY / MARK</th>
                  <th className="pb-3 font-semibold">LIQ. PRICE</th>
                  <th className="pb-3 font-semibold">UNREALIZED PNL</th>
                  <th className="pb-3 text-right font-semibold">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {positions.map((pos) => (
                  <tr key={pos.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                          pos.side === 'long' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {pos.side} {pos.leverage}x
                        </span>
                        <span className="font-bold text-white">{pos.market}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{pos.timestamp}</span>
                    </td>

                    <td className="py-3.5">
                      <div className="text-white font-semibold">{formatCurrency(pos.sizeUSD)}</div>
                      <div className="text-[10px] text-slate-400">Margin: {formatCurrency(pos.collateralUSD)}</div>
                    </td>

                    <td className="py-3.5">
                      <div className="text-slate-200">${pos.entryPrice.toFixed(2)}</div>
                      <div className="text-[10px] text-emerald-400">Mark: ${pos.markPrice.toFixed(2)}</div>
                    </td>

                    <td className="py-3.5">
                      <span className="text-rose-400 font-bold">${pos.liquidationPrice.toFixed(2)}</span>
                    </td>

                    <td className="py-3.5">
                      <div className={`font-bold ${pos.unrealizedPnlUSD >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {pos.unrealizedPnlUSD >= 0 ? '+' : ''}{formatCurrency(pos.unrealizedPnlUSD)} ({pos.unrealizedPnlPercent.toFixed(2)}%)
                      </div>
                    </td>

                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => handleClosePosition(pos.id)}
                        className="rounded-xl border border-white/[0.1] bg-white/[0.05] hover:bg-rose-500/20 hover:border-rose-500/50 hover:text-rose-300 px-3 py-1.5 text-slate-300 font-semibold transition-all"
                      >
                        Market Close
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
