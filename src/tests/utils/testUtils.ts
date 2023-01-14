import { AuthService } from '@/services';
import request from 'supertest';

const authService = new AuthService();
const testAccessCookie = authService.createTestCookie('access', 'access');

type RequestWithCookieType = {
  readonly app: Express.Application;
  readonly path: string;
};

export const requestWithCookie = ({ app, path }: RequestWithCookieType) => {
  return request(app).get(path).set('Cookie', [testAccessCookie]);
};
