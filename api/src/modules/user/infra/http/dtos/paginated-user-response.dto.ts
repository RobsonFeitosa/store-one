import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDto } from "./user-response.dto";

export class PaginatedUserResponseDto {
    @ApiProperty({ type: [UserResponseDto] })
    users: UserResponseDto[];

    @ApiProperty({ example: 100 })
    total: number;
}
