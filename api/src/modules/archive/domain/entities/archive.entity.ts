import { Expose } from "class-transformer";
import uploadConfig from "src/shared/infra/http/constants/upload";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('ar100_archives')
export class Archive {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    origin_target: string;

    @Column()
    reference_id: string;

    @Column()
    name: string;

    @Column({ default: false })
    is_primary: boolean;

    @Column()
    size: string;

    @Column()
    type: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<Archive>) {
        Object.assign(this, props);
        this.is_primary = props?.is_primary ?? false;
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

