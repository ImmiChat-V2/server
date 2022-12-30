import { CommentEntity } from '@/entities';
import { BaseCommentDto, DeleteCommentRequestDto, UpdateCommentRequestDto, CreateCommentRequestDto } from '@/dtos';
import { HttpException } from '@/exceptions';
import { updateAndReturn } from '@/utils/queryBuilderUtils';

class CommentService {
  public async getComments(): Promise<BaseCommentDto[]> {
    const comments: BaseCommentDto[] = await CommentEntity.find();
    if (comments.length === 0) throw new HttpException(404, 'No Comments Found');
    return comments;
  }

  public async getCommentsForPost(id: number): Promise<BaseCommentDto[]> {
    const postComments: BaseCommentDto[] = await CommentEntity.find({ where: { postId: id } });
    return postComments;
  }

  public async updateComment(id: number, commentData: UpdateCommentRequestDto): Promise<BaseCommentDto> {
    const findComment = await CommentEntity.findOne({ where: { id } });
    if (!findComment) throw new HttpException(404, 'Comment Not Found');
    const updatedComment = await updateAndReturn<BaseCommentDto, UpdateCommentRequestDto>(id, commentData, CommentEntity);
    return updatedComment;
  }

  public async deleteComment({ id, userId }: DeleteCommentRequestDto): Promise<void> {
    const findComment = await CommentEntity.findOne({ where: { id } });
    if (!findComment) throw new HttpException(404, 'Comment Not Found');
    if (userId !== findComment.userId) throw new HttpException(401, 'Unauthorized to delete post');
    await CommentEntity.delete(id);
  }

  public async postComment(commentData: CreateCommentRequestDto): Promise<BaseCommentDto> {
    const posted: BaseCommentDto = await CommentEntity.create({ ...commentData }).save();
    return posted;
  }

  public async getLikesFromComment(id: number): Promise<UsersLikedCommentDto[]> {
    const getLikes = await CommentEntity.find({
      relations: ['likes'],
      where: { id: id },
      select: { likes: { firstName: true, lastName: true, profilePic: true } },
    });
    if (getLikes.length === 0) throw new HttpException(404, '0 likes');
    return getLikes[0].likes;
  }
}

export default CommentService;
