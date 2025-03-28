const dotenv = require("dotenv");
const envFile = `.env.${process.env.NODE_ENV || "staging"}`; // Defaults to 'development' if NODE_ENV is not set
dotenv.config({ path: envFile });

const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const rutasLogin = require("./login/Routes/loginModule.routes");
const rutasS3 = require("./S3/s3.routes");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const checkHeader = require("./util/checkHeader");

const app = express();

// login using jwt

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de capacitacion de react",
      version: "1.0.0",
      description: "Documentación generada con Swagger",
    },
    servers: [
      {
        url: "https://nr8nw243lb.execute-api.us-east-1.amazonaws.com",
      },
    ],
  },
  apis: ["./login/Routes/loginModule.routes.js", "./S3/s3.routes.js"],
};

const specs = swaggerJsDoc(options);

// Middleware para Swagger UI

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://main.d19eu3ca4s0hn8.amplifyapp.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "x-api-key"],
    credentials: true, // ✅ Allow cookies
  })
);

app.use(cookieParser());

app.get("/", checkHeader("x-api-key", "Api key invalida"), async (req, res) => {
  res.status(201).json({ message: "Pene" });
});

app.use("/api", rutasLogin);
app.use("/s3", rutasS3);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(
    `Server running on port ${port} ${port} in ${process.env.NODE_ENV} mode.`
  )
);
