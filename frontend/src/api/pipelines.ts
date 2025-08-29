import axios from 'axios';
import { Pipeline } from '../types';

const API_URL = 'http://localhost:3001/api';

export const getPipelines = async (): Promise<Pipeline[]> => {
  const response = await axios.get(`${API_URL}/pipelines`);
  return response.data;
};

export const createPipeline = async (pipeline: Omit<Pipeline, 'id'>): Promise<Pipeline> => {
  const response = await axios.post(`${API_URL}/pipelines`, pipeline);
  return response.data;
};

export const updatePipeline = async (id: number, pipeline: Partial<Pipeline>): Promise<Pipeline> => {
  const response = await axios.put(`${API_URL}/pipelines/${id}`, pipeline);
  return response.data;
};

export const deletePipeline = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/pipelines/${id}`);
};

export const runPipeline = async (id: number): Promise<void> => {
  await axios.post(`${API_URL}/pipelines/${id}/run`);
};

