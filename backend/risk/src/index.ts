import Big from 'big.js'
import { RiskParameters } from './types';
import { MonitoringService } from './services/MonitoringService';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './utils/logger';

dotenv.config();

// Initialize risk parameters
const riskParams: RiskParameters = {
  maxTransactionAmount: new Big('1000000'),  // 1M USD
  dailyLimit: new Big('5000000'),           // 5M USD
  minLiquidity: new Big('100000'),          // 100K USD
  maxPriceImpact: 5,                        // 5%
  maxSlippage: 3,                           // 3%
  blockedAddresses: new Set()
};

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/defi-bridge-risk')
  .then(() => {
    logger.info('Connected to MongoDB');
    
    // Initialize monitoring service
    const monitoringService = new MonitoringService(riskParams);
    logger.info('Risk monitoring service started');
  })
  .catch((error) => {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  });

process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  logger.error('Unhandled rejection:', error);
  process.exit(1);
});