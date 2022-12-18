import { NextFunction, Request, RequestHandler, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { HttpException } from '@exceptions';

type validationMiddlewareParams = {
  type: any;
  value: 'body' | 'query' | 'params';
  skipMissingProperties?: boolean;
  whitelist?: boolean;
  forbidNonWhitelisted?: boolean;
};

const validationMiddleware = ({
  type,
  value = 'body',
  skipMissingProperties,
  whitelist,
  forbidNonWhitelisted,
}: validationMiddlewareParams): RequestHandler => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const instance = plainToInstance(type, req[value]);
    const validatorOptions: ValidatorOptions = {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    };
    try {
      const errors = await validate(instance, validatorOptions);
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new HttpException(400, message));
      } else {
        next();
      }
    } catch {
      next(new HttpException(400, 'Something went wrong'));
    }
  };
};

export default validationMiddleware;
