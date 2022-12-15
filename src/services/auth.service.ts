import { hash } from 'bcrypt';
// import { sign } from 'jsonwebtoken';
import { EntityRepository } from 'typeorm';
// import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
// import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
// import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { UserEntity } from '@entities/users.entity';

@EntityRepository()
class AuthService {
  public async signup({ password, ...userData }: CreateUserDto): Promise<User> {
    // const findUser:
    const hashedPassword = await hash(password, 10);
    const createUserData: User = await UserEntity.create({ ...userData, password: hashedPassword });
    return createUserData;
  }
}

export default AuthService;
