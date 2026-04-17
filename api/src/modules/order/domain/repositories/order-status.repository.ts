import { OrderStatus } from "../entities/order-status.entity";

export interface OrderStatusRepository {
    create(data: OrderStatus): Promise<OrderStatus>;
    findByOrderId(orderId: string): Promise<OrderStatus[]>;
    save(orderStatus: OrderStatus): Promise<OrderStatus>;
}
