import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from '@/config';
import { UserEntity } from '@/entities';
import { HttpException } from '@/exceptions';
import { AuthService } from '@/services';
import { DataStoredInToken, RequestWithUser } from '@/interfaces';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies['RefreshToken'] || null;
  const accessToken = req.cookies['AccessToken'] || null;
  if (!accessToken && !refreshToken) {
    return next(new HttpException(401, 'Authentication token missing'));
  }

  try {
    const { id } = (await verify(accessToken, ACCESS_TOKEN_SECRET_KEY)) as DataStoredInToken;
    const userInfo = await UserEntity.findOne({
      where: { id },
      select: ['id', 'email', 'firstName', 'lastName', 'dateOfBirth', 'language', 'profilePic', 'updatedAt', 'createdAt'],
    });
    req.user = userInfo;
    return next();
  } catch (error) {
    console.error(error);
  }

  try {
    const { id } = (await verify(refreshToken, REFRESH_TOKEN_SECRET_KEY)) as DataStoredInToken;
    const userInfo = await UserEntity.findOne({
      where: { id },
      select: ['id', 'email', 'firstName', 'lastName', 'dateOfBirth', 'language', 'profilePic', 'updatedAt', 'createdAt'],
    });
    req.user = userInfo;
    const authService = new AuthService();
    const newAccessToken = authService.createToken(userInfo, 'access');
    const newAccessTokenCookie = authService.createCookie(newAccessToken, 'access');
    res.setHeader('Set-Cookie', [newAccessTokenCookie]);
    next();
  } catch (error) {
    next(new HttpException(401, 'Invalid token'));
  }
};

export default authMiddleware;
