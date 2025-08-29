import { Request, Response } from 'express';
import {
  findSchedules,
  createOrUpdateSchedule,
  deleteSchedule as deleteSvc,
} from '../services/scheduleService';

export const getAllSchedules = async (req: Request, res: Response) => {
  try {
    const schedules = await findSchedules();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedules', error });
  }
};

export const createSchedule = async (req: Request, res: Response) => {
  try {
    const newSchedule = await createOrUpdateSchedule(req.body);
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ message: 'Error creating schedule', error });
  }
};

export const updateSchedule = async (req: Request, res: Response) => {
  try {
    const updatedSchedule = await createOrUpdateSchedule(req.body, req.params.id);
    res.json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ message: 'Error updating schedule', error });
  }
};

export const deleteSchedule = async (req: Request, res: Response) => {
  try {
    await deleteSvc(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting schedule', error });
  }
};

