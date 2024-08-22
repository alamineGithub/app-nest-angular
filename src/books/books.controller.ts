// import { Controller } from '@nestjs/common';

// @Controller('books')
// export class BooksController {}

// books.controller.ts

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // @Post()
  // createBook(@Body() createBookDto: CreateBookDto) {
  //   return this.booksService.create(createBookDto);
  // }
  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  getAllBooks() {
    return this.booksService.findAll();
  }
  @Get(':id')
  async getBookById(@Param('id') id: number) {
    return this.booksService.findOne(id);
  }

  // @Put(':id')
  // updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
  //   return this.booksService.update(id, updateBookDto);
  // }

  // @Delete(':id')
  // deleteBook(@Param('id') id: string) {
  //   return this.booksService.remove(id);
  // }
}
