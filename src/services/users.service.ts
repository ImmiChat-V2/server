import { BaseUserDto, BasePostDto } from '@/dtos';
import { UserEntity, PostEntity } from '@/entities';

class UserService {
  public async getUsersFromDB(): Promise<BaseUserDto[]> {
    const users: BaseUserDto[] = await UserEntity.find();
    return users;
  }
  public async getPostsByUser(userId: number): Promise<BasePostDto[]> {
    const posts: BasePostDto[] = await PostEntity.find({
      where: {
        id: userId,
      },
    });
    return posts;
  }
}

export default UserService;
