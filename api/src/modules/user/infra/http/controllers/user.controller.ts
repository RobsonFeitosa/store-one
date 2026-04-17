import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../dtos/create-user.dto";
import { FilterUsersDto } from "../dtos/filter-users.dto";
import { UserResponseDto } from "../dtos/user-response.dto";
import { PaginatedUserResponseDto } from "../dtos/paginated-user-response.dto";
import { CreateUserUseCase } from "src/modules/user/application/create-user.use-case";
import { IndexUserUseCase } from "src/modules/user/application/index-user.use-case";
import { AuthGuard } from "src/shared/infra/http/guards/auth.guard";
import { Public } from "src/shared/infra/http/decorators/public.decorator";

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly indexUserUseCase: IndexUserUseCase,
    ) { }

    @Public()
    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: UserResponseDto })
    @ApiResponse({ status: 400, description: 'Internal validation error.' })
    @ApiResponse({ status: 409, description: 'User already exists.' })
    async createUser(@Body() payload: CreateUserDto) {
        return this.createUserUseCase.execute(payload);
    }

    @Get()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'List users with filters' })
    @ApiResponse({ status: 200, description: 'Return a list of users and the total count.', type: PaginatedUserResponseDto })
    async findAll(@Query() query: FilterUsersDto) {
        return this.indexUserUseCase.execute(query);
    }
}