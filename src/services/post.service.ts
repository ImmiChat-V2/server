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

  public async updatePost(postData: BasePostDto, userId: number) : Promise<BasePostDto> {
    const currentPost = postData.id
    const currentUser = userId
    const findPost = await PostEntity.findOne({where:{id:currentPost, userId: currentUser}})
    console.log(findPost)
    if (!findPost){
      throw new HttpException(404,'Post Not Found')
    }
    if (postData.content.length > 1) findPost.content = postData.content
    if (postData.categoryName.length > 1) findPost.categoryName = postData.categoryName
    if (postData.media.length > 1) findPost.media = postData.media
    findPost.save()
    console.log(findPost)
    return findPost
  }
}

export default PostService;
