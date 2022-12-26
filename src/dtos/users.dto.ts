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
export type BaseUserRequestDTO = Omit<BaseUserDto, 'updatedAt' | 'createdAt'>;
export type BaseUserResponseDTO = Omit<BaseUserDto, 'password'>;

export type LoginUserRequestDto = Pick<BaseUserRequestDTO, 'email' | 'password'>;
export type RegisterUserRequestDto = Omit<BaseUserRequestDTO, 'id'>;
export type AuthenticateUserRequestDto = Pick<BaseUserRequestDTO, 'id'>;
