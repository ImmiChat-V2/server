import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, DB_DROPSCHEMA, DB_SSL } from '@/config';

const pgDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  dropSchema: DB_DROPSCHEMA as unknown as boolean,
  synchronize: true,
  logging: false,
  ssl: DB_SSL,
  entities: [join(__dirname, '../entities/sql/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../**/*.migration{.ts,.js}')],
} as DataSourceOptions);

export default pgDataSource;
