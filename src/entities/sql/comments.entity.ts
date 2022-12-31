import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { UserEntity, PostEntity } from '@/entities';

@Entity('comments')
class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PostEntity, post => post.comments)
  @JoinColumn()
  post: PostEntity;

  @ManyToOne(() => UserEntity, user => user.id)
  @JoinColumn()
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

  @Column()
  userId: number;

  @Column()
  postId: number;
}

export default CommentEntity;
