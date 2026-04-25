import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { TimeIntervalsRepository } from "../domain/repositories/time-intervals.repository";
import type { ProfessionalRepository } from "../domain/repositories/professional.repository";

interface IResponse {
    blockedWeekDays: number[];
    blockedDates: number[];
}

@Injectable()
export class ShowBlockedDatesUseCase {
    constructor(
        @Inject('TIME_INTERVALS_REPOSITORY_TOKEN')
        private readonly timeIntervalsRepository: TimeIntervalsRepository,

        @Inject('PROFESSIONAL_REPOSITORY_TOKEN')
        private readonly professionalRepository: ProfessionalRepository,
    ) { }

    async execute(
        professionalId: string,
        year: string,
        month: string,
    ): Promise<IResponse> {
        const professional = await this.professionalRepository.findById(professionalId);

        if (!professional) throw new NotFoundException('Professional not found');

        const availableWeekDays = await this.timeIntervalsRepository.findByProfessionalId(professionalId);

        const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
            return !availableWeekDays.some(
                (availableWeekDay) => availableWeekDay.week_day === weekDay,
            );
        });

        const blockedDatesRaw = await this.timeIntervalsRepository.findBlockedDatesRow(
            professionalId,
            year,
            month,
        );

        const blockedDates = blockedDatesRaw.map((item) => Number(item.date));

        return {
            blockedWeekDays,
            blockedDates,
        };
    }
}
