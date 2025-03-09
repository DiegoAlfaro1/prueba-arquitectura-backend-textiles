const express = require("express");
const session = require("express-session");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/", async (req, res) => {
  res.render("main.ejs");
});

app.get("/hola", async (req, res) => {
  const nombre = req.session.nombre;
  delete req.session.nombre;
  res.render("hola.ejs", nombre);
});

app.post("/send-name", async (req, res) => {
  const nombre = req.body;
  req.seesion.nombre = nombre;
  res.redirect("/hola");
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
