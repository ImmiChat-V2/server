export type BasePostDto = {
  readonly id: number;
  readonly media?: string;
  readonly userId: number;
  readonly content: string;
  readonly categoryName: string;
};

export type CreatePostRequestDto = Omit<BasePostDto, 'id'>;
export type CreatePostResponseDto = Pick<BasePostDto, 'id'>;
