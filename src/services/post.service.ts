import { PostEntity } from '@/entities';
import { CreatePostRequestDto, BasePostDto } from '@/dtos';
import { HttpException } from '@/exceptions';
import { UpdatePostRequestDto } from '@/dtos/posts.dto';

class PostService {
  public async createPosts(postData: CreatePostRequestDto): Promise<BasePostDto> {
    const posted: BasePostDto = await PostEntity.create({ ...postData }).save();
    return posted
  }

  public async updatePost(id: number, postData: UpdatePostRequestDto, userId: number): Promise<BasePostDto> {
    const findPost = await PostEntity.findOne({ where: { id } });
    if (!findPost) throw new HttpException(404, 'Post Not Found');
    if (findPost.userId !== userId) throw new HttpException(401, 'Unauthorized to update post');
    await PostEntity.update(id, { ...postData });
    return findPost;
  }

  public async getSinglePost(id: number): Promise<BasePostDto> {
    const findPost = await PostEntity.findOne({ where: { id } });
    if (!findPost) throw new HttpException(404, 'Post Not Found');
    return findPost;
  }
}

export default PostService;
