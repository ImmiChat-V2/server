import App from '@/app';
import { UserRoute } from '@/routes';
import { pgDataSource } from '@databases';
import { UserEntity } from '@/entities';
import { BaseUserResponseDTO } from '@/dtos';
import { requestWithCookie } from './utils/testUtils';

const userRoute = new UserRoute();
const app = new App([userRoute]);
const server = app.getServer();

beforeEach(async () => {
  await pgDataSource.initialize();
});

afterEach(async () => {
  await pgDataSource.destroy();
});

describe('Testing User Endpoints', () => {
  describe('[GET] /users', () => {
    const path = `${userRoute.path}`;
    it('successfully get all users', async () => {
      return await requestWithCookie({ app: server, path }).expect(200);
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
    const path = `${userRoute.path}/${userData.id}`;

    it('successfully gets a specific user', async () => {
      UserEntity.findOne = jest.fn().mockImplementation(() => userData);
      return await requestWithCookie({ app: server, path }).expect(200);
    });
    it('returns 409 status code if user is not found', async () => {
      UserEntity.findOne = jest.fn().mockImplementation(() => false);
      return await requestWithCookie({ app: server, path }).expect(409);
    });
  });
});
