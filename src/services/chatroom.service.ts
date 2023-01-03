import { CreateChatroomDto } from '@/dtos';
import { Chatroom } from '@/entities/nosql';
import { HttpException } from '@/exceptions';
import { model } from 'mongoose';

class ChatroomService {
  public async createChatroom({ userId, receiverId, isGroup }: CreateChatroomDto): Promise<void> {
    const chatroom = model('Chatroom', Chatroom);
    const createChat = new chatroom({
      isGroup: isGroup,
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
