/**
 * Función para insertar un ítem en una tabla de DynamoDB.
 *
 * @param {string} nombreTabla - El nombre de la tabla de DynamoDB donde se insertará el ítem.
 * @param {Object} modelo - El objeto que representa el ítem a insertar en la tabla.
 * @returns {Promise} - Promesa que resuelve con el resultado de la operación de inserción.
 */
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const clienteDynamo = new DynamoDBClient({ region: "us-east-1" });
const db = DynamoDBDocumentClient.from(clienteDynamo);

module.exports = async (nombreTabla, modelo) => {
  const comando = new PutCommand({
    TableName: nombreTabla,
    Item: modelo,
  });

  return db.send(comando);
};
