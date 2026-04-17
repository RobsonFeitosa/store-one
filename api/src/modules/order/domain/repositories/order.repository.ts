import { Order } from "../entities/order.entity";

export interface PaginationOptions {
    page?: number;
    limit?: number;
}

export interface OrderRepository {
    create(order: Order): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    findAndCountByUser(userId: string, options: PaginationOptions): Promise<[Order[], number]>;
    findAndCount(options: PaginationOptions): Promise<[Order[], number]>;
    save(order: Order): Promise<Order>;
}
