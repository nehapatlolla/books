


// import { DynamoDBClient } from '@aws-sdk/client-dynamodb'; // Import the DynamoDBClient
// import {  DynamoDBDocumentClient} from '@aws-sdk/lib-dynamodb'; // Import DynamoDBDocumentClient
// import 'dotenv/config';

// const { ENDPOINT_URL, REGION } = process.env;

// // Create DynamoDB client
// const ddbClient = new DynamoDBClient({
//   region: REGION,
//   endpoint: ENDPOINT_URL,
// });

// // Create DynamoDB DocumentClient
// export const dynamoDBClient = (): DynamoDBDocumentClient => {
//   return DynamoDBDocumentClient.from(ddbClient);
  
// };
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

// Create DynamoDB client
const ddbClient = new DynamoDBClient({
  region: process.env.REGION,
  endpoint: process.env.ENDPOINT_URL,
});

// Create DynamoDB DocumentClient instance
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export { ddbDocClient };



