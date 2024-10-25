// TransactionController.ts
import { Request, Response, NextFunction } from 'express';
import { TransactionService } from '../services/TransactionService';
import logger from '../utils/logger';

export class TransactionController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  createTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const transaction = await this.transactionService.createTransaction(req.body);
      res.status(201).json(transaction);
    } catch (error) {
      logger.error('Error in createTransaction:', error);
      next(error); // Pass the error to the next middleware
    }
  };

  getTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const transaction = await this.transactionService.getTransaction(req.params.txHash);
      if (!transaction) {
        res.status(404).json({ error: 'Transaction not found' });
        return;
      }
      res.json(transaction);
    } catch (error) {
      logger.error('Error in getTransaction:', error);
      next(error); // Pass the error to the next middleware
    }
  };

  getRecentTransactions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const transactions = await this.transactionService.getRecentTransactions(limit);
      res.json(transactions);
    } catch (error) {
      logger.error('Error in getRecentTransactions:', error);
      next(error); // Pass the error to the next middleware
    }
  };
}
