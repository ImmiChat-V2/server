import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { IndexRoute, AuthRoute, UserRoute, PostRoute, CommentRoute, FeedRoute, ChatroomRoute } from '@/routes';

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new PostRoute(), new UserRoute(), new CommentRoute(), new FeedRoute(), new ChatroomRoute()]);

app.listen();
