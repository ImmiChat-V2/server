import { BaseCommentDto } from '@/dtos';
import { UpdateCommentRequestDto } from '@/dtos/comments.dto';
import { CommentEntity } from '@/entities';
import { HttpException } from '@/exceptions';
import { updateAndReturn } from '@/utils/queryBuilderUtils';

class CommentService {
  public async getComments(): Promise<BaseCommentDto[]> {
    const comments: BaseCommentDto[] = await CommentEntity.find();
    if (comments.length === 0) throw new HttpException(404, 'No Comments Found');
    return comments;
  }

  public async updateCommentFromDB(comment_id: number, commentData: UpdateCommentRequestDto): Promise<BaseCommentDto> {
    const findComment = await CommentEntity.findOne({ where: { id: comment_id } });
    if (!findComment) throw new HttpException(404, 'Comment Not Found');
    const updatedComment = await updateAndReturn<BaseCommentDto, UpdateCommentRequestDto>(comment_id, commentData, CommentEntity);
    return updatedComment;
  }
  public async getCommentsForPost(postId: number): Promise<BaseCommentDto[]> {
    const postComments: BaseCommentDto[] = await CommentEntity.find({ where: { postId: postId } });
    return postComments;
  }
}

export default CommentService;
