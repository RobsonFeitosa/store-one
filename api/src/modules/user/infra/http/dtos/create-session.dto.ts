import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateSessionDto {
    @ApiProperty()
    @IsEmail({}, { message: 'E-mail inválido' })
    @IsNotEmpty({ message: 'E-mail é obrigatório' })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Senha é obrigatória' })
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
    password: string;
}
