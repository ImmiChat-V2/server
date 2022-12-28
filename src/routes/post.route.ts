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
    this.router.put(`${this.path}/:post_id`, AuthMiddleware, this.postController.updatePost);
    this.router.get(`${this.path}/:post_id`, AuthMiddleware, this.postController.getSinglePost);
    this.router.delete(`${this.path}/:post_id`, AuthMiddleware, this.postController.deletePost);
  }
}

export default PostRoute;
