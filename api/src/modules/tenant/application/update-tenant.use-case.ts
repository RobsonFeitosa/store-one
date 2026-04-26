import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TenantRepository } from "../domain/repositories/tenant.repository";

interface Request {
    id: string;
    name?: string;
    slug?: string;
    active?: boolean;
}

@Injectable()
export class UpdateTenantUseCase {
    constructor(
        @Inject('TENANT_REPOSITORY_TOKEN')
        private readonly tenantRepository: TenantRepository
    ) { }

    async execute({ id, name, slug, active }: Request) {
        const tenant = await this.tenantRepository.findById(id);

        if (!tenant) {
            throw new NotFoundException('Tenant not found.');
        }

        if (name !== undefined) tenant.name = name;
        if (slug !== undefined) tenant.slug = slug;
        if (active !== undefined) tenant.active = active;

        return this.tenantRepository.save(tenant);
    }
}
