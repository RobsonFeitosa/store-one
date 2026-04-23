import { Inject, Injectable } from "@nestjs/common";
import { ProductProvider } from "../domain/entities/product-provider.entity";
import type { ProductProviderRepository } from "../domain/repositories/product-provider.repository";

interface IRequest {
    name: string;
    phone1?: string;
    phone2?: string;
    email?: string;
    address?: string;
    image_id?: string;
}

@Injectable()
export class CreateProductProviderUseCase {
    constructor(
        @Inject('PRODUCT_PROVIDER_REPOSITORY_TOKEN')
        private readonly providerRepository: ProductProviderRepository,
    ) { }

    async execute(data: IRequest): Promise<ProductProvider> {
        const provider = new ProductProvider(data);
        return this.providerRepository.create(provider);
    }
}
