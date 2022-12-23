// import { Posts, User, Comments } from '@/interfaces';
import { User, Comments } from '@/interfaces';
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
class CommentEntity extends BaseEntity implements Comments {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(()=>PostEntity, post=> post.comments)
    // @JoinColumn()
    // post: PostEntity;

    @ManyToOne(()=>UserEntity, user => user.comments)
    @JoinColumn()
    user: UserEntity;

    @Column()
    media: string;

    @Column()
    @IsNotEmpty()
    content: string

    @Column()
    @IsNotEmpty()
    created_at: Date

    @Column()
    @IsNotEmpty()
    updated_at: Date
}

export default CommentEntity;