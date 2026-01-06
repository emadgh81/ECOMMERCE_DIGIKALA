import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixOrderAndOrderItem1767718805689 implements MigrationInterface {
  name = 'FixOrderAndOrderItem1767718805689';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_e9674a6053adbaa1057848cddfa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_9011283056620f5eaa7ad74cef6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_f5221735ace059250daac9d9803"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."orders_status_enum" AS ENUM('PENDING', 'SUCCESSFUL', 'FAILED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "status" "public"."orders_status_enum" NOT NULL, "total_price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_e9674a6053adbaa1057848cddfa" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_9011283056620f5eaa7ad74cef6" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_f5221735ace059250daac9d9803" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_f5221735ace059250daac9d9803"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_9011283056620f5eaa7ad74cef6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_e9674a6053adbaa1057848cddfa"`,
    );
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_f5221735ace059250daac9d9803" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_9011283056620f5eaa7ad74cef6" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_e9674a6053adbaa1057848cddfa" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
