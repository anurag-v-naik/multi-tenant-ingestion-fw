import axios from 'axios';
import { Connector } from '../types';

const API_URL = 'http://localhost:3001/api';

export const getConnectors = async (): Promise<Connector[]> => {
  const response = await axios.get(`${API_URL}/connectors`);
  return response.data;
};

export const createConnector = async (connector: Omit<Connector, 'id'>): Promise<Connector> => {
  const response = await axios.post(`${API_URL}/connectors`, connector);
  return response.data;
};

export const updateConnector = async (id: number, connector: Partial<Connector>): Promise<Connector> => {
  const response = await axios.put(`${API_URL}/connectors/${id}`, connector);
  return response.data;
};

export const deleteConnector = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/connectors/${id}`);
};
