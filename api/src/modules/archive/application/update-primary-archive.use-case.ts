import { Inject, Injectable } from "@nestjs/common";
import { Archive } from "../domain/entities/archive.entity";
import { ArchiveRepository } from "../domain/repositories/archive.repository";

interface IRequest {
    referenceId: string;
    archiveId: string;
}

@Injectable()
export class UpdatePrimaryArchiveUseCase {
    constructor(
        @Inject('ArchiveRepository')
        private archiveRepository: ArchiveRepository,
    ) { }

    public async execute({ referenceId, archiveId }: IRequest): Promise<Archive[]> {
        const archives = await this.archiveRepository.findAllByReferenceId(referenceId);

        for (const archive of archives) {
            archive.setIsPrimary(archive.getId() === archiveId);
            await this.archiveRepository.save(archive);
        }

        return archives;
    }
}
