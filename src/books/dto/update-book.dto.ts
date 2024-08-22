// import { PartialType } from '@nestjs/mapped-types';
// import { CreateBookDto } from './create-book.dto';

import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsInt()
  @IsOptional()
  publishedYear?: number;
}
