import { Expose } from "class-transformer";
import uploadConfig from "src/shared/infra/http/constants/upload";

export class UserSettings {
    private id: string;
    private avatar: string;
    private level: 1 | 2;
    private cpf: string;
    private actived: boolean;
    private phone_number: string;
    private created_at: Date;
    private updated_at: Date;

    constructor(props: {
        id?: string;
        avatar?: string;
        level?: 1 | 2;
        cpf?: string;
        actived?: boolean;
        phone_number?: string;
        created_at?: Date;
        updated_at?: Date;
    }) {
        Object.assign(this, props);
        this.level = props.level ?? 1;
        this.actived = props.actived ?? true;
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
