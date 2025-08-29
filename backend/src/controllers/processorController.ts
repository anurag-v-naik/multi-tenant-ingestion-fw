import { Request, Response } from 'express';
import {
  findProcessors,
  createOrUpdateProcessor,
  deleteProcessor as deleteSvc,
} from '../services/processorService';

export const getAllProcessors = async (req: Request, res: Response) => {
  try {
    const processors = await findProcessors();
    res.json(processors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching processors', error });
  }
};

export const createProcessor = async (req: Request, res: Response) => {
  try {
    const newProcessor = await createOrUpdateProcessor(req.body);
    res.status(201).json(newProcessor);
  } catch (error) {
    res.status(500).json({ message: 'Error creating processor', error });
  }
};

export const updateProcessor = async (req: Request, res: Response) => {
  try {
    const updatedProcessor = await createOrUpdateProcessor(req.body, req.params.id);
    res.json(updatedProcessor);
  } catch (error) {
    res.status(500).json({ message: 'Error updating processor', error });
  }
};

export const deleteProcessor = async (req: Request, res: Response) => {
  try {
    await deleteSvc(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting processor', error });
  }
};

