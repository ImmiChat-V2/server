export type BaseCommentDto = {
    readonly id: number;
    readonly user: number;
    readonly post: number;
    readonly media?: string;
    readonly content: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

export type CreateCommentDto = Omit<BaseCommentDto, 'id'>
export type UpdateCommentDto = Omit<BaseCommentDto, 'created_at'>
export type DeleteCommentDto = Omit<BaseCommentDto, 'created_at'>
export type GetCommentsDto = BaseCommentDto[]
