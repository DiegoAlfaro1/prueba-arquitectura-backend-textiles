const enviarS3 = require("../util/enviarS3");
const generarNombreUnico = require("../util/generarNombreUnico");

// Crear un S3, las credenciales las agarra directamente del CLI de Amazon
exports.upload = async (req, res) => {
  if (!req.file) {
    console.log("No hay archivo");
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileName = generarNombreUnico(req.file.originalname);

  // Parámetros para subir un objeto a S3
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${fileName}`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype || "application/octet-stream",
  };

  try {
    const urlArchivo = await enviarS3(params, fileName);
    res.json({ message: "Subido exitosamente", url: urlArchivo });
  } catch (error) {
    console.error("Error al subir archivo:", error);
    res
      .status(500)
      .json({ message: "Error al subir archivo", error: error.message });
  }
};
