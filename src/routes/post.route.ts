import { Router } from 'express';
import { Routes } from '@/interfaces';
import { ValidationMiddleware } from '@/middlewares';
import { BasePostDto } from '@/dtos'


class PostRoute implements Routes {
  public readonly path = '/posts/';
  public readonly router = Router();
  private postController = new PostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // test
    this.router.post(
        `${this.path}`,
        ValidationMiddleware({
            type: BasePostDto,
            value: 'body',
        }),
        this.postController.posts,
    );
  }
}

export default PostRoute;
