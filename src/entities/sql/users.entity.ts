import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, JoinTable } from 'typeorm';
import { ConnectionsEntity } from '.';

@Entity()
class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  password: string;

  @Column()
  language: string;

  @Column({nullable: true})
  dateOfBirth: Date;

  @Column({nullable: true})
  profilePic: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ConnectionsEntity, (connection) => connection.sender)
  senderId: ConnectionsEntity[];

  @OneToMany(() => ConnectionsEntity, (connection) => connection.receiver)
  receiverId: ConnectionsEntity[];
}

export default UserEntity;
