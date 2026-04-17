import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateSessionDto } from "../dtos/create-session.dto";
import { AuthenticateUserUseCase } from "src/modules/user/application/authenticate-user.use-case";

import { Public } from "src/shared/infra/http/decorators/public.decorator";

@ApiTags('sessions')
@Controller('sessions')
export class AuthenticateUserController {
    constructor(
        private readonly authenticateUserUseCase: AuthenticateUserUseCase
    ) { }

    @Public()
    @Post()
    @ApiOperation({ summary: 'Authenticate user and create session' })
    @ApiResponse({ status: 201, description: 'Authentication successful.' })
    @ApiResponse({ status: 401, description: 'Invalid credentials.' })
    async create(@Body() payload: CreateSessionDto) {
        return this.authenticateUserUseCase.execute(payload);
    }
}
