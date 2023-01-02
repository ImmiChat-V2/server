import { CommentController } from '@/controllers';
import { Routes } from '@/interfaces';
import { AuthMiddleware } from '@/middlewares';
import { Router } from 'express';

class CommentRoute implements Routes {
  public readonly path = '/comments';
  public readonly router = Router();
  private commentController = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.commentController.getComments);
    this.router.put(`${this.path}/:comment_id`, AuthMiddleware, this.commentController.updateComment);
    this.router.delete(`${this.path}/:comment_id`, AuthMiddleware, this.commentController.deleteComment);
    this.router.post(`/posts/:post_id${this.path}`, AuthMiddleware, this.commentController.postComment);
    this.router.get(`/posts/:post_id${this.path}`, AuthMiddleware, this.commentController.getCommentsForPost);
    this.router.get(`${this.path}/:comment_id/likes`, AuthMiddleware, this.commentController.getLikesFromComment);
    this.router.post(`${this.path}/:comment_id/likes`, AuthMiddleware, this.commentController.likeComment);
    this.router.delete(`${this.path}/:comment_id/likes`, AuthMiddleware, this.commentController.deleteCommentLike);
  }
}

export default CommentRoute;
