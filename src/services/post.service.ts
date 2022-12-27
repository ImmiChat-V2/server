import { PostEntity } from '@/entities';
import { CreatePostRequestDto, CreatePostResponseDto } from '@/dtos';

class PostService {
  public async createPosts(postData: CreatePostRequestDto): Promise<CreatePostResponseDto> {
    const posted: CreatePostResponseDto = await PostEntity.create(postData).save();
    return posted;
  }
}

export default PostService;
