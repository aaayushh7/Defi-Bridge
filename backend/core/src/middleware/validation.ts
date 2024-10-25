import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const transactionSchema = Joi.object({
  fromChain: Joi.number().required(),
  toChain: Joi.number().required(),
  fromAddress: Joi.string().required(),
  toAddress: Joi.string().required(),
  amount: Joi.string().required(),
  token: Joi.object({
    symbol: Joi.string().required(),
    address: Joi.string().required(),
    decimals: Joi.number().required(),
    chainId: Joi.number().required()
  }).required(),
  txHash: Joi.string().required()
});

export const validateTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await transactionSchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.details[0].message });
  }
};