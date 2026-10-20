export interface Token {
  symbol: string;
  name: string;
  icon: string;
  balance: number;
  price: number;
  change24h: number;
  decimals: number;
  address: string;
  verified?: boolean;
  tags?: string[];
}

export interface RouteHop {
  dexName: string;
  label: string;
  splitPercentage: number;
  inputSymbol: string;
  outputSymbol: string;
  liquidityPool: string;
  feeTier: string;
}

export interface SwapRoute {
  inAmount: number;
  outAmount: number;
  rate: number;
  priceImpact: number;
  slippageTolerance: number;
  guaranteedMinimum: number;
  networkFeeUSD: number;
  jupiterFeeUSD: number;
  savingsVsAmmUSD: number;
  executionTimeMs: number;
  routeHops: RouteHop[];
  mevProtected: boolean;
  jitoTipSOL: number;
}

export interface PerpMarket {
  symbol: string;
  baseAsset: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24hUSD: number;
  openInterestUSD: number;
  fundingRateLong: number;
  fundingRateShort: number;
  maxLeverage: number;
}

export interface PerpPosition {
  id: string;
  market: string;
  side: 'long' | 'short';
  entryPrice: number;
  markPrice: number;
  sizeUSD: number;
  leverage: number;
  collateralUSD: number;
  liquidationPrice: number;
  unrealizedPnlUSD: number;
  unrealizedPnlPercent: number;
  borrowFeeUSD: number;
  timestamp: string;
}

export type ViewportMode = 'desktop' | 'mobile' | 'comparison';
export type AppTab = 'swap' | 'perps' | 'bridge';
export type OrderType = 'market' | 'limit';
