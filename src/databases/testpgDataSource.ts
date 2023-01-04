import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { tDB_HOST, tDB_PORT, tDB_USER, tDB_PASSWORD, tDB_DATABASE, tDB_DROPSCHEMA } from '@/config';

const testpgDataSource = new DataSource({
  type: 'postgres',
  host: tDB_HOST,
  port: Number(tDB_PORT),
  username: tDB_USER,
  password: tDB_PASSWORD,
  database: tDB_DATABASE,
  dropSchema: JSON.parse(tDB_DROPSCHEMA),
  synchronize: true,
  logging: false,
  entities: [join(__dirname, '../entities/sql/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../**/*.migration{.ts,.js}')],
  ssl: true,
} as DataSourceOptions);

export default testpgDataSource;
