export type BasePostOfFeedDTO = {
  readonly id: number;
  readonly userId: number;
  readonly content: string;
  readonly media?: string;
  readonly user: UserInfo;
  readonly likes: { id: number }[];
  readonly comments: { userId: number }[];
};

type UserInfo = {
  readonly firstName: string;
  readonly lastName: string;
  readonly profilePic?: string;
};

export type ProfileFeed = {
  readonly userId?: number;
  readonly categoryName?: string;
};
