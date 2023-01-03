import { BaseEntity } from 'typeorm';

type BaseEntityType = typeof BaseEntity;

export const updateAndReturn = async <ReturnType, PayloadType>(id: number, data: PayloadType, Entity: BaseEntityType): Promise<ReturnType> => {
  const updatedRow = await Entity.createQueryBuilder().update().where({ id }).set(data).returning('*').execute();
  return updatedRow.raw[0];
};

export const deleteAndReturn = async <ReturnType>(id: number, Entity: BaseEntityType): Promise<ReturnType> => {
  const deletedRow = await Entity.createQueryBuilder().delete().where({ id }).returning('*').execute();
  return deletedRow.raw[0];
};
