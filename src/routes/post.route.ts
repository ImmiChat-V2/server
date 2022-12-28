import { Router } from 'express';
import { Routes } from '@/interfaces';
import { AuthMiddleware } from '@/middlewares';
import { PostController } from '@/controllers';

class PostRoute implements Routes {
  public readonly path = '/posts';
  public readonly router = Router();
  private postController = new PostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // test
    this.router.post(`${this.path}`, AuthMiddleware, this.postController.createPost);
    this.router.put(`${this.path}`, AuthMiddleware, this.postController.updatePost);
  }
}

export default PostRoute;
