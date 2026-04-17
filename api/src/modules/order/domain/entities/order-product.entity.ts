export class OrderProduct {
    private id: string;
    private order_id: string;
    private product_id: string;
    private quantity: number;

    constructor(props: {
        id?: string;
        order_id: string;
        product_id: string;
        quantity: number;
    }) {
        Object.assign(this, props);
    }

    public toJSON() {
        return {
            id: this.id,
            order_id: this.order_id,
            product_id: this.product_id,
            quantity: this.quantity,
        };
    }
}
