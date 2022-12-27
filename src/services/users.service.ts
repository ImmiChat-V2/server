import { BaseUserDto } from '@/dtos';
import { UserEntity } from '@/entities';
import { HttpException } from '@/exceptions';
import { isEmpty } from '@/utils/util';

class UserService {
  public async getUsersFromDB(): Promise<BaseUserDto[]> {
    const users: BaseUserDto[] = await UserEntity.find();
    return users;
  }

  public async getSpecificUserFromDB(ID: number): Promise<BaseUserDto> {
    // if (isEmpty(ID)) throw new HttpException(400, 'USER ID IS EMPTY');

    const user: BaseUserDto = await UserEntity.findOne({ where: { id: ID } });
    if (!user) throw new HttpException(409, `USER WITH ID ${ID} DOES NOT EXIST`);

    return user;
  }

}

export default UserService;
