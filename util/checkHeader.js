/**
 * Middleware para verificar la existencia de un encabezado específico en la solicitud.
 *
 * @param {string} headerName - Nombre del encabezado a verificar.
 * @param {string} [errorMessage="Api key invalida"] - Mensaje de error personalizado en caso de que el encabezado no exista.
 * @returns {Function} - Middleware de Express que verifica la presencia del encabezado.
 */
module.exports = (headerName, errorMessage = "Api key invalida") => {
  return (req, res, next) => {
    const headerValue = req.get(headerName);
    if (!headerValue) {
      return res.status(400).json({ message: errorMessage });
    }
    next();
  };
};
