import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Swagger ')
    .setDescription('')
    .setVersion('1.0')
    .addTag('')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, documentFactory);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
