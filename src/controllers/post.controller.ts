import { NextFunction, Response } from 'express';
import { PostService } from '@/services';
import { BasePostDto, CreatePostRequestDto, UpdatePostRequestDto } from '@/dtos';
import { RequestWithUser } from '@/interfaces';

class PostController {
  private postService = new PostService();

  public createPost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id
      const postData: CreatePostRequestDto = req.body;
      const data : BasePostDto = await this.postService.createPosts({...postData, userId});
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

  public getSinglePost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const postId = req.body
      const getPost: BasePostDto = await this.postService.getSinglePost(postId)
      res.status(201).json({ getPost, message: 'success'})
    } catch (error) {
      next(error)
    }
  };
};

export default PostController;
