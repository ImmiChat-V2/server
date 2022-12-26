export type BaseUserDto = {
  readonly id: number;
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly language: string;
  readonly profilePic?: string;
  readonly dateOfBirth?: Date;
  readonly updatedAt: Date;
  readonly createdAt: Date;
};

export type LoginUserRequestDto = Pick<BaseUserDto, 'email' | 'password'>;
export type RegisterUserRequestDto = Omit<BaseUserDto, 'id'>;
export type AuthenticateUserRequestDto = Pick<BaseUserDto, 'id'>;
export type BaseUserResponseDTO = Omit<BaseUserDto, 'password'>;
