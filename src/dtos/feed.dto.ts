export type BasePostOfFeedDTO = {
  readonly id: number;
  readonly userId: number;
  readonly content: string;
  readonly media?: string;
  readonly likes: {
    readonly firstName: string;
    readonly lastName: string;
    readonly profilePic?: string;
  };
  readonly comments: {
    readonly userId: number;
  };
};
