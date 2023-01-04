import { Router } from 'express';
import { AuthMiddleware } from '@/middlewares';
import { Routes } from '@/interfaces';
import { MessageController } from '@/controllers';

class MessageRoute implements Routes {
  public readonly path = '/messages';
  public readonly router = Router();
  private messageController = new MessageController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/chatroom/:chat_id${this.path}`, AuthMiddleware, this.messageController.getChatroomMessages);
  }
}

export default MessageRoute;
