import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatCurrency } from '../../utils/cn';

export const BridgeView: React.FC = () => {
  const [mode, setMode] = useState<'dca' | 'bridge'>('dca');
  
  // DCA state
  const [dcaAmount, setDcaAmount] = useState<string>('100');
  const [dcaFrequency, setDcaFrequency] = useState<string>('every_1_hour');
  const [dcaDuration, setDcaDuration] = useState<number>(24);
  const [dcaSuccess, setDcaSuccess] = useState<boolean>(false);

  // Bridge state
  const [sourceChain, setSourceChain] = useState<'Ethereum' | 'Arbitrum' | 'Base'>('Ethereum');
  const [bridgeAmount, setBridgeAmount] = useState<string>('1.5');
  const [bridgeSuccess, setBridgeSuccess] = useState<boolean>(false);

  const handleStartDCA = () => {
    setDcaSuccess(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#00F59B', '#38bdf8'],
    });
    setTimeout(() => setDcaSuccess(false), 4000);
  };

  const handleStartBridge = () => {
    setBridgeSuccess(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#00F59B', '#9945FF'],
    });
    setTimeout(() => setBridgeSuccess(false), 4000);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-5 animate-fade-in">
      
      {/* Mode Switcher */}
      <div className="flex rounded-2xl bg-slate-900/90 border border-slate-700/80 p-1">
        <button
          onClick={() => setMode('dca')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            mode === 'dca'
              ? 'bg-[#00F59B] text-slate-950 shadow-[0_0_15px_rgba(0,245,155,0.3)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Dollar Cost Average (DCA)
        </button>
        <button
          onClick={() => setMode('bridge')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            mode === 'bridge'
              ? 'bg-[#00F59B] text-slate-950 shadow-[0_0_15px_rgba(0,245,155,0.3)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Cross-Chain Bridge (to Solana)
        </button>
      </div>

      {mode === 'dca' ? (
        <div className="rounded-3xl border border-white/[0.1] bg-[#0c1320]/95 p-6 shadow-2xl backdrop-blur-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Automated DCA Strategy</h3>
              <p className="text-xs text-slate-400 font-mono">Automate recurring swaps with zero price slippage</p>
            </div>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
              0% Custody
            </span>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] p-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Total Budget Allocation</span>
                <span className="font-mono text-[11px]">Bal: 3,450.20 USDC</span>
              </div>
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  value={dcaAmount}
                  onChange={(e) => setDcaAmount(e.target.value)}
                  className="bg-transparent text-2xl font-bold font-mono text-white focus:outline-none"
                />
                <span className="rounded-xl bg-white/[0.06] px-3 py-1 text-xs font-bold text-white font-mono">
                  USDC
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] p-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Target Asset to Accumulate</span>
                <span className="font-mono text-[11px]">Target: SOL</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-lg font-bold text-white">Solana (SOL)</span>
                <span className="rounded-xl bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 font-mono">
                  Current: $184.75
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3">
                <label className="text-slate-400 text-[11px] block mb-1">Interval</label>
                <select 
                  value={dcaFrequency}
                  onChange={(e) => setDcaFrequency(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-mono focus:outline-none"
                >
                  <option value="every_1_hour">Every 1 Hour</option>
                  <option value="every_4_hours">Every 4 Hours</option>
                  <option value="every_24_hours">Daily (24h)</option>
                  <option value="every_week">Weekly</option>
                </select>
              </div>

              <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3">
                <label className="text-slate-400 text-[11px] block mb-1">Order Count</label>
                <input
                  type="number"
                  value={dcaDuration}
                  onChange={(e) => setDcaDuration(parseInt(e.target.value) || 1)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-950/20 border border-emerald-500/20 p-3 text-xs font-mono text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span>Per Order Size:</span>
                <span className="text-white font-bold">{formatCurrency(parseFloat(dcaAmount) / dcaDuration)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frequency:</span>
                <span className="text-emerald-400">{dcaFrequency.replace(/_/g, ' ')}</span>
              </div>
            </div>

            <button
              onClick={handleStartDCA}
              className="w-full rounded-2xl bg-[#00F59B] hover:bg-[#00d787] text-slate-950 font-bold py-3.5 text-sm transition-all shadow-[0_0_20px_rgba(0,245,155,0.3)]"
            >
              Start Automated DCA Strategy
            </button>

            {dcaSuccess && (
              <div className="flex items-center space-x-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 p-2.5 text-xs text-emerald-300 animate-slide-up font-mono">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>DCA Order Scheduled! Vault initialized on Solana.</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-white/[0.1] bg-[#0c1320]/95 p-6 shadow-2xl backdrop-blur-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Cross-Chain Bridge</h3>
              <p className="text-xs text-slate-400 font-mono">Transfer funds straight into Solana in &lt; 90 seconds</p>
            </div>
            <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
              deBridge / Wormhole
            </span>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] p-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Source Network</span>
                <div className="flex space-x-1">
                  {(['Ethereum', 'Arbitrum', 'Base'] as const).map((chain) => (
                    <button
                      key={chain}
                      onClick={() => setSourceChain(chain)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        sourceChain === chain ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {chain}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <input
                  type="number"
                  value={bridgeAmount}
                  onChange={(e) => setBridgeAmount(e.target.value)}
                  className="bg-transparent text-2xl font-bold font-mono text-white focus:outline-none"
                />
                <span className="rounded-xl bg-white/[0.06] px-3 py-1 text-xs font-bold text-white font-mono">
                  ETH
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[#00F59B]">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] p-4">
              <div className="text-xs text-slate-400 mb-1">Destination: Solana Mainnet</div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  ≈ {(parseFloat(bridgeAmount) * 18.5).toFixed(2)} SOL
                </span>
                <span className="rounded-xl bg-purple-500/20 px-3 py-1 text-xs font-bold text-purple-300 font-mono">
                  SOL
                </span>
              </div>
            </div>

            <button
              onClick={handleStartBridge}
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-[#00F59B] text-slate-950 font-bold py-3.5 text-sm transition-all shadow-[0_0_20px_rgba(0,245,155,0.3)]"
            >
              Bridge to Solana in 90s
            </button>

            {bridgeSuccess && (
              <div className="flex items-center space-x-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 p-2.5 text-xs text-emerald-300 animate-slide-up font-mono">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>Bridge transaction submitted! Claiming on Solana in 45s.</span>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
