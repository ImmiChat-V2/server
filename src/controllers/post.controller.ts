import { NextFunction, Response, Request } from 'express';
import { PostService } from '@/services';
import { BasePostDto, CreatePostRequestDto, UpdatePostRequestDto, DeletePostRequestDto } from '@/dtos';
import { RequestWithUser } from '@/interfaces';

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
      const data = await this.postService.getAllPostsFromDB();
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

export default PostController;
