import { ProductAttribute } from 'src/Products/product_attribute/entities/product_attribute.entity';
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

@Entity('product_attribute_option')
export class ProductAttributeOption {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  product_attribute_id!: string;

  @Column({ type: 'varchar', length: 100 })
  title!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  code?: string;

  @Column({ type: 'varchar', length: 100 })
  color!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image?: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => ProductAttribute, (attr) => attr.options)
  @JoinColumn({ name: 'product_attribute_id' })
  product_attribute!: ProductAttribute;
}
