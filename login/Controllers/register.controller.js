const bcrypt = require("bcryptjs");
const userRepository = require("../Data/userRepository");

exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: "Se ocupa el mail y contra" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await userRepository.createUser({ email, hashedPassword, name });
    res.status(201).json({ message: "Registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
