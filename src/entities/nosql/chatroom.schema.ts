import { Chatroom } from '@/interfaces';
import { Schema } from 'mongoose';
import { MessageSchema } from '.';

const ChatroomSchema: Schema = new Schema<Chatroom>({
  isGroup: { type: Boolean, required: true },
  users: { type: [Number], required: true },
  messages: { type: [MessageSchema] },
  createdDate: { type: Date },
  media: { type: String },
});

export default ChatroomSchema;
