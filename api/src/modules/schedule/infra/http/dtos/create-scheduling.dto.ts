import { IsString, IsNotEmpty, IsDateString, IsOptional, IsUUID } from 'class-validator'

export class CreateSchedulingDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date

  @IsUUID()
  @IsNotEmpty()
  professional_id: string

  @IsUUID()
  @IsOptional()
  order_id?: string

  @IsUUID()
  @IsOptional()
  product_id?: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  observations: string
}
