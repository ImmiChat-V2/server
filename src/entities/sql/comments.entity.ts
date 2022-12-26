import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn
  } from 'typeorm';
import { UserEntity, PostEntity } from '@/entities';

@Entity()
class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PostEntity, post => post.comments)
  post: PostEntity;

  @ManyToOne(() => UserEntity, user => user.id)
  user: UserEntity;

  @ManyToMany(() => UserEntity, user => user.id, {
    cascade: true,
  })
  @JoinTable({ name: 'comment_likes' })
  likes: UserEntity[];

  @Column({ nullable: true })
  media: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default CommentEntity;
