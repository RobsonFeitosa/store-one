import { TimeDiscount } from "../entities/time-discount.entity";

export interface TimeDiscountRepository {
    create(data: Partial<TimeDiscount>): Promise<TimeDiscount>;
    findById(id: string): Promise<TimeDiscount | null>;
    findAll(): Promise<TimeDiscount[]>;
    save(timeDiscount: TimeDiscount): Promise<TimeDiscount>;
    delete(id: string): Promise<void>;
}
