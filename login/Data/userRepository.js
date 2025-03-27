// data/userRepository.js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");

const dynamoClient = new DynamoDBClient({ region: "us-east-1" });
const db = DynamoDBDocumentClient.from(dynamoClient);
const TABLE_NAME = "Users";

exports.createUser = async (user) => {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: user,
  });
  return db.send(command);
};

exports.getUserByEmail = async (email, name) => {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { email, name },
  });
  const response = await db.send(command);
  return response.Item;
};
