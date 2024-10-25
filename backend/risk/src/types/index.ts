import { Big } from 'big.js';

export interface RiskParameters {
  maxTransactionAmount: Big;
  dailyLimit: Big;
  minLiquidity: Big;
  maxPriceImpact: number;
  maxSlippage: number;
  blockedAddresses: Set<string>;
}

export interface TransactionRisk {
  txHash: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  riskFactors: RiskFactor[];
  timestamp: number;
}

export interface RiskFactor {
  type: RiskFactorType;
  severity: number;
  description: string;
}

export enum RiskFactorType {
  AMOUNT = 'AMOUNT',
  LIQUIDITY = 'LIQUIDITY',
  PRICE_IMPACT = 'PRICE_IMPACT',
  ADDRESS = 'ADDRESS',
  PATTERN = 'PATTERN',
  VELOCITY = 'VELOCITY'
}