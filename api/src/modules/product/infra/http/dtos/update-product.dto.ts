import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    slug?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    short_description?: string;

    @IsOptional()
    price?: number | string;

    @IsOptional()
    old_price?: number | string;

    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    categories?: any;

    @IsOptional()
    @IsString()
    mode_data?: string;

    @IsOptional()
    @IsString()
    time?: string;

    @IsOptional()
    product_data?: any;

    @IsOptional()
    attributes?: any;

    @IsOptional()
    @IsString()
    published?: string;

    @IsOptional()
    @IsString()
    visibility?: string;

    @IsOptional()
    images?: any;
}
