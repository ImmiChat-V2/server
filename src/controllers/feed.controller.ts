import { BasePostOfFeedDTO } from '@/dtos/feed.dto';
import { FeedService } from '@/services';
import { NextFunction, Request, Response } from 'express';

type FeedQueryParams = {
  categoryName: string;
};

type FeedPathParam = {
  user_id: string;
};

class FeedController {
  private feedService = new FeedService();

  public getFeed = async (req: Request<FeedPathParam, {}, {}, FeedQueryParams>, res: Response, next: NextFunction) => {
    try {
      const { categoryName } = req.query;
      const data: BasePostOfFeedDTO[] = await this.feedService.getFeed({ userId: Number(req.params.user_id), categoryName });
      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  };
}

export default FeedController;
