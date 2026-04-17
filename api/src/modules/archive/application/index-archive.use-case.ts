import { Inject, Injectable } from "@nestjs/common";
import { Archive } from "../domain/entities/archive.entity";
import { ArchiveRepository, FilterOptions } from "../domain/repositories/archive.repository";

@Injectable()
export class IndexArchiveUseCase {
    constructor(
        @Inject('ArchiveRepository')
        private archiveRepository: ArchiveRepository,
    ) { }

    public async execute(options: FilterOptions): Promise<[Archive[], number]> {
        return this.archiveRepository.findAndCount(options);
    }
}
