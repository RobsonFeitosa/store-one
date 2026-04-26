import { Inject, Injectable, ConflictException } from "@nestjs/common";
import { TenantRepository } from "../domain/repositories/tenant.repository";
import { Tenant } from "../domain/entities/tenant.entity";

interface Request {
    name: string;
    slug: string;
}

@Injectable()
export class CreateTenantUseCase {
    constructor(
        @Inject('TENANT_REPOSITORY_TOKEN')
        private readonly tenantRepository: TenantRepository
    ) { }

    async execute({ name, slug }: Request) {
        const tenantExists = await this.tenantRepository.findBySlug(slug);

        if (tenantExists) {
            throw new ConflictException('Tenant with this slug already exists.');
        }

        const tenant = new Tenant({
            name,
            slug,
            active: true
        });

        return this.tenantRepository.save(tenant);
    }
}
