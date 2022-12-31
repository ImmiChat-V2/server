import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn } from 'typeorm';
import { UserEntity } from '../sql';

@Entity()
export class Messages {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  userId: UserEntity;

  @Column()
  content: string;

  @CreateDateColumn()
  createdDate: Date;
}

export default Messages;
