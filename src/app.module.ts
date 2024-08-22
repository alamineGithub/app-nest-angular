import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root', // Remplacez par votre nom d'utilisateur MySQL
      password: '', // Remplacez par votre mot de passe MySQL
      database: 'nestjs_books', // Remplacez par le nom de votre base de données
      entities: [Book],
      synchronize: true,
    }),
    BooksModule,
  ],
})
export class AppModule {}
