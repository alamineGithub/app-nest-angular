import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['src/.env'], // Utilise seulement le fichier .env
      isGlobal: true,
      load: [configuration],
      // validationSchema: Joi.object({
      //   NODE_ENV: Joi.string()
      //     .valid('development', 'production', 'test', 'provision')
      //     .default('development'),
      //   DATABASE_HOST: Joi.string().required(),
      //   DATABASE_PORT: Joi.number().default(3308),
      //   DATABASE_USER: Joi.string().default('root'),
      //   DATABASE_PASSWORD: Joi.string().allow(''),
      //   DATABASE_NAME: Joi.string().required(),
      // }),
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
    }),

    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        synchronize: true, // Ne pas utiliser en production
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

// Si besoin, ajout d'un log pour capturer l'erreur de validation
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection at:', error);
  process.exit(1); // Arrête le processus en cas d'erreur critique
});
