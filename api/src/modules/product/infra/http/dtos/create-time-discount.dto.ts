import { IsNotEmpty, IsString, IsNumber, IsArray, IsDateString, IsOptional } from 'class-validator';

export class CreateTimeDiscountDto {
    @IsNotEmpty()
    @IsDateString()
    startDate: string;

    @IsNotEmpty()
    @IsDateString()
    endDate: string;

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
