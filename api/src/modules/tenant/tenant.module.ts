import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './domain/entities/tenant.entity';
import { TenantController } from './infra/http/controllers/tenant.controller';
import { CreateTenantUseCase } from './application/create-tenant.use-case';
import { ListTenantsUseCase } from './application/list-tenants.use-case';
import { UpdateTenantUseCase } from './application/update-tenant.use-case';
import { DeleteTenantUseCase } from './application/delete-tenant.use-case';
import { TypeOrmTenantRepository } from './infra/database/repositories/typeorm-tenant.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Tenant])],
    controllers: [TenantController],
    providers: [
        CreateTenantUseCase,
        ListTenantsUseCase,
        UpdateTenantUseCase,
        DeleteTenantUseCase,
        {
            provide: 'TENANT_REPOSITORY_TOKEN',
            useFactory: (ormRepo: Repository<Tenant>) => new TypeOrmTenantRepository(ormRepo),
            inject: [getRepositoryToken(Tenant)],
        },
    ],
    exports: [TypeOrmModule, 'TENANT_REPOSITORY_TOKEN']
})
export class TenantModule { }
