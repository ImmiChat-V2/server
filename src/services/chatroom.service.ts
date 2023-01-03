import { CreateChatroomDto } from '@/dtos';
import { Chatroom } from '@/entities/nosql';
import { HttpException } from '@/exceptions';
import { model } from 'mongoose';

class ChatroomService {
  public async createChatroom({ userId, receiverId, isGroup }: CreateChatroomDto): Promise<void> {
    const chatroom = model('Chatroom', Chatroom);
    const checkExist = await chatroom.exists({ users: [userId, receiverId] });
    if (checkExist) throw new HttpException(409, 'Chatroom Exists');
    await new chatroom({
      isGroup: isGroup,
      users: [userId, receiverId],
      message: [],
      createdDate: Date.now(),
    }).save();
  }
}

export default ChatroomService;
