import { BaseChatroomDto, BaseMessageDto, CreateMessageDto } from '@/dtos';
import { Chatroom, Messages } from '@/entities/nosql';
import { HttpException } from '@/exceptions';
import { model, ObjectId } from 'mongoose';

class MessageService {
  public async getChatroomMessages(id: ObjectId): Promise<BaseMessageDto[]> {
    const chatroom = model('Chatroom', Chatroom);
    const findChatroom: BaseChatroomDto = await chatroom.findOne({ id });
    if (!findChatroom) throw new HttpException(404, 'Chatroom does not exist');
    return findChatroom.messages;
  }
}

export default MessageService;
