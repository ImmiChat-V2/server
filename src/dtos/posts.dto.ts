export type BasePostDto = {
  readonly id: number;
  readonly media?: string;
  readonly userId: number;
  readonly content: string;
  readonly categoryName: string;
};

export type UpdatePostRequestDto = {
  readonly id: number;
  readonly content?: string;
  readonly media?: string;
  readonly categoryName?: string;
};

export type CreatePostRequestDto = Omit<BasePostDto, 'id'>;

