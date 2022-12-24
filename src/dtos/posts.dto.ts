export type BasePostDto = {
  readonly id: number;
  readonly media?: string;
  readonly userId: number;
  readonly content: string;
  readonly categoryName: string;
};

export type GetPostResponseDto = BasePostDto;

export type CreatePostRequestDto = Omit<BasePostDto, 'id'>;

export type UpdatePostRequestDto = Pick<BasePostDto, 'id' | 'userId' | 'content'>;

export type DeletePostRequestDto = Pick<BasePostDto, 'id' | 'userId'>;
