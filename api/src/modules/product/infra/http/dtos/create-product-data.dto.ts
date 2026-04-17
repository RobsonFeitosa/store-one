import { IsNumber, IsOptional } from 'class-validator';

export class CreateProductDataDto {
    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsNumber()
    sale_price?: number;

    @IsOptional()
    @IsNumber()
    stock_quantity?: number;

    @IsOptional()
    @IsNumber()
    weight?: number;

    @IsOptional()
    @IsNumber()
    length?: number;

    @IsOptional()
    @IsNumber()
    width?: number;

    @IsOptional()
    @IsNumber()
    height?: number;
}
