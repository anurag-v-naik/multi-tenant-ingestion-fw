import { Processor } from '../database/models';

export const findProcessors = async () => {
  return Processor.findAll();
};

export const createOrUpdateProcessor = async (data: any, id?: string) => {
  if (id) {
    const processor = await Processor.findByPk(id);
    if (!processor) throw new Error('Processor not found');
    return processor.update(data);
  } else {
    return Processor.create(data);
  }
};

export const deleteProcessor = async (id: string) => {
  const processor = await Processor.findByPk(id);
  if (!processor) throw new Error('Processor not found');
  await processor.destroy();
};

