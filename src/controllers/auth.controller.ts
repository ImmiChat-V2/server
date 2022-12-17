import { CreateUserDto } from '@/dtos/users.dto';
import { User } from '@/interfaces/users.interface';
import { NextFunction, Request, Response } from 'express';
import AuthService from '@/services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { id }: User = await this.authService.signup(userData);
      res.status(201).json({ id, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
