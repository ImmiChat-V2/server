import { PostEntity } from '@/entities';
import { CreatePostRequestDto, BasePostDto} from '@/dtos';

class PostService{
  public async createPosts(postData: CreatePostRequestDto): Promise<BasePostDto> {
    const post = new PostEntity();
    post.userId = postData.userId;
    post.content = postData.content;
    post.categoryName = postData.categoryName;
    post.media = postData.media
    const posted: BasePostDto = await PostEntity.create(post).save();
    return posted;
  }
}

export default PostService;
