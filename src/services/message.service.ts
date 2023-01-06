import { BaseChatroomDto, BaseMessageDto, CreateMessageDto } from '@/dtos';
import { ChatroomSchema, MessageSchema } from '@/entities/nosql';
import { HttpException } from '@/exceptions';
import { model, ObjectId } from 'mongoose';

class MessageService {
  public async getChatroomMessages(id: ObjectId): Promise<BaseMessageDto[]> {
    const chatroom = model('Chatroom', ChatroomSchema);
    const findChatroom: BaseChatroomDto = await chatroom.findOne({ id });
    if (!findChatroom) throw new HttpException(404, 'Chatroom does not exist');
    return findChatroom.messages;
  }

  public async createChatroomMessage({ id, userId, messageData }: { id: ObjectId; userId: number; messageData: CreateMessageDto }): Promise<void> {
    const chatroom = model('Chatroom', ChatroomSchema);
    const message = model('Message', MessageSchema);
    const findChatroom = await chatroom.findOne({ id });
    if (!findChatroom) throw new HttpException(400, 'Unable to find chatroom');
    const createMessage = new message({
      userId: userId,
      content: messageData.content,
      createdDate: Date.now(),
      media: messageData.media,
    });
    createMessage.save();
    findChatroom.messages.push(createMessage);
    findChatroom.save();
  }
}

export default MessageService;
