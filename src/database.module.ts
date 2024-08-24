// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { Book } from './books/entities/book.entity';

// @Module({
//   imports: [
//     // Importation du module ConfigModule pour l'accès aux variables d'environnement
//     ConfigModule.forRoot({
//       isGlobal: true, // Rendre les variables d'environnement globales
//     }),

//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: (configService: ConfigService) => ({
//         type: 'mysql',
//         host: configService.get('DATABASE_HOST'),
//         port: +configService.get('DATABASE_PORT'),
//         username: configService.get('DATABASE_USER'),
//         password: configService.get('DATABASE_PASSWORD'),
//         database: configService.get('DATABASE_NAME'),
//         entities: [Book],
//         synchronize: true,
//       }),
//       inject: [ConfigService],
//     }),
//   ],
// })
// export class DatabaseModule {}
