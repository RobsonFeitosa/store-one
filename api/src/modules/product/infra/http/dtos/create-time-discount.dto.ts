import { IsNotEmpty, IsString, IsNumber, IsArray, IsDateString, IsOptional } from 'class-validator';

export class CreateTimeDiscountDto {
    @IsNotEmpty()
    @IsDateString()
    start_date: string;

    @IsNotEmpty()
    @IsDateString()
    end_date: string;

    @IsNotEmpty()
    @IsNumber()
    discount: number;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsArray()
    @IsString({ each: true })
    productIds: string[];
}
