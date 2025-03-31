/**
 * Middleware para autorizar un usuario utilizando un token JWT almacenado en las cookies.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar al siguiente middleware.
 * @returns {void} - Devuelve una respuesta JSON en caso de error o llama a `next()` si el token es válido.
 */
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.cookies.token; // Obtener el token de las cookies

  console.log(req.cookies);
  console.log(token);

  if (!token) {
    return res.status(403).json({ message: "Acceso denegado" });
  }

  try {
    // Verificar el token JWT
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Agregar información del usuario verificado a la solicitud
    console.log("Verificado");
    next();
  } catch (err) {
    console.log("No Verificado");
    res.status(401).json({ message: "Token inválido", error: err });
  }
};
