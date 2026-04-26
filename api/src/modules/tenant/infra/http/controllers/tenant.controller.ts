import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { CreateTenantUseCase } from "../../../application/create-tenant.use-case";
import { ListTenantsUseCase } from "../../../application/list-tenants.use-case";
import { UpdateTenantUseCase } from "../../../application/update-tenant.use-case";
import { DeleteTenantUseCase } from "../../../application/delete-tenant.use-case";

@Controller('tenants')
export class TenantController {
    constructor(
        private readonly createTenantUseCase: CreateTenantUseCase,
        private readonly listTenantsUseCase: ListTenantsUseCase,
        private readonly updateTenantUseCase: UpdateTenantUseCase,
        private readonly deleteTenantUseCase: DeleteTenantUseCase,
    ) { }

    @Get()
    async index() {
        return this.listTenantsUseCase.execute();
    }

    @Post()
    async create(@Body() { name, slug }: { name: string; slug: string }) {
        return this.createTenantUseCase.execute({ name, slug });
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() { name, slug, active }: { name?: string; slug?: string; active?: boolean }
    ) {
        return this.updateTenantUseCase.execute({ id, name, slug, active });
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        return this.deleteTenantUseCase.execute(id);
    }
}
