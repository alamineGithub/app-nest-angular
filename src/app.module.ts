// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import * as Joi from '@hapi/joi'; // Ajout de Joi pour la validation
// // import { DatabaseModule } from './database.module';
// import { BooksModule } from './books/books.module';
// // import { validate } from 'env.validation';

// // import { validate } from 'class-validator';

// @Module({
//   imports: [
//     // Configuration du module Config avec validation des variables d'environnement
//     ConfigModule.forRoot({
//       envFilePath: ['.env'],
//       isGlobal: true, // Les variables d'environnement sont disponibles dans tout le projet
//       load: [configuration],
//       validate: validate,

//       validationSchema: Joi.object({
//         DATABASE_HOST: Joi.string().required(),
//         DATABASE_PORT: Joi.number().required(),
//         DATABASE_USER: Joi.string().required(),
//         DATABASE_PASSWORD: Joi.string().allow(null, ''), // Le mot de passe peut être null ou vide
//         DATABASE_NAME: Joi.string().required(),
//       }),
//     }),
//     // DatabaseModule,

//     // Module des livres
//     BooksModule,
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi'; // Ajout de Joi pour la validation
import { validate } from 'class-validator';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';

// import configuration from './config/configuration'; // Config custom
// import { validate } from './env.validation'; // Validation personnalisée
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { EventEmitterModule } from '@nestjs/event-emitter';
// import { BullModule } from '@nestjs/bull';

const devConfig = { port: 3000 };
const productionConfig = { port: 4000 };

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development', '.env.production'],
      isGlobal: true,
      // load: [configuration], // Charger une configuration personnalisée si nécessaire
      validate, // Validation des variables d'environnement
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().allow(null, ''),
        DATABASE_NAME: Joi.string().required(),
      }),
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
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    // BullModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     redis: {
    //       host: configService.get<string>('NEXT_REDIS_HOST'),
    //       port: configService.get<number>('NEXT_REDIS_PORT'),
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development'
          ? devConfig
          : productionConfig;
      },
    },
  ],
})
export class AppModule {}
