import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';

import { DynamoModule } from './dynamo/dynamo.module';
import { DynamoService } from './dynamo/dynamo.service';


@Module({
  imports: [DynamoModule],
  controllers: [BookController],
  providers: [BookService,DynamoService],
 
})
export class BookModule {}
