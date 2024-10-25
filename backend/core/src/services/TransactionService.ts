import Transaction, { TransactionDocument } from '../models/Transaction';
import { Transaction as ITransaction } from '../types';
import logger from '../utils/logger';

export class TransactionService {
  async createTransaction(transactionData: ITransaction): Promise<TransactionDocument> {
    try {
      const transaction = new Transaction(transactionData);
      await transaction.save();
      return transaction;
    } catch (error) {
      logger.error('Error creating transaction:', error);
      throw error;
    }
  }

  async getTransaction(txHash: string): Promise<TransactionDocument | null> {
    try {
      return await Transaction.findOne({ txHash });
    } catch (error) {
      logger.error('Error fetching transaction:', error);
      throw error;
    }
  }

  async updateTransactionStatus(
    txHash: string,
    status: 'pending' | 'completed' | 'failed'
  ): Promise<TransactionDocument | null> {
    try {
      return await Transaction.findOneAndUpdate(
        { txHash },
        { status },
        { new: true }
      );
    } catch (error) {
      logger.error('Error updating transaction status:', error);
      throw error;
    }
  }

  async getRecentTransactions(limit: number = 10): Promise<TransactionDocument[]> {
    try {
      return await Transaction.find()
        .sort({ timestamp: -1 })
        .limit(limit);
    } catch (error) {
      logger.error('Error fetching recent transactions:', error);
      throw error;
    }
  }
}