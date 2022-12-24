export type BasePostDto = {
  readonly id: number;
  readonly media?: string;
  readonly userId: number;
  readonly content: string;
  readonly categoryName: string;
};
