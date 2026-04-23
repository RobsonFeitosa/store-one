import { Coupon } from "../entities/coupon.entity";

export interface CouponRepository {
    create(coupon: Coupon): Promise<Coupon>;
    findById(id: string): Promise<Coupon | null>;
    findByCode(code: string): Promise<Coupon | null>;
    findAll(): Promise<Coupon[]>;
    save(coupon: Coupon): Promise<Coupon>;
    delete(id: string): Promise<void>;
}
