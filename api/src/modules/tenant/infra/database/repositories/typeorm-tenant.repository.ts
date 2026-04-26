import { Repository } from "typeorm";
import { Tenant } from "../../../domain/entities/tenant.entity";
import { TenantRepository } from "../../../domain/repositories/tenant.repository";

export class TypeOrmTenantRepository implements TenantRepository {
    constructor(
        private readonly ormRepository: Repository<Tenant>
    ) { }

    async findAll(): Promise<Tenant[]> {
        return this.ormRepository.find();
    }

    async findById(id: string): Promise<Tenant | null> {
        return this.ormRepository.findOneBy({ id });
    }

    async findBySlug(slug: string): Promise<Tenant | null> {
        return this.ormRepository.findOneBy({ slug });
    }

    async save(tenant: Tenant): Promise<Tenant> {
        return this.ormRepository.save(tenant);
    }

    async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }
}
