export type BasePostDto = {
  readonly id: number;
  readonly media?: string;
  readonly userId: number;
  readonly content: string;
  readonly categoryName: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export type UpdatePostRequestDto = {
  readonly content?: string;
  readonly media?: string;
  readonly categoryName?: string;
};

export type CreatePostRequestDto = Omit<BasePostDto, 'id' | 'createdAt' | 'updatedAt'>;
export type DeletePostRequestDto = Pick<BasePostDto, 'id' | 'userId'>;

export type LikePostDto = Pick<BasePostDto, 'id' | 'userId'>;
export type DeletePostLikeDto = Pick<BasePostDto, 'id' | 'userId'>;
