import { Expose } from "class-transformer";
import uploadConfig from "../../../../shared/infra/http/constants/upload";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('users_settings')
export class UserSettings {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    avatar: string;

    @Column({ type: 'int', default: 1 })
    level: 1 | 2;

    @Column({ nullable: true })
    cpf: string;

    @Column({ default: true })
    actived: boolean;

    @Column({ name: 'phone_number', nullable: true })
    phone_number: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<UserSettings>) {
        Object.assign(this, props);
        this.level = props?.level ?? 1;
        this.actived = props?.actived ?? true;
    }

    @Expose({ name: 'avatar_url' })
    public getAvatarUrl(): string | null {
        if (!this.avatar) {
            return null;
        }

        switch (uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.avatar}`;
            case 's3':
                return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
            default:
                return null;
        }
    }

    public toJSON() {
        return {
            id: this.id,
            avatar: this.avatar,
            avatar_url: this.getAvatarUrl(),
            level: this.level,
            cpf: this.cpf,
            actived: this.actived,
            phone_number: this.phone_number,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}

