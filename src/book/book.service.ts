import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ddbDocClient } from '../aws-config/dynamoDBClient'; // Ensure this path is correct
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { PutCommand, ScanCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const { TABLE_NAME } = process.env;

@Injectable()
export class BookService {
  private readonly ddbDocClient = ddbDocClient; // Use the instance directly

  async create(createBookDto: CreateBookDto) {
    return await this.ddbDocClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        bookId: uuid(),
        title: createBookDto.title,
        author: createBookDto.author,
        publicationYear: createBookDto.publicationYear,
      },
    }));
  }

  async findAll() {
    const results = await this.ddbDocClient.send(new ScanCommand({
      TableName: TABLE_NAME,
    }));

    return results.Items;
  }

  async findOne(bookId: string) {
    const result = await this.ddbDocClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: { bookId },
    }));

    return result.Item;
  }

  async update(bookId: string, updateBookDto: UpdateBookDto) {
    const updated = await this.ddbDocClient.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { bookId },
      UpdateExpression:
        'set #title = :title, author = :author, publicationYear = :publicationYear',
      ExpressionAttributeNames: {
        '#title': 'title',
      },
      ExpressionAttributeValues: {
        ':title': updateBookDto.title,
        ':author': updateBookDto.author,
        ':publicationYear': updateBookDto.publicationYear,
      },
      ReturnValues: 'ALL_NEW',
    }));

    return updated.Attributes;
  }

  async remove(bookId: string) {
    return await this.ddbDocClient.send(new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { bookId },
    }));
  }
}
