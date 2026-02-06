import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/exception.filter';

async function bootstrap() {
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create(AppModule);

    const prefix = 'api/v1'

    app.setGlobalPrefix(prefix);

    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector)),
    );
    app.useGlobalFilters(new AllExceptionsFilter());

    await app.listen(process.env.PORT ?? 3000);

    logger.log(`Application is running on: http://localhost:${process.env.PORT}/${prefix}❤️‍🔥`);
}
void bootstrap();