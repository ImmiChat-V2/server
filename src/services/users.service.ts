import { BaseUserDto } from '@/dtos';
import { UserEntity } from '@/entities';
import { HttpException } from '@/exceptions';

class UserService {
  public async getUsersFromDB(): Promise<BaseUserDto[]> {
    const users: BaseUserDto[] = await UserEntity.find();
    return users;
  }

  public async getSpecificUserFromDB(user_id: number): Promise<BaseUserDto> {
    const user: BaseUserDto = await UserEntity.findOne({ where: { id: user_id } });
    if (!user) throw new HttpException(409, `USER WITH ID ${user_id} DOES NOT EXIST`);

    return user;
  }

}

export default UserService;
