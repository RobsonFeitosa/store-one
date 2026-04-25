import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
} from '@nestjs/common'
import { CreateSchedulingUseCase } from 'src/modules/schedule/application/create-scheduling.use-case'
import { IndexSchedulingUseCase } from 'src/modules/schedule/application/index-scheduling.use-case'
import { ShowSchedulingUseCase } from 'src/modules/schedule/application/show-scheduling.use-case'
import { DeleteSchedulingUseCase } from 'src/modules/schedule/application/delete-scheduling.use-case'
import { IndexTeamsAvailableUseCase } from 'src/modules/schedule/application/index-teams-available.use-case'

import { CreateSchedulingDto } from '../dtos/create-scheduling.dto'

@Controller('schedules')
export class SchedulingController {
  constructor(
    private createScheduling: CreateSchedulingUseCase,
    private indexScheduling: IndexSchedulingUseCase,
    private showScheduling: ShowSchedulingUseCase,
    private deleteScheduling: DeleteSchedulingUseCase,
    private indexTeamsAvailable: IndexTeamsAvailableUseCase,
  ) {}

  @Post()
  async create(@Body() data: CreateSchedulingDto) {
    return await this.createScheduling.execute(data)
  }

  @Get()
  async index(@Query('page') page = 1, @Query('limit') limit = 999999) {
    return await this.indexScheduling.execute({
      page: Number(page),
      limit: Number(limit),
    })
  }

  @Get('teams/available')
  async indexTeams() {
    return await this.indexTeamsAvailable.execute()
  }

  @Get(':scheduleId')
  async show(@Param('scheduleId') scheduleId: string) {
    return await this.showScheduling.execute(scheduleId)
  }

  @Delete(':scheduleId')
  @HttpCode(204)
  async delete(@Param('scheduleId') scheduleId: string) {
    await this.deleteScheduling.execute(scheduleId)
  }
}
