import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumber, Min } from "class-validator";
import { Type } from "class-transformer";

export class FilterUsersDto {
    @ApiPropertyOptional({ example: 1, description: 'The page number' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ example: 10, description: 'The number of items per page' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number = 10;

    @ApiPropertyOptional({ example: 'John', description: 'Search term for name' })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({ example: 'customer', description: 'Filter by role: customer or shopkeeper' })
    @IsOptional()
    @IsString()
    role?: 'customer' | 'shopkeeper';
}
