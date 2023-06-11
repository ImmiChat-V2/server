import App from '@/app';
import { pgDataSource } from '@/databases';
import { PostRoute } from '@/routes';
import { requestWithCookie, seedingTest, postSeedData } from './utils/testUtils';

const postRoute = new PostRoute();
const app = new App([postRoute]);
const server = app.getServer();

beforeEach(async () => {
  await pgDataSource.initialize();
  await seedingTest();
});

afterEach(async () => {
  await pgDataSource.destroy();
});

describe('Testing Post Endpoints', () => {
  describe('[GET] /posts', () => {
    const path = `${postRoute.path}`;
    it('successfully get all posts', async () => {
      return await requestWithCookie({ app: server, path })
        .expect(200)
        .expect(res => res.body.data.length === postSeedData.length);
    });
  });
});
