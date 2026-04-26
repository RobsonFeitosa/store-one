import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUniqueConstraintAddress1769148741326 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop the unique constraint on user_id in the address table
        // This constraint was likely added automatically by a previous configuration
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT IF EXISTS "UQ_35cd6c3fafec0bb5d072e24ea20"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "UQ_35cd6c3fafec0bb5d072e24ea20" UNIQUE ("user_id")`);
    }
}
