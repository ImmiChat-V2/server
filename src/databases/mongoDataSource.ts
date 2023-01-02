import { mDB_HOST, mDB_PORT, DB_DATABASE } from '@/config';
import mongoose from 'mongoose';

const initialize = async () => {
  const type = 'mongodb';
  const host = mDB_HOST;
  const port = mDB_PORT as unknown as number;
  const database = DB_DATABASE;
  return await mongoose.connect(`${type}://${host}:${port}/${database}`);
};
export default { initialize };
