import React, { useState } from 'react';
import { Search, X, Check, ShieldCheck, Flame } from 'lucide-react';
import { Token } from '../../types';
import { MOCK_TOKENS } from '../../data/mockData';
import { formatCurrency } from '../../utils/cn';

interface TokenSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectToken: (token: Token) => void;
  selectedToken: Token;
  title?: string;
}

export const TokenSelectorModal: React.FC<TokenSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectToken,
  selectedToken,
  title = 'Select a Token',
}) => {
  const [search, setSearch] = useState('');
  const [filterTag, setFilterTag] = useState<string>('all');

  if (!isOpen) return null;

  const filteredTokens = MOCK_TOKENS.filter((token) => {
    const matchesSearch =
      token.symbol.toLowerCase().includes(search.toLowerCase()) ||
      token.name.toLowerCase().includes(search.toLowerCase()) ||
      token.address.toLowerCase().includes(search.toLowerCase());

    if (filterTag === 'all') return matchesSearch;
    return matchesSearch && token.tags?.includes(filterTag);
  });

  const popularSymbols = ['SOL', 'USDC', 'JUP', 'BONK'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-md rounded-3xl border border-slate-700/80 bg-[#0d1522] p-5 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">
              Verified Solana
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-white/[0.08] hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="mt-4 relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, symbol, or mint address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="w-full rounded-2xl border border-white/[0.1] bg-[#080d15] py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-[#00F59B] focus:outline-none focus:ring-1 focus:ring-[#00F59B] transition-all"
          />
        </div>

        {/* Popular Quick Pills */}
        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono text-slate-400 mr-1 flex items-center">
            <Flame className="h-3 w-3 mr-0.5 text-amber-400" /> Hot:
          </span>
          {popularSymbols.map((sym) => {
            const token = MOCK_TOKENS.find((t) => t.symbol === sym);
            if (!token) return null;
            return (
              <button
                key={sym}
                onClick={() => {
                  onSelectToken(token);
                  onClose();
                }}
                className={`flex items-center space-x-1.5 rounded-xl px-2.5 py-1 text-xs font-semibold border transition-all ${
                  selectedToken.symbol === sym
                    ? 'border-[#00F59B]/50 bg-[#00F59B]/15 text-[#00F59B]'
                    : 'border-white/[0.08] bg-white/[0.03] text-slate-300 hover:border-white/[0.2] hover:bg-white/[0.06]'
                }`}
              >
                <img src={token.icon} alt={token.symbol} className="h-3.5 w-3.5 rounded-full" />
                <span>{token.symbol}</span>
              </button>
            );
          })}
        </div>

        {/* Filter Categories */}
        <div className="mt-3 flex space-x-2 border-b border-white/[0.06] pb-2 text-xs">
          {['all', 'defi', 'meme', 'stablecoin', 'staking'].map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`rounded-lg px-2.5 py-1 font-medium capitalize transition-colors ${
                filterTag === tag
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Token List */}
        <div className="mt-2 max-h-72 overflow-y-auto space-y-1 pr-1">
          {filteredTokens.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-400">
              No matching tokens found.
            </div>
          ) : (
            filteredTokens.map((token) => {
              const isSelected = token.symbol === selectedToken.symbol;
              return (
                <div
                  key={token.symbol}
                  onClick={() => {
                    onSelectToken(token);
                    onClose();
                  }}
                  className={`flex items-center justify-between rounded-2xl p-2.5 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#00F59B]/10 border border-[#00F59B]/30'
                      : 'hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={token.icon}
                        alt={token.symbol}
                        className="h-9 w-9 rounded-full bg-slate-800 border border-white/[0.1] object-cover"
                        onError={(e) => {
                          // Fallback avatar
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      {token.verified && (
                        <div className="absolute -bottom-0.5 -right-0.5 rounded-full bg-slate-900 p-0.5 text-emerald-400">
                          <ShieldCheck className="h-3 w-3 fill-emerald-500/20 text-emerald-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-white text-sm">{token.symbol}</span>
                        <span className="text-[11px] text-slate-400 truncate max-w-[120px]">{token.name}</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {formatCurrency(token.price, token.price < 0.01 ? 6 : 2)}
                        <span className={`ml-2 ${token.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-semibold text-white font-mono">
                      {token.balance.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {formatCurrency(token.balance * token.price)}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
