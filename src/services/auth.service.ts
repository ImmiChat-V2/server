import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { TokenData } from '@/interfaces';
import { UserEntity } from '@/entities';
import { HttpException } from '@/exceptions';
import { RegisterUserRequestDto, BaseUserResponseDTO, BaseUserDto, LoginUserRequestDto } from '@/dtos';
import { SECRET_KEY } from '@/config';

class AuthService extends Repository<UserEntity> {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super();
  }

  private createToken(data: BaseUserResponseDTO): TokenData {
    const time = 3600 * 100;
    const expiresIn = String(time);
    return { expiresIn, token: sign({ ...data }, SECRET_KEY, { expiresIn }) };
  }

  private createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public async register({ password, ...userData }: RegisterUserRequestDto): Promise<{ cookie: string; data: BaseUserResponseDTO }> {
    const foundUser: BaseUserResponseDTO = await UserEntity.findOne({ where: { email: userData.email } });
    if (foundUser) throw new HttpException(409, `This email ${userData.email} already exists`);
    const hashedPassword = await hash(password, 10);
    // Extract out the password from the response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: foundPassword, ...data }: BaseUserDto = await UserEntity.create({ ...userData, password: hashedPassword }).save();
    const token = this.createToken(data);
    const cookie = this.createCookie(token);
    return { cookie, data };
  }

  public async login({ email, password }: LoginUserRequestDto): Promise<{ cookie: string; data: BaseUserResponseDTO }> {
    const foundUser: BaseUserDto = await UserEntity.findOne({ where: { email: email } });
    if (!foundUser) {
      throw new HttpException(404, `This email ${email} doesn't exist`);
    }
    const { password: foundPassword, ...userResponse } = foundUser;
    const isCorrectPassword = await compare(password, foundPassword);
    if (!isCorrectPassword) {
      throw new HttpException(409, 'Password does not match');
    }
    const token = this.createToken(foundUser);
    const cookie = this.createCookie(token);
    return { cookie, data: userResponse };
  }
}

export default AuthService;
