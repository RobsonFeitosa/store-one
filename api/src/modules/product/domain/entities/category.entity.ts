export class Category {
    private id: string;
    private name: string;
    private slug: string;
    private description: string;
    private image: string;
    private created_at: Date;
    private updated_at: Date;

    constructor(props: {
        id?: string;
        name: string;
        slug: string;
        description?: string;
        image?: string;
        created_at?: Date;
        updated_at?: Date;
    }) {
        Object.assign(this, props);
    }

    public getId() { return this.id; }
    public getName() { return this.name; }
    public getSlug() { return this.slug; }
    public getDescription() { return this.description; }
    public getImage() { return this.image; }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            slug: this.slug,
            description: this.description,
            image: this.image,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}
