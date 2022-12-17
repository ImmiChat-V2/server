import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { IndexRoute, AuthRoute } from '@routes';

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute()]);

app.listen();
