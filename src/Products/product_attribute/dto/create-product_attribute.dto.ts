import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AttributeDataType } from 'src/common/enum/attribute.datatype.enum';

export class CreateProductAttributeDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsEnum(AttributeDataType)
  data_type!: AttributeDataType;

  @IsString()
  @IsOptional()
  unit?: string;

  @IsBoolean()
  @IsNotEmpty()
  searchable!: boolean;

  @IsBoolean()
  @IsNotEmpty()
  filterable!: boolean;
}
