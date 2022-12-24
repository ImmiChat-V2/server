export type BaseCommentDto = {
    readonly id: number;
    readonly user: number;
    readonly post: number;
    readonly media?: string;
    readonly content: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
