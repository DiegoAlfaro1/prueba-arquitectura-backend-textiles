/**
 * Función para subir un archivo a un bucket de S3.
 *
 * @param {Object} params - Parámetros necesarios para subir el archivo, que incluyen el nombre del archivo, el contenido y otras configuraciones de S3.
 * @param {string} params.Bucket - El nombre del bucket de S3.
 * @param {string} params.Key - El nombre del archivo a subir.
 * @param {Buffer|Stream|Uint8Array} params.Body - El contenido del archivo que se subirá.
 * @returns {Promise<string>} - URL pública del archivo subido en S3.
 * @throws {Error} - Lanza un error si no se puede completar la carga.
 */
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: "us-east-1",
});

module.exports = async (params) => {
  try {
    await s3.send(new PutObjectCommand(params));
    const fileName = params.Key;
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
};
