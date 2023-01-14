import App from '@/app';
import { pgDataSource } from '@/databases';
import { PostRoute } from '@/routes';
import { sendTestRequestWithCookie } from './utils/testUtils';
import { BasePostDto } from '@/dtos';
import { PostEntity } from '@/entities';

const postRoute = new PostRoute();
const app = new App([postRoute]);
const server = app.getServer();

beforeEach(async () => {
  await pgDataSource.initialize();
});

afterEach(async () => {
  await pgDataSource.destroy();
});

describe('Testing Post Endpoints', () => {
  describe('[GET] /posts', () => {
    const path = `${postRoute.path}`;
    it('successfully get all posts', async () => {
      return await sendTestRequestWithCookie({ app: server, path, expectedStatusCode: 200 });
    });
  });
  describe('[GET] /posts/:id', () => {
    const postData: BasePostDto = {
      id: 1,
      userId: 1,
      content: 'Hello',
      categoryName: 'All',
    };
    const path = `${postRoute.path}/${postData.id}`;
    it('successfully gets a single post', async () => {
      PostEntity.findOne = jest.fn().mockImplementation(() => postData);
      return await sendTestRequestWithCookie({ app: server, path, expectedStatusCode: 200 });
    });
    it('returns a 404 if post not found', async () => {
      PostEntity.findOne = jest.fn().mockImplementation(() => false);
      return await sendTestRequestWithCookie({ app: server, path, expectedStatusCode: 404 });
    });
  });
});
