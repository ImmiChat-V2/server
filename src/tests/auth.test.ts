import App from '@/app';
import { AuthRoute } from '@/routes';
import { AuthService } from '@/services';
import { pgDataSource } from '@databases';
import { LoginUserRequestDto, RegisterUserRequestDto } from '@dtos';
import { UserEntity } from '@entities';
import bcrypt from 'bcrypt';
import request from 'supertest';

const app = new App([new AuthRoute()]);
const authRoute = new AuthRoute();
const authService = new AuthService();

const testAccessCookie = authService.createTestCookie('access', 'access');
const testRefreshCookie = authService.createTestCookie('refresh', 'refresh');
const testAccessCookieShortSpan = authService.createTestCookie('shortSpanTestAccess', 'access');
const testRefreshCookieShortSpan = authService.createTestCookie('shortSpanTestRefresh', 'access');

beforeEach(async () => {
  await pgDataSource.initialize();
});

afterEach(async () => {
  setTimeout(() => {}, 500);
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
  describe('[POST] /logout', () => {
    it('successfully authenticates user', () => {
      return request(app.getServer()).post(`${authRoute.path}logout`).set('Cookie', [testAccessCookie, testRefreshCookie]).expect(200);
    });
  });
  describe('[POST] /validate-authentication', () => {
    it('successfully validates a user with valid tokens', () => {
      return request(app.getServer())
        .post(`${authRoute.path}validate-authentication`)
        .set('Cookie', [testAccessCookie, testRefreshCookie])
        .expect(200);
    });

    it('successfully validates a user with valid refresh token and expired access token', () => {
      return request(app.getServer())
        .post(`${authRoute.path}validate-authentication`)
        .set('Cookie', [testAccessCookieShortSpan, testRefreshCookie])
        .expect(200);
    });
    it('returns 401 status code if access and refresh tokens are expired', () => {
      return request(app.getServer())
        .post(`${authRoute.path}validate-authentication`)
        .set('Cookie', [testAccessCookieShortSpan, testRefreshCookieShortSpan])
        .expect(401);
    });
    it('returns 401 status code if both access and refresh tokens are missing', () => {
      return request(app.getServer()).post(`${authRoute.path}validate-authentication`).expect(401);
    });
  });
});
