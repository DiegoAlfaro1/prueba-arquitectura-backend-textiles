const express = require("express");
const router = express.Router();
const loginController = require("../Controllers/login.controller");
const registerController = require("../Controllers/register.controller");
const authorizeToken = require("../../util/authorizeToken");
const checkHeader = require("../../util/checkHeader");
const validateNoSQLInjection = require("../../util/validateNoSQLInjection");

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Registro de usuario
 *     description: Registra un nuevo usuario con nombre, correo y contraseña.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securepassword"
 *               name:
 *                 type: string
 *                 example: "Juan Pérez"
 *     responses:
 *       201:
 *         description: Registro exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Registrado exitosamente"
 *       401:
 *         description: No se proporcionó email o contraseña.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Se ocupa el mail y contra"
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor"
 */
router.post(
  "/register",
  validateNoSQLInjection,
  checkHeader("x-api-key", "Api key invalida"),
  registerController.register
);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Inicio de sesión
 *     description: Autentica al usuario utilizando el nombre, correo y contraseña, y devuelve un JWT.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "yourpassword"
 *               name:
 *                 type: string
 *                 example: "Juan Pérez"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. El token JWT se guarda en las cookies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Inicio de sesión exitoso"
 *       400:
 *         description: No se proporcionó email o contraseña.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Se necesita email y contraseña"
 *       401:
 *         description: Usuario no encontrado o contraseña incorrecta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado o contraseña incorrecta"
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al iniciar sesión"
 */

router.post(
  "/login",
  validateNoSQLInjection,
  checkHeader("x-api-key", "Api key invalida"),
  loginController.login
);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Obtener usuario autenticado
 *     description: Retorna la información del usuario autenticado basado en el token JWT almacenado en las cookies.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Datos del usuario autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   example: { "email": "user@example.com", "name": "Juan Pérez" }
 *       403:
 *         description: Acceso denegado por falta de token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Acceso denegado"
 *       401:
 *         description: Token inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token inválido"
 */
router.get(
  "/auth/me",
  checkHeader("x-api-key", "Api key invalida"),
  authorizeToken,
  (req, res) => {
    res.json({ user: req.user });
  }
);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Cerrar sesión
 *     description: Cierra la sesión del usuario eliminando la cookie del token JWT.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Cierre de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logged out successfully"
 */
router.post(
  "/logout",
  checkHeader("x-api-key", "Api key invalida"),
  (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.json({ message: "Logged out successfully" });
  }
);

module.exports = router;
