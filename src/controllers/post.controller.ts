import { NextFunction, Response, Request } from 'express';
import { PostService } from '@/services';
import { BasePostDto, CreatePostRequestDto, UpdatePostRequestDto, UsersLikedPostDto } from '@/dtos';
import { RequestWithUser } from '@/interfaces';
import { HttpException } from '@/exceptions';

class PostController {
  private postService = new PostService();

  public createPost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const postData: CreatePostRequestDto = req.body;
      const data: BasePostDto = await this.postService.createPosts({ ...postData, userId });
      res.status(200).json({ data, message: 'Success' });
    } catch (error) {
      next(error);
    }
  };

  public updatePost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const updatedPostData: UpdatePostRequestDto = req.body;
      const id = Number(req.params.post_id);
      const data: BasePostDto = await this.postService.updatePost(id, updatedPostData, userId);
      res.status(200).json({ data, message: 'Success' });
    } catch (error) {
      next(error);
    }
  };

  public getSinglePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.post_id);
      const data: BasePostDto = await this.postService.getSinglePost(id);
      res.status(200).json({ data, message: 'Success' });
    } catch (error) {
      next(error);
    }
  };

  public deletePost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.post_id);
      const userId = req.user.id;
      await this.postService.deletePostFromDB({ id, userId });
      res.status(202).json({ message: 'Successfully deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getPosts = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const data: BasePostDto[] = await this.postService.getAllPostsFromDB();
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public getLikesFromPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.post_id);
      const data: UsersLikedPostDto[] = await this.postService.getLikesFromPost(id);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public likePost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const id = Number(req.params.post_id);
      await this.postService.likePost({ userId, id });
      res.status(201).json({ message: 'Post Liked' });
    } catch (error) {
      next(new HttpException(400, 'Already liked'));
    }
  };

  public deletePostLike = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.post_id);
      const userId = req.user.id;
      await this.postService.deletePostLike({ id, userId });
      res.status(202).json({ message: `Like on post ${id} deleted` });
    } catch (error) {
      next(new HttpException(400, 'User has not liked this post'));
    }
  };
}

export default PostController;
