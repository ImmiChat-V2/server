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
    this.router.get(`/users/:user_id${this.path}`, AuthMiddleware, this.connectionController.getUserConnections);
    this.router.post(`/users/:user_id${this.path}`, AuthMiddleware, this.connectionController.sendConnectionRequest);
    this.router.put(`/users/:user_id${this.path}`, AuthMiddleware, this.connectionController.acceptConnectionRequest);
    this.router.delete(`/users/:user_id${this.path}`, AuthMiddleware, this.connectionController.removeConnection);
  }
}

export default ConnectionRoute;
