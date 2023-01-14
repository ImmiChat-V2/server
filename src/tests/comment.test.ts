import App from '@/app';
import { CommentRoute } from '@/routes';
import { pgDataSource } from '@databases';
import { sendTestRequestWithCookie } from './utils/testUtils';

const commentRoute = new CommentRoute();
const app = new App([commentRoute]);
const server = app.getServer();

beforeEach(async () => {
  await pgDataSource.initialize();
});

afterEach(async () => {
  await pgDataSource.destroy();
});

describe('Testing Comment Endpoints', () => {
  describe('[GET] /comments', () => {
    const path = `${commentRoute.path}`;
    it('successfully get all comments', async () => {
      return await sendTestRequestWithCookie({ app: server, path, expectedStatusCode: 200 });
    });
  });
});


