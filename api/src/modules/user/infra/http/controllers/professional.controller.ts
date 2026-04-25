import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IndexProfessionalsUseCase } from "src/modules/user/application/index-professionals.use-case";
import { IndexProfessionalsAvailablesUseCase } from "src/modules/user/application/index-professionals-availables.use-case";
import { ShowBlockedDatesUseCase } from "src/modules/user/application/show-blocked-dates.use-case";
import { ShowAvailableTimeProfessionalsUseCase } from "src/modules/user/application/show-available-time-professionals.use-case";
import { Public } from "src/shared/infra/http/decorators/public.decorator";

@ApiTags('professionals')
@Controller('professionals')
export class ProfessionalController {
    constructor(
        private readonly indexProfessionalsUseCase: IndexProfessionalsUseCase,
        private readonly indexProfessionalsAvailablesUseCase: IndexProfessionalsAvailablesUseCase,
        private readonly showBlockedDatesUseCase: ShowBlockedDatesUseCase,
        private readonly showAvailableTimeProfessionalsUseCase: ShowAvailableTimeProfessionalsUseCase,
    ) { }

    @Get()
    @ApiOperation({ summary: 'List professionals with pagination' })
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
        return this.indexProfessionalsUseCase.execute({ 
            page: Number(page), 
            limit: Number(limit) 
        });
    }

    @Public()
    @Get('availables')
    @ApiOperation({ summary: 'List available professionals' })
    @ApiResponse({ status: 200, description: 'Return a list of available professionals.' })
    async findAvailables() {
        return this.indexProfessionalsAvailablesUseCase.execute();
    }

    @Public()
    @Get('time-intervals/blocked-dates/:professionalId')
    @ApiOperation({ summary: 'List blocked dates for a professional' })
    async showBlockedDates(
        @Param('professionalId') professionalId: string,
        @Query('year') year: string,
        @Query('month') month: string,
    ) {
        return this.showBlockedDatesUseCase.execute(professionalId, year, month);
    }

    @Public()
    @Get('time-intervals/availables/:professionalId')
    @ApiOperation({ summary: 'List available times for a professional' })
    async findAvailablesTimes(
        @Param('professionalId') professionalId: string,
        @Query('date') date: string,
    ) {
        return this.showAvailableTimeProfessionalsUseCase.execute(professionalId, date);
    }
}
