import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrders1769148741324 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'or100_orders',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'cod_order',
                        type: 'varchar',
                    },
                    {
                        name: 'professional_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'coupon_applied',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'freight',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'payment_method',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'amount',
                        type: 'bigint',
                    },
                    {
                        name: 'type_product',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'tracking_code',
                        type: 'varchar',
                        isNullable: true,
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
                foreignKeys: [
                    {
                        name: 'OrderUser',
                        columnNames: ['user_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'users',
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('or100_orders');
    }
}
