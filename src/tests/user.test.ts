import App from '@/app';
import request from 'supertest';
import { UserRoute } from '@/routes';
import { pgDataSource } from '@databases';
import { AuthService } from '@/services';
import { BaseUserResponseDTO } from '@/dtos';
const userRoute = new UserRoute();
const app = new App([userRoute]);
const authService = new AuthService();
const newDate = new Date();

const tempUser: BaseUserResponseDTO = {
  id: 1,
  email: 'dsf@def.com',
  firstName: 'fdsfsd',
  lastName: 'fds',
  language: 'mexico',
  profilePic: 'src',
  dateOfBirth: null,
  updatedAt: newDate,
  createdAt: newDate,
};
const token = authService.createToken(tempUser, 'access');
const cookie = authService.createCookie(token, 'access');

beforeEach(async () => {
  await pgDataSource.initialize();
});

afterEach(async () => {
  await pgDataSource.destroy();
});

describe('Testing User Endpoints', () => {
  describe('[GET] /users', () => {
    it('successfully get all users', async () => {
      return await request(app.getServer()).get(`${userRoute.path}`).set('Cookie', [cookie]).expect(200);
    });
  });
});
