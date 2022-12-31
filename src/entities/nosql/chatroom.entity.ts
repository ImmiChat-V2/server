import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn } from 'typeorm';
import { UserEntity } from '../sql';
import { Messages } from '.';

@Entity()
export class Chatroom {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  isGroup: boolean;

  @Column()
  users: UserEntity[];

  @Column(() => Messages)
  messages: Messages[];

  @CreateDateColumn()
  createdDate: Date;
}

export default Chatroom;
