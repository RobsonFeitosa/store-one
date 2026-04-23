import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { TimeDiscountRepository } from "../domain/repositories/time-discount.repository";

@Injectable()
export class DeleteTimeDiscountUseCase {
    constructor(
        @Inject('TIME_DISCOUNT_REPOSITORY_TOKEN')
        private readonly timeDiscountRepository: TimeDiscountRepository,
    ) { }

    async execute(id: string): Promise<void> {
        const timeDiscount = await this.timeDiscountRepository.findById(id);

        if (!timeDiscount) {
            throw new NotFoundException('Time discount not found');
        }

        await this.timeDiscountRepository.delete(id);
    }
}
