import {
    Controller,
    Post,
    Get,
    Delete,
    Put,
    Param,
    Query,
    Body,
    UploadedFiles,
    UploadedFile,
    UseInterceptors,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { CreateArchiveUseCase } from '../../../application/create-archive.use-case';
import { IndexArchiveUseCase } from '../../../application/index-archive.use-case';
import { DeleteArchiveUseCase } from '../../../application/delete-archive.use-case';
import { UpdateArchiveUseCase } from '../../../application/update-archive.use-case';
import { UpdatePrimaryArchiveUseCase } from '../../../application/update-primary-archive.use-case';
import { instanceToInstance } from 'class-transformer';

@Controller('archives')
export class ArchiveController {
    constructor(
        private createArchiveUseCase: CreateArchiveUseCase,
        private indexArchiveUseCase: IndexArchiveUseCase,
        private deleteArchiveUseCase: DeleteArchiveUseCase,
        private updateArchiveUseCase: UpdateArchiveUseCase,
        private updatePrimaryArchiveUseCase: UpdatePrimaryArchiveUseCase,
    ) { }

    @Post(':originName/:referenceId')
    @UseInterceptors(FilesInterceptor('files'))
    async create(
        @Param('originName') originName: string,
        @Param('referenceId') referenceId: string,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        const archives = await this.createArchiveUseCase.execute({
            files,
            originName,
            referenceId,
        });

        return instanceToInstance(archives.map(a => a.toJSON()));
    }

    @Get()
    async index(
        @Query('page') page: string,
        @Query('limit') limit: string,
        @Query('originName') originName?: string,
        @Query('referenceId') referenceId?: string,
    ) {
        const [archives, total] = await this.indexArchiveUseCase.execute({
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 10,
            originName,
            referenceId,
        });

        return {
            data: instanceToInstance(archives.map(a => a.toJSON())),
            total,
        };
    }

    @Put('primary/:referenceId/:archiveId')
    async updateByReference(
        @Param('referenceId') referenceId: string,
        @Param('archiveId') archiveId: string,
    ) {
        const archives = await this.updatePrimaryArchiveUseCase.execute({
            referenceId,
            archiveId,
        });

        return instanceToInstance(archives.map(a => a.toJSON()));
    }

    @Put(':archiveId')
    @UseInterceptors(FileInterceptor('file'))
    async update(
        @Param('archiveId') archiveId: string,
        @Body('data') data: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const payload = data ? JSON.parse(data) : undefined;
        const archive = await this.updateArchiveUseCase.execute({
            file,
            archiveId,
            payload,
        });

        return instanceToInstance(archive.toJSON());
    }

    @Delete(':archiveId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('archiveId') archiveId: string) {
        await this.deleteArchiveUseCase.execute({ archiveId });
    }
}
