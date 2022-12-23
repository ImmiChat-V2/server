import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Category } from '@/interfaces/categories.interface';

@Entity()
class CategoryEntity extends BaseEntity implements Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  category_name: string;
}
export default CategoryEntity;
