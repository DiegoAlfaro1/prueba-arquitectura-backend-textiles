/**
 * @file Controlador para la autenticación de usuarios utilizando bcrypt y JWT.
 * @module AuthController
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../Data/userRepository");

/**
 * Maneja el inicio de sesión del usuario verificando credenciales y generando un token JWT.
 *
 * @async
 * @function login
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Cuerpo de la solicitud con los datos de inicio de sesión.
 * @param {string} req.body.email - Correo electrónico del usuario.
 * @param {string} req.body.password - Contraseña del usuario.
 * @param {string} [req.body.name] - Nombre del usuario (opcional).
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} Respuesta JSON con un mensaje de éxito o error.
 *
 * @example
 * POST /api/login
 * Body: {
 *   "email": "usuario@ejemplo.com",
 *   "password": "contraseña_segura",
 *   "name": "Juan Pérez"
 * }
 */
exports.login = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Se necesita email y contraseña" });
  }

  try {
    // Buscar al usuario en la base de datos utilizando el repositorio de usuarios
    const user = await userRepository.getUserByEmail(email, name);

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // Comparar la contraseña proporcionada con la contraseña almacenada (hash)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar un token JWT válido por 1 hora
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Configurar el token como una cookie HTTP-only para mayor seguridad
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};
