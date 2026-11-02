import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderConfirmedAt1793648879788 implements MigrationInterface {
  name = 'AddOrderConfirmedAt1793648879788';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" ADD "confirmedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "confirmedAt"`);
  }
}
