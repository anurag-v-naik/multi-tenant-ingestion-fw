import { Request, Response } from 'express';
import {
  findPipelines,
  createOrUpdatePipeline,
  deletePipeline as deleteSvc,
  runPipeline as runSvc,
} from '../services/pipelineService';

export const getAllPipelines = async (req: Request, res: Response) => {
  try {
    const pipelines = await findPipelines();
    res.json(pipelines);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pipelines', error });
  }
};

export const createPipeline = async (req: Request, res: Response) => {
  try {
    const newPipeline = await createOrUpdatePipeline(req.body);
    res.status(201).json(newPipeline);
  } catch (error) {
    res.status(500).json({ message: 'Error creating pipeline', error });
  }
};

export const updatePipeline = async (req: Request, res: Response) => {
  try {
    const updatedPipeline = await createOrUpdatePipeline(req.body, req.params.id);
    res.json(updatedPipeline);
  } catch (error) {
    res.status(500).json({ message: 'Error updating pipeline', error });
  }
};

export const deletePipeline = async (req: Request, res: Response) => {
  try {
    await deleteSvc(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pipeline', error });
  }
};

export const runPipeline = async (req: Request, res: Response) => {
  try {
    await runSvc(req.params.id);
    res.status(202).json({ message: 'Pipeline execution triggered' });
  } catch (error) {
    res.status(500).json({ message: 'Error triggering pipeline', error });
  }
};

