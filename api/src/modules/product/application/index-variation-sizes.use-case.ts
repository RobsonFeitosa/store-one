import { Inject, Injectable } from '@nestjs/common';
import { ProductAttributeRepository } from '../domain/repositories/product-attribute.repository';

interface VariationsSizes {
    size: string;
    total: number;
}

@Injectable()
export class IndexVariationSizesUseCase {
    constructor(
        @Inject('PRODUCT_ATTRIBUTE_REPOSITORY_TOKEN')
        private productAttributesRepository: ProductAttributeRepository,
    ) { }

    public async execute(): Promise<VariationsSizes[]> {
        const variationsAttributes =
            await this.productAttributesRepository.findAllAttributesSizes();

        const variations = variationsAttributes
            .map((attribute) => attribute.variations)
            .flat();

        const result = variations.reduce((acc: VariationsSizes[], curr) => {
            const existingSize = acc.find((item) => item.size === curr.name);
            if (existingSize) {
                existingSize.total += curr.quantity;
            } else {
                acc.push({ size: curr.name, total: curr.quantity });
            }
            return acc;
        }, []);

        return result;
    }
}
