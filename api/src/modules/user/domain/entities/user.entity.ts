import { Expose } from "class-transformer";

export class User {
    private id: string;
    private name: string;
    private email: string;
    private password?: string;
    private settings_id?: string;

    constructor(props: {
        id?: string;
        name: string;
        email: string;
        password?: string;
        settings_id?: string;
    }) {
        Object.assign(this, props);
    }

    public getId() { return this.id; }
    public getName() { return this.name; }
    public getEmail() { return this.email; }
    public getSettingsId() { return this.settings_id; }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            settings_id: this.settings_id,
        };
    }
}