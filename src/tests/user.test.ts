import App from '@/app';
import { UserRoute } from '@/routes';
import { pgDataSource } from '@databases';
import { requestWithCookie, seedingTest, userSeedData } from './utils/testUtils';

const userRoute = new UserRoute();
const app = new App([userRoute]);
const server = app.getServer();

beforeEach(async () => {
  await pgDataSource.initialize();
  await seedingTest();
});

afterEach(async () => {
  await pgDataSource.destroy();
});

describe('Testing User Endpoints', () => {
  describe('[GET] /users', () => {
    const path = `${userRoute.path}`;
    it('successfully get all users', async () => {
      return await requestWithCookie({ app: server, path })
        .expect(200)
        .expect(res => res.body.data.length === userSeedData.length);
    });
  });
  describe('[GET] /users/:id', () => {
    const userEmail = userSeedData[0].email;
    const path = `${userRoute.path}/1`;
    it('successfully gets a specific user', async () => {
      return await requestWithCookie({ app: server, path })
        .expect(200)
        .expect(res => res.body.data.email === userEmail);
    });
    it('returns 409 status code if user is not found', async () => {
      const userId = userSeedData.length + 1;
      const path = `${userRoute.path}/${userId}`;
      return await requestWithCookie({ app: server, path }).expect(409);
    });
  });
});
