import { inject, injectable } from 'tsyringe'

import IProductsRepository from '../repositories/IProductsRepository'
import AppError from '@shared/errors/AppError'
import IArchiveRepository from '@modules/archives/repositories/IArchiveRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import Archive from '@modules/archives/infra/typeorm/entities/Archive'

@injectable()
class UpdateImagePrimary {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('ArchiveRepository')
    private archiveRepository: IArchiveRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(productId: string, file: File): Promise<Archive> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new AppError('Product not found')
    }

    const archives = await this.archiveRepository.findAllByReferenceId(
      product.id,
    )

    for (const archive of archives) {
      archive.is_primary = false
      await this.archiveRepository.save(archive)
    }

    const filename = (file as any).filename as string

    const createFile = await this.storageProvider.saveFile(filename)

    const archive = await this.archiveRepository.create({
      name: createFile,
      reference_id: product.id,
      origin_target: 'product',
      size: String(file.size),
      type: (file as any).mimetype,
      is_primary: true,
    })

    return archive
  }
}

export default UpdateImagePrimary
