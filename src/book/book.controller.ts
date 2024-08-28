// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Put,
//   Param,
//   Delete,
// } from '@nestjs/common';
// import { BookService } from './book.service';
// import { CreateBookDto, UpdateBookDto } from './dto/create-book.dto';


// @Controller('book')
// export class BookController {
//   constructor(private readonly bookService: BookService) {}

//   @Post()
//   async create(@Body() createBookDto: CreateBookDto) {
//     return await this.bookService.create(createBookDto);
//   }

//   @Get()
//   async findAll() {
//     return await this.bookService.findAll();
//   }

//   @Get(':bookId')
//   async findOne(@Param('bookId') bookId: string) {
//     return await this.bookService.findOne(bookId);
//   }

//   @Put(':bookId')
//   async update(
//     @Param('bookId') bookId: string,
//     @Body() updateBookDto: UpdateBookDto,
//   ) {
//     return await this.bookService.update(bookId, updateBookDto);
//   }

//   @Delete(':bookId')
//   async remove(@Param('bookId') bookId: string) {
//     return await this.bookService.remove(bookId);
//   }
// }

// import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';




// import { DynamoService } from './dynamo/dynamo.service';
// import { CreateBookDto, UpdateBookDto } from './book.dto';

// @Controller('books')
// export class BookController {
//   constructor(private readonly dynamoService: DynamoService) {}

//   // @Post()
//   // async create(@Body() createBookDto: CreateBookDto) {
//   //   return this.dynamoService.createItem('Books', {
//   //     // bookId: createBookDto.bookId,
//   //     title: createBookDto.title,
//   //     author: createBookDto.author,
//   //     publicationYear: createBookDto.publicationYear,
//   //   });
//   // }
//   @Post()
//   async create(@Body() createBookDto: CreateBookDto) {
//     // Generate a unique ID for the new book
//     const bookId = Date.now().toString(); // You can use a more sophisticated ID generation strategy

//     // Create a new item with the generated ID
//     const item = {
//       bookId,
//       ...createBookDto,
//     };

//     return this.dynamoService.createItem('Books', item);
//   }

//   @Get(':bookId')
//   async findOne(@Param('bookId') bookId: string) {
//     return this.dynamoService.getItem('Books', { bookId });
//   }

//   @Put(':bookId')
//   async update(
//     @Param('bookId') bookId: string,
//     @Body() updateBookDto: UpdateBookDto,
//   ) {
//     const updateExpression = 'SET #title = :title, #author = :author, #publicationYear = :publicationYear';
//     const expressionAttributeValues = {
//       ':title': updateBookDto.title,
//       ':author': updateBookDto.author,
//       ':publicationYear': updateBookDto.publicationYear,
//     };
//     const expressionAttributeNames = {
//       '#title': 'title',
//       '#author': 'author',
//       '#publicationYear': 'publicationYear',
//     };

//     return this.dynamoService.updateItem('Books', { bookId }, updateExpression, expressionAttributeValues);
//   }

//   @Delete(':bookId')
//   async remove(@Param('bookId') bookId: string) {
//     return this.dynamoService.deleteItem('Books', { bookId });
//   }

//   @Get()
//   async findAll() {
//     return this.dynamoService.scanTable('Books');
//   }
// }
import { Controller, Get, Post, Body, Put, Param, Delete, InternalServerErrorException } from '@nestjs/common';
import { DynamoService } from './dynamo/dynamo.service';
import { CreateBookDto, UpdateBookDto } from './book.dto';


@Controller('books')
export class BookController {
  constructor(private readonly dynamoService: DynamoService) {}

  @Post()
  // async create(@Body() createBookDto: CreateBookDto) {
  //   try {
  //     const bookId = Date.now().toString(); // Generate unique ID
  //     const item = {
  //       bookId,
  //       ...createBookDto,
  //     };
  //     return await this.dynamoService.createItem('Books', item);
  //   } catch (error) {
  //     console.error('Error creating book:', error);
  //     throw new InternalServerErrorException('Failed to create book');
  //   }
  // }
  async create(@Body() createBookDto: CreateBookDto) {
    return this.dynamoService.createItem('Books', {
      bookId: createBookDto.bookId,
      title: createBookDto.title,
      author: createBookDto.author,
      publicationYear: createBookDto.publicationYear,
    });
  }
  

  @Get()
  async findAll() {
    return await this.dynamoService.scanTable('Books');
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.dynamoService.getItem('Books', { bookId: id });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const updateExpressionParts = [];
    const expressionAttributeValues = {};

    if (updateBookDto.title) {
      updateExpressionParts.push('#title = :title');
      expressionAttributeValues[':title'] = updateBookDto.title;
    }
    if (updateBookDto.author) {
      updateExpressionParts.push('#author = :author');
      expressionAttributeValues[':author'] = updateBookDto.author;
    }
    if (updateBookDto.publicationYear) {
      updateExpressionParts.push('#year = :year');
      expressionAttributeValues[':year'] = updateBookDto.publicationYear;
    }

    const updateExpression = 'SET ' + updateExpressionParts.join(', ');
    const expressionAttributeNames = {
      '#title': 'title',
      '#author': 'author',
      '#year': 'publicationYear',
    };

    return await this.dynamoService.updateItem('Books', { bookId: id }, updateExpression, expressionAttributeValues);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.dynamoService.deleteItem('Books', { bookId: id });
  }
  @Get('tables')
  async listTables() {
    try {
      const tables = await this.dynamoService.listTables();
      return { tables };
    } catch (error) {
      console.error('Error listing tables:', error);
      throw new InternalServerErrorException('Failed to list tables');
    }
  }

}
