import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@/config';
import { UserEntity } from '@/entities';
import { HttpException } from '@/exceptions';
import { DataStoredInToken, RequestWithUser } from '@/interfaces';

const authMiddleware = async (req: RequestWithUser, _res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    
    if (Authorization) {
      const { id } = (await verify(Authorization, SECRET_KEY)) as DataStoredInToken;
      const foundUser = await UserEntity.findOne({
        where: { id },
        select: ['id', 'email', 'firstName', 'lastName', 'dateOfBirth', 'language', 'profilePic', 'updatedAt', 'createdAt'],
      });
      if (foundUser) {
        req.user = foundUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong Authentication token'));
  }
};

export default authMiddleware;
