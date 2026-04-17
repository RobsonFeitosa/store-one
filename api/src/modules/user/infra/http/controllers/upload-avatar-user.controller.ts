import { Controller, Patch, Param, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadAvatarUseCase } from 'src/modules/user/application/upload-avatar-user.use-case';
import { UploadAvatarResponseDto } from '../dtos/upload-avatar-response.dto';
import uploadConfig from 'src/shared/infra/http/constants/upload';
import { AuthGuard } from 'src/shared/infra/http/guards/auth.guard';

@ApiTags('users')
@Controller('users')
export class UploadAvatarController {
    constructor(private uploadAvatarUseCase: UploadAvatarUseCase) { }

    @Patch(':user_id/avatar')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Upload user avatar' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({ status: 200, description: 'Avatar uploaded successfully.', type: UploadAvatarResponseDto })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: uploadConfig.tmpFolder,
            filename: (req, file, callback) => {
                const fileHash = Date.now().toString();
                const fileName = `${fileHash}-${file.originalname}`;
                return callback(null, fileName);
            }
        })
    }))
    async handle(
        @Param('user_id') user_id: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.uploadAvatarUseCase.execute({
            userId: user_id,
            file
        });
    }
}