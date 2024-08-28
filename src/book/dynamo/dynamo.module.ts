import { Module } from '@nestjs/common';
import { DynamoService } from './dynamo.service';

@Module({
  providers: [DynamoService],
  exports: [DynamoService], // Export if used in other modules
})
export class DynamoModule {}
