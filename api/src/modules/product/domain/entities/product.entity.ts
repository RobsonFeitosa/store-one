export class Product {
    private id: string;
    private name: string;
    private cod_product: string;
    private price: number; // Stored in cents (Rule 8)
    private old_price: number; // Stored in cents (Rule 8)
    private description: string;
    private short_description: string;
    private mode_data: string;
    private type: 'service' | 'product';
    private slug: string;
    private emphasis: boolean;
    private categories: string;
    private visibility: string;
    private published: string;
    private time_discount_id: string;
    private time: string;
    private created_at: Date;
    private updated_at: Date;

    constructor(props: {
        id?: string;
        name: string;
        cod_product: string;
        price?: number;
        old_price?: number;
        description?: string;
        short_description?: string;
        mode_data?: string;
        type?: 'service' | 'product';
        slug: string;
        emphasis?: boolean;
        categories?: string;
        visibility?: string;
        published?: string;
        time_discount_id?: string;
        time?: string;
        created_at?: Date;
        updated_at?: Date;
    }) {
        Object.assign(this, props);
        this.type = props.type ?? 'product';
        this.emphasis = props.emphasis ?? false;
        
        // Ensure price is stored as integer (Rule 8)
        if (props.price !== undefined) {
            this.price = Math.round(props.price);
        }
        if (props.old_price !== undefined) {
            this.old_price = Math.round(props.old_price);
        }
    }

    public getId() { return this.id; }
    public getName() { return this.name; }
    public getPrice() { return this.price; }
    public getOldPrice() { return this.old_price; }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            cod_product: this.cod_product,
            price: this.price,
            old_price: this.old_price,
            description: this.description,
            short_description: this.short_description,
            mode_data: this.mode_data,
            type: this.type,
            slug: this.slug,
            emphasis: this.emphasis,
            categories: this.categories,
            visibility: this.visibility,
            published: this.published,
            time_discount_id: this.time_discount_id,
            time: this.time,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}
