// insertItem.js
const connection = require("./db"); // Import the connection from db.js

module.exports = async (nombreTabla, modelo) => {
  // Prepare the query for inserting a record into the MySQL table
  const columns = Object.keys(modelo).join(", ");
  const values = Object.values(modelo)
    .map((value) => `'${value}'`)
    .join(", ");

  const query = `INSERT INTO ${nombreTabla} (${columns}) VALUES (${values})`;

  // Execute the query
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
