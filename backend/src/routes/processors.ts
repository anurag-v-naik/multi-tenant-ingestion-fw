import { Router } from 'express';
import {
  getAllProcessors,
  createProcessor,
  updateProcessor,
  deleteProcessor,
} from '../controllers/processorController';

const router = Router();

router.get('/', getAllProcessors);
router.post('/', createProcessor);
router.put('/:id', updateProcessor);
router.delete('/:id', deleteProcessor);

export default router;

