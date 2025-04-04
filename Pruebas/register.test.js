const request = require("supertest");
const app = require("../app"); // Ajusta el path si tu archivo se llama diferente o está en otra carpeta

const apiKey = "apikey";

const safePayload = {
  email: "hola@hotmail.com",
  password: "hola",
  name: "hola",
};

const maliciousInputs = [
  "' OR attribute_exists(email) OR 'x'='x",
  "'; REMOVE name;",
  "' UNION SELECT * FROM users WHERE '1'='1",
  "' OR contains(role, 'admin')",
  "'; DROP TABLE users;",
];

describe("/api/register - Field-by-Field Injection Testing", () => {
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
