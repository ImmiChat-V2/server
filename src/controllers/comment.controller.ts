import { NextFunction, Response } from 'express';
import { CommentService } from '@/services';
import { BaseCommentDto } from '@/dtos';
import { RequestWithUser } from '@/interfaces';

class CommentController {
    private commentService = new CommentService();

    public getComments = async ( req: RequestWithUser, res: Response, next:NextFunction) => {
        try {
            const data : BaseCommentDto[] = await this.commentService.getComments();
            res.status(200).json({ data, message: 'success' });
        } catch (error) {
            next(error);
        }
    };
}

export default CommentController;