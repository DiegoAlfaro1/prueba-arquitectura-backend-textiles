const request = require("supertest");
const app = require("../app");

const apiKey = "apikey";

// Entradas válidas
const safePayload = {
  email: "hola@hotmail.com",
  password: "hola",
  name: "hola",
};

const maliciousInputs = [
  // 1. Manipula lógica booleana
  "' OR 1=1 --",

  // 2. Busca acceso con rol de admin
  "' OR role = 'admin' --",

  // 3. Condición siempre verdadera
  "' OR 1=1",

  // 4. Afecta lógica con existencia/ausencia de atributos
  "' OR EXISTS(SELECT * FROM users WHERE email = 'admin') --",

  // 5. Evalúa tamaño para generar condiciones verdaderas
  "' OR LENGTH(email) > 0 --",

  // 6. Simula cierre de expresión + operador lógico
  "' OR 1=1) --",

  // 7. Inserta condición válida para saltar seguridad
  "' OR email = 'hola@hotmail.com' --",

  // 8. Lógica invertida y maliciosa
  "' AND email != 'hola@hotmail.com' --",

  // 9. Condición redundante que puede romper lógica
  "' OR email = email --",

  // 10. Intento de manipular expresión con uso de funciones válidas
  "' UNION SELECT username, password FROM users --",

  // 11. Intenta inyectar un DROP TABLE dentro de una expresión de actualización
  "'; DROP TABLE users --",

  // 12. Manipula valores dinámicos al nivel de parámetros
  "' OR 1=1 --",

  // 13. Intenta cerrar una expresión SQL y ejecutar código malicioso
  "'; SELECT * FROM users; --",
];

describe("/api/register - Pruebas campo por campo contra inyecciones SQL", () => {
  for (const field of Object.keys(safePayload)) {
    for (const attack of maliciousInputs) {
      const payload = { ...safePayload, [field]: attack };

      test(`debería rechazar valor malicioso en el campo "${field}" con valor ${attack}`, async () => {
        const res = await request(app)
          .post("/api/register")
          .set("x-api-key", apiKey)
          .send(payload);

        expect(res.statusCode).toBeGreaterThanOrEqual(400);
        expect(res.body).toHaveProperty("message");
      });
    }
  }
});
