import { NextFunction, Response } from 'express';
import { PostService } from '@/services';
import { BasePostDto, CreatePostRequestDto } from '@/dtos';
import { RequestWithUser } from '@/interfaces';

class PostController {
  private postService = new PostService();

  public createPost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id
      const postData: CreatePostRequestDto = req.body;
      const post : BasePostDto = await this.postService.createPosts({...postData, userId});
      res.status(201).json({ post, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public getPosts = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const data : BasePostDto[] = await this.postService.getPostsFromDB();
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
  
}

export default PostController;
