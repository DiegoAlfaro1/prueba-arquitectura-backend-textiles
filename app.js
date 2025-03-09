const express = require("express");
const session = require("express-session");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Add session middleware
app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", async (req, res) => {
  res.render("main.ejs");
});

app.get("/hola", async (req, res) => {
  const nombre = req.session.nombre || "Guest";
  delete req.session.nombre;
  res.render("hola.ejs", { nombre });
});

app.post("/send-name", async (req, res) => {
  const { nombre } = req.body;
  req.session.nombre = nombre;
  res.redirect("/hola");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
