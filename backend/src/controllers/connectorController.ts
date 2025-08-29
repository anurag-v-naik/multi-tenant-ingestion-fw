import { Request, Response } from 'express';
import {
  findConnectors,
  createOrUpdateConnector,
  deleteConnector as deleteSvc,
} from '../services/connectorService';

export const getAllConnectors = async (req: Request, res: Response) => {
  try {
    const connectors = await findConnectors();
    res.json(connectors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching connectors', error });
  }
};

export const createConnector = async (req: Request, res: Response) => {
  try {
    const newConnector = await createOrUpdateConnector(req.body);
    res.status(201).json(newConnector);
  } catch (error) {
    res.status(500).json({ message: 'Error creating connector', error });
  }
};

export const updateConnector = async (req: Request, res: Response) => {
  try {
    const updatedConnector = await createOrUpdateConnector(req.body, req.params.id);
    res.json(updatedConnector);
  } catch (error) {
    res.status(500).json({ message: 'Error updating connector', error });
  }
};

export const deleteConnector = async (req: Request, res: Response) => {
  try {
    await deleteSvc(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting connector', error });
  }
};
