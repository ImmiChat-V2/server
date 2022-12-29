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

  public async updateComment(id: number, commentData: UpdateCommentRequestDto): Promise<BaseCommentDto> {
    const findComment = await CommentEntity.findOne({ where: { id } });
    if (!findComment) throw new HttpException(404, 'Comment Not Found');
    const updatedComment = await updateAndReturn<BaseCommentDto, UpdateCommentRequestDto>(id, commentData, CommentEntity);
    return updatedComment;
  }
  public async getCommentsForPost(postId: number): Promise<BaseCommentDto[]> {
    const postComments: BaseCommentDto[] = await CommentEntity.find({ where: { postId: postId } });
    return postComments;
  }
}

export default CommentService;
