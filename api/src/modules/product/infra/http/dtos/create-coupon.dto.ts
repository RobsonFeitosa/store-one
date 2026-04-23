import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateCouponDto {
    @IsOptional()
    @IsString()
    code_coupon?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsNotEmpty()
    @IsNumber()
    discount: number;

    @IsNotEmpty()
    @IsDateString()
    validation: string;
}
