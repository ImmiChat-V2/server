import { BaseUserDto } from '@/dtos';
import { UserEntity } from '@/entities';

class UserService {
  public async getUsersFromDB(): Promise<BaseUserDto[]> {
    const users: BaseUserDto[] = await UserEntity.find();
    return users;
  }
}

export default UserService;
