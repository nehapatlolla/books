// src/book/book.dto.ts
export class CreateBookDto {
    title: string;
    author: string;
    publicationYear: number;
  bookId: any;
  }
  
  export class UpdateBookDto {
    title?: string;
    author?: string;
    publicationYear?: number;
  }
  