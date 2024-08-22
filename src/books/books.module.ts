import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookRepository } from './book.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookRepository])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
