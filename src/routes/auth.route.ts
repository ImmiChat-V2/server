import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';

class AuthRoute implements Routes {
  public readonly path = '/';
  public readonly router = Router();
  // private authController = new Auth

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`);
  }
}

export default AuthRoute;
