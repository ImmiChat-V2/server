import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { TokenData } from '@/interfaces';
import { UserEntity } from '@/entities';
import { HttpException } from '@/exceptions';
import { RegisterUserRequestDto, BaseUserResponseDTO, BaseUserDto, LoginUserRequestDto } from '@/dtos';
import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from '@/config';

class AuthService extends Repository<UserEntity> {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super();
  }

  public createToken(data: BaseUserResponseDTO, type: 'access' | 'refresh'): TokenData {
    if (type === 'access') {
      const expiresIn = '600000';
      return { expiresIn, token: sign({ ...data }, ACCESS_TOKEN_SECRET_KEY, { expiresIn }) };
    } else {
      const expiresIn = '30 days';
      return { expiresIn, token: sign({ ...data }, REFRESH_TOKEN_SECRET_KEY, { expiresIn }) };
    }
  }

  public createCookie(tokenData: TokenData, type: 'access' | 'refresh'): string {
    if (type === 'access') return `AccessToken=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    else {
      return `RefreshToken=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
  }

  public async register({
    password,
    ...userData
  }: RegisterUserRequestDto): Promise<{ accessTokenCookie: string; refreshTokenCookie: string; data: BaseUserResponseDTO }> {
    const foundUser: BaseUserResponseDTO = await UserEntity.findOne({ where: { email: userData.email } });
    if (foundUser) throw new HttpException(409, `This email ${userData.email} already exists`);
    const hashedPassword = await hash(password, 10);
    // Extract out the password from the response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: foundPassword, ...data }: BaseUserDto = await UserEntity.create({ ...userData, password: hashedPassword }).save();
    const accessToken = this.createToken(data, 'access');
    const refreshToken = this.createToken(data, 'refresh');
    const accessTokenCookie = this.createCookie(accessToken, 'access');
    const refreshTokenCookie = this.createCookie(refreshToken, 'refresh');
    return { accessTokenCookie, refreshTokenCookie, data };
  }

  public async login({
    email,
    password,
  }: LoginUserRequestDto): Promise<{ accessTokenCookie: string; refreshTokenCookie: string; data: BaseUserResponseDTO }> {
    const foundUser: BaseUserDto = await UserEntity.findOne({ where: { email: email } });
    if (!foundUser) {
      throw new HttpException(404, `This email ${email} doesn't exist`);
    }
    const { password: foundPassword, ...userResponse } = foundUser;
    const isCorrectPassword = await compare(password, foundPassword);
    if (!isCorrectPassword) {
      throw new HttpException(409, 'Password does not match');
    }
    const accessToken = this.createToken(foundUser, 'access');
    const refreshToken = this.createToken(foundUser, 'refresh');
    const accessTokenCookie = this.createCookie(accessToken, 'access');
    const refreshTokenCookie = this.createCookie(refreshToken, 'refresh');
    return { accessTokenCookie, refreshTokenCookie, data: userResponse };
  }
}

export default AuthService;
