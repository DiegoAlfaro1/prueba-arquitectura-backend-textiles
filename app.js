const dotenv = require("dotenv");
const envFile = `.env.${process.env.NODE_ENV || "staging"}`; // Defaults to 'development' if NODE_ENV is not set
dotenv.config({ path: envFile });

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
        url: "https://main.d19eu3ca4s0hn8.amplifyapp.com/",
      },
    ],
  },
  apis: ["login/login.routes.js"], // Ruta donde están definidas tus rutas
};

const specs = swaggerJsDoc(options);

// Middleware para Swagger UI

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://main.d19eu3ca4s0hn8.amplifyapp.com",
];

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://main.d19eu3ca4s0hn8.amplifyapp.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // ✅ Allow cookies
  })
);

app.use(cookieParser());

app.get("/", async (req, res) => {
  res.status(201).json({ message: "Pene" });
});

app.use("/api", rutasLogin);
app.use("/s3", rutasS3);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//http://localhost:3000/s3/upload

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
