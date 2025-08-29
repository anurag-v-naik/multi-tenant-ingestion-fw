import axios from 'axios';
import { Processor } from '../types';

const API_URL = 'http://localhost:3001/api';

export const getProcessors = async (): Promise<Processor[]> => {
  const response = await axios.get(`${API_URL}/processors`);
  return response.data;
};

export const createProcessor = async (processor: Omit<Processor, 'id'>): Promise<Processor> => {
  const response = await axios.post(`${API_URL}/processors`, processor);
  return response.data;
};

export const updateProcessor = async (id: number, processor: Partial<Processor>): Promise<Processor> => {
  const response = await axios.put(`${API_URL}/processors/${id}`, processor);
  return response.data;
};

export const deleteProcessor = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/processors/${id}`);
};

