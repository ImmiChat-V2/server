import App from '@/app';
import request from 'supertest';
import { UserRoute } from '@/routes';
import { testpgDataSource } from '@databases';
import { BaseUserDto } from '@dtos';
import { UserEntity } from '@entities';
const userRoute = new UserRoute();
const app = new App([userRoute]);

beforeEach(async () => {
  await testpgDataSource.initialize();
  console.log('test db initialized');
});

afterEach(async () => {
  await testpgDataSource.destroy();
  console.log('test db destroyed');
});

describe('Testing User Endpoints', () => {
  describe('[GET] /users', () => {
    it('successfully get all users', async () => {
      const response = await request(app.getServer()).get(`${userRoute.path}`);
      expect(response.statusCode).toBe(200);
    });
  });
});
