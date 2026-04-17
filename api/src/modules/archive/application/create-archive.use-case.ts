import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { Archive } from "../domain/entities/archive.entity";
import { ArchiveRepository } from "../domain/repositories/archive.repository";
import { IStorageProvider } from "src/shared/infra/http/providers/storage-provider/models/i-storage-provider";

interface IRequest {
    files: Express.Multer.File[];
    referenceId: string;
    originName: string;
}

@Injectable()
export class CreateArchiveUseCase {
    constructor(
        @Inject('ArchiveRepository')
        private archiveRepository: ArchiveRepository,

        @Inject('STORAGE_PROVIDER')
        private storageProvider: IStorageProvider,
    ) { }

    public async execute(data: IRequest): Promise<Archive[]> {
        const { originName, referenceId, files } = data;

        if (files.length >= 8) {
            throw new BadRequestException('Exceeded the maximum number allowed, 8 files');
        }

        const archivesReference = await this.archiveRepository.findAllByReferenceId(referenceId);

        for (const archive of archivesReference) {
            archive.setIsPrimary(false);
            await this.archiveRepository.save(archive);
        }

        const archives: Archive[] = [];
        for (const file of files) {
            const filename = file.filename;
            const createFile = await this.storageProvider.saveFile(filename);

            const archive = new Archive({
                name: createFile,
                reference_id: referenceId,
                origin_target: originName,
                size: String(file.size),
                type: file.mimetype,
                is_primary: false,
            });

            const savedArchive = await this.archiveRepository.create(archive);
            archives.push(savedArchive);
        }

        return archives;
    }
}
