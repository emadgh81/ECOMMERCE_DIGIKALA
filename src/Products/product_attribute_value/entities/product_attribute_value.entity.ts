import { Product } from 'src/Products/product/entities/product.entity';
import { ProductAttribute } from 'src/Products/product_attribute/entities/product_attribute.entity';
import { ProductAttributeOption } from 'src/Products/product_attribute_option/entities/product_attribute_option.entity';
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

@Entity('product_attribute_value')
export class ProductAttributeValue {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  product_attribute_id!: string;

  @Column({ type: 'uuid' })
  product_id!: string;

  @Column({ type: 'uuid', nullable: true })
  product_attribute_option_id?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  value?: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => Product, (product) => product.attribute_values)
  @JoinColumn({ name: 'product_id' })
  product?: Product;

  @ManyToOne(() => ProductAttribute)
  @JoinColumn({ name: 'product_attribute_id' })
  product_attribute?: ProductAttribute;

  @ManyToOne(() => ProductAttributeOption)
  @JoinColumn({ name: 'product_attribute_option_id' })
  product_attribute_option?: ProductAttributeOption;
}
