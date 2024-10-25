import mongoose, { Schema, Document } from 'mongoose';
import { Transaction as ITransaction } from '../types';

export interface TransactionDocument extends ITransaction, Document {}

const TokenSchema = new Schema({
  symbol: { type: String, required: true },
  address: { type: String, required: true },
  decimals: { type: Number, required: true },
  chainId: { type: Number, required: true }
});

const TransactionSchema = new Schema({
  fromChain: { type: Number, required: true },
  toChain: { type: Number, required: true },
  fromAddress: { type: String, required: true },
  toAddress: { type: String, required: true },
  amount: { type: String, required: true },
  token: { type: TokenSchema, required: true },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  txHash: { type: String, required: true },
  timestamp: { type: Number, default: Date.now }
});

export default mongoose.model<TransactionDocument>('Transaction', TransactionSchema);
