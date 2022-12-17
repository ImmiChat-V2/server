import { Router } from 'express';
import { Routes } from '@interfaces';
import { ValidationMiddleware } from '@middlewares';
import { CreateUserDto } from '@dtos';
import { AuthController } from '@controllers';

class AuthRoute implements Routes {
  public readonly path = '/';
  public readonly router = Router();
  private authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}register`,
      ValidationMiddleware({
        type: CreateUserDto,
        value: 'body',
      }),
      this.authController.register,
    );
    this.router.post(
      `${this.path}login`,
      ValidationMiddleware({
        type: CreateUserDto,
        value: 'body',
      }),
      this.authController.login,
    );
  }
}

export default AuthRoute;
