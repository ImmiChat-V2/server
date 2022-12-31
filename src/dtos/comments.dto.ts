export type BaseCommentDto = {
  readonly id: number;
  readonly userId: number;
  readonly postId: number;
  readonly media?: string;
  readonly content: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export type UpdateCommentRequestDto = Pick<BaseCommentDto, 'media' | 'content'>;
export type DeleteCommentRequestDto = Pick<BaseCommentDto, 'id' | 'userId'>;
export type CreateCommentRequestDto = Omit<BaseCommentDto, 'id' | 'createdAt' | 'updatedAt'>;

export type LikeCommentDto = Pick<BaseCommentDto, 'id' | 'userId'>;
