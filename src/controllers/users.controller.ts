import { BaseUserDto, BasePostDto, BaseUserResponseDTO, BasePostOfFeedDTO } from '@/dtos';
import { UpdateUserRequestDto } from '@/dtos/users.dto';
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

  public getPostsByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.user_id);
      const data: BasePostOfFeedDTO[] = await this.usersService.getPostsByUser(userId);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public getSpecificUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const data: BaseUserResponseDTO = await this.usersService.getSpecificUserFromDB(userId);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.user_id);
      const updatedUserData: UpdateUserRequestDto = req.body;
      const data: BaseUserDto = await this.usersService.updateUserFromDB(userId, updatedUserData);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
