import { BasePostOfFeedDTO, ProfileFeed } from '@/dtos';
import { PostEntity } from '@/entities';

class FeedService {
  public async getFeed({ userId, categoryName }: ProfileFeed): Promise<BasePostOfFeedDTO[]> {
    const feed: BasePostOfFeedDTO[] = (await PostEntity.find({
      relations: ['likes', 'comments', 'user'],
      where: {
        ...(userId && { userId }),
        ...(categoryName && {categoryName})
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
