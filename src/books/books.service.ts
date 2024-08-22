import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    // Créez un nouveau livre en utilisant le DTO
    const newBook = this.bookRepository.create(createBookDto);
    // Enregistrez le nouveau livre dans la base de données
    const savedBook = await this.bookRepository.save(newBook);
    // Retournez le livre enregistré
    return savedBook;
  }
  // create(createBookDto: CreateBookDto): Book {
  //   const newBook = { id: Date.now().toString(), ...createBookDto };
  //   this.books.push(newBook);
  //   return newBook;
  // }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    try {
      const book = await this.bookRepository.findOne({ where: { id } });
      if (!book) {
        throw new NotFoundException(`Livre avec l'ID ${id} non trouvé`);
      }
      return book;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Erreur interne du serveur',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async updateBookByID(
    id: number,
    updateBookDto: Partial<UpdateBookDto>,
  ): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Livre avec l'ID ${id} non trouvé`);
    }
    Object.assign(book, updateBookDto);
    return this.bookRepository.save(book);
  }

  // Suppression d'un livre par ID
  public async deleteBookByID(id: number): Promise<void> {
    const result = await this.bookRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Livre avec l'ID ${id} non trouvé`);
    }
  }
  // update(id: string, updateBookDto: UpdateBookDto): Book {
  //   const bookIndex = this.books.findIndex((book) => book.id === +id);
  //   if (bookIndex === -1) {
  //     throw new NotFoundException(`Livre avec l'ID ${id} non trouvé`);
  //   }
  //   const updatedBook = { ...this.books[bookIndex], ...updateBookDto };
  //   this.books[bookIndex] = updatedBook;
  //   return updatedBook;
  // }

  // remove(id: string): void {
  //   const bookIndex = this.books.findIndex((book) => book.id === +id);
  //   if (bookIndex === -1) {
  //     throw new NotFoundException(`Livre avec l'ID ${id} non trouvé`);
  //   }
  //   this.books.splice(bookIndex, 1);
  // }
}
