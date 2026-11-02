import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1619278600863 implements MigrationInterface {
  name = 'CreateUsers1619278600863';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "user" ("id" SERIAL NOT NULL, "provider" character varying NOT NULL, "providerId" character varying NOT NULL, "username" character varying NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
