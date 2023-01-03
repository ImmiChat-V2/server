import { CreateChatroomDto, BaseChatroomDto } from '@/dtos';
import { ChatroomSchema } from '@/entities/nosql';
import { HttpException } from '@/exceptions';
import { model } from 'mongoose';

class ChatroomService {
  public async createChatroom({ userId, receiverIds, isGroup }: CreateChatroomDto): Promise<void> {
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
  public async getAllChatrooms(userId: number): Promise<BaseChatroomDto[]> {
    const chatroom = model('Chatroom', ChatroomSchema);
    const getAllChat: BaseChatroomDto[] = await chatroom.find({ users: { $in: userId } });
    if (getAllChat.length === 0) throw new HttpException(404, 'No Chats found');
    return getAllChat;
  }
}

export default ChatroomService;
