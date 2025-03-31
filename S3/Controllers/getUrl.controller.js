/**
 * @module getUrl
 */

const generarUrlPrefirmado = require("../../util/generarUrlPresigned");

const FOLDER_NAME = "uploads"; // Nombre de la carpeta donde se guardan los archivos
const URL_EXPIRATION = 3600; // Tiempo de expiración de la URL prefirmada en segundos

/**
 * Obtiene una URL prefirmada para acceder a un archivo en S3.
 *
 * @function
 * @async
 * @param {Object} req - El objeto de la solicitud HTTP.
 * @param {Object} req.params - Parámetros de la solicitud, que contiene el nombre del archivo.
 * @param {string} req.params.filename - El nombre del archivo para el cual se generará la URL prefirmada.
 * @param {Object} res - El objeto de la respuesta HTTP.
 * @returns {Object} Respuesta JSON que contiene:
 *   - success: Booleano que indica si la operación fue exitosa.
 *   - url: La URL prefirmada generada para acceder al archivo.
 *   - expiresIn: El tiempo en segundos hasta que la URL expire.
 * @throws {Error} Si ocurre un error al generar la URL prefirmada.
 *
 * @example
 * // Ejemplo de solicitud con un archivo llamado "file.txt"
 * // GET /api/file/file.txt
 *
 * // Respuesta esperada:
 * {
 *   "success": true,
 *   "url": "https://example-bucket.s3.amazonaws.com/uploads/file.txt?...",
 *   "expiresIn": 3600
 * }
 */
exports.getUrl = async (req, res) => {
  try {
    const filename = req.params.filename;
    const objectKey = `${FOLDER_NAME}/${filename}`;

    // Generar URL prefirmada
    const presignedUrl = await generarUrlPrefirmado(objectKey);

    // Responder con la URL prefirmada y la expiración
    res.json({
      success: true,
      url: presignedUrl,
      expiresIn: URL_EXPIRATION,
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    // Manejo de errores
    res.status(500).json({
      success: false,
      message: "Failed to generate presigned URL",
      error: error.message,
    });
  }
};
