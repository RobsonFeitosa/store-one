import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsString, IsNumber, IsIn, IsOptional, IsBoolean } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    @IsString()
    password: string;

    @ApiProperty({ example: 'uuid-1234', description: 'The user ID' })
    @IsString()
    @IsOptional()
    user_id?: string;

    @ApiProperty({ example: 1, description: 'The level of the user', enum: [1, 2] })
    @IsNumber()
    @IsIn([1, 2])
    @IsOptional()
    level?: 1 | 2 = 2;

    @ApiProperty({ example: true, description: 'Whether the user is actived' })
    @IsBoolean()
    @IsOptional()
    actived?: boolean;

    @ApiPropertyOptional({ example: 'customer', description: 'The role of the user', enum: ['customer', 'shopkeeper'] })
    @IsString()
    @IsIn(['customer', 'shopkeeper'])
    @IsOptional()
    role?: 'customer' | 'shopkeeper' = 'customer';
}