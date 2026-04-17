import { Archive } from "../entities/archive.entity";

export interface FilterOptions {
    page?: number;
    limit?: number;
    originName?: string;
    referenceId?: string;
}

export interface ArchiveRepository {
    create(archive: Archive): Promise<Archive>;
    findById(id: string): Promise<Archive | null>;
    findByName(name: string): Promise<Archive | null>;
    findAllByReferenceId(id: string): Promise<Archive[]>;
    findAndCount(options: FilterOptions): Promise<[Archive[], number]>;
    delete(id: string): Promise<void>;
    save(archive: Archive): Promise<Archive>;
}
