export type BaseMessageDto = {
  userId: number;
  content: string;
  media?: string;
  createdDate: Date;
  updatedDate: Date;
};

export type CreateMessageDto = Pick<BaseMessageDto, 'content' | 'media'>;
