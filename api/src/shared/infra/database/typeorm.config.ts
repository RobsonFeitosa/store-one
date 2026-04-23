import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '0e148efe486c6da1e29048b892c8b4c3',
    database: 'nexus',
    entities: [
        __dirname + '/../../../**/*.entity{.ts,.js}',
        __dirname + '/../../../**/typeorm/entities/*.{ts,js}',
    ],
    migrations: [
        __dirname + '/migrations/*.{ts,js}'
    ],
    migrationsTableName: 'migrations',
    synchronize: true,
});