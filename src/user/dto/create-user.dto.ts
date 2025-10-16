import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "Francisco Backend",
    description: "Nome completo do usuário",
  })
  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({ message: "O nome é obrigatório" })
  name: string;

  @ApiProperty({
    example: "backend@example.com",
    description: "Email do usuário",
  })
  @IsEmail({}, { message: "O email deve ser um endereço de email válido" })
  email: string;
}