import { AuthService } from '@/services';
import request from 'supertest';
import { Express } from 'express';

const authService = new AuthService();
const testAccessCookie = authService.createTestCookie('access', 'access');

export const sendTestRequestWithCookie = async ({
  app,
  path,
  body,
  expectedStatusCode,
}: {
  app: Express.Application;
  path: string;
  body?: any;
  expectedStatusCode: number;
}) => {
  return await request(app).get(path).set('Cookie', [testAccessCookie]).send(body).expect(expectedStatusCode);
};
