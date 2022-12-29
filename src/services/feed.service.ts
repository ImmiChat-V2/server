import { BasePostOfFeedDTO } from '@/dtos/feed.dto';
import { PostEntity } from '@/entities';

class FeedService {
  public async getFeed(): Promise<BasePostOfFeedDTO[]> {
    const feed: BasePostOfFeedDTO[] = (await PostEntity.find({
      relations: ['likes', 'comments'],
      select: { likes: { firstName: true, lastName: true, profilePic: true }, comments: { userId: true } },
    })) as unknown as BasePostOfFeedDTO[];
    return feed;
  }
}

export default FeedService;
