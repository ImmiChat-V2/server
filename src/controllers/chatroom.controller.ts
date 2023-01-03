import { RequestWithUser } from '@/interfaces';
import { NextFunction, Response } from 'express';
import { ChatroomService } from '@/services';

class ChatroomController {
  private chatroomService = new ChatroomService();

  public createChatroom = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const receiverId = req.body.receiverId;
      const isGroup = req.body.isGroup;
      await this.chatroomService.createChatroom(userId, receiverId, isGroup);
      res.status(201).json({ message: 'Chatroom Created' });
    } catch (error) {
      next(error);
    }
  };
}

export default ChatroomController;
