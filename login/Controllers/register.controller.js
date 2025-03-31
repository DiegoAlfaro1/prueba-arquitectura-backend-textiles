/**
 * @file Controlador para el registro de usuarios.
 * @module AuthController
 */

const userRepository = require("../Data/userRepository");
const User = require("../Data/models/user");

/**
 * Registra un nuevo usuario en la base de datos.
 *
 * @async
 * @function register
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Cuerpo de la solicitud con los datos del usuario.
 * @param {string} req.body.email - Correo electrónico del usuario.
 * @param {string} req.body.password - Contraseña del usuario.
 * @param {string} req.body.name - Nombre del usuario.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} Respuesta JSON con un mensaje de éxito o error.
 *
 * @example
 * POST /api/register
 * Body: {
 *   "email": "usuario@ejemplo.com",
 *   "password": "contraseña_segura",
 *   "name": "Juan Pérez"
 * }
 */
exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: "Se ocupa el mail y contra" });
  }

  try {
    // Crear una nueva instancia de usuario
    const user = new User(name, email, password);

    // Hashear la contraseña antes de guardarla
    await user.hashPassword();

    // Guardar el usuario en la base de datos
    await userRepository.createUser(user);

    res.status(201).json({ message: "Registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
