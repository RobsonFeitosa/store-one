import { Inject, Injectable } from "@nestjs/common";
import { TenantRepository } from "../domain/repositories/tenant.repository";

@Injectable()
export class ListTenantsUseCase {
    constructor(
        @Inject('TENANT_REPOSITORY_TOKEN')
        private readonly tenantRepository: TenantRepository
    ) { }

    async execute() {
        return this.tenantRepository.findAll();
    }
}
