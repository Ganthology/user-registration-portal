import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const configuration = app.get(ConfigService);

  config.update({
    region: configuration.get('S3_REGION'),
    credentials: {
      accessKeyId: configuration.get('S3_ACCESS_KEY_ID'),
      secretAccessKey: configuration.get('S3_SECRET_ACCESS_KEY'),
    },
  });
  console.log('cred', config.credentials);
  await app.listen(3333);
}
bootstrap();
