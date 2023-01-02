import { Chatroom } from '@/interfaces';
import { Schema } from 'mongoose';
import { Messages } from '.';

const ChatroomSchema: Schema = new Schema<Chatroom>({
  isGroup: { type: Boolean, required: true },
  users: { type: [Number], required: true },
  messages: { type: [Messages] },
  createdDate: { type: Date },
  media: { type: String },
});

export default ChatroomSchema;
