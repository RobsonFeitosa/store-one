import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { ProductProviderRepository } from "../domain/repositories/product-provider.repository";

@Injectable()
export class DeleteProductProviderUseCase {
    constructor(
        @Inject('PRODUCT_PROVIDER_REPOSITORY_TOKEN')
        private readonly providerRepository: ProductProviderRepository,
    ) { }

    async execute(id: string): Promise<void> {
        const provider = await this.providerRepository.findById(id);

        if (!provider) {
            throw new NotFoundException('Provider not found');
        }

        await this.providerRepository.delete(id);
    }
}
