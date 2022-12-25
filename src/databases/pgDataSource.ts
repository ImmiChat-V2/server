import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@/config';

const pgDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT as unknown as number,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [join(__dirname, '../entities/sql/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../**/*.migration{.ts,.js}')],
} as DataSourceOptions);

export default pgDataSource;
