import { NextFunction, Response } from 'express';
import { RequestWithUser } from '@/interfaces';
import { ConnectionService } from '@/services';

class ConnectionController {
  private connectionSerivce = new ConnectionService();

  public getUserConnections = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.user_id);
      const data = await this.connectionSerivce.getUserConnections(id);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

export default ConnectionController;
