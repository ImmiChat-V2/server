import App from '@/app';
import request from 'supertest';
import { AuthRoute } from '@/routes';

const app = new App([new AuthRoute()]);
const authRoute = new AuthRoute();

describe('env variables', () => {
  test('peek at variables', () => {
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_PORT);
    console.log(process.env.DB_USER);
  });
});
