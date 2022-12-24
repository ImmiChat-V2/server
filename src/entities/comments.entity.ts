// import { Posts, User, Comments } from '@/interfaces';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity,
         Entity,
         PrimaryGeneratedColumn,
         Column,
         OneToOne,
         ManyToOne,
         JoinColumn, 
         Unique, 
         CreateDateColumn, 
         UpdateDateColumn } from 'typeorm';
import UserEntity from './users.entity';
// import PostEntity from './posts.entity';

@Entity()
class CommentEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(()=>PostEntity, post=> post.comments)
    // @JoinColumn()
    // post: PostEntity;

    @ManyToOne(()=>UserEntity, user => user.id)
    @JoinColumn()
    user: UserEntity;

    @Column()
    media: string;

    @Column()
    content: string

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}

export default CommentEntity;