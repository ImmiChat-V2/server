import { Schema } from 'mongoose';
import { Message } from '@/interfaces';

const MessageSchema = new Schema<Message>({
  userId: { type: Number },
  content: { type: String },
  createdDate: { type: Date },
  media: { type: String },
});

export default MessageSchema;
