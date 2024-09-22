// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// // import { configurationSchema } from './config/dbschema';
// import { Book } from './books/entities/book.entity';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       // validationSchema: configurationSchema, // Ajoutez le schéma de validation ici
//     }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         type: 'mysql',
//         host: configService.get('DATABASE_HOST'),
//         port: configService.get('DATABASE_PORT'),
//         username: configService.get('DATABASE_USER'),
//         password: configService.get('DATABASE_PASSWORD'),
//         database: configService.get('DATABASE_NAME'),
//         entities: [Book],
//         synchronize: true,
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}

// // Si besoin, ajout d'un log pour capturer l'erreur de validation
// process.on('unhandledRejection', (error) => {
//   console.error('Unhandled Rejection at:', error);
//   process.exit(1); // Arrête le processus en cas d'erreur critique
// });

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/entities/book.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // Ajoutez le schéma de validation ici si nécessaire
      // validationSchema: configurationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        // Ajout d'un log pour vérifier les paramètres de connexion à la base de données
        console.log('Configuration de la base de données:', {
          host: configService.get('DATABASE_HOST'),
          port: configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
        });

        return {
          type: 'mysql',
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: [Book],
          synchronize: true, // Attention : `synchronize: true` ne doit pas être utilisé en production
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

// Capture les erreurs non gérées pour un meilleur suivi des erreurs
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection at:', error);
  process.exit(1); // Arrête le processus en cas d'erreur critique
});
