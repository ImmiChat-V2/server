import { PostEntity } from '@/entities';

class FeedService {
  public async getFeed() {
    const feed = await PostEntity.find({
      relations: ['likes', 'comments'],
      select: { likes: { firstName: true, lastName: true, profilePic: true }, comments: { userId: true } },
    });
    return feed;
  }
}

export default FeedService;
