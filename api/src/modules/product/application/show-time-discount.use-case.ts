import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TimeDiscount } from "../domain/entities/time-discount.entity";
import type { TimeDiscountRepository } from "../domain/repositories/time-discount.repository";

@Injectable()
export class ShowTimeDiscountUseCase {
    constructor(
        @Inject('TIME_DISCOUNT_REPOSITORY_TOKEN')
        private readonly timeDiscountRepository: TimeDiscountRepository,
    ) { }

    async execute(id: string): Promise<TimeDiscount> {
        const timeDiscount = await this.timeDiscountRepository.findById(id);

        if (!timeDiscount) {
            throw new NotFoundException('Time discount not found');
        }

        return timeDiscount;
    }
}
