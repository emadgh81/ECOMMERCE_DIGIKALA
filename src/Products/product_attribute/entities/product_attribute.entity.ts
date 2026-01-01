import { AttributeDataType } from 'src/common/enum/attribute.datatype.enum';
import { ProductAttributeOption } from 'src/Products/product_attribute_option/entities/product_attribute_option.entity';
import { ProductAttributeValue } from 'src/Products/product_attribute_value/entities/product_attribute_value.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product_attribute')
export class ProductAttribute {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  title!: string;

  @Column({ type: 'enum', enum: AttributeDataType })
  data_type!: AttributeDataType;

  @Column({ type: 'varchar', length: 100, nullable: true })
  unit?: string;

  @Column({ type: 'boolean' })
  searchable!: boolean;

  @Column({ type: 'boolean' })
  filterable!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @OneToMany(() => ProductAttributeOption, (option) => option.product_attribute)
  options?: ProductAttributeOption[];

  @OneToMany(() => ProductAttributeValue, (value) => value.product_attribute)
  values?: ProductAttributeValue[];
}
