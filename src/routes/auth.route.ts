import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateUserDto } from '@dtos/users.dto';
import AuthController from '@controllers/auth.controller';

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
      validationMiddleware({
        type: CreateUserDto,
        value: 'body',
      }),
      this.authController.register,
    );
    this.router.post(
      `${this.path}login`,
      validationMiddleware({
        type: CreateUserDto,
        value: 'body',
      }),
      this.authController.login,
    );
  }
}

export default AuthRoute;
