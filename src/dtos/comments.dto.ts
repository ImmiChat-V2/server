export type BaseCommentDto = {
    readonly id: number;
    readonly userId: number;
    readonly postId: number;
    readonly media?: string;
    readonly content: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
