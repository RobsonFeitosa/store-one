export class Order {
    private id: string;
    private user_id: string;
    private cod_order: string;
    private professional_name: string;
    private coupon_applied: string;
    private freight: string;
    private payment_method: string;
    private amount: number; // Stored in cents (Rule 8)
    private type_product: string;
    private tracking_code: string;
    private created_at: Date;
    private updated_at: Date;

    constructor(props: {
        id?: string;
        user_id: string;
        cod_order: string;
        professional_name?: string;
        coupon_applied?: string;
        freight?: string;
        payment_method?: string;
        amount: number;
        type_product?: string;
        tracking_code?: string;
        created_at?: Date;
        updated_at?: Date;
    }) {
        Object.assign(this, props);
        // Ensure amount is stored as integer (Rule 8)
        if (props.amount !== undefined) {
            this.amount = Math.round(props.amount);
        }
    }

    public toJSON() {
        return {
            id: this.id,
            user_id: this.user_id,
            cod_order: this.cod_order,
            professional_name: this.professional_name,
            coupon_applied: this.coupon_applied,
            freight: this.freight,
            payment_method: this.payment_method,
            amount: this.amount,
            type_product: this.type_product,
            tracking_code: this.tracking_code,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}
