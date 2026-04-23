import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TimeDiscount } from "../domain/entities/time-discount.entity";
import type { TimeDiscountRepository } from "../domain/repositories/time-discount.repository";

interface IRequest {
    id: string;
    start_date: string;
    end_date: string;
    discount: number;
    status: string;
}

@Injectable()
export class UpdateTimeDiscountUseCase {
    constructor(
        @Inject('TIME_DISCOUNT_REPOSITORY_TOKEN')
        private readonly timeDiscountRepository: TimeDiscountRepository,
    ) { }

    async execute(data: IRequest): Promise<TimeDiscount> {
        const timeDiscount = await this.timeDiscountRepository.findById(data.id);

        if (!timeDiscount) {
            throw new NotFoundException('Time discount not found');
        }

        Object.assign(timeDiscount, {
            ...data,
            start_date: new Date(data.start_date),
            end_date: new Date(data.end_date),
        });

        return this.timeDiscountRepository.save(timeDiscount);
    }
}
