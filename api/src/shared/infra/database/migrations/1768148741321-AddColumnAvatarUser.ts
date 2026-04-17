import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnAvatarUser1768148741321 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('users', [
            new TableColumn({
                type: 'varchar',
                name: 'avatar',
                isNullable: true,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'avatar');
    }

}
