import request from 'supertest';
import App from '@/app';
import { IndexRoute } from '@routes';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing index routes', () => {
  describe('[GET] /', () => {
    it('responds with statusCode 200', () => {
      const indexRoute = new IndexRoute();
      const app = new App([indexRoute]);

      return request(app.getServer()).get(`${indexRoute.path}`).expect(200);
    });
  });
});
