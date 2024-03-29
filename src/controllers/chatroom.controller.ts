import { RequestWithUser } from '@/interfaces';
import { NextFunction, Response } from 'express';
import { ChatroomService } from '@/services';
import { BaseChatroomDto } from '@/dtos';

class ChatroomController {
  private chatroomService = new ChatroomService();

  public createChatroom = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const receiverIds = req.body.receiverIds;
      const isGroup = req.body.isGroup;
      await this.chatroomService.createChatroom({ userId, receiverIds, isGroup });
      res.status(201).json({ message: 'Chatroom Created' });
    } catch (error) {
      next(error);
    }
  };
  public getAllChatrooms = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const data: BaseChatroomDto[] = await this.chatroomService.getAllChatrooms(userId);
      res.status(200).json({ data, message: 'Success' });
    } catch (error) {
      next(error);
    }
  };
}

export default ChatroomController;
