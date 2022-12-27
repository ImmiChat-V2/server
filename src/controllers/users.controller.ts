import { BaseUserDto } from '@/dtos';
import UserService from '@/services/users.service';
import { NextFunction, Request, Response } from 'express';

class UsersController {
  public usersService = new UserService();

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: BaseUserDto[] = await this.usersService.getUsersFromDB();
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public getSpecificUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ID = Number(req.params.id);
      const userData: BaseUserDto = await this.usersService.getSpecificUserFromDB(ID);
      res.status(200).json({ data: userData });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
