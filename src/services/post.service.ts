import { PostEntity } from '@/entities';
import { CreatePostRequestDto, BasePostDto, DeletePostRequestDto, UsersLikedPostDto, UpdatePostRequestDto, LikePostDto } from '@/dtos';
import { HttpException } from '@/exceptions';
import { updateAndReturn } from '@/utils/queryBuilderUtils';
import { pgDataSource } from '@/databases';

class PostService {
  public async createPosts(postData: CreatePostRequestDto): Promise<BasePostDto> {
    const posted: BasePostDto = await PostEntity.create({ ...postData }).save();
    return posted;
  }

  public async updatePost(id: number, postData: UpdatePostRequestDto, userId: number): Promise<BasePostDto> {
    const findPost = await PostEntity.findOne({ where: { id } });
    if (!findPost) throw new HttpException(404, 'Post Not Found');
    if (findPost.userId !== userId) throw new HttpException(401, 'Unauthorized to update post');
    const updatedPost = await updateAndReturn<BasePostDto, UpdatePostRequestDto>(id, postData, PostEntity);
    return updatedPost;
  }

  public async getSinglePost(id: number): Promise<BasePostDto> {
    const findPost = await PostEntity.findOne({ where: { id } });
    if (!findPost) throw new HttpException(404, 'Post Not Found');
    return findPost;
  }

  public async deletePostFromDB({ id, userId }: DeletePostRequestDto): Promise<void> {
    const findPost = await PostEntity.findOne({ where: { id } });
    if (!findPost) throw new HttpException(404, 'Post Not Found');
    if (userId !== findPost.userId) throw new HttpException(401, 'Unauthorized to delete post');
    await PostEntity.delete(id);
  }

  public async getAllPostsFromDB(): Promise<BasePostDto[]> {
    const posts: BasePostDto[] = await PostEntity.find();
    if (posts.length < 1) throw new HttpException(404, 'There are currently no posts');
    return posts;
  }

  public async getLikesFromPost(id: number): Promise<UsersLikedPostDto[]> {
    const getLikes = await PostEntity.find({
      relations: ['likes'],
      where: { id },
      select: { likes: { firstName: true, lastName: true, profilePic: true } },
    });
    return getLikes?.[0].likes || [];
  }

  public async likePost({ id, userId }: LikePostDto): Promise<void> {
    await pgDataSource.createQueryBuilder().relation(PostEntity, 'likes').of(id).add(userId);
  }
}

export default PostService;
