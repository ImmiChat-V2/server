import { CreateUserDto } from '@/dtos/users.dto';
import { User } from '@/interfaces/users.interface';
import { NextFunction, Request, Response } from 'express';
import AuthService from '@/services/auth.service';

class AuthController {
  public authService = new AuthService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { id }: User = await this.authService.register(userData);
      res.status(201).json({ id, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const {
        cookie,
        foundUser: { id },
      } = await this.authService.login(userData);
      res.setHeader('Set-Cookie', [cookie]).status(200).json({ id, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
