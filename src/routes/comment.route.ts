import { Router } from 'express';
import { Routes } from '@/interfaces';
import { AuthMiddleware } from '@/middlewares';
import { CommentController } from '@/controllers';

class CommentRoute implements Routes {
  public readonly path = '/comments';
  public readonly router = Router();
  private commentController = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // test
    this.router.get(`${this.path}`, AuthMiddleware, this.commentController.getComments);
    this.router.get(`/posts/:post_id${this.path}`, AuthMiddleware, this.commentController.getCommentsForPost);
  }
}

export default CommentRoute;
