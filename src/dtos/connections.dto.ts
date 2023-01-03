import { ConnectedUserInfoResponseDto } from './users.dto';

export type BaseConnectionsDto = {
  readonly id: number;
  readonly senderId: number;
  readonly receiverId: number;
  readonly connected: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export type GetUserConnectionsResponseDto = {
  id: number;
  connected: boolean;
  connectionInfo: ConnectedUserInfoResponseDto;
}[];

export type SendConnectionRequestDto = Pick<BaseConnectionsDto, 'senderId' | 'receiverId'>;

export type AcceptConnectionRequestDto = Pick<BaseConnectionsDto, 'senderId' | 'receiverId'>;
