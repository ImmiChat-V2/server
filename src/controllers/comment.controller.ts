import { NextFunction, Request, Response } from 'express';
import { CommentService } from '@/services';
import { BaseCommentDto } from '@/dtos';
import { RequestWithUser } from '@/interfaces';

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
  public getCommentsForPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = Number(req.params.post_id);
      const data: BaseCommentDto[] = await this.commentService.getCommentsForPost(postId);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

export default CommentController;
