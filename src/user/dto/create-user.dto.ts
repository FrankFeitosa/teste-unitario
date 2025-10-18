import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEmail, IsString, IsNotEmpty, IsEnum } from "class-validator";

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
  
  @ApiProperty({
    example: "baCK123",
    description: "Senha do usuário",
  })
  @IsString({message: "A senha deve ser uma válida"})
  password: string;
  
  @ApiProperty({
    example: "ADMIN ou USUARIO_COMUM",
    description: "Role do usuário",
  })
  @IsEnum(['ADMIN', 'USUARIO_COMUM'], { message: "A role deve ser 'ADMIN' ou 'USUARIO_COMUM'" })
  role: Role;
}