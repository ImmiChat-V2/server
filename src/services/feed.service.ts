import { BasePostOfFeedDTO } from '@/dtos/feed.dto';
import { PostEntity } from '@/entities';

class FeedService {
  public async getFeed(): Promise<BasePostOfFeedDTO[]> {
    const feed: BasePostOfFeedDTO[] = (await PostEntity.find({
      relations: ['likes', 'comments', 'user'],
      select: {
        likes: { id: true },
        comments: { userId: true },
        user: { firstName: true, lastName: true, profilePic: true },
      },
    })) as unknown as BasePostOfFeedDTO[];
    return feed;
  }
}

export default FeedService;
