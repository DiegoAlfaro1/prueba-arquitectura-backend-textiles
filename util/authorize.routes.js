const express = require("express");
const authorizeToken = require("./authorizeToken");
const router = express.Router();

router.get("/validate-token", authorizeToken, (req, res) => {
  res.json({ user: req.user });
});
