require('dotenv').config();
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './../../shared/filters/http-exception.filter';

//for webpack
declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: { origin: '*' },
    });
    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: VersioningType.URI,
    });

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
        .setDescription('Customers microservice')
        .setVersion('0.1')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    const config = app.get<ConfigService>(ConfigService);
    const PORT = config.get<string>('PORT');
    console.log('----------------PORT', PORT);
    await app.listen(PORT);

    //for webpack
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
