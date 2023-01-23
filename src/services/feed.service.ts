import { BasePostOfFeedDTO } from '@/dtos';
import { PostEntity } from '@/entities';

class FeedService {
  public async getFeed(userId?: number): Promise<BasePostOfFeedDTO[]> {
    const feed: BasePostOfFeedDTO[] = (await PostEntity.find({
      relations: ['likes', 'comments', 'user'],
      where: {
        ...(userId && { userId }),
      },
      select: {
        likes: { id: true },
        comments: { userId: true },
        user: { firstName: true, lastName: true, profilePic: true },
      },
      order: {
        updatedAt: 'DESC',
      },
    })) as unknown as BasePostOfFeedDTO[];
    return feed;
  }
}

export default FeedService;
