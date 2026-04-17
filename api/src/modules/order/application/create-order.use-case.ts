import { Inject, Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { Order } from "../domain/entities/order.entity";
import { OrderRepository } from "../domain/repositories/order.repository";
import { OrderProduct } from "../domain/entities/order-product.entity";
import { OrderProductRepository } from "../domain/repositories/order-product.repository";
import { ProductRepository } from "src/modules/product/domain/repositories/product.repository";
import { UserRepository } from "src/modules/user/domain/repositories/user.repository";
import { randomBytes } from "crypto";

interface ProductOrder {
    productId: string;
    quantity: number;
}

export interface CreateOrderRequest {
    user_id: string;
    amount: number;
    payment_method: string;
    products_order: ProductOrder[];
    coupon_applied?: string;
    freight?: string;
    professional_name?: string;
    type_product?: string;
}

@Injectable()
export class CreateOrderUseCase {
    constructor(
        @Inject('OrderRepository')
        private orderRepository: OrderRepository,

        @Inject('OrderProductRepository')
        private orderProductRepository: OrderProductRepository,

        @Inject('ProductRepository')
        private productRepository: ProductRepository,

        @Inject('UserRepository')
        private userRepository: UserRepository,
    ) { }

    public async execute(data: CreateOrderRequest): Promise<Order> {
        const { user_id, products_order, ...rest } = data;

        const userExist = await this.userRepository.findById(user_id);
        if (!userExist) {
            throw new NotFoundException('This user does not exist');
        }

        for (const po of products_order) {
            const product = await this.productRepository.findById(po.productId);
            if (!product) {
                throw new NotFoundException(`Product ${po.productId} not found`);
            }
        }

        const codOrder = randomBytes(4).toString('hex').toUpperCase();

        const order = new Order({
            ...rest,
            user_id,
            cod_order: codOrder,
        });

        const savedOrder = await this.orderRepository.create(order);

        for (const po of products_order) {
            const orderProduct = new OrderProduct({
                order_id: savedOrder.toJSON().id,
                product_id: po.productId,
                quantity: po.quantity,
            });

            await this.orderProductRepository.create(orderProduct);
        }

        return savedOrder;
    }
}
