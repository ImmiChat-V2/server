import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { IndexRoute, AuthRoute, UserRoute } from '@/routes';

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new UserRoute()]);

app.listen();
