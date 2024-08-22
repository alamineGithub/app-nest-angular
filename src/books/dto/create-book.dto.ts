// export class CreateBookDto {
//   id: number;
//   title: string;
//   author: string;
//   publishedYear: number;
// }

import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// // create-book.dto.ts
// import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsInt()
  @IsOptional() // Cette propriété est optionnelle
  publishedYear?: number;
}
