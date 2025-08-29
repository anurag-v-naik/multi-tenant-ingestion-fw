import { Pipeline } from '../database/models';
import { triggerPipelineExecution } from './engineService';

export const findPipelines = async () => {
  return Pipeline.findAll();
};

export const createOrUpdatePipeline = async (data: any, id?: string) => {
  if (id) {
    const pipeline = await Pipeline.findByPk(id);
    if (!pipeline) throw new Error('Pipeline not found');
    return pipeline.update(data);
  } else {
    return Pipeline.create(data);
  }
};

export const deletePipeline = async (id: string) => {
  const pipeline = await Pipeline.findByPk(id);
  if (!pipeline) throw new Error('Pipeline not found');
  await pipeline.destroy();
};

export const runPipeline = async (id: string) => {
  const pipeline = await Pipeline.findByPk(id);
  if (!pipeline) {
    throw new Error('Pipeline not found');
  }
  await triggerPipelineExecution(pipeline.toJSON());
};

