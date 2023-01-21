import { BaseUserDto, BasePostDto, BaseUserResponseDTO, BasePostOfFeedDTO } from '@/dtos';
import { UserEntity, PostEntity } from '@/entities';
import { UpdateUserRequestDto } from '@/dtos/users.dto';
import { HttpException } from '@/exceptions';
import { updateAndReturn } from '@/utils/queryBuilderUtils';

class UserService {
  public async getUsersFromDB(): Promise<BaseUserDto[]> {
    const users: BaseUserDto[] = await UserEntity.find();
    return users;
  }

  public async getPostsByUser(userId: number): Promise<BasePostOfFeedDTO[]> {
    const posts: BasePostOfFeedDTO[] = await PostEntity.find({
      relations: ['likes', 'comments', 'user'],
      where: {
        userId,
      },
      select: {
        likes: { id: true },
        comments: { userId: true },
        user: { firstName: true, lastName: true, profilePic: true },
      },
      order: {
        updatedAt: 'DESC',
      },
    });
    return posts;
  }

  public async getSpecificUserFromDB(userId: number): Promise<BaseUserResponseDTO> {
    const user: BaseUserDto = await UserEntity.findOne({ where: { id: userId } });
    if (!user) throw new HttpException(409, `User with id ${userId} does not exist`);
    const { password, ...userWithoutPass } = user;

    return userWithoutPass;
  }

  public async updateUserFromDB(userId: number, userData: UpdateUserRequestDto): Promise<BaseUserDto> {
    const findUser = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, 'User Not Found');
    const updatedUser = await updateAndReturn<BaseUserDto, UpdateUserRequestDto>(userId, userData, UserEntity);
    return updatedUser;
  }
}

export default UserService;
