export class ProductData {
    private id: string;
    private product_id: string;
    private quantity: number;
    private sku: string;
    private weight: number;
    private dimensions: string;
    private code_bar: string;
    private created_at: Date;
    private updated_at: Date;

    constructor(props: {
        id?: string;
        product_id: string;
        quantity?: number;
        sku?: string;
        weight?: number;
        dimensions?: string;
        code_bar?: string;
        created_at?: Date;
        updated_at?: Date;
    }) {
        Object.assign(this, props);
    }

    public toJSON() {
        return {
            id: this.id,
            product_id: this.product_id,
            quantity: this.quantity,
            sku: this.sku,
            weight: this.weight,
            dimensions: this.dimensions,
            code_bar: this.code_bar,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}
