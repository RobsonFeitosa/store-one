import { Inject, Injectable } from "@nestjs/common";
import { ProductProvider } from "../domain/entities/product-provider.entity";
import type { ProductProviderRepository } from "../domain/repositories/product-provider.repository";

@Injectable()
export class IndexProductProvidersUseCase {
    constructor(
        @Inject('PRODUCT_PROVIDER_REPOSITORY_TOKEN')
        private readonly providerRepository: ProductProviderRepository,
    ) { }

    async execute(): Promise<ProductProvider[]> {
        return this.providerRepository.findAll();
    }
}
