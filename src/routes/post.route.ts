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
    this.router.get(`${this.path}`, AuthMiddleware, this.postController.getPosts);
    this.router.get(`${this.path}/:post_id`, AuthMiddleware, this.postController.getSinglePost);
    this.router.post(`${this.path}`, AuthMiddleware, this.postController.createPost);
    this.router.put(`${this.path}/:post_id`, AuthMiddleware, this.postController.updatePost);
    this.router.delete(`${this.path}/:post_id`, AuthMiddleware, this.postController.deletePost);
    this.router.get(`${this.path}/:post_id/likes`, AuthMiddleware, this.postController.getLikesFromPost);
    this.router.post(`${this.path}/:post_id/likes`, AuthMiddleware, this.postController.likePost);
    this.router.delete(`${this.path}/:post_id/likes`, AuthMiddleware, this.postController.deletePostLike);
  }
}

export default PostRoute;
