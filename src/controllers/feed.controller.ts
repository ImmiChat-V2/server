import { FeedService } from '@/services';
import { NextFunction, Request, Response } from 'express';

class FeedController {
  private feedService = new FeedService();

  public getFeed = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.feedService.getFeed();
      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  };
}

export default FeedController;
