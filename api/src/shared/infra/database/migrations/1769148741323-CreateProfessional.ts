import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProfessional1769148741323 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'pr100_professional',
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
                        isNullable: true,
                    },
                    {
                        name: 'team_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'function',
                        type: 'varchar',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'invite',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'actived',
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
                foreignKeys: [
                    {
                        name: 'ProfessionalUser',
                        columnNames: ['user_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'users',
                        onUpdate: 'SET NULL',
                        onDelete: 'SET NULL',
                    },
                    {
                        name: 'ProfessionalTeam',
                        columnNames: ['team_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'te100_team',
                        onUpdate: 'SET NULL',
                        onDelete: 'SET NULL',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pr100_professional');
    }
}
