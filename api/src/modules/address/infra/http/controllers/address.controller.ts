import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/shared/infra/http/guards/auth.guard'
import { CreateAddressUseCase } from '../../../application/create-address.use-case'
import { IndexAddressUseCase } from '../../../application/index-address.use-case'
import { ShowAddressUseCase } from '../../../application/show-address.use-case'
import { UpdateAddressUseCase } from '../../../application/update-address.use-case'
import { UpdatePrimaryAddressUseCase } from '../../../application/update-primary-address.use-case'
import { DeleteAddressUseCase } from '../../../application/delete-address.use-case'
import { ShowIsPrimaryAddressUseCase } from '../../../application/show-is-primary-address.use-case'
import { CreateAddressDto } from '../dtos/create-address.dto'
import { UpdateAddressDto } from '../dtos/update-address.dto'

@ApiTags('address')
@Controller('address')
@UseGuards(AuthGuard)
export class AddressController {
  constructor(
    private readonly createAddressUseCase: CreateAddressUseCase,
    private readonly indexAddressUseCase: IndexAddressUseCase,
    private readonly showAddressUseCase: ShowAddressUseCase,
    private readonly updateAddressUseCase: UpdateAddressUseCase,
    private readonly updatePrimaryAddressUseCase: UpdatePrimaryAddressUseCase,
    private readonly deleteAddressUseCase: DeleteAddressUseCase,
    private readonly showIsPrimaryAddressUseCase: ShowIsPrimaryAddressUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new address' })
  async create(@Req() req: any, @Body() data: CreateAddressDto) {
    return this.createAddressUseCase.execute({
      ...data,
      user_id: req.user.id,
      primary: data.primary ?? false,
    })
  }

  @Get()
  @ApiOperation({ summary: 'List all addresses for the authenticated user' })
  async show(@Req() req: any) {
    return this.showAddressUseCase.execute(req.user.id)
  }

  @Get('is-primary')
  @ApiOperation({ summary: 'Check if user has a primary address' })
  async showIsPrimary(@Req() req: any) {
    return this.showIsPrimaryAddressUseCase.execute(req.user.id)
  }

  @Delete(':addressId')
  @ApiOperation({ summary: 'Delete an address' })
  async delete(@Param('addressId') addressId: string) {
    return this.deleteAddressUseCase.execute(addressId)
  }

  @Patch(':addressId/primary')
  @ApiOperation({ summary: 'Set an address as primary' })
  async updatePrimary(@Param('addressId') addressId: string) {
    return this.updatePrimaryAddressUseCase.execute(addressId)
  }

  @Put(':addressId')
  @ApiOperation({ summary: 'Update an address' })
  async update(
    @Req() req: any,
    @Param('addressId') addressId: string,
    @Body() data: UpdateAddressDto,
  ) {
    return this.updateAddressUseCase.execute({
      ...data,
      addressId,
      userId: req.user.id,
      zipcode: data.zipcode!,
      city: data.city!,
      state: data.state!,
      country: data.country!,
      neighborhood: data.neighborhood!,
      title: data.title!,
      primary: data.primary ?? false,
      street: data.street!,
      streetNumber: data.street_number!,
    })
  }

  @Get('all')
  @ApiOperation({ summary: 'List all addresses (admin)' })
  async index(@Query('page') page = 1, @Query('limit') limit = 999999) {
    return this.indexAddressUseCase.execute({
      page: Number(page),
      limit: Number(limit),
    })
  }
}
