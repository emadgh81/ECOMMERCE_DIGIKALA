import { ProductAttribute } from 'src/Products/product_attribute/entities/product_attribute.entity';
import { ProductAttributeOption } from 'src/Products/product_attribute_option/entities/product_attribute_option.entity';
import { ProductVariant } from 'src/Products/product_variant/entities/product_variant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product_variant_attribute')
export class ProductVariantAttribute {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ type: 'uuid' })
  product_variant_id!: string;

  @Column({ type: 'uuid' })
  product_attribute_id!: string;

  @Column({ type: 'uuid' })
  product_attribute_option_id!: string;

  @ManyToOne(() => ProductVariant, (pv) => pv.attributes)
  @JoinColumn({ name: 'product_variant_id' })
  product_variant?: ProductVariant;

  @ManyToOne(() => ProductAttribute)
  @JoinColumn({ name: 'product_attribute_id' })
  product_attribute?: ProductAttribute;

  @ManyToOne(() => ProductAttributeOption)
  @JoinColumn({ name: 'product_attribute_option_id' })
  product_attribute_option?: ProductAttributeOption;
}
