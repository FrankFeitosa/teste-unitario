
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    
    // Configurações da documentação Swagger
    const config = new DocumentBuilder()
    .setTitle('API de Usuários')
    .setDescription('Documentação da API de usuários com NestJS + Prisma + Swagger')
    .setVersion('1.0')
    .addTag('users') // Tag opcional para categorizar as rotas
    .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
    })
    
    .build();
    
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document); // Acessível em http://localhost:3000/api

    // Habilita a validação global
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // Remove propriedades não decoradas no DTO
            forbidNonWhitelisted: true, // Retorna erro se enviar propriedades não permitidas
            transform: true, // Transforma os tipos automaticamente (ex: string para number)
        })
    );

    app.enableCors({
        origin: process.env.CORS_ORIGIN || '*', // Permite todas as origens, ajuste conforme necessário
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true, // Permite envio de cookies e credenciais
    }); // Habilita CORS para permitir requisições de diferentes origens  

    await app.listen(process.env.PORT ??  3000);
}
bootstrap();