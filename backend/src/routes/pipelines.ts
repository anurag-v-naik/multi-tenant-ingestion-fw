import { Router } from 'express';
import {
  getAllPipelines,
  createPipeline,
  updatePipeline,
  deletePipeline,
  runPipeline,
} from '../controllers/pipelineController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getAllPipelines);
router.post('/', authenticate, createPipeline);
router.put('/:id', authenticate, updatePipeline);
router.delete('/:id', authenticate, deletePipeline);
router.post('/:id/run', authenticate, runPipeline);

export default router;

