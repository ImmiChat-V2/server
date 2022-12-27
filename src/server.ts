import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { IndexRoute, AuthRoute, PostRoute } from '@/routes';

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new PostRoute()]);

app.listen();
