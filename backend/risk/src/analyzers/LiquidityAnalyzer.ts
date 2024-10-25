import { Big } from 'big.js';
import { RiskFactor, RiskFactorType } from '../types';
import { RiskParameters } from '../types';

export class LiquidityAnalyzer {
  private params: RiskParameters;

  constructor(params: RiskParameters) {
    this.params = params;
  }

  analyze(liquidity: string, amount: string): RiskFactor[] {
    const riskFactors: RiskFactor[] = [];
    const poolLiquidity = new Big(liquidity);
    const txAmount = new Big(amount);

    // Check minimum liquidity
    if (poolLiquidity.lt(this.params.minLiquidity)) {
      riskFactors.push({
        type: RiskFactorType.LIQUIDITY,
        severity: 0.7,
        description: 'Pool liquidity below minimum threshold'
      });
    }

    // Check liquidity impact
    const liquidityImpact = txAmount.div(poolLiquidity).times(100);
    if (liquidityImpact.gt(10)) {
      riskFactors.push({
        type: RiskFactorType.LIQUIDITY,
        severity: 0.6,
        description: 'High liquidity impact'
      });
    }

    return riskFactors;
  }
}