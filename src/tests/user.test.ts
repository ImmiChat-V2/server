import App from '@/app';
import request from 'supertest';
import { UserRoute } from '@/routes';
import { pgDataSource } from '@databases';
import { AuthService } from '@/services';
import { UserEntity } from '@/entities';
import { BaseUserResponseDTO } from '@/dtos';

const userRoute = new UserRoute();
const app = new App([userRoute]);
const authService = new AuthService();

const testAccessCookie = authService.createTestCookie('access', 'access');
beforeEach(async () => {
  await pgDataSource.initialize();
});

afterEach(async () => {
  await pgDataSource.destroy();
});

describe('Testing User Endpoints', () => {
  describe('[GET] /users', () => {
    it('successfully get all users', async () => {
      return await request(app.getServer()).get(`${userRoute.path}`).set('Cookie', [testAccessCookie]).expect(200);
    });
  });
  describe('[GET] /users/:id', () => {
    const userData: BaseUserResponseDTO = {
      id: 1,
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'test@email.com',
      language: 'chinese',
      dateOfBirth: null,
      profilePic: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    it('successfully gets a specific user', async () => {
      UserEntity.findOne = jest.fn().mockImplementation(() => userData);
      return await request(app.getServer()).get(`${userRoute.path}/:id`).set('Cookie', [testAccessCookie]).send(String(userData.id)).expect(200);
    });
    it('returns 409 status code if user is not found', async () => {
      UserEntity.findOne = jest.fn().mockImplementation(() => false);
      return await request(app.getServer()).get(`${userRoute.path}/:id`).set('Cookie', [testAccessCookie]).send(String(userData.id)).expect(409);
    });
  });
});
