import App from '@/app';
import { AuthRoute } from '@/routes';
import { testpgDataSource } from '@databases';
import { LoginUserRequestDto, RegisterUserRequestDto } from '@dtos';
import { UserEntity } from '@entities';
import bcrypt from 'bcrypt';
import request from 'supertest';

const app = new App([new AuthRoute()]);
const authRoute = new AuthRoute();

beforeEach(async () => {
  await testpgDataSource.initialize();
});

afterEach(async () => {
  await testpgDataSource.destroy();
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
    it('responds with a 409 status code if the email already exists', () => {
      UserEntity.findOne = jest.fn().mockReturnValue(true);
      return request(app.getServer()).post(`${authRoute.path}register`).send(userData).expect(409);
    });
  });
  describe('[POST] /login', () => {
    const userData: LoginUserRequestDto = {
      email: `test@email.com`,
      password: 'password',
    };
    it('successfully authenticates user', () => {
      UserEntity.findOne = jest.fn().mockReturnValue(true);
      bcrypt.compare = jest.fn().mockReturnValue(true);
      return request(app.getServer()).post(`${authRoute.path}login`).send(userData).expect(200);
    });
    it("responds with a 404 status code if user doesn't exist", () => {
      UserEntity.findOne = jest.fn().mockReturnValue(false);
      return request(app.getServer()).post(`${authRoute.path}login`).send(userData).expect(404);
    });
    it("responds with a 409 status code if passwords didn't match", () => {
      UserEntity.findOne = jest.fn().mockReturnValue(true);
      bcrypt.compare = jest.fn().mockReturnValue(false);
      return request(app.getServer()).post(`${authRoute.path}login`).send(userData).expect(409);
    });
  });
});
