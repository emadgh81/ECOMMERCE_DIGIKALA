import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductCategoryRelation1767125392874 implements MigrationInterface {
  name = 'ProductCategoryRelation1767125392874';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_category_attribute" RENAME COLUMN "is_requierd" TO "is_required"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_attribute" DROP COLUMN "data_type"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_attribute_data_type_enum" AS ENUM('STRING', 'NUMBER', 'BOOLEAN')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_attribute" ADD "data_type" "public"."product_attribute_data_type_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller" ALTER COLUMN "rating" SET DEFAULT '0'`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "price" numeric NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "sku"`);
    await queryRunner.query(
      `ALTER TABLE "product_variant" ADD "sku" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant" DROP COLUMN "price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant" ADD "price" numeric NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_variant" DROP COLUMN "price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant" ADD "price" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "sku"`);
    await queryRunner.query(
      `ALTER TABLE "product_variant" ADD "sku" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "price" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller" ALTER COLUMN "rating" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_attribute" DROP COLUMN "data_type"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."product_attribute_data_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_attribute" ADD "data_type" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_category_attribute" RENAME COLUMN "is_required" TO "is_requierd"`,
    );
  }
}
