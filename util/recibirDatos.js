const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");

const clienteDynamo = new DynamoDBClient({ region: "us-east-1" });
const db = DynamoDBDocumentClient.from(clienteDynamo);

module.exports = async (nombreTabla, llaves) => {
  const comando = new GetCommand({
    TableName: nombreTabla,
    Key: llaves,
  });
  const response = await db.send(comando);
  return response.Item;
};
