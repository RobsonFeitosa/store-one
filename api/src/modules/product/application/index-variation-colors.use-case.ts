import { Inject, Injectable } from '@nestjs/common';
import { ProductAttributeRepository } from '../domain/repositories/product-attribute.repository';

interface VariationsColors {
    color: string;
    total: number;
}

@Injectable()
export class IndexVariationColorsUseCase {
    constructor(
        @Inject('PRODUCT_ATTRIBUTE_REPOSITORY_TOKEN')
        private productAttributesRepository: ProductAttributeRepository,
    ) { }

    public async execute(): Promise<VariationsColors[]> {
        const variationsAttributes =
            await this.productAttributesRepository.findAllAttributesColors();

        const variations = variationsAttributes
            .map((attribute) => attribute.variations)
            .flat();

        const result = variations.reduce((acc: VariationsColors[], curr) => {
            const existingColor = acc.find((item) => item.color === curr.name);
            if (existingColor) {
                existingColor.total += curr.quantity;
            } else {
                acc.push({ color: curr.name, total: curr.quantity });
            }
            return acc;
        }, []);

        return result;
    }
}
