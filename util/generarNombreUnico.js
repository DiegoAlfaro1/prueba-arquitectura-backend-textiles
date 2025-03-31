/**
 * Función para generar un nombre de archivo único basado en la fecha y un valor aleatorio.
 *
 * @param {string} originalName - El nombre original del archivo, utilizado para obtener la extensión del archivo.
 * @returns {string} - Un nombre único para el archivo, basado en la fecha actual y un valor aleatorio.
 */
const crypto = require("crypto");
const path = require("path");

module.exports = (originalName) => {
  const randomBytes = crypto.randomBytes(16).toString("hex");
  return `${Date.now()}-${randomBytes}${path.extname(originalName)}`;
};
