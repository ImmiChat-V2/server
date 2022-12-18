import { Router } from 'express';
import { Routes } from '@/interfaces';
import { IndexController } from '@/controllers';

class IndexRoute implements Routes {
  public readonly path = '/';
  public readonly router = Router();
  private indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.indexController.index);
  }
}

export default IndexRoute;
