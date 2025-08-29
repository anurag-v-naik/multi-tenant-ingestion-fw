import { Router } from 'express';
import {
  getAllConnectors,
  createConnector,
  updateConnector,
  deleteConnector,
} from '../controllers/connectorController';

const router = Router();

router.get('/', getAllConnectors);
router.post('/', createConnector);
router.put('/:id', updateConnector);
router.delete('/:id', deleteConnector);

export default router;
