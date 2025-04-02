const dotenv = require("dotenv");
dotenv.config({ path: ".env.staging" });

const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const rutasLogin = require("./login/Routes/loginModule.routes");
const rutasS3 = require("./S3/Routes/s3.routes");
const mercadoPagoRoutes = require('./mercadoPago/Routes/mercadoPago.routes');

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const checkHeader = require("./util/checkHeader");

const app = express(); 

// Swagger config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de capacitación de React",
      version: "1.0.0",
      description: "Documentación generada con Swagger",
    },
    servers: [
      {
        url: "https://nr8nw243lb.execute-api.us-east-1.amazonaws.com",
      },
    ],
  },
  apis: [
    "./login/Routes/loginModule.routes.js",
    "./S3/Routes/s3.routes.js",
    "./Routes/mercadoPago.routes.js",
  ],
};

const specs = swaggerJsDoc(options);

// Middlewares
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://main.d3qkjaze9notik.amplifyapp.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "x-api-key"],
    credentials: true,
  })
);

app.use(cookieParser());

// Rutas
app.use("/api", rutasLogin);
app.use("/s3", rutasS3);
app.use("/api/mercadopago", mercadoPagoRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Ruta test protegida con header
app.get("/", checkHeader("x-api-key", "Api key invalida"), async (req, res) => {
  res.status(201).json({ message: "Pene" });
});

// Server
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode.`)
);
