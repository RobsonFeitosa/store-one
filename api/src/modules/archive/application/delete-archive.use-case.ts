import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ArchiveRepository } from "../domain/repositories/archive.repository";
import { IStorageProvider } from "src/shared/infra/http/providers/storage-provider/models/i-storage-provider";

interface IRequest {
    archiveId: string;
}

@Injectable()
export class DeleteArchiveUseCase {
    constructor(
        @Inject('ArchiveRepository')
        private archiveRepository: ArchiveRepository,

        @Inject('STORAGE_PROVIDER')
        private storageProvider: IStorageProvider,
    ) { }

    public async execute({ archiveId }: IRequest): Promise<void> {
        const archive = await this.archiveRepository.findById(archiveId);

        if (!archive) {
            throw new NotFoundException('Archive not exist');
        }

        await this.storageProvider.deleteFile(archive.getName());
        await this.archiveRepository.delete(archiveId);
    }
}
