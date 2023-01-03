import { Types } from 'mongoose';
import { Message } from '.';

export interface Chatroom {
  _id: Types.ObjectId;
  isGroup: boolean;
  users: Types.Array<number>;
  media?: string;
  messages: Types.DocumentArray<Message>;
  createdDate: Date;
}
