export type BasePostOfFeedDTO = {
  readonly id: number;
  readonly content: string;
  readonly media?: string;
  readonly userId: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly profilePic?: string;
  readonly likes: {
    readonly firstName: string;
    readonly lastName: string;
    readonly profilePic: string;
  };
  readonly comments: {
    readonly userId: number;
  };
};
