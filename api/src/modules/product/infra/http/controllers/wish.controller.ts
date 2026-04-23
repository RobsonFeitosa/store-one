import { Controller, Get, Param, Post, Query, UseGuards, Req } from '@nestjs/common';
import { ToggleProductWishUseCase } from '../../../application/toggle-product-wish.use-case';
import { IndexProductWishUseCase } from '../../../application/index-product-wish.use-case';
// import { JwtAuthGuard } from 'src/modules/user/infra/http/guards/jwt-auth.guard'; // Assuming there is one

@Controller('wishes')
export class WishController {
    constructor(
        private readonly toggleWishUseCase: ToggleProductWishUseCase,
        private readonly indexWishUseCase: IndexProductWishUseCase,
    ) { }

    @Post(':product_id')
    // @UseGuards(JwtAuthGuard)
    async toggle(@Param('product_id') product_id: string, @Req() req: any) {
        // Assuming user id comes from req.user
        const user_id = req.user?.id || 'fake-user-id'; 
        return this.toggleWishUseCase.execute({ product_id, user_id });
    }

    @Get()
    // @UseGuards(JwtAuthGuard)
    async index(
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '10',
        @Req() req: any
    ) {
        const user_id = req.user?.id || 'fake-user-id';
        return this.indexWishUseCase.execute({
            page: Number(page),
            limit: Number(limit)
        }, user_id);
    }
}
