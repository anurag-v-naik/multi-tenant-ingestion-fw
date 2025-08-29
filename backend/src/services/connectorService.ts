import { Connector } from '../database/models';
import { ConnectorAttributes } from '../database/models';

export const findConnectors = async () => {
  return Connector.findAll();
};

export const createOrUpdateConnector = async (data: Partial<ConnectorAttributes>, id?: string) => {
  if (id) {
    const connector = await Connector.findByPk(id);
    if (!connector) throw new Error('Connector not found');
    return connector.update(data);
  } else {
    return Connector.create(data as ConnectorAttributes);
  }
};

export const deleteConnector = async (id: string) => {
  const connector = await Connector.findByPk(id);
  if (!connector) throw new Error('Connector not found');
  await connector.destroy();
};
