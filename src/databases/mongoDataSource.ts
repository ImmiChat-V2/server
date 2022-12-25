import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { mDB_HOST, mDB_PORT, DB_DATABASE } from '@/config';

const mongoDataSource = new DataSource({
  type: 'mongodb',
  host: mDB_HOST,
  port: mDB_PORT as unknown as number,
  database: DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [join(__dirname, '../entities/nosql/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../**/*.migration{.ts,.js}')],
} as DataSourceOptions);

export default mongoDataSource;
