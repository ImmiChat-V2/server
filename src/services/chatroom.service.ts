import { CreateChatroomDto } from '@/dtos';
import { Chatroom } from '@/entities/nosql';
import { HttpException } from '@/exceptions';
import { model } from 'mongoose';

class ChatroomService {
  public async createChatroom({ userId, receiverIds, isGroup }: CreateChatroomDto): Promise<void> {
    const chatroom = model('Chatroom', Chatroom);
    const userList = [userId].concat(receiverIds);
    console.log(userList);
    const checkExist = await chatroom.exists({ users: userList });
    if (checkExist) throw new HttpException(409, 'Chatroom Exists');
    await new chatroom({
      isGroup: isGroup,
      users: userList,
      message: [],
      createdDate: Date.now(),
    }).save();
  }
}

export default ChatroomService;
