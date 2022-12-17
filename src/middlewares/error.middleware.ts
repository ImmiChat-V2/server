import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions';

const errorMiddleware = (error: HttpException, _req: Request, res: Response, next: NextFunction) => {
  try {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
