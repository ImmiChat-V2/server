import { Request } from 'express';
import { AuthenticateUserRequestDto } from '@/dtos';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: string;
}

export interface RequestWithUser extends Request {
  user: AuthenticateUserRequestDto;
}

export type TokenType = 'access' | 'refresh' | 'shortSpanTestAccess' | 'shortSpanTestRefresh'
export type CookieType = 'access' | 'refresh'