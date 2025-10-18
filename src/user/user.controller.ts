import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-ser.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AdminGuard } from '../auth/admin.guard';
import { UsuarioComumGuard } from '../auth/usuario-comum.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) { }

   @Get()
   @ApiOperation({ summary: 'Listar todos os usuários' })
   @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
   @ApiBearerAuth()
   @UseGuards(UsuarioComumGuard)
   findAll() {
      return this.usersService.findAll()
   }

   @Get(':id')
   @ApiOperation({ summary: 'Buscar um usuário por ID' })
   @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
   @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
   @ApiParam({ name: 'id', type: String, description: 'ID do usuário' })
   @UseGuards(UsuarioComumGuard)

   findOne(@Param('id') id: string) {
      return this.usersService.findOne(id)
   }

   @Put('id')
   @ApiOperation({ summary: 'Atualizar um usuário' })
   @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
   @ApiParam({ name: 'id', type: String, description: 'ID do usuário' })
   @ApiBody({ type: UpdateUserDto })
   @UseGuards(AdminGuard)

   update(@Param('id') id: string, @Body() data: UpdateUserDto) {
      return this.usersService.update(id, data)
   }

   @Delete(':id')
   @ApiOperation({ summary: 'Remover um usuário' })
   @ApiResponse({ status: 200, description: 'Usuário removido com sucesso.' })
   @ApiParam({ name: 'id', type: String, description: 'ID do usuário' })
   @UseGuards(AdminGuard)
   remove(@Param('id') id: string) {
      return this.usersService.remove(id)
   }
}