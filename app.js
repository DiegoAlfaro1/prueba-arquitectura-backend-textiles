const dotenv = require("dotenv");
dotenv.config({ path: ".env.staging" });

const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");

const rutasLogin = require("./login/Routes/loginModule.routes");
const rutasS3 = require("./S3/Routes/s3.routes");
const mercadoPagoRoutes = require("./mercadoPago/Routes/mercadoPago.routes");

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
    "./mercadoPago/Routes/mercadoPago.routes.js",
  ],
};

const specs = swaggerJsDoc(options);

// Middlewares
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://[::1]:5173",
      "https://main.d3qkjaze9notik.amplifyapp.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "x-api-key", "X-CSRF-Token"],
    credentials: true,
  })
);

app.use(cookieParser());

const csrfProtection = csrf({ cookie: true });

app.get("/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Rutas
// app.use(csrfProtection);
app.use("/api", rutasLogin);
app.use("/s3", rutasS3);
app.use("/api/mercadopago", mercadoPagoRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Ruta test protegida con header
app.get("/", checkHeader("x-api-key", "Api key invalida"), async (req, res) => {
  res.status(201).json({ message: "Pene" });
});

const port = process.env.PORT || 5000;

// Solo escucha si este archivo es ejecutado directamente (no durante tests).
if (require.main === module) {
  app.listen(port, () =>
    console.log(
      `Server running on port ${port} in ${process.env.NODE_ENV} mode.`
    )
  );
}

module.exports = app; 