require("dotenv").config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const rutasLogin = require("./login/login.routes");
const rutasS3 = require("./S3/s3.routes");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();
const PORT = process.env.port || 3000;

// login using jwt

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de ejemplo",
      version: "1.0.0",
      description: "Documentación generada con Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["login/login.routes.js"], // Ruta donde están definidas tus rutas
};

const specs = swaggerJsDoc(options);

// Middleware para Swagger UI

app.use(express.json());
app.use(
  cors({
    origin: "https://main.d19eu3ca4s0hn8.amplifyapp.com/", // Allow only your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow cookies if needed
  })
);
app.use(cookieParser());

app.get("/", async (req, res) => {
  console.log("ruta /");
  res.status(201).json({ message: "Pene" });
});

app.use("/api", rutasLogin);
app.use("/s3", rutasS3);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//http://localhost:3000/s3/upload

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
