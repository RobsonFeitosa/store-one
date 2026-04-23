import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProductProvider } from "../domain/entities/product-provider.entity";
import type { ProductProviderRepository } from "../domain/repositories/product-provider.repository";

interface IRequest {
    id: string;
    name?: string;
    phone1?: string;
    phone2?: string;
    email?: string;
    address?: string;
    image_id?: string;
}

@Injectable()
export class UpdateProductProviderUseCase {
    constructor(
        @Inject('PRODUCT_PROVIDER_REPOSITORY_TOKEN')
        private readonly providerRepository: ProductProviderRepository,
    ) { }

    async execute(data: IRequest): Promise<ProductProvider> {
        const provider = await this.providerRepository.findById(data.id);

        if (!provider) {
            throw new NotFoundException('Provider not found');
        }

        Object.assign(provider, data);

        return this.providerRepository.save(provider);
    }
}
