// import { DynamoDBClient, DeleteItemCommand, GetItemCommand, PutItemCommand, UpdateItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class DynamoService {
//   private readonly client: DynamoDBClient;

//   constructor() {
//     this.client = new DynamoDBClient({
//       region: 'local',
//       endpoint: 'http://localhost:8001',
//       credentials: {
//         accessKeyId: 'nehareddy',
//         secretAccessKey: 'nehareddy',
//       },
//     });
//   }

//   async deleteItem(tableName: string, key: any) {
//     const command = new DeleteItemCommand({
//       TableName: tableName,
//       Key: key,
//     });

//     return this.client.send(command);
//   }

//   async getItem(tableName: string, key: any) {
//     const command = new GetItemCommand({
//       TableName: tableName,
//       Key: key,
//     });

//     return this.client.send(command);
//   }

//   async createItem(tableName: string, item: any) {
//     const command = new PutItemCommand({
//       TableName: tableName,
//       Item: item,
//     });

//     return this.client.send(command);
//   }

//   async updateItem(tableName: string, key: any, updateExpression: string, expressionAttributeValues: any) {
//     const command = new UpdateItemCommand({
//       TableName: tableName,
//       Key: key,
//       UpdateExpression: updateExpression,
//       ExpressionAttributeValues: expressionAttributeValues,
//     });

//     return this.client.send(command);
//   }

//   async scanTable(tableName: string) {
//     const command = new ScanCommand({
//       TableName: tableName,
//     });

//     return this.client.send(command);
//   }
// }
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DynamoDBClient, PutItemCommand, GetItemCommand, ScanCommand, UpdateItemCommand, DeleteItemCommand, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

@Injectable()
export class DynamoService {
  private readonly dynamoClient: DynamoDBClient;

  constructor() {
    this.dynamoClient = new DynamoDBClient({
      region: 'localhost',
      endpoint: 'http://localhost:8003',
      credentials: {
        accessKeyId: 'nehareddy',
        secretAccessKey: 'nehareddy',
      },
    });
  }

  async createItem(tableName: string, item: any) {
    try {
      const command = new PutItemCommand({
        TableName: tableName,
        Item: marshall(item), // Convert item to DynamoDB format
      });
      await this.dynamoClient.send(command);
      return { message: 'Item created successfully' };
    } catch (error) {
      console.error('Error creating item:', error);
      throw new InternalServerErrorException('Error creating item');
    }
  }

  async getItem(tableName: string, key: any) {
    try {
      const command = new GetItemCommand({
        TableName: tableName,
        Key: marshall(key), // Convert key to DynamoDB format
      });
      const result = await this.dynamoClient.send(command);
      return unmarshall(result.Item); // Convert result to JSON format
    } catch (error) {
      console.error('Error getting item:', error);
      throw new InternalServerErrorException('Error getting item');
    }
  }

  async scanTable(tableName: string) {
    try {
      const command = new ScanCommand({ TableName: tableName });
      const result = await this.dynamoClient.send(command);
      return result.Items?.map(item => unmarshall(item)) || [];
    } catch (error) {
      console.error('Error scanning table:', error);
      throw new InternalServerErrorException('Error scanning table');
    }
  }

  async updateItem(tableName: string, key: any, updateExpression: string, expressionAttributeValues: any) {
    try {
      const command = new UpdateItemCommand({
        TableName: tableName,
        Key: marshall(key),
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: marshall(expressionAttributeValues),
      });
      await this.dynamoClient.send(command);
      return { message: 'Item updated successfully' };
    } catch (error) {
      console.error('Error updating item:', error);
      throw new InternalServerErrorException('Error updating item');
    }
  }

  async deleteItem(tableName: string, key: any) {
    try {
      const command = new DeleteItemCommand({
        TableName: tableName,
        Key: marshall(key),
      });
      await this.dynamoClient.send(command);
      return { message: 'Item deleted successfully' };
    } catch (error) {
      console.error('Error deleting item:', error);
      throw new InternalServerErrorException('Error deleting item');
    }
  }

  async listTables() {
    try {
      const command = new ListTablesCommand({});
      const result = await this.dynamoClient.send(command);
      return result.TableNames;
    } catch (error) {
      console.error('Error listing tables:', error);
      throw new InternalServerErrorException('Error listing tables');
    }
  }
  
}
