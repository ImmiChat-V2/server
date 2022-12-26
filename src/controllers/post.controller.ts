import { NextFunction, Request, Response } from 'express';
import { PostService } from '@/services';
import { BasePostDto, CreatePostRequestDto } from '@/dtos';

class PostController {
  public postService = new PostService();

  public createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postData: CreatePostRequestDto = req.body;
      const { id }: CreatePostResponseDto = await this.postService.createPosts(postData);
      res.status(201).json({ id, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
}

export default PostController;
