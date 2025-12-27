import { ProductAttributeValue } from 'src/Products/product_attribute_value/entities/product_attribute_value.entity';
import { ProductVariant } from 'src/Products/product_variant/entities/product_variant.entity';
import { ProductCategory } from 'src/Products/product_category/entities/product_category.entity';

import { Seller } from 'src/Users/seller/entities/seller.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Review } from 'src/Reviews/review/entities/review.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  product_category_id!: string;

  @Column({ type: 'uuid' })
  seller_id!: string;

  @Column({ type: 'varchar', length: 100 })
  title!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  description?: string;

  @Column({ type: 'decimal' })
  price!: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  brand!: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => ProductCategory, (category) => category.products)
  @JoinColumn({ name: 'product_category_id' })
  product_category!: ProductCategory;

  @ManyToOne(() => Seller, (seller) => seller.products)
  @JoinColumn({ name: 'seller_id' })
  seller!: Seller;

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants!: ProductVariant[];

  @OneToMany(() => Review, (review) => review.product)
  reviews!: Review[];

  @OneToMany(() => ProductAttributeValue, (pav) => pav.product)
  attribute_values!: ProductAttributeValue[];
}
