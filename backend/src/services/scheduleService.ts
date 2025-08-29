import { Schedule } from '../database/models';

export const findSchedules = async () => {
  return Schedule.findAll();
};

export const createOrUpdateSchedule = async (data: any, id?: string) => {
  if (id) {
    const schedule = await Schedule.findByPk(id);
    if (!schedule) throw new Error('Schedule not found');
    return schedule.update(data);
  } else {
    return Schedule.create(data);
  }
};

export const deleteSchedule = async (id: string) => {
  const schedule = await Schedule.findByPk(id);
  if (!schedule) throw new Error('Schedule not found');
  await schedule.destroy();
};

