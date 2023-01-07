import App from '@/app';
import request from 'supertest';
import { UserRoute } from '@/routes';
import { pgDataSource } from '@databases';
import { AuthService } from '@/services';
import { BaseUserResponseDTO } from '@/dtos';
const userRoute = new UserRoute();
const app = new App([userRoute]);
const authService = new AuthService();

const testCookie = authService.createTestCookie();
beforeEach(async () => {
  await pgDataSource.initialize();
});

afterEach(async () => {
  await pgDataSource.destroy();
});

describe('Testing User Endpoints', () => {
  describe('[GET] /users', () => {
    it('successfully get all users', async () => {
      return await request(app.getServer()).get(`${userRoute.path}`).set('Cookie', [testCookie]).expect(200);
    });
  });
});
