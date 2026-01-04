import { Product } from 'src/Products/product/entities/product.entity';
import { ProductVariantAttribute } from 'src/Products/product_variant_attribute/entities/product_variant_attribute.entity';
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

@Entity('product_variant')
export class ProductVariant {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  product_id!: string;

  @Column({ type: 'varchar', length: 100 })
  sku!: string;

  @Column({ type: 'decimal' })
  price!: number;

  @Column({ type: 'int' })
  stock!: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn({ name: 'product_id' })
  product?: Product;

  @OneToMany(() => ProductVariantAttribute, (pav) => pav.product_variant)
  attributes?: ProductVariantAttribute[];
}
