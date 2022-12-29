import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { IndexRoute, AuthRoute, UserRoute, PostRoute, CommentRoute } from '@/routes';
import FeedRoute from './routes/feed.route';

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new PostRoute(), new UserRoute(), new CommentRoute(), new FeedRoute()]);

app.listen();
