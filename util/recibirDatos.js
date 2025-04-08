// getItem.js
const connection = require("./db"); // Import the connection from db.js

module.exports = async (nombreTabla, llaves) => {
  // Construct the WHERE clause based on the provided keys (llaves)
  const conditions = Object.keys(llaves)
    .map((key) => `${key} = '${llaves[key]}'`)
    .join(" AND ");

  const query = `SELECT * FROM ${nombreTabla} WHERE ${conditions}`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        // Return the first result (or null if no record is found)
        resolve(results.length > 0 ? results[0] : null);
      }
    });
  });
};
