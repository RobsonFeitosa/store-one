import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

class AttributeDto {
    @IsString()
    name: string;

    @IsArray()
    options: any[];

    @IsArray()
    variations: any[];
}

export class CreateProductDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    slug?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    short_description?: string;

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
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AttributeDto)
    attributes?: AttributeDto[];

    @IsOptional()
    @IsString()
    published?: string;

    @IsOptional()
    @IsString()
    visibility?: string;

    @IsOptional()
    price?: number | string;

    @IsOptional()
    old_price?: number | string;

    @IsOptional()
    product_data?: any;

    @IsOptional()
    images?: any;
}
