import { Routes } from '@/interfaces';
import { AuthMiddleware } from '@/middlewares';
import { ConnectionController } from '@/controllers';
import { Router } from 'express';

class ConnectionRoute implements Routes {
  public readonly path = '/connections';
  public readonly router = Router();
  private connectionController = new ConnectionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/users/:user_id${this.path}`, this.connectionController.getUserConnections);
  }
}

export default ConnectionRoute;
