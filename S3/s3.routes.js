const express = require("express");
const multer = require("multer");

const controladores = require("./s3.controller");
const authorizeToken = require("../util/authorizeToken");
const router = express.Router();

// Move multer configuration here
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @swagger
 * /s3/upload:
 *   post:
 *     summary: Subir archivos a S3
 *     description: añadir archivos a s3 y regresa el link
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
 *                 description: The file to upload.
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
 *         description: No se subio un archivo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No file uploaded"
 *       500:
 *         description: Fallo la subida del archivo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to upload file"
 */

router.post("/upload", upload.single("file"), controladores.upload);

router.get("/images/:filename", controladores.getUrl);

module.exports = router;
