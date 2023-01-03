import { ConnectionsEntity } from '@/entities';
import { BaseConnectionsDto, GetUserConnectionsResponseDto, SendOrAcceptConnectionRequestDto } from '@/dtos';
import { HttpException } from '@/exceptions';
import { updateAndReturn } from '@/utils/queryBuilderUtils';

class ConnectionService {
  public async getUserConnections(userId: number): Promise<GetUserConnectionsResponseDto> {
    const connections = await ConnectionsEntity.find({
      select: {
        sender: { id: true, firstName: true, lastName: true, profilePic: true },
        receiver: { id: true, firstName: true, lastName: true, profilePic: true },
        id: true,
        connected: true,
      },
      relations: { sender: true, receiver: true },
      where: [
        { sender: { id: userId }, connected: true },
        { receiver: { id: userId }, connected: true },
      ],
    });
    const userConnections = connections.map(({ id, connected, sender, receiver }) => {
      const connectionInfo = sender.id === userId ? receiver : sender;
      return { id, connected, connectionInfo };
    });
    return userConnections;
  }
  public async sendConnectionRequest(data: SendOrAcceptConnectionRequestDto): Promise<BaseConnectionsDto> {
    const { senderId, receiverId } = data;
    const connectionRequest = await ConnectionsEntity.findOne({
      where: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
    if (connectionRequest) throw new HttpException(409, 'This connection already exists');
    const newRequest: BaseConnectionsDto = await ConnectionsEntity.create({ ...data, connected: false }).save();
    return newRequest;
  }

  public async acceptConnectionRequest(data: SendOrAcceptConnectionRequestDto): Promise<BaseConnectionsDto> {
    const { senderId, receiverId } = data;
    const connectionRequest = await ConnectionsEntity.findOne({
      where: { senderId, receiverId },
    });
    if (!connectionRequest) throw new HttpException(404, "This connection doesn't exist");
    const { id, connected } = connectionRequest;
    if (connected) throw new HttpException(409, 'Connection already exists');
    const acceptedConnectionRequest = await updateAndReturn<BaseConnectionsDto, { connected: boolean }>(id, { connected: true }, ConnectionsEntity);
    return acceptedConnectionRequest;
  }
}

export default ConnectionService;
