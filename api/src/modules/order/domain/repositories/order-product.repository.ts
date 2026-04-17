import { OrderProduct } from "../entities/order-product.entity";

export interface OrderProductRepository {
    create(data: OrderProduct): Promise<OrderProduct>;
    findById(id: string): Promise<OrderProduct | null>;
    save(orderProduct: OrderProduct): Promise<OrderProduct>;
}
