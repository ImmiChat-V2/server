import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { IndexRoute, AuthRoute, UserRoute, PostRoute, CommentRoute, FeedRoute, ConnectionRoute, ChatroomRoute, MessageRoute } from '@/routes';

validateEnv();

const app = new App([
  new IndexRoute(),
  new AuthRoute(),
  new PostRoute(),
  new UserRoute(),
  new CommentRoute(),
  new FeedRoute(),
  new ConnectionRoute(),
  new ChatroomRoute(),
  new MessageRoute(),
]);

app.listen();
