import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from '@/interfaces/users.interface';
import { CommentEntity } from '@/entities';

@Entity()
class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CommentEntity, comment => comment.user)
  comments: CommentEntity[]

  // @OneToMany(()=>PostEntity, post => post.posts)
  // posts: PostEntity[]

  @Column()
  @IsNotEmpty()
  @Unique(['email'])
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}

export default UserEntity;
