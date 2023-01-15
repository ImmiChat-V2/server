import { AuthService } from '@/services';
import { UserEntity, PostEntity, CommentEntity } from '@/entities';
import request from 'supertest';
import { CreatePostRequestDto, RegisterUserRequestDto, CreateCommentRequestDto } from '@/dtos';

const authService = new AuthService();
const testAccessCookie = authService.createTestCookie('access', 'access');

type RequestWithCookieType = {
  readonly app: Express.Application;
  readonly path: string;
};

export const requestWithCookie = ({ app, path }: RequestWithCookieType) => {
  return request(app).get(path).set('Cookie', [testAccessCookie]);
};

const userSeedData: RegisterUserRequestDto[] = [
  {
    email: 'test1@gmail.com',
    password: '123',
    firstName: 'test1',
    lastName: 'user',
    language: 'Chinese',
  },
  {
    email: 'test2@gmail.com',
    password: '123',
    firstName: 'test2',
    lastName: 'user',
    language: 'Chinese',
  },
  {
    email: 'test3@gmail.com',
    password: '123',
    firstName: 'test3',
    lastName: 'user',
    language: 'Chinese',
  },
];
const postSeedData: CreatePostRequestDto[] = [
  { userId: 1, content: 'Post 1', categoryName: 'All' },
  { userId: 1, content: 'Post 2', categoryName: 'All' },
  { userId: 1, content: 'Post 3', categoryName: 'All' },
  { userId: 2, content: 'Post 4', categoryName: 'All' },
];

const commentSeedData: CreateCommentRequestDto[] = [
  { userId: 1, postId: 1, content: 'comment on post 1' },
  { userId: 1, postId: 4, content: 'comment on post 4' },
  { userId: 2, postId: 2, content: 'comment on post 2' },
];

export const seedingTest = async () => {
  for (let i = 0; i < userSeedData.length; i++) {
    await UserEntity.create({ ...userSeedData[i] }).save();
  }

  for (let i = 0; i < postSeedData.length; i++) {
    await PostEntity.create({ ...postSeedData[i] }).save();
  }

  for (let i = 0; i < commentSeedData.length; i++) {
    await CommentEntity.create({ ...commentSeedData[i] }).save();
  }
};
