const crypto = require("crypto");
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

//crear un S3, las credenciales las agarra directamente de el CLI de amazon
const s3 = new S3Client({
  region: "us-east-1",
});

// le hace un nombre unico a cada upload
const generateFileName = (originalName) => {
  const randomBytes = crypto.randomBytes(16).toString("hex");
  return `${Date.now()}-${randomBytes}${path.extname(originalName)}`;
};

exports.upload = async (req, res) => {
  if (!req.file) {
    console.log("No hay archivo");
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileName = generateFileName(req.file.originalname);

  // parametros para subir un objeto a s3
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // The S3 bucket name (from environment variables)
    Key: `uploads/${fileName}`, // The file path inside the bucket
    Body: req.file.buffer, // The actual file data (from multer or similar middleware)
    ContentType: req.file.mimetype, // The file's MIME type (e.g., image/png, application/pdf)
  };
  try {
    //hace el put hacia el s3
    await s3.send(new PutObjectCommand(params));
    //retorna el url del archivo que se subio
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;
    console.log("Se subio con exito");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.json({ fileUrl });
  } catch (error) {
    console.error("S3 Upload Error:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};
