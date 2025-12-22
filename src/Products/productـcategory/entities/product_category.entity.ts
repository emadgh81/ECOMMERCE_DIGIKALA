import { Product } from 'src/Products/product/entities/product.entity';
import { ProductCategoryAttribute } from 'src/Products/product_category_attribute/entities/product_category_attribute.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product_category')
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  title!: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @OneToMany(() => Product, (product) => product.product_category)
  products!: Product[];

  @OneToMany(() => ProductCategoryAttribute, (pca) => pca.product_category)
  attributes!: ProductCategoryAttribute[];
}
