import { ApiProperty } from "@nestjs/swagger";

export class UploadAvatarResponseDto {
    @ApiProperty({ example: '7f642468-80f4-41d4-9d90-64292850901e' })
    userId: string;

    @ApiProperty({ example: '1736600000000-avatar.png' })
    avatarUrl: string;
}
