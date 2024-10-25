import { TransactionRisk, RiskParameters, RiskFactorType } from '../types';
import { AmountAnalyzer } from '../analyzers/AmountAnalyzer';
import { LiquidityAnalyzer } from '../analyzers/LiquidityAnalyzer';
import { AddressAnalyzer } from '../analyzers/AddressAnalyzer';
import RiskAssessment from '../models/RiskAssessment';
import logger from '../utils/logger';

export class RiskAssessmentService {
  private amountAnalyzer: AmountAnalyzer;
  private liquidityAnalyzer: LiquidityAnalyzer;
  private addressAnalyzer: AddressAnalyzer;

  constructor(params: RiskParameters) {
    this.amountAnalyzer = new AmountAnalyzer(params);
    this.liquidityAnalyzer = new LiquidityAnalyzer(params);
    this.addressAnalyzer = new AddressAnalyzer(params);
  }

  async assessTransaction(transaction: any): Promise<TransactionRisk> {
    try {
      const riskFactors = [
        ...this.amountAnalyzer.analyze(transaction.amount, await this.getDailyTotal(transaction)),
        ...this.liquidityAnalyzer.analyze(await this.getPoolLiquidity(transaction), transaction.amount),
        ...await this.addressAnalyzer.analyze(transaction.fromAddress)
      ];

      const riskLevel = this.calculateRiskLevel(riskFactors);
      
      const assessment: TransactionRisk = {
        txHash: transaction.txHash,
        riskLevel,
        riskFactors,
        timestamp: Date.now()
      };

      await this.saveAssessment(assessment);
      return assessment;
    } catch (error) {
      logger.error('Error in risk assessment:', error);
      throw error;
    }
  }

  private calculateRiskLevel(riskFactors: any[]): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    const maxSeverity = Math.max(...riskFactors.map(f => f.severity));
    
    if (maxSeverity >= 0.9) return 'CRITICAL';
    if (maxSeverity >= 0.7) return 'HIGH';
    if (maxSeverity >= 0.4) return 'MEDIUM';
    return 'LOW';
  }

  private async saveAssessment(assessment: TransactionRisk): Promise<void> {
    try {
      await RiskAssessment.create(assessment);
    } catch (error) {
      logger.error('Error saving risk assessment:', error);
      throw error;
    }
  }

  private async getDailyTotal(transaction: any): Promise<string> {
    // Implementation to get daily total for address
    return '0';
  }

  private async getPoolLiquidity(transaction: any): Promise<string> {
    // Implementation to get pool liquidity
    return '0';
  }
}