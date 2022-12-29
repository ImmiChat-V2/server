import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity, CommentEntity } from '@/entities';

@Entity()
class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  media: string | null;

  @OneToMany(() => CommentEntity, comments => comments.post)
  comments: CommentEntity[];

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ManyToMany(() => UserEntity, user => user.id, {
    cascade: true,
  })
  @JoinTable({ name: 'post_likes' })
  likes: UserEntity[];

  @Column()
  content: string;

  @Column()
  categoryName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userId: number;
}

export default PostEntity;
