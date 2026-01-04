import { ProductAttribute } from 'src/Products/product_attribute/entities/product_attribute.entity';
import { ProductCategory } from 'src/Products/product_category/entities/product_category.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product_category_attribute')
export class ProductCategoryAttribute {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  product_category_id!: string;

  @Column({ type: 'uuid' })
  product_attribute_id!: string;

  @Column({ type: 'boolean' })
  is_required!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => ProductCategory, (pc) => pc.attributes)
  @JoinColumn({ name: 'product_category_id' })
  product_category?: ProductCategory;

  @ManyToOne(() => ProductAttribute)
  @JoinColumn({ name: 'product_attribute_id' })
  product_attribute?: ProductAttribute;
}
