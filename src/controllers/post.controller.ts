import { NextFunction, Request, Response } from 'express';
import { PostService } from '@/services';
import { RegisterUserRequestDto, LoginUserRequestDto, RegisterUserResponseDto } from '@/dtos';
import { RequestWithUser } from '@/interfaces';

class PostController {
    public postService = new PostService();
}

export default PostController