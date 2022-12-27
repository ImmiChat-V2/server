import { PostEntity } from '@/entities';
import { CreatePostRequestDto, BasePostDto} from '@/dtos';
import { pgDataSource } from '@/databases';

class PostService{
  public async createPosts(postData: CreatePostRequestDto): Promise<BasePostDto> {
    const post = new PostEntity();
    post.userId = postData.userId;
    post.content = postData.content;
    post.categoryName = postData.categoryName;
    post.media = postData.media
    const posted: BasePostDto = await pgDataSource.manager.save(post);
    return posted;
  }

  public async updatePost(postData: BasePostDto) : Promise<BasePostDto> { 
    
    return
  }
}

export default PostService;
