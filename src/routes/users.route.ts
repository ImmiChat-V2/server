import UsersController from '@/controllers/users.controller';
import { Routes } from '@/interfaces';
import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';

class UserRoute implements Routes {
  public readonly path = '/users';
  public readonly router = Router();
  private usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.usersController.getUsers);
  }
}

export default UserRoute;