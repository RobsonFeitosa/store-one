import { Inject, Injectable } from "@nestjs/common";
import { TimeDiscount } from "../domain/entities/time-discount.entity";
import type { TimeDiscountRepository } from "../domain/repositories/time-discount.repository";

@Injectable()
export class IndexTimeDiscountUseCase {
    constructor(
        @Inject('TIME_DISCOUNT_REPOSITORY_TOKEN')
        private readonly timeDiscountRepository: TimeDiscountRepository,
    ) { }

    async execute(): Promise<TimeDiscount[]> {
        return this.timeDiscountRepository.findAll();
    }
}
