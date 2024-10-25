import mongoose, { Schema, Document } from 'mongoose';
import { TransactionRisk } from '../types';

export interface RiskAssessmentDocument extends TransactionRisk, Document {}

const RiskFactorSchema = new Schema({
  type: { type: String, required: true },
  severity: { type: Number, required: true },
  description: { type: String, required: true }
});

const RiskAssessmentSchema = new Schema({
  txHash: { type: String, required: true, unique: true },
  riskLevel: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    required: true
  },
  riskFactors: [RiskFactorSchema],
  timestamp: { type: Number, default: Date.now }
});

export default mongoose.model<RiskAssessmentDocument>('RiskAssessment', RiskAssessmentSchema);
