require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './../../shared/filters/http-exception.filter';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: { origin: '*' },
    });
    app.setGlobalPrefix('api');
    app.enableVersioning({
        type:VersioningType.URI,
    })
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            validationError: { target: false },
            whitelist: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );
    const options = new DocumentBuilder()
        .setTitle('Proyect Virtual Agency API')
        .setDescription('Credits microservice')
        .setVersion('0.1')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    const config = app.get<ConfigService>(ConfigService);
    const PORT = config.get<string>('PORT');
    console.log('----------------PORT', PORT);
    await app.listen(PORT);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
