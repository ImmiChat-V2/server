import { PostEntity } from '@/entities';
import { CreatePostRequestDto, BasePostDto} from '@/dtos';
import { pgDataSource } from '@/databases';
import { resolve } from 'path';
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

  public async updatePost(postData: BasePostDto) : Promise<BasePostDto> {
    const currentPost = postData.id
    const findPost = await PostEntity.findOne({where:{id:currentPost}})
    console.log(findPost)
    if (findPost){
      findPost.content = postData.content
      findPost.categoryName = postData.categoryName
      findPost.media = postData.media
    } else {
      throw new HttpException(404,'Post Not Found')
    }
    findPost.save()
    console.log(findPost)
    return findPost
  }
}

export default PostService;
