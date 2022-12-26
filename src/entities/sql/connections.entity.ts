import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '.';

@Entity()
class ConnectionsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => UserEntity, (user) => user.senderId)
    sender: UserEntity;
    
    @ManyToOne(() => UserEntity, (user) => user.receiverId)
    receiver: UserEntity;
    
    @Column()
    connected: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}

export default ConnectionsEntity;
