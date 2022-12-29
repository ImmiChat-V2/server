import { BaseUserDto } from '@/dtos';
import { UpdateUserRequestDto } from '@/dtos/users.dto';
import { UserEntity } from '@/entities';
import { HttpException } from '@/exceptions';
import { updateAndReturn } from '@/utils/queryBuilderUtils';

class UserService {
  public async getUsersFromDB(): Promise<BaseUserDto[]> {
    const users: BaseUserDto[] = await UserEntity.find();
    return users;
  }

  public async getSpecificUserFromDB(userId: number): Promise<BaseUserDto> {
    const user: BaseUserDto = await UserEntity.findOne({ where: { id: userId } });
    if (!user) throw new HttpException(409, `USER WITH ID ${userId} DOES NOT EXIST`);

    return user;
  }

  public async updateUserFromDB(userId: number, userData: UpdateUserRequestDto): Promise<BaseUserDto> {
    const findUser = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, 'User Not Found');
    const updatedUser = await updateAndReturn<BaseUserDto, UpdateUserRequestDto>(userId, userData, UserEntity);
    return updatedUser;
  }
}

export default UserService;
