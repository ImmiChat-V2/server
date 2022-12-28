import { Router } from 'express';
import { Routes } from '@/interfaces';
import { AuthMiddleware } from '@/middlewares';
import { CommentController } from '@/controllers';

class CommentRoute implements Routes {
  public readonly path = '/comment';
  public readonly router = Router();
  private commentController = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // test
    this.router.post(`${this.path}`, AuthMiddleware, this.commentController.getComments);
  }
}

export default CommentRoute;
