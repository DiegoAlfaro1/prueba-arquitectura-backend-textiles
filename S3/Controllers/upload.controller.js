/**
 * @module upload
 */

const enviarS3 = require("../../util/enviarS3");
const generarNombreUnico = require("../../util/generarNombreUnico");

/**
 * Maneja la carga de un archivo a S3.
 *
 * Esta función verifica si hay un archivo en la solicitud y lo sube a un bucket de S3.
 * Luego, responde con un mensaje de éxito o un error en caso de fallo.
 *
 * @function
 * @async
 * @param {Object} req - El objeto de la solicitud HTTP.
 * @param {Object} req.file - El archivo cargado en la solicitud.
 * @param {Buffer} req.file.buffer - El contenido del archivo cargado en forma de buffer.
 * @param {string} req.file.originalname - El nombre original del archivo cargado.
 * @param {string} req.file.mimetype - El tipo MIME del archivo cargado.
 * @param {Object} res - El objeto de la respuesta HTTP.
 * @returns {Object} Respuesta JSON que contiene:
 *   - message: Mensaje de éxito en caso de que la carga se realice correctamente.
 *   - url: URL donde se encuentra el archivo en S3.
 * @throws {Error} Si ocurre un error al subir el archivo a S3.
 *
 * @example
 * // Ejemplo de solicitud con un archivo llamado "image.png"
 * // POST /api/upload
 *
 * // Respuesta esperada:
 * {
 *   "message": "Subido exitosamente",
 *   "url": "https://example-bucket.s3.amazonaws.com/uploads/1234567890abcdef-image.png"
 * }
 */
exports.upload = async (req, res) => {
  // Verifica que se haya recibido un archivo en la solicitud
  if (!req.file) {
    console.log("No hay archivo");
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Genera un nombre único para el archivo
  const fileName = generarNombreUnico(req.file.originalname);

  // Parámetros para subir un objeto a S3
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${fileName}`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype || "application/octet-stream",
  };

  try {
    // Intenta subir el archivo a S3 y obtener la URL prefirmada
    const urlArchivo = await enviarS3(params, fileName);
    res.json({ message: "Subido exitosamente", url: urlArchivo });
  } catch (error) {
    console.error("Error al subir archivo:", error);
    // Responde con un error si falla la carga
    res
      .status(500)
      .json({ message: "Error al subir archivo", error: error.message });
  }
};
