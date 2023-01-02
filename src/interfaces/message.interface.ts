import { Types } from 'mongoose';

export interface Message {
  _id: Types.ObjectId;
  userId: number;
  media?: string;
  content: string;
  createdDate: Date;
}
