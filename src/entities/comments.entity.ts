import {BaseEntity,
        Entity,
        PrimaryGeneratedColumn,
        Column,
        ManyToOne,
        JoinColumn,
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
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}

export default CommentEntity;
