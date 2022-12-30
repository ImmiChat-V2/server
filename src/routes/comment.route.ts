import { CommentController } from '@/controllers';
import { Routes } from '@/interfaces';
import { AuthMiddleware } from '@/middlewares';
import { Router } from 'express';

class CommentRoute implements Routes {
  public readonly path = '/comments';
  public readonly router = Router();
  private commentController = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.commentController.getComments);
    this.router.put(`${this.path}/:comment_id`, AuthMiddleware, this.commentController.updateComment);
    this.router.get(`/posts/:post_id${this.path}`, AuthMiddleware, this.commentController.getCommentsForPost);
  }
}

export default CommentRoute;
