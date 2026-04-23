import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { ProductRepository } from "../domain/repositories/product.repository";
import type { ArchiveRepository } from "../../archive/domain/repositories/archive.repository";
import { Archive } from "../../archive/domain/entities/archive.entity";
import type { IStorageProvider } from "src/shared/infra/http/providers/storage-provider/models/i-storage-provider";

@Injectable()
export class UpdateProductImagePrimaryUseCase {
    constructor(
        @Inject('PRODUCT_REPOSITORY_TOKEN')
        private readonly productsRepository: ProductRepository,

        @Inject('ARCHIVE_REPOSITORY_TOKEN')
        private readonly archiveRepository: ArchiveRepository,

        @Inject('STORAGE_PROVIDER')
        private readonly storageProvider: IStorageProvider,
    ) { }

    async execute(productId: string, file: Express.Multer.File): Promise<Archive> {
        const product = await this.productsRepository.findById(productId);

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const archives = await this.archiveRepository.findAllByReferenceId(product.id);

        for (const archive of archives) {
            if (archive.origin_target === 'product') {
                archive.is_primary = false;
                await this.archiveRepository.save(archive);
            }
        }

        const filename = await this.storageProvider.saveFile(file.filename);

        const archive = new Archive({
            name: filename,
            reference_id: product.id,
            origin_target: 'product',
            size: String(file.size),
            type: file.mimetype,
            is_primary: true,
        });

        return this.archiveRepository.create(archive);
    }
}
