import { Inject, Injectable } from "@nestjs/common";
import { Professional } from "src/modules/users/infra/typeorm/entities/Professional";
import type { ProfessionalRepository } from "../domain/repositories/professional.repository";

@Injectable()
export class IndexProfessionalsUseCase {
    constructor(
        @Inject('PROFESSIONAL_REPOSITORY_TOKEN')
        private readonly professionalRepository: ProfessionalRepository
    ) { }

    async execute(options: { page: number; limit: number }): Promise<[Professional[], number]> {
        return this.professionalRepository.findAndCount(options);
    }
}
