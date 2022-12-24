import {BaseEntity,
        Entity,
        PrimaryGeneratedColumn,
        Column,
        Unique,
        CreateDateColumn,
        UpdateDateColumn,
        ManyToMany,
        JoinTable } from 'typeorm';

@Entity()
class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  password: string;

  @Column()
  language: string;

  @Column({nullable: true})
  dateOfBirth: Date;

  @Column({nullable: true})
  profilePic: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default UserEntity;
