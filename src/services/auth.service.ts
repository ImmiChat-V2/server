import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { TokenData } from '@/interfaces';
import { UserEntity } from '@/entities';
import { HttpException } from '@/exceptions';
import { RegisterUserRequestDto, BaseUserResponseDTO, BaseUserDto, LoginUserRequestDto } from '@/dtos';
import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from '@/config';
import { CookieType, TokenType } from '@/interfaces/auth.interface';

class AuthService extends Repository<UserEntity> {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super();
  }

  public createToken(data: BaseUserResponseDTO, type: TokenType): TokenData {
    const [expiresIn, secretKey] = (() => {
      if (type === 'access') return ['600000', ACCESS_TOKEN_SECRET_KEY];
      else if (type === 'refresh') return ['30 days', REFRESH_TOKEN_SECRET_KEY];
      else if (type === 'shortSpanTestAccess') return ['0', ACCESS_TOKEN_SECRET_KEY];
      else return ['0', REFRESH_TOKEN_SECRET_KEY];
    })();
    return { expiresIn, token: sign({ ...data }, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData, type: CookieType): string {
    const { token, expiresIn } = tokenData;
    const tokenType = type === 'access' ? 'AccessToken' : 'RefreshToken';
    return `${tokenType}=${token}; HttpOnly; Max-Age=${expiresIn};`;
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
  public createTestCookie(tokenType: TokenType, cookieType: CookieType) {
    const mockUser: BaseUserResponseDTO = {
      id: 1,
      email: 'test@email.com',
      firstName: 'test',
      lastName: 'test',
      language: 'language',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const testToken = this.createToken(mockUser, tokenType);
    if (cookieType === 'access') return this.createCookie(testToken, 'access');
    return this.createCookie(testToken, 'refresh');
  }
}

export default AuthService;
