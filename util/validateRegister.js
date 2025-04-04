// middlewares/validateAndSanitize.js

const forbiddenPattern = /['";`]|(--)/; // caracteres típicos en inyecciones

function validateAndSanitize(req, res, next) {
  const { body } = req;

  // Verifica que el cuerpo sea un objeto plano
  if (typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ message: "Formato del cuerpo inválido." });
  }

  for (const [key, value] of Object.entries(body)) {
    // Solo aceptamos strings, números o booleanos simples
    if (
      typeof value !== "string" &&
      typeof value !== "number" &&
      typeof value !== "boolean"
    ) {
      return res
        .status(400)
        .json({ message: `Valor inválido para el campo "${key}".` });
    }

    if (typeof value === "string") {
      if (forbiddenPattern.test(value)) {
        return res
          .status(400)
          .json({ message: `Entrada sospechosa en el campo "${key}".` });
      }

      // Limpieza básica: quitar espacios al inicio/final
      req.body[key] = value.trim();
    }
  }

  next();
}

module.exports = validateAndSanitize;
