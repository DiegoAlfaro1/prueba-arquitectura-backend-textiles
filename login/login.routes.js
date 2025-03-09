const express = require("express");
const router = express.Router();
const controllers = require("./login.controller");
const authorizeToken = require("../util/authorizeToken");

router.post("/register", controllers.register);

router.post("/login", controllers.login);

router.get("/get-user/:id", controllers.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Retorna una lista de usuarios en formato JSON.
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Juan Pérez"
 */
router.get("/users/:id", async (req, res) => {
  return res.json({ message: "Si funciona" });
});

module.exports = router;
