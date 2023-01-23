import { BasePostOfFeedDTO } from '@/dtos/feed.dto';
import { FeedService } from '@/services';
import { NextFunction, Request, Response } from 'express';

class FeedController {
  private feedService = new FeedService();

  public getFeed = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: BasePostOfFeedDTO[] = await this.feedService.getFeed({ userId: Number(req.params.user_id) });
      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  };
}

export default FeedController;
