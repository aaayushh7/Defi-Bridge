// TransactionRoutes.ts
import { Router, RequestHandler } from 'express';
import { TransactionController } from '../controllers/TransactionController';
import { validateTransaction } from '../middleware/validation';

const router = Router();
const transactionController = new TransactionController();

router.post('/', validateTransaction, transactionController.createTransaction as RequestHandler);
router.get('/:txHash', transactionController.getTransaction as RequestHandler);
router.get('/', transactionController.getRecentTransactions as RequestHandler);

export default router;
