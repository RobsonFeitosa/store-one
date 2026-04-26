import { Tenant } from "../entities/tenant.entity";

export interface TenantRepository {
    findAll(): Promise<Tenant[]>;
    findById(id: string): Promise<Tenant | null>;
    findBySlug(slug: string): Promise<Tenant | null>;
    save(tenant: Tenant): Promise<Tenant>;
    delete(id: string): Promise<void>;
}
