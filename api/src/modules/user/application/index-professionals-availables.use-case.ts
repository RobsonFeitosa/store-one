import { Inject, Injectable } from "@nestjs/common";
import { Professional } from "src/modules/users/infra/typeorm/entities/Professional";
import type { ProfessionalRepository } from "../domain/repositories/professional.repository";

@Injectable()
export class IndexProfessionalsAvailablesUseCase {
    constructor(
        @Inject('PROFESSIONAL_REPOSITORY_TOKEN')
        private readonly professionalRepository: ProfessionalRepository
    ) { }

    async execute(): Promise<[Professional[], number]> {
        const professionals = await this.professionalRepository.findAvailable();
        return [professionals, professionals.length];
    }
}
