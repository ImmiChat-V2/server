import { BaseChatroomDto, BaseMessageDto, CreateMessageDto } from '@/dtos';
import { Chatroom, Messages } from '@/entities/nosql';
import { HttpException } from '@/exceptions';
import { model, ObjectId } from 'mongoose';

class MessageService {
  public async getChatroomMessages(id: ObjectId): Promise<BaseMessageDto[]> {
    const chatroom = model('Chatroom', Chatroom);
    const findMessages: BaseChatroomDto = await chatroom.findOne({ id });
    if (!findMessages.messages) throw new HttpException(404, 'No Messages');
    return findMessages.messages;
  }
}

export default MessageService;
