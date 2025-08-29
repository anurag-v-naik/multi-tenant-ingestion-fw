import { Router } from 'express';
import {
  getAllSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from '../controllers/scheduleController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getAllSchedules);
router.post('/', authenticate, createSchedule);
router.put('/:id', authenticate, updateSchedule);
router.delete('/:id', authenticate, deleteSchedule);

export default router;

