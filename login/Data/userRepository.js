// data/userRepository.js

const enviarDatos = require("../../util/enviarDatos");
const recibirDatos = require("../../util/recibirDatos");

exports.createUser = async (user) => {
  return await enviarDatos("Users", user);
};

exports.getUserByEmail = async (email, name) => {
  return await recibirDatos("Users", { email, name });
};
