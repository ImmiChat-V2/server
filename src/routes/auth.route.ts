import { Router } from 'express';
import { Routes } from '@/interfaces';
import { AuthMiddleware } from '@/middlewares';
import { AuthController } from '@/controllers';

class AuthRoute implements Routes {
  public readonly path = '/';
  public readonly router = Router();
  private authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}register`, this.authController.register);
    this.router.post(`${this.path}login`, this.authController.login);
    this.router.post(`${this.path}logout`, AuthMiddleware, this.authController.logout);
    this.router.post(`${this.path}validate-authentication`, AuthMiddleware, this.authController.validateAuthentication);
  }
}

export default AuthRoute;
