const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../Data/userRepository");

const JWT_SECRET = "mysecretkey123";

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

//hola

exports.login = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Se necesita email y contraseña" });
  }

  try {
    const user = await userRepository.getUserByEmail(email, name);

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.json({ message: "Inicio de sesion exitoso" });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};

exports.getUsers = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userRepository.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};
