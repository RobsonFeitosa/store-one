export class OrderStatus {
    private id: string;
    private order_id: string;
    private name: string;
    private created_at: Date;
    private updated_at: Date;

    constructor(props: {
        id?: string;
        order_id: string;
        name: string;
        created_at?: Date;
        updated_at?: Date;
    }) {
        Object.assign(this, props);
    }

    public toJSON() {
        return {
            id: this.id,
            order_id: this.order_id,
            name: this.name,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}
