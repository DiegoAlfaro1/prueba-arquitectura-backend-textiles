const express = require("express");
const multer = require("multer");

const authorizeToken = require("../../util/authorizeToken");
const router = express.Router();
const uploadController = require("../Controllers/upload.controller");
const getUrl = require("../Controllers/getUrl.controller");

// Move multer configuration here
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @swagger
 * /s3/upload:
 *   post:
 *     summary: Subir archivos a S3
 *     description: Añade archivos a S3 y regresa el link al archivo subido.
 *     tags:
 *       - S3
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: El archivo que se va a subir.
 *     responses:
 *       200:
 *         description: Archivo subido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fileUrl:
 *                   type: string
 *                   format: uri
 *                   example: "https://your-bucket-name.s3.us-east-1.amazonaws.com/uploads/example.jpg"
 *       400:
 *         description: No se subió un archivo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No file uploaded"
 *       500:
 *         description: Falló la subida del archivo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to upload file"
 */

/**
 * @swagger
 * /s3/images/{filename}:
 *   get:
 *     summary: Obtener URL prefirmada para un archivo subido
 *     description: Recupera la URL prefirmada para acceder al archivo almacenado en S3.
 *     tags:
 *       - S3
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         description: El nombre del archivo cuya URL se desea obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: URL prefirmada obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   format: uri
 *                   example: "https://your-bucket-name.s3.us-east-1.amazonaws.com/uploads/example.jpg"
 *       404:
 *         description: El archivo no se encuentra en el bucket.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "File not found"
 *       500:
 *         description: Error al generar la URL prefirmada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to generate signed URL"
 */

router.post("/upload", upload.single("file"), uploadController.upload);

router.get("/images/:filename", getUrl.getUrl);

module.exports = router;
