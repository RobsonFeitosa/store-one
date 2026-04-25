import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TimeIntervals } from "src/modules/users/infra/typeorm/entities/TimeIntervals";
import type { TimeIntervalsRepository, BlockedDates } from "../../../domain/repositories/time-intervals.repository";

@Injectable()
export class TypeOrmTimeIntervalsRepository implements TimeIntervalsRepository {
    constructor(
        private readonly ormRepo: Repository<TimeIntervals>
    ) { }

    async create(data: Partial<TimeIntervals>): Promise<TimeIntervals> {
        const timeInterval = this.ormRepo.create(data);
        await this.ormRepo.save(timeInterval);
        return timeInterval;
    }

    async findById(id: string): Promise<TimeIntervals | null> {
        return this.ormRepo.findOne({
            where: { id },
        });
    }

    async findByProfessionalId(professionalId: string): Promise<TimeIntervals[]> {
        return this.ormRepo.find({
            where: {
                professional_id: professionalId,
            },
        });
    }

    async findBlockedDatesRow(
        professionalId: string,
        year: string,
        month: string,
    ): Promise<BlockedDates[]> {
        return this.ormRepo.query(
            ` 
            select
                extract(day from ss.date) as date,
                COUNT(ss.date) as amount, 
                ((SUM(pti.time_end_in_minutes_one + pti.time_end_in_minutes_two) - SUM(pti.time_start_in_minutes_one + pti.time_start_in_minutes_two)) / 60)  as size   
            from
                sc100_schedulings ss 
            left join pr100_time_intervals pti 
                on
                pti.week_day = extract(isodow from date)   
            where
                ss.professional_id = '${professionalId}'
                and to_char(ss.date , 'yyyy-mm')  = '${year}-${month}'
            group by
                extract(day from ss.date),
                ((pti.time_end_in_minutes_one - pti.time_start_in_minutes_one) / 60)
            having
                COUNT(ss.date) >= ((SUM(pti.time_end_in_minutes_one + pti.time_end_in_minutes_two) - SUM(pti.time_start_in_minutes_one + pti.time_start_in_minutes_two)) / 60) 
            `,
        );
    }

    async findByProfessionalAndWeekDay(
        professionalId: string,
        weekDay: number,
    ): Promise<TimeIntervals | null> {
        return this.ormRepo.findOne({
            where: {
                professional_id: professionalId,
                week_day: weekDay,
            },
        });
    }

    async findAndCount(options: { page: number; limit: number }): Promise<[TimeIntervals[], number]> {
        return this.ormRepo.findAndCount({
            take: options.limit,
            skip: (options.page - 1) * options.limit,
        });
    }

    async delete(id: string): Promise<void> {
        await this.ormRepo.delete(id);
    }

    async save(data: TimeIntervals): Promise<TimeIntervals> {
        return this.ormRepo.save(data);
    }
}
