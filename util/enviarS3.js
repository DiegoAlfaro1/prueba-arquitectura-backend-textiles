const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: "us-east-1",
});

module.exports = async (params) => {
  let respuesta;
  try {
    await s3.send(new PutObjectCommand(params));
    respuesta = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;
    return respuesta;
  } catch (error) {
    return error;
  }
};
