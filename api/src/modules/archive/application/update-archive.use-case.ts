import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Archive } from "../domain/entities/archive.entity";
import { ArchiveRepository } from "../domain/repositories/archive.repository";
import { IStorageProvider } from "src/shared/infra/http/providers/storage-provider/models/i-storage-provider";

interface IRequest {
    file: Express.Multer.File;
    archiveId: string;
    payload?: {
        originName?: string;
        referenceId?: string;
        isPrimary?: boolean;
    };
}

@Injectable()
export class UpdateArchiveUseCase {
    constructor(
        @Inject('ArchiveRepository')
        private archiveRepository: ArchiveRepository,

        @Inject('STORAGE_PROVIDER')
        private storageProvider: IStorageProvider,
    ) { }

    public async execute(data: IRequest): Promise<Archive> {
        const { archiveId, file, payload } = data;

        const archive = await this.archiveRepository.findById(archiveId);
        if (!archive) {
            throw new NotFoundException('Archive not found');
        }

        await this.storageProvider.deleteFile(archive.getName());

        const filename = file.filename;
        const createFile = await this.storageProvider.saveFile(filename);

        const updatedArchive = new Archive({
            ...archive.toJSON(),
            name: createFile,
            size: String(file.size),
            type: file.mimetype,
            origin_target: payload?.originName ?? archive.getOriginTarget(),
            reference_id: payload?.referenceId ?? archive.getReferenceId(),
            is_primary: payload?.isPrimary ?? archive.getIsPrimary(),
        });

        return this.archiveRepository.save(updatedArchive);
    }
}
