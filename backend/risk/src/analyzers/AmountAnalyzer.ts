import { Big } from 'big.js';
import { RiskFactor, RiskFactorType } from '../types';
import { RiskParameters } from '../types';

export class AmountAnalyzer {
  private params: RiskParameters;

  constructor(params: RiskParameters) {
    this.params = params;
  }

  analyze(amount: string, dailyTotal: string): RiskFactor[] {
    const riskFactors: RiskFactor[] = [];
    const txAmount = new Big(amount);
    const dailyAmount = new Big(dailyTotal);

    // Check individual transaction amount
    if (txAmount.gt(this.params.maxTransactionAmount)) {
      riskFactors.push({
        type: RiskFactorType.AMOUNT,
        severity: 0.8,
        description: 'Transaction amount exceeds maximum allowed'
      });
    }

    // Check daily limit
    if (dailyAmount.gt(this.params.dailyLimit)) {
      riskFactors.push({
        type: RiskFactorType.AMOUNT,
        severity: 0.9,
        description: 'Daily transaction limit exceeded'
      });
    }

    return riskFactors;
  }
}