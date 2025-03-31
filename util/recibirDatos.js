/**
 * Función para obtener un ítem de una tabla de DynamoDB usando las llaves proporcionadas.
 *
 * @param {string} nombreTabla - El nombre de la tabla de DynamoDB de la cual se va a obtener el ítem.
 * @param {Object} llaves - Un objeto que contiene las llaves para buscar el ítem en la tabla.
 * @returns {Promise<Object|null>} - Un objeto con los datos del ítem si se encuentra, o null si no se encuentra el ítem.
 */
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
