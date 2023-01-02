import { Chatroom } from '@/entities/nosql';
import { HttpException } from '@/exceptions';
import { model } from 'mongoose';

class ChatroomService {
  public async createChatroom(userId: number, receiverId: number): Promise<void> {
    const chatroom = model('Chatroom', Chatroom);
    const createChat = new chatroom({
      isGroup: true,
      users: [userId, receiverId],
      message: [],
      createdDate: Date.now(),
    });
    const checkExist = await chatroom.exists({ users: createChat.users });
    if (checkExist) throw new HttpException(409, 'Chatroom Exists');
    createChat.save();
  }
}

export default ChatroomService;
