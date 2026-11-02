import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeUserNameOptional1643046828766 implements MigrationInterface {
  name = 'MakeUserNameOptional1643046828766';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "name" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL`,
    );
  }
}
