import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { DynamoService } from 'book/dynamo/dynamo.service';



@Module({
  imports: [BookModule],
  controllers: [AppController],
  providers: [AppService, DynamoService],
})
export class AppModule {}
