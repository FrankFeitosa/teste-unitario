import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-ser.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) { }

   @Post()
   @ApiOperation({ summary: 'Criar um novo usuário' })
   @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
   @ApiBody({ type: CreateUserDto })
   create(@Body() data: CreateUserDto) {
      return this.usersService.create(data);
   }

   @Get()
   @ApiOperation({ summary: 'Listar todos os usuários' })
   @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
   findAll() {
      return this.usersService.findAll()
   }

   @Get(':id')
   @ApiOperation({ summary: 'Buscar um usuário por ID' })
   @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
   @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
   @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
   findOne(@Param('id') id: string) {
      return this.usersService.findOne(id)
   }

   @Put('id')
   @ApiOperation({ summary: 'Atualizar um usuário' })
   @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
   @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
   @ApiBody({ type: UpdateUserDto })
   update(@Param('id') id: string, @Body() data: UpdateUserDto) {
      return this.usersService.update(id, data)
   }

   @Delete(':id')
   @ApiOperation({ summary: 'Remover um usuário' })
   @ApiResponse({ status: 200, description: 'Usuário removido com sucesso.' })
   @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
   remove(@Param('id') id: string) {
      return this.usersService.remove(id)
   }
}