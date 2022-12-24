import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import UserEntity from './users.entity';

@Entity()
class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  media: string | null;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column()
  content: string;

  @Column()
  categoryName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default PostEntity;
