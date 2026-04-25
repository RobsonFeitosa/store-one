import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

export class CreateSchedulings1700102149562 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'sc100_schedulings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'professional_id',
            type: 'uuid',
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          {
            name: 'order_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'observations',
            type: 'varchar',
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
            name: 'SchedulingUserId',
            columnNames: ['professional_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'pr100_professional',
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL',
          },
          {
            name: 'SchedulingOrderId',
            columnNames: ['order_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'or100_orders',
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL',
          },
        ],
      }),
    )

    await queryRunner.createIndex(
      'sc100_schedulings',
      new TableIndex({
        name: 'idx_sc100_schedulings_professional_id',
        columnNames: ['professional_id'],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropIndex(
      'sc100_schedulings',
      'idx_sc100_schedulings_professional_id',
    )
    await queryRunner.dropTable('sc100_schedulings')
  }
}
