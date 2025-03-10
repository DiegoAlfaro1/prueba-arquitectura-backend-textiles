const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");

const JWT_SECRET = "mysecretkey123";
const dynamoClient = new DynamoDBClient({ region: "us-east-1" });
const db = DynamoDBDocumentClient.from(dynamoClient);

const TABLE_NAME = "Users";

exports.register = async (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: "Se ocupa el mail y contra" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        email,
        hashedPassword,
        name,
      },
    });

    await db.send(command);
    res.status(201).json({ message: "Registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.login = async (req, res, next) => {
  const { email, password, name } = req.body;

  console.log(email, password);

  if (!email || !password) {
    return res.status(400).json({ message: "Se necesita email y contraseña" });
  }

  try {
    // Get user from DynamoDB
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: { email, name }, // Assuming email is the primary key
    });

    const response = await db.send(command);

    if (!response.Item) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const user = response.Item;

    // Compare password
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generate token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // ✅ Set token in an httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true, // ✅ Prevent access via JavaScript (secure)
      secure: true, // ✅ Required for HTTPS (change to false for localhost)
      sameSite: "None", // ✅ Required for cross-origin authentication
    });

    res.status(200).json({ message: "Login exitoso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};

exports.getUsers = async (req, res, next) => {
  const { id } = req.params;

  try {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: { id },
    });

    const response = await db.send(command);
    if (!response.Item) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(response.Item);
  } catch {
    res.status(500);
  }
};
