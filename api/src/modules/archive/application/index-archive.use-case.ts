import { Inject, Injectable } from "@nestjs/common";
import { Archive } from "../domain/entities/archive.entity";
import type { ArchiveRepository, FilterOptions } from "../domain/repositories/archive.repository";

@Injectable()
export class IndexArchiveUseCase {
    constructor(
        @Inject('ARCHIVE_REPOSITORY_TOKEN')
        private archiveRepository: ArchiveRepository,
    ) { }


    public async execute(options: FilterOptions): Promise<[Archive[], number]> {
        return this.archiveRepository.findAndCount(options);
    }
}
