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
  "email = :email OR attribute_exists(email)",

  // 2. Busca acceso con rol de admin
  "role = :role OR contains(role, 'admin')",

  // 3. Condición siempre verdadera
  "begins_with(email, 'admin') OR size(email) > 0",

  // 4. Afecta lógica con existencia/ausencia de atributos
  "attribute_not_exists(password) OR attribute_exists(email)",

  // 5. Evalúa tamaño para generar condiciones verdaderas
  "size(email) > 0 OR contains(role, 'admin')",

  // 6. Simula cierre de expresión + operador lógico
  ") OR attribute_exists(name) OR (",

  // 7. Inserta condición válida para saltar seguridad
  "email <> :email OR contains(email, 'hotmail')",

  // 8. Lógica invertida y maliciosa
  "NOT email = :email OR contains(role, 'admin')",

  // 9. Condición redundante que puede romper lógica
  "email = :email OR email = email",

  // 10. Intento de manipular expresión con uso de funciones válidas
  "begins_with(name, 'a') OR attribute_exists(password)",

  // 11. Intenta inyectar un REMOVE dentro de una expresión de actualización
  "SET name = :name; REMOVE password",

  // 12. Manipula valores dinámicos al nivel de ExpressionAttributeValues
  ":email OR attribute_exists(email)",

  // 13. Intenta cerrar una expresión SET e insertar lógica maliciosa
  "hola@example.com'); REMOVE name; --",
];


describe("/api/register - Pruebas campo por campo contra inyecciones", () => {
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
