import { Router } from 'express';
import { AuthMiddleware } from '@/middlewares';
import { Routes } from '@/interfaces';
import { ChatroomController } from '@/controllers';

class ChatroomRoute implements Routes {
  public readonly path = '/chatroom';
  public readonly router = Router();
  private chatroomController = new ChatroomController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, this.chatroomController.createChatroom);
  }
}

export default ChatroomRoute;
