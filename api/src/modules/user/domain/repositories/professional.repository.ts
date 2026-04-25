import { Professional } from "../../../users/infra/typeorm/entities/Professional";

export interface ProfessionalRepository {
    findById(id: string): Promise<Professional | null>;
    findAvailable(): Promise<Professional[]>;
    findAndCount(options: { page: number; limit: number }): Promise<[Professional[], number]>;
}
