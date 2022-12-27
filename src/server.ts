import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { IndexRoute, AuthRoute, UserRoute, PostRoute } from '@/routes';

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new PostRoute(), new UserRoute()]);

app.listen();
