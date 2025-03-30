const enviarS3 = require("../util/enviarS3");
const generarNombreUnico = require("../util/generarNombreUnico");
import {
  S3Client,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

const s3Client = new S3Client({
  region: "us-east-1",
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const FOLDER_NAME = "uploads";
const URL_EXPIRATION = 3600;

async function generarUrlPrefirmado(llaveObjeto, expiresIn = URL_EXPIRATION) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: llaveObjeto,
  });

  return getSignedUrl(s3Client, command, { expiresIn });
}

exports.getUrl = async (req, res) => {
  try {
    const filename = req.params.filename;
    const objectKey = `${FOLDER_NAME}/${filename}`;

    const presignedUrl = await generatePresignedUrl(objectKey);

    res.json({
      success: true,
      url: presignedUrl,
      expiresIn: URL_EXPIRATION,
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate presigned URL",
      error: error.message,
    });
  }
};
