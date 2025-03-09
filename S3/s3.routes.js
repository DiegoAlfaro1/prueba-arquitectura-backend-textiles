const express = require("express");
const multer = require("multer");

const controladores = require("./s3.controller");
const authorizeToken = require("../util/authorizeToken");
const router = express.Router();

// Move multer configuration here
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Apply `upload.single("file")` before calling the controller
router.post(
  "/upload",
  authorizeToken,
  upload.single("file"),
  controladores.upload
);

module.exports = router;
