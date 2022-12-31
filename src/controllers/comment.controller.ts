import { BaseCommentDto, CreateCommentRequestDto, UpdateCommentRequestDto, UsersLikedCommentsDto } from '@/dtos';
import { HttpException } from '@/exceptions';
import { RequestWithUser } from '@/interfaces';
import { CommentService } from '@/services';
import { NextFunction, Response } from 'express';
import { Request } from 'express-serve-static-core';

class CommentController {
  private commentService = new CommentService();

  public getComments = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const data: BaseCommentDto[] = await this.commentService.getComments();
      res.status(200).json({ data, message: 'Success' });
    } catch (error) {
      next(error);
    }
  };

  public getCommentsForPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.post_id);
      const data: BaseCommentDto[] = await this.commentService.getCommentsForPost(id);
      res.status(200).json({ data });
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

  public postComment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const postId = Number(req.params.post_id);
      const userId = req.user.id;
      const commentData: CreateCommentRequestDto = req.body;
      const data: BaseCommentDto = await this.commentService.postComment({ ...commentData, postId, userId });
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public getLikesFromComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.comment_id);
      const data: UsersLikedCommentsDto[] = await this.commentService.getLikesFromComment(id);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public likeComment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.comment_id);
      const userId = req.user.id;
      await this.commentService.likeComment({ id, userId });
      res.status(201).json('Comment Liked');
    } catch (error) {
      next(new HttpException(400, 'Already liked'));
    }
  };

  public deleteCommentLike = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.post_id);
      const userId = req.user.id;
      await this.commentService.deleteCommentLike(id, userId);
      res.status(202).json({ message: `Like on comment ${id} deleted` });
    } catch (error) {
      next(error);
    }
  };
}

export default CommentController;
