import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TenantRepository } from "../domain/repositories/tenant.repository";

@Injectable()
export class DeleteTenantUseCase {
    constructor(
        @Inject('TENANT_REPOSITORY_TOKEN')
        private readonly tenantRepository: TenantRepository
    ) { }

    async execute(id: string) {
        const tenant = await this.tenantRepository.findById(id);

        if (!tenant) {
            throw new NotFoundException('Tenant not found.');
        }

        await this.tenantRepository.delete(id);
    }
}
