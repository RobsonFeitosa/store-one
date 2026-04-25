import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class UpdateAddressDto {
  @ApiPropertyOptional({ example: 'Home' })
  @IsString()
  @IsOptional()
  title?: string

  @ApiPropertyOptional({ example: '12345-678' })
  @IsString()
  @IsOptional()
  zipcode?: string

  @ApiPropertyOptional({ example: 'New York' })
  @IsString()
  @IsOptional()
  city?: string

  @ApiPropertyOptional({ example: 'NY' })
  @IsString()
  @IsOptional()
  state?: string

  @ApiPropertyOptional({ example: 'USA' })
  @IsString()
  @IsOptional()
  country?: string

  @ApiPropertyOptional({ example: 'Brooklyn' })
  @IsString()
  @IsOptional()
  neighborhood?: string

  @ApiPropertyOptional({ example: 'Main St' })
  @IsString()
  @IsOptional()
  street?: string

  @ApiPropertyOptional({ example: '123' })
  @IsString()
  @IsOptional()
  street_number?: string

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  primary?: boolean
}
