import App from '@/app';
import request from 'supertest';
import { UserRoute } from '@/routes';
import { testpgDataSource } from '@databases';
import { BaseUserDto } from '@dtos';
import { UserEntity } from '@entities';

const app = new App([new UserRoute()]);
const userRoute = new UserRoute();

beforeEach(async () => {
  await testpgDataSource.initialize();
  console.log('test db initialized');
});

afterEach(async () => {
  await testpgDataSource.destroy();
  console.log('test db destroyed');
});
