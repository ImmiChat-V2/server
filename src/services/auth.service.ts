import { hash } from 'bcrypt';
// import { sign } from 'jsonwebtoken';
import { EntityRepository } from 'typeorm';
// import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
// import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
// import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';

@EntityRepository()
class AuthService {
  public async signup({ password, ...userData }: CreateUserDto): Promise<User> {
    const findUser: User = await UserEntity.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);
    const hashedPassword = await hash(password, 10);
    const createUserData: User = await UserEntity.create({ ...userData, password: hashedPassword }).save();
    return createUserData;
  }
}

export default AuthService;
