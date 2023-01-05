import { CreateChatroomDto } from '@/dtos';
import { ChatroomSchema } from '@/entities/nosql';
import { HttpException } from '@/exceptions';
import { model } from 'mongoose';

class ChatroomService {
  public async createChatroom({ userId, receiverIds, isGroup }: gCreateChatroomDto): Promise<void> {
    const chatroom = model('Chatroom', ChatroomSchema);
    const userList = [userId].concat(receiverIds);
    const checkExist = await chatroom.exists({ users: userList });
    if (checkExist) throw new HttpException(409, 'Chatroom exists');
    await new chatroom({
      isGroup: isGroup,
      users: userList,
      message: [],
      createdDate: Date.now(),
    }).save();
  }
}

export default ChatroomService;
