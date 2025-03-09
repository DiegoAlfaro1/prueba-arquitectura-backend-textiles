const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ message: "Hola, desplegado" });
});

app.get("/hola", async (req, res) => {
  res.json({ message: "HOLA se subio a main correctamente" });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
