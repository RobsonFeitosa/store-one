import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class CreateTenants1769148741327 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tenants',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'slug',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'active',
                        type: 'boolean',
                        default: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                ],
            })
        );

        const tablesToUpdate = [
            'users',
            'address',
            'te100_team',
            'or100_orders',
            'sc100_schedulings',
            'pr100_professional',
            'pd100_products',
            'pd101_product_categories'
        ];

        for (const tableName of tablesToUpdate) {
            await queryRunner.addColumn(
                tableName,
                new TableColumn({
                    name: 'tenant_id',
                    type: 'uuid',
                    isNullable: true,
                })
            );

            await queryRunner.createForeignKey(
                tableName,
                new TableForeignKey({
                    name: `FK_${tableName}_tenant`,
                    columnNames: ['tenant_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'tenants',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                })
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tablesToUpdate = [
            'users',
            'address',
            'te100_team',
            'or100_orders',
            'sc100_schedulings',
            'pr100_professional',
            'pd100_products',
            'pd101_product_categories',
            'cp100_coupon',
            'ti100_time_discount'
        ];

        for (const tableName of tablesToUpdate) {
            await queryRunner.dropForeignKey(tableName, `FK_${tableName}_tenant`);
            await queryRunner.dropColumn(tableName, 'tenant_id');
        }

        await queryRunner.dropTable('tenants');
    }
}
