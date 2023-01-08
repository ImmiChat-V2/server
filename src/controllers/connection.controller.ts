import { NextFunction, Response } from 'express';
import { RequestWithUser } from '@/interfaces';
import { ConnectionService } from '@/services';

class ConnectionController {
  private connectionService = new ConnectionService();

  public getUserConnections = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const authUserId = req.user.id;
      const id = Number(req.params.user_id);

      const data = authUserId === id ? await this.connectionService.getAuthUserConnections(id) : await this.connectionService.getUserConnections(id);
      return res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
  public sendConnectionRequest = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const senderId = req.user.id;
      const receiverId = Number(req.params.user_id);
      const data = await this.connectionService.sendConnectionRequest({ senderId, receiverId });
      return res.status(201).json({ data, message: 'Connection request sent.' });
    } catch (error) {
      next(error);
    }
  };
  public acceptConnectionRequest = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const senderId = Number(req.params.user_id);
      const receiverId = req.user.id;
      const data = await this.connectionService.acceptConnectionRequest({ senderId, receiverId });
      return res.status(201).json({ data, message: 'Connection accepted.' });
    } catch (error) {
      next(error);
    }
  };
  public removeConnection = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const senderId = req.user.id;
      const receiverId = Number(req.params.user_id);
      const data = await this.connectionService.removeConnection({ senderId, receiverId });
      return res.status(200).json({ data, message: 'Connection removed.' });
    } catch (error) {
      next(error);
    }
  };
}

export default ConnectionController;
