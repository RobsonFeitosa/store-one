import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddRoleToUsers1769148741328 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'role',
                type: 'varchar',
                default: "'customer'",
                isNullable: false,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'role');
    }
}
