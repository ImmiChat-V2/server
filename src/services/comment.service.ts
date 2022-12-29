import { CommentEntity } from '@/entities';
import { BaseCommentDto } from '@/dtos';
import { HttpException } from '@/exceptions';

class CommentService {
  public async getComments(): Promise<BaseCommentDto[]> {
    const comments: BaseCommentDto[] = await CommentEntity.find();
    if (comments.length === 0) throw new HttpException(404, 'No Comments Found');
    return comments;
  }
  public async getCommentsForPost(postId: number): Promise<BaseCommentDto[]> {
    const postComments: BaseCommentDto[] = await CommentEntity.find({ where: { postId: postId } });
    return postComments;
  }
}

export default CommentService;
