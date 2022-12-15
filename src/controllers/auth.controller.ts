import { CreateUserDto } from '@/dtos/users.dto';
import { HttpException } from '@/exceptions/HttpException';
import { User } from '@/interfaces/users.interface';
import { NextFunction, Request, Response } from 'express';
import AuthService from '@/services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      console.log(userData);
      const signupUserData: User = await this.authService.signup(userData);
      console.log(signupUserData);
      res.status(201).json({ data: signupUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
