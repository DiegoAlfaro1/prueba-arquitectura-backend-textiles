const generarNombreUnico = require("../util/generarNombreUnico");

//crear un S3, las credenciales las agarra directamente de el CLI de amazon

exports.upload = async (req, res) => {
  if (!req.file) {
    console.log("No hay archivo");
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileName = generarNombreUnico(req.file.originalname);

  // parametros para subir un objeto a s3
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // The S3 bucket name (from environment variables)
    Key: `uploads/${fileName}`, // The file path inside the bucket
    Body: req.file.buffer, // The actual file data (from multer or similar middleware)
    ContentType: req.file.mimetype, // The file's MIME type (e.g., image/png, application/pdf)
  };

  try {
    let urlArchivo = await enviarS3(params);
    res.json({ message: "Subido exitosamente", urlArchivo });
  } catch {
    res.status(500).json({ message: "Error al subir archivo", urlArchivo });
  }
};
