const userRepository = require("../Data/userRepository");
const User = require("../Data/models/user");

exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: "Se ocupa el mail y contra" });
  }

  const user = new User(name, email, password);

  try {
    await userRepository.createUser(user);
    res.status(201).json({ message: "Registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
