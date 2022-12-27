export type BaseConnectionsDto = {
    readonly id: number;
    readonly senderId: number;
    readonly receiverId: number;
    readonly connected: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
