import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProductProvider } from "../domain/entities/product-provider.entity";
import type { ProductProviderRepository } from "../domain/repositories/product-provider.repository";

@Injectable()
export class ShowProductProviderUseCase {
    constructor(
        @Inject('PRODUCT_PROVIDER_REPOSITORY_TOKEN')
        private readonly providerRepository: ProductProviderRepository,
    ) { }

    async execute(id: string): Promise<ProductProvider> {
        const provider = await this.providerRepository.findById(id);

        if (!provider) {
            throw new NotFoundException('Provider not found');
        }

        return provider;
    }
}
