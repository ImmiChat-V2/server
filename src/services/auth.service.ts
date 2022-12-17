import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { User, DataStoredInToken, TokenData } from '@interfaces';
import { UserEntity } from '@entities';
import { HttpException } from '@exceptions';
import { CreateUserDto } from '@dtos';

import { SECRET_KEY } from '@config';

class AuthService extends Repository<UserEntity> {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super();
  }

  private createToken({ id }: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id };
    const expiresIn = 100;
    return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
  }

  private createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public async register({ password, ...userData }: CreateUserDto): Promise<User> {
    const foundUser: User = await UserEntity.findOne({ where: { email: userData.email } });
    if (foundUser) throw new HttpException(409, `This email ${userData.email} already exists`);
    const hashedPassword = await hash(password, 10);
    const createUserData: User = await UserEntity.create({ ...userData, password: hashedPassword }).save();
    return createUserData;
  }

  public async login({ email, password }: CreateUserDto): Promise<{ cookie: string; foundUser: User }> {
    const foundUser: User = await UserEntity.findOne({ where: { email: email } });
    if (!foundUser) {
      throw new HttpException(404, `This email ${email} doesn't exist`);
    }
    const isCorrectPassword = await compare(password, foundUser.password);
    if (!isCorrectPassword) {
      throw new HttpException(409, 'Password does not match');
    }
    const token = this.createToken(foundUser);
    const cookie = this.createCookie(token);
    return { cookie, foundUser };
  }
}

export default AuthService;
