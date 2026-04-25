import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class CreateAddressDto {
  @ApiProperty({ example: 'Home', description: 'The title of the address' })
  @IsString()
  title: string

  @ApiProperty({ example: '12345-678', description: 'The zipcode' })
  @IsString()
  zipcode: string

  @ApiProperty({ example: 'New York', description: 'The city' })
  @IsString()
  city: string

  @ApiProperty({ example: 'NY', description: 'The state' })
  @IsString()
  state: string

  @ApiProperty({ example: 'USA', description: 'The country' })
  @IsString()
  country: string

  @ApiProperty({ example: 'Brooklyn', description: 'The neighborhood' })
  @IsString()
  neighborhood: string

  @ApiProperty({ example: 'Main St', description: 'The street' })
  @IsString()
  street: string

  @ApiProperty({ example: '123', description: 'The street number' })
  @IsString()
  street_number: string

  @ApiProperty({
    example: true,
    description: 'Whether the address is primary',
  })
  @IsBoolean()
  @IsOptional()
  primary?: boolean
}
