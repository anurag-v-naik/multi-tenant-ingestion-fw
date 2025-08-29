import { Router } from 'express';
import connectorRoutes from './connectors';
import processorRoutes from './processors';
import pipelineRoutes from './pipelines';
import scheduleRoutes from './schedules';

const router = Router();

router.use('/connectors', connectorRoutes);
router.use('/processors', processorRoutes);
router.use('/pipelines', pipelineRoutes);
router.use('/schedules', scheduleRoutes);

export default router;

