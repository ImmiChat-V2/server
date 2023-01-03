import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '.';

@Entity()
class ConnectionsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.senderId)
  @JoinColumn()
  sender: UserEntity;
  

  @ManyToOne(() => UserEntity, user => user.receiverId)
  @JoinColumn()
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
