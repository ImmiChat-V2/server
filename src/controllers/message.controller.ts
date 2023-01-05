import { RequestWithUser } from '@/interfaces';
import { NextFunction, Response, Request } from 'express';
import { MessageService } from '@/services';
import { ObjectId } from 'mongoose';
import { BaseMessageDto, CreateMessageDto } from '@/dtos';

class MessageController {
  private messageService = new MessageService();

  public getChatroomMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.chat_id as unknown as ObjectId;
      const data: BaseMessageDto[] = await this.messageService.getChatroomMessages(id);
      res.status(200).json({ data, message: 'Success' });
    } catch (error) {
      next(error);
    }
  };

  public createChatroomMessage = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const id = req.params.chat_id as unknown as ObjectId;
      const userId = req.user.id;
      const messageData: CreateMessageDto = req.body;
      await this.messageService.createChatroomMessage({ id, userId, messageData });
      res.status(200).json({ message: 'Message sent' });
    } catch (error) {
      next(error);
    }
  };
}

export default MessageController;
