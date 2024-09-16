import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { configurationSchema } from './config/dbschema';
import { Book } from './books/entities/book.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // validationSchema: configurationSchema, // Ajoutez le schéma de validation ici
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [Book],
        synchronize: true,
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
