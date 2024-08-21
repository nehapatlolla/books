// import * as AWS from 'aws-sdk';
// import { DocumentClient } from 'aws-sdk/clients/dynamodb';
// import 'dotenv/config';

// const { ENDPOINT_URL, REGION } = process.env;

// export const dynamoDBClient = (): DocumentClient => {
//   return new AWS.DynamoDB.DocumentClient({
//     region: REGION,
//     endpoint: ENDPOINT_URL,
//   });
// };

// import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
// import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
// import 'dotenv/config';

// const { ENDPOINT_URL, REGION } = process.env;

// // Create a DynamoDB client
// const client = new DynamoDBClient({
//   region: REGION,
//   endpoint: ENDPOINT_URL,
// });

// // Create a DocumentClient using DynamoDBDocumentClient
// export const dynamoDBClient = DynamoDBDocumentClient.from(client);



import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import 'dotenv/config';

const { ENDPOINT_URL, REGION } = process.env;

export const dynamoDBClient = (): DocumentClient => {
  return new AWS.DynamoDB.DocumentClient({
    region: REGION,
    endpoint: ENDPOINT_URL,
  });
};