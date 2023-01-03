import App from '@/app';
import request from 'supertest';
import { AuthRoute } from '@/routes';
import { pgDataSource } from '@databases';
import { RegisterUserRequestDto } from '@dtos';
import { UserEntity } from '@entities';

const app = new App([new AuthRoute()]);
const authRoute = new AuthRoute();

beforeEach(async () => {
  await pgDataSource.initialize();
});

afterEach(async () => {
  await pgDataSource.destroy();
});

describe('Testing Authentication Endpoints', () => {
  describe('[POST] /register', () => {
    const userData: RegisterUserRequestDto = {
      email: `test@email.com`,
      password: 'password',
      firstName: 'firstName',
      lastName: 'lastName',
      language: 'language',
    };
    it('successfully registers a user', () => {
      UserEntity.findOne = jest.fn().mockReturnValue(null);
      UserEntity.save = jest.fn().mockReturnValue({
        id: 1,
        ...userData,
      });
      return request(app.getServer()).post(`${authRoute.path}register`).send(userData).expect(201);
    });
    it('respond with a 409 status code if the email already exists', () => {
      UserEntity.findOne = jest.fn().mockReturnValue(true);
      return request(app.getServer()).post(`${authRoute.path}register`).send(userData).expect(409);
    });
  });
});
