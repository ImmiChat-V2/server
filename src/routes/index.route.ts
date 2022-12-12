import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import IndexController from '@controllers/index.controller';

class IndexRoute implements Routes {
  private _path = '/';
  private _router = Router();
  private indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  get router() {
    return this._router;
  }

  get path() {
    return this._path;
  }

  private initializeRoutes() {
    this.router.get(this.path, this.indexController.index);
  }
}

export default IndexRoute;
