import { ConnectionsEntity } from '@/entities';
import { GetUserConnectionsResponseDto } from '@/dtos';
import { pgDataSource } from '@/databases';

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
}

export default ConnectionService;
