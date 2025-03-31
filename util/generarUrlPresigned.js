/**
 * @module generarUrlPrefirmado
 */

const {
  S3Client,
  GetObjectCommand,
  ListObjectsV2Command,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// Cliente de S3 configurado para la región especificada
const s3Client = new S3Client({
  region: "us-east-1",
});

// Nombre del bucket y tiempo de expiración predeterminado de la URL
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const URL_EXPIRATION = 3600;

/**
 * Genera una URL prefirmada para acceder a un objeto almacenado en S3.
 *
 * Esta función genera una URL que permite acceder a un objeto almacenado en S3 sin necesidad de credenciales,
 * válida por un tiempo determinado. La URL prefirmada es útil para la descarga de archivos sin exponer el
 * acceso directo al bucket S3.
 *
 * @function
 * @async
 * @param {string} llaveObjeto - La clave (key) del objeto en el bucket S3.
 * @param {number} [expiresIn=3600] - El tiempo en segundos que la URL prefirmada será válida. Por defecto es 3600 segundos (1 hora).
 * @returns {string} La URL prefirmada generada que permite acceder al objeto.
 * @throws {Error} Si ocurre un error al generar la URL prefirmada.
 *
 * @example
 * // Generar una URL prefirmada para un archivo llamado "image.png"
 * const url = await generarUrlPrefirmado("uploads/image.png");
 * console.log(url); // URL que puede ser usada para acceder al archivo
 */
module.exports = async (llaveObjeto, expiresIn = URL_EXPIRATION) => {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: llaveObjeto,
  });

  return getSignedUrl(s3Client, command, { expiresIn });
};
