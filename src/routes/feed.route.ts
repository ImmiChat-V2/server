import { Router } from 'express';
import { Routes } from '@/interfaces';
import { AuthMiddleware } from '@/middlewares';
import { FeedController } from '@/controllers';

class FeedRoute implements Routes {
  public readonly path = '/feed';
  public readonly router = Router();
  private feedController = new FeedController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:user_id?`, AuthMiddleware, this.feedController.getFeed);
  }
}

export default FeedRoute;
