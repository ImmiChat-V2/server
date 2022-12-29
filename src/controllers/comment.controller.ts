import { BaseCommentDto } from '@/dtos';
import { UpdateCommentRequestDto } from '@/dtos/comments.dto';
import { RequestWithUser } from '@/interfaces';
import { CommentService } from '@/services';
import { NextFunction, Response } from 'express';
import { Request } from 'express-serve-static-core';

class CommentController {
  private commentService = new CommentService();

  public getComments = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const data: BaseCommentDto[] = await this.commentService.getComments();
      res.status(200).json({ data, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public updateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.comment_id);
      const updatedCommentData: UpdateCommentRequestDto = req.body;
      const data: BaseCommentDto = await this.commentService.updateComment(id, updatedCommentData);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public deleteComment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.comment_id);
      const userId = req.user.id;
      await this.commentService.deleteComment({ id, userId });
      res.status(202).json({ message: 'Successfully deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CommentController;
