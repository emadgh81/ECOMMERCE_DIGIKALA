import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixProductPriceColumn1767530212988 implements MigrationInterface {
  name = 'FixProductPriceColumn1767530212988';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_attribute_value" DROP CONSTRAINT "FK_56d8724e16169ff053bdc98d782"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_attribute_value" ALTER COLUMN "product_attribute_option_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_attribute_value" ADD CONSTRAINT "FK_56d8724e16169ff053bdc98d782" FOREIGN KEY ("product_attribute_option_id") REFERENCES "product_attribute_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_attribute_value" DROP CONSTRAINT "FK_56d8724e16169ff053bdc98d782"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_attribute_value" ALTER COLUMN "product_attribute_option_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_attribute_value" ADD CONSTRAINT "FK_56d8724e16169ff053bdc98d782" FOREIGN KEY ("product_attribute_option_id") REFERENCES "product_attribute_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
