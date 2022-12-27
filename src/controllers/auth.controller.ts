import { NextFunction, Request, Response } from 'express';
import { AuthService } from '@/services';
import { RegisterUserRequestDto, LoginUserRequestDto } from '@/dtos';
import { RequestWithUser } from '@/interfaces';

class AuthController {
  public authService = new AuthService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: RegisterUserRequestDto = req.body;
      const { id } = await this.authService.register(userData);
      res.status(201).json({ id, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginUserRequestDto = req.body;
      const { cookie, data } = await this.authService.login(userData);
      res.setHeader('Set-Cookie', [cookie]).status(200).json({ data, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (_req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']).status(200).json({ message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
  public validateAuthentication = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const data = req.user;
      res.status(200).json({ data, message: 'Authenticated' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
