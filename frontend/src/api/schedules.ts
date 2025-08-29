import axios from 'axios';
import { Schedule } from '../types';

const API_URL = 'http://localhost:3001/api';

export const getSchedules = async (): Promise<Schedule[]> => {
  const response = await axios.get(`${API_URL}/schedules`);
  return response.data;
};

export const createSchedule = async (schedule: Omit<Schedule, 'id'>): Promise<Schedule> => {
  const response = await axios.post(`${API_URL}/schedules`, schedule);
  return response.data;
};

export const updateSchedule = async (id: number, schedule: Partial<Schedule>): Promise<Schedule> => {
  const response = await axios.put(`${API_URL}/schedules/${id}`, schedule);
  return response.data;
};

export const deleteSchedule = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/schedules/${id}`);
};

