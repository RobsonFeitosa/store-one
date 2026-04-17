import { Expose } from "class-transformer";
import uploadConfig from "src/shared/infra/http/constants/upload";

export class Archive {
    private id: string;
    private origin_target: string;
    private reference_id: string;
    private name: string;
    private is_primary: boolean;
    private size: string;
    private type: string;
    private created_at: Date;
    private updated_at: Date;

    constructor(props: {
        id?: string;
        origin_target: string;
        reference_id: string;
        name: string;
        is_primary?: boolean;
        size: string;
        type: string;
        created_at?: Date;
        updated_at?: Date;
    }) {
        Object.assign(this, props);
        this.is_primary = props.is_primary ?? false;
    }

    public getId() { return this.id; }
    public getOriginTarget() { return this.origin_target; }
    public getReferenceId() { return this.reference_id; }
    public getName() { return this.name; }
    public getIsPrimary() { return this.is_primary; }
    public getSize() { return this.size; }
    public getType() { return this.type; }
    public getCreatedAt() { return this.created_at; }
    public getUpdatedAt() { return this.updated_at; }

    public setIsPrimary(is_primary: boolean) {
        this.is_primary = is_primary;
    }

    @Expose({ name: 'picture_url' })
    public getPictureUrl(): string | null {
        if (!this.name) {
            return null;
        }

        switch (uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.name}`;
            case 's3':
                return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.name}`;
            default:
                return null;
        }
    }

    public toJSON() {
        return {
            id: this.id,
            origin_target: this.origin_target,
            reference_id: this.reference_id,
            name: this.name,
            is_primary: this.is_primary,
            size: this.size,
            type: this.type,
            picture_url: this.getPictureUrl(),
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}
