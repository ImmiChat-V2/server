import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { tDB_HOST, tDB_PORT, tDB_USER, tDB_PASSWORD, tDB_DATABASE, DB_DROPSCHEMA } from '@/config';

console.log(tDB_HOST, tDB_PORT, tDB_USER, 'host');
const testpgDataSource = new DataSource({
  type: 'postgres',
  host: tDB_HOST,
  port: Number(tDB_PORT),
  username: tDB_USER,
  password: tDB_PASSWORD,
  database: tDB_DATABASE,
  dropSchema: DB_DROPSCHEMA as unknown as boolean,
  synchronize: true,
  logging: false,
  entities: [join(__dirname, '../entities/sql/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../**/*.migration{.ts,.js}')],
  ssl: true,
} as DataSourceOptions);

export default testpgDataSource;
