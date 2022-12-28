import { PostEntity } from '@/entities';
import { CreatePostRequestDto, BasePostDto} from '@/dtos';
import { pgDataSource } from '@/databases';
import { HttpException } from '@/exceptions';

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

  public async getPostsFromDB(): Promise<BasePostDto[]> {
    const posts: BasePostDto[] = await PostEntity.find();
    if (posts.length < 1) throw new HttpException(409, 'There are currently no posts');
    return posts;
  }
  
}

export default PostService;
