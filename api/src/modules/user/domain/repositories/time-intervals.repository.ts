import { TimeIntervals } from "../../../users/infra/typeorm/entities/TimeIntervals";

export interface BlockedDates {
    date: string;
    amount: string;
    size: number;
}

export interface TimeIntervalsRepository {
    create(data: Partial<TimeIntervals>): Promise<TimeIntervals>;
    findById(id: string): Promise<TimeIntervals | null>;
    findByProfessionalId(professionalId: string): Promise<TimeIntervals[]>;
    findBlockedDatesRow(
        professionalId: string,
        year: string,
        month: string,
    ): Promise<BlockedDates[]>;
    findByProfessionalAndWeekDay(
        professionalId: string,
        weekDay: number,
    ): Promise<TimeIntervals | null>;
    findAndCount(options: { page: number; limit: number }): Promise<[TimeIntervals[], number]>;
    delete(id: string): Promise<void>;
    save(data: TimeIntervals): Promise<TimeIntervals>;
}
