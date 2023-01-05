import { BaseMessageDto } from '@/dtos';

export type BaseChatroomDto = {
  isGroup: boolean;
  users: number[];
  media?: string;
  messages: BaseMessageDto[];
  createdDate: Date;
};

export type CreateChatroomDto = {
  userId: number;
  receiverIds: number[];
  isGroup: boolean;
};
