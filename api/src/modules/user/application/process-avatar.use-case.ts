import { Injectable } from "@nestjs/common";

@Injectable()
export class ProcessAvatarUseCase {
    async execute(payload: any) {
        console.log('Processando imagem em background...', payload.path);
    }
}