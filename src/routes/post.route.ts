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
    this.router.post(`${this.path}`, AuthMiddleware, this.postController.createPost);
    this.router.get(`${this.path}`, AuthMiddleware, this.postController.getPosts);
    
  }
}

export default PostRoute;
